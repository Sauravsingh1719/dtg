import nodemailer from 'nodemailer';

// Configure Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

// Handling POST requests for sending emails
export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request data
    const { firstName, lastName, workMail, phoneNumber, companyName, jobTitle, industry, country, howDidYouHear, message } = await req.json();

    // Email content for admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin email from env variables
      subject: 'New Meeting Request',
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${workMail}
        Phone: ${phoneNumber}
        Company Name: ${companyName}
        Company Title: ${jobTitle}
        Industry: ${industry}
        Country: ${country}
        Heard About Us: ${howDidYouHear}
        Message: ${message}
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Email content for the user
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: workMail, // User's email
      subject: 'We received your meeting request!',
      text: `Thank you, ${firstName}, for reaching out to us! We'll get back to you shortly.`,
    };

    // Send confirmation email to the user
    await transporter.sendMail(userMailOptions);

    // Return success response
    return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
