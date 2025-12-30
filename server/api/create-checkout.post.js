import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const mpClient = new MercadoPagoConfig({
    accessToken: config.mercadoPagoAccessToken,
  });

  const sanity = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const body = await readBody(event);

  const {
    serviceId,
    serviceName,
    duration,
    price,
    date,
    time,
    client,
    serviceDescription,
    categoryName,
  } = body;

  // Validación
  if (!serviceId || !date || !time || !price || !client?.email) {
    throw createError({
      statusCode: 400,
      message: "Faltan datos requeridos",
    });
  }

  if (!serviceId || !date || !time || !price || !client?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const existingBooking = await sanity.fetch(
    `
    *[_type == "booking" 
      && service._ref == $serviceId 
      && date == $date
      && time == $time
      && status != "cancelled"
    ][0]
  `,
    { serviceId, date, time }
  );

  const preference = new Preference(mpClient);

  const preferenceData = {
    items: [
      {
        id: serviceId,
        title: `${serviceName} - ${duration} min ${categoryName}`,
        description:
          serviceDescription ||
          `Sesión de ${serviceName} con duración de ${duration} minutos`,
        category_id: "services",
        quantity: 1,
        unit_price: Number(price),
        currency_id: "MXN",
      },
    ],

    payer: {
      name: client.name,
      email: client.email,
      phone: {
        number: client.phone,
      },
    },

    metadata: {
      serviceId,
      serviceName,
      date,
      time,
      duration,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
    },

    back_urls: {
      success: `${config.siteUrl}/booking/success`,
      failure: `${config.siteUrl}/booking/error`,
      pending: `${config.siteUrl}/booking/pending`,
    },

    auto_return: "approved",

    notification_url: `${config.siteUrl}/api/webhook/mercadopago`,
  };

  try {
    const response = await preference.create({ body: preferenceData });

    return {
      success: true,
      checkoutUrl: response.init_point,
      preferenceId: response.id,
    };
  } catch (error) {
    console.error("=== ERROR MERCADOPAGO ===");
    console.error("Message:", error.message);
    console.error("Cause:", error.cause);
    console.error("Full error:", JSON.stringify(error, null, 2));
    throw createError({
      statusCode: 500,
      message: "Error al crear el checkout",
    });
  }
});
