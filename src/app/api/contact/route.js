import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, orderNumber, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "lvlupsupport@gmail.com";

    if (!apiKey) {
      return NextResponse.json(
        { error: "BREVO_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Level Up Support Form",
          email: recipientEmail,
        },
        to: [
          {
            email: recipientEmail,
            name: "Level Up Support Team",
          },
        ],
        replyTo: {
          name,
          email,
        },
        subject: `New Support Inquiry${orderNumber ? ` [Order #${orderNumber}]` : ""} - ${name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; rounded: 8px;">
            <h2 style="color: #111; margin-top: 0;">New Support Inquiry</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Customer Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Order Number:</strong> ${orderNumber || "N/A"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
            <h3 style="color: #444;">Message:</h3>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">${message}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Failed to send email via Brevo." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
