import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: `Inbound Skill-Run Message <no-reply@lukassoukup.dev>`,
      to: ["contact@lukassoukup.dev"],
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #5E81AC; color: #fff; padding: 10px; text-align: center;">
            <h1>New Message from Skill-Run Contact Form</h1>
          </div>
          <div style="padding: 20px;">
            <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #88C0D0;">${email}</a>)</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #5E81AC; margin: 10px 0; white-space: pre-wrap;">
              <p>${message}</p>
            </div>
          </div>
          <div style="background-color: #f1f1f1; color: #666; padding: 10px; text-align: center; font-size: 0.9em;">
            <p>This message was sent via the Skill-Run contact form.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}