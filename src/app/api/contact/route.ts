import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactPayloadSchema } from "@/lib/validations/contact";
import { isRateLimited } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL!;

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot: field ini invisible buat user asli. Kalau keisi = bot.
    // Balikin fake success biar bot gak "belajar" requestnya diblokir.
    if (website) {
      return NextResponse.json({ success: true });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // ganti setelah domain di-verify
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}