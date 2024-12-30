import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const { error } = await resend.emails.send({
      from: 'Your E-commerce <onboarding@resend.dev>',
      to: ['huzaifa3108hassan@gmail.com'], // Replace with your email
      subject: 'Submission from E-commerce 1',
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
