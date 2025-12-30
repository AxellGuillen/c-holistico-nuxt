import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // 1. CONFIGURAR SANITY
  const sanity = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: "2024-01-01",
    token: config.sanityToken,
    useCdn: false,
  });

  // 2. OBTENER DATOS DE LA NOTIFICACIÓN
  const body = await readBody(event);
  const query = getQuery(event);

  // MercadoPago envía el tipo de notificación
  const topic = body.type || query.topic;
  const paymentId = body.data?.id || query.id;

  // Solo procesar notificaciones de pago
  if (topic !== "payment") {
    return { success: true, message: "Notificación ignorada" };
  }

  if (!paymentId) {
    return { success: false, message: "No payment ID" };
  }

  try {
    // 3. OBTENER DETALLES DEL PAGO DESDE MERCADOPAGO
    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${config.mercadoPagoAccessToken}`,
        },
      }
    );

    const payment = await paymentResponse.json();

    // 4. VERIFICAR QUE EL PAGO FUE APROBADO
    if (payment.status !== "approved") {
      return { success: true, message: `Pago ${payment.status}` };
    }

    // 5. EXTRAER METADATA
    const metadata = payment.metadata;

    if (!metadata) {
      console.error("No metadata en el pago");
      return { success: false, message: "No metadata" };
    }

    const {
      service_id,
      date,
      time,
      duration,
      client_name,
      client_email,
      client_phone,
    } = metadata;

    // 6. VERIFICAR QUE NO EXISTA YA ESTE BOOKING (evitar duplicados)
    const existingBooking = await sanity.fetch(
      `
      *[_type == "booking" && paymentId == $paymentId][0]
    `,
      { paymentId: String(paymentId) }
    );

    if (existingBooking) {
      return { success: true, message: "Booking already exists" };
    }

    // 7. BUSCAR O CREAR CLIENTE
    let client = await sanity.fetch(
      `
      *[_type == "client" && email == $email][0] {
        _id
      }
    `,
      { email: client_email }
    );

    if (!client) {
      client = await sanity.create({
        _type: "client",
        name: client_name,
        email: client_email,
        phone: client_phone,
        createdAt: new Date().toISOString(),
      });
    }

    // 8. CREAR BOOKING
    const booking = await sanity.create({
      _type: "booking",
      service: {
        _type: "reference",
        _ref: service_id,
      },
      client: {
        _type: "reference",
        _ref: client._id,
      },
      date: date,
      time: time,
      duration: Number(duration),
      price: payment.transaction_amount,
      status: "confirmed",
      paymentId: String(paymentId),
      paymentStatus: payment.status,
      createdAt: new Date().toISOString(),
    });

    // 9. (OPCIONAL) ENVIAR EMAIL DE CONFIRMACIÓN
    // TODO: Implementar con Resend

    return {
      success: true,
      message: "Booking created",
      bookingId: booking._id,
    };
  } catch (error) {
    console.error("=== ERROR EN WEBHOOK ===");
    console.error(error);

    // Siempre retornar 200 para que MercadoPago no reintente
    return {
      success: false,
      message: error.message,
    };
  }
});
