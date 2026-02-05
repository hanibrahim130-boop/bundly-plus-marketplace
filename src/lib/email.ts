import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendOrderConfirmationEmail(email: string, orderDetails: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set. Skipping email.");
    return;
  }

  try {
    if (!resend) return;
    await resend.emails.send({
      from: 'BundlyPlus <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmed: ${orderDetails.product.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
          <h1 style="color: #FF4F01; text-transform: uppercase; letter-spacing: -1px;">Order Confirmed</h1>
          <p>Hi there,</p>
          <p>Thank you for choosing BundlyPlus. Your order for <strong>${orderDetails.product.name}</strong> has been received.</p>
          <div style="background-color: #F8F8F8; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase;">Order ID</p>
            <p style="margin: 5px 0 15px 0; font-weight: bold; font-size: 18px;">${orderDetails.id}</p>
            
            <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase;">Amount</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 18px;">$${orderDetails.amount} USD</p>
          </div>
          <p>Your subscription details will be sent to you shortly after payment verification.</p>
          <p>If you have any questions, feel free to contact us on WhatsApp.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">BundlyPlus Marketplace - Premium Subscriptions for Lebanon</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
