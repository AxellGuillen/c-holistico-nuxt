// server/api/availability.get.js

import { createClient } from "@sanity/client";
import { useRuntimeConfig } from "#imports";

export const getSanityClient = () => {
  const config = useRuntimeConfig();
  return createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
};

const sanityClient = getSanityClient();

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function getDayName(date) {
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado", // ← Sin tilde
  ];
  const d = new Date(date + "T12:00:00");
  return days[d.getDay()];
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

function generateSlots(startTime, endTime, interval, serviceDuration) {
  const slots = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const lastPossibleSlot = endMinutes - serviceDuration;

  for (
    let minutes = startMinutes;
    minutes <= lastPossibleSlot;
    minutes += interval
  ) {
    slots.push(minutesToTime(minutes));
  }

  return slots;
}

function rangesOverlap(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}

function filterAvailableSlots(allSlots, existingBookings, duration, buffer) {
  return allSlots.filter((slot) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + duration;

    for (const booking of existingBookings) {
      const bookingStart = timeToMinutes(booking.time);
      const bookingEnd = bookingStart + booking.duration + buffer;

      if (rangesOverlap(slotStart, slotEnd, bookingStart, bookingEnd)) {
        return false;
      }
    }

    return true;
  });
}

function validateAdvance(date, minAdvanceHours, maxAdvanceDays) {
  const now = new Date();
  const bookingDate = new Date(date + "T00:00:00");

  const diffHours = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const diffDays = Math.ceil(diffHours / 24);

  if (diffHours < minAdvanceHours) {
    return {
      valid: false,
      message: `Debes reservar con al menos ${minAdvanceHours} horas de anticipación`,
    };
  }

  if (diffDays > maxAdvanceDays) {
    return {
      valid: false,
      message: `Solo puedes reservar hasta ${maxAdvanceDays} días en el futuro`,
    };
  }

  return { valid: true };
}

// ============================================
// HANDLER PRINCIPAL
// ============================================
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const serviceId = query.serviceId;
  const date = query.date;
  const duration = parseInt(query.duration) || 60;

  if (!serviceId || !date) {
    throw createError({
      statusCode: 400,
      message: "Missing parameters: serviceId and date are required",
    });
  }

  // 2. OBTENER CONFIGURACIÓN GLOBAL
  const config = await sanityClient.fetch(`
    *[_type == "scheduleConfig"][0] {
      schedule,
      closedDates,
      minAdvanceHours,
      maxAdvanceDays,
      slotInterval,
      bufferTime
    }
  `);

  if (!config) {
    throw createError({
      statusCode: 500,
      message: "Schedule configuration not found",
    });
  }

  // 3. VALIDAR ANTICIPACIÓN
  const validation = validateAdvance(
    date,
    config.minAdvanceHours,
    config.maxAdvanceDays
  );

  if (!validation.valid) {
    return {
      available: false,
      message: validation.message,
      slots: [],
    };
  }

  // 4. VERIFICAR DÍA NO LABORABLE
  const isClosedDate = config.closedDates?.some((d) => d.date === date);

  if (isClosedDate) {
    const closedDay = config.closedDates.find((d) => d.date === date);
    return {
      available: false,
      message: `Cerrado: ${closedDay?.reason || "Día no laborable"}`,
      slots: [],
    };
  }

  // 5. OBTENER SERVICIO
  const service = await sanityClient.fetch(
    `
    *[_type == "subservice" && _id == $id][0] {
      name,
      customAvailability
    }
  `,
    { id: serviceId }
  );

  if (!service) {
    throw createError({
      statusCode: 404,
      message: "Service not found",
    });
  }

  // 6. DETERMINAR HORARIOS A USAR
  const dayName = getDayName(date);
  let daySchedule = null;

  if (service.customAvailability?.useCustomAvailability) {
    const customDay = service.customAvailability.days?.find(
      (d) => d.day === dayName
    );

    if (customDay) {
      daySchedule = {
        isOpen: true,
        start: customDay.startTime,
        end: customDay.endTime,
      };
    } else {
      return {
        available: false,
        message: `${service.name} no está disponible los ${dayName}`,
        slots: [],
      };
    }
  } else {
    // Mapear español a inglés para scheduleConfig
    const dayMap = {
      domingo: "sunday",
      lunes: "monday",
      martes: "tuesday",
      miercoles: "wednesday",
      jueves: "thursday",
      viernes: "friday",
      sabado: "saturday",
    };
    daySchedule = config.schedule[dayMap[dayName]];
  }

  if (!daySchedule?.isOpen) {
    return {
      available: false,
      message: `Cerrado los ${dayName}`,
      slots: [],
    };
  }

  // 7. GENERAR SLOTS
  const allSlots = generateSlots(
    daySchedule.start,
    daySchedule.end,
    duration,
    duration
  );

  // 8. OBTENER RESERVAS EXISTENTES
  const existingBookings = await sanityClient.fetch(
    `
    *[_type == "booking" 
      && service._ref == $serviceId 
      && date == $date
      && status != "cancelled"
    ] {
      "time": time,
      duration
    }
  `,
    { serviceId, date }
  );

  // 9. FILTRAR SLOTS DISPONIBLES
  const availableSlots = filterAvailableSlots(
    allSlots,
    existingBookings,
    duration,
    config.bufferTime
  );

  // DEBUG (opcional - quitar después)
  console.log("=== DEBUG ===");
  console.log("1. Fecha:", date);
  console.log("2. Día:", dayName);
  console.log("3. daySchedule:", daySchedule);
  console.log("4. allSlots:", allSlots);
  console.log("5. existingBookings:", existingBookings);
  console.log("6. availableSlots:", availableSlots);

  // 10. RETORNAR
  return {
    available: availableSlots.length > 0,
    date,
    day: dayName,
    schedule: {
      open: daySchedule.start,
      close: daySchedule.end,
    },
    slots: availableSlots,
    totalSlots: allSlots.length,
    blockedSlots: allSlots.length - availableSlots.length,
  };
});
