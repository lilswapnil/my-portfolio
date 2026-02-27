import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'icloud',
    auth: {
      user: 'belikeswapnil@icloud.com',
      pass: process.env.ICLOUD_APP_PASSWORD, // Set this in your .env.local
    },
  });

  try {
    await transporter.sendMail({
      from: 'belikeswapnil@icloud.com',
      to: 'belikeswapnil@icloud.com',
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>

${message}`,
      replyTo: email,
    });
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send message.' });
  }
}
