import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);
