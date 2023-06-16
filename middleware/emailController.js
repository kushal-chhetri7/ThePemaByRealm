import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()
import { createCanvas, loadImage } from 'canvas';



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendVerifiedMessage(foundUser) {
  const canvas = createCanvas(600, 650); // Adjust canvas size to fit the receipt and additional text
  const ctx = canvas.getContext('2d');

  // Set background color to #121212
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text color to #D6D5DF
  ctx.fillStyle = '#D6D5DF';

  // Set font styles
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';

  // Draw the logo

  const logoPath = 'public/images/logo_white.png'; // Replace 'path/to/logo.png' with the actual path to your logo image
  const logoSize = 80; // Specify the desired size of the logo image
  const logoMarginTop = 40; // Specify the desired margin from the top for the logo
  const logo = await loadImage(logoPath);
  ctx.drawImage(logo, canvas.width / 2 - logoSize / 2, logoMarginTop, logoSize, logoSize);


  // Draw the receipt header

  ctx.font = '16px Arial';
  ctx.fillText('Receipt from The Pema By Realm', canvas.width / 2, 210);

  // Draw a horizontal line
  ctx.strokeStyle = '#C59D5F';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 230);
  ctx.lineTo(canvas.width - 50, 230);
  ctx.stroke();

  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = "#D6D5DF";
  // Define the starting position for the details
  let yPos = 260;

  // Draw the booking details on the canvas
  ctx.font = '14px Arial'; // Update font style to bold
  ctx.fillText(`RECIPIENT: ${foundUser.name}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`ADULT: ${foundUser.adult}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`CHILDREN: ${foundUser.child}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`CHECK-IN DATE: ${foundUser.check_in.toDateString()}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`CHECK-OUT DATE: ${foundUser.check_out.toDateString()}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`ROOM NUMBER: ${foundUser.roomNumbers}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`CATEGORY: ${foundUser.category}`, 50, yPos);
  yPos += 30;
  ctx.fillText(`SPECIAL REQUIREMENTS: ${foundUser.specialRequirement}`, 50, yPos);
  yPos += 30;
  if (foundUser.response) {
    ctx.fillText(`AMOUNT PAID: Nu ${foundUser.response}`, 50, yPos);
  } else {
    ctx.fillText(`AMOUNT PAID: $ ${foundUser.Dollar}`, 50, yPos);
  }

  // Draw a horizontal line at the bottom
  yPos += 30;
  ctx.strokeStyle = '#C59D5F';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, yPos);
  ctx.lineTo(canvas.width - 50, yPos);
  ctx.stroke();

  // Set font styles for additional text
  ctx.font = '16px Arial';
  ctx.fillStyle = '#D6D5DF';
  ctx.textAlign = 'center';

  ctx.fillText('If you have any questions, contact us at', canvas.width / 2, yPos + 40);

  // Highlight the email address with a specific color
  ctx.fillStyle = '#C59D5F';
  const email = 'pemabyrealm@gmail.com';
  const emailX = canvas.width / 2;
  const emailY = yPos + 60;
  ctx.fillText(email, emailX, emailY);







  // Attach the image to the email
  const imageBuffer = canvas.toBuffer('image/png');
  const mailOptions = {
    from: 'Pema Hotel <noreply@yourapp.com>',
    to: foundUser.email,
    subject: 'Message on your payment',
    html: `
      <h2>Hello ${foundUser.name},</h2>
      <h2>Update On your Booking Details</h2>
      <h2>The Transaction ID we recieved (${foundUser.transactionID}) is verified and your room is booked. Here are your booking details:</h2>
      <img src="cid:booking-details">
    `,
    attachments: [{
      filename: 'booking-details.png',
      content: imageBuffer,
      cid: 'booking-details'
    }]
  };

  // Send the email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${foundUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
}


export function sendNotVerifiedMessage(foundUser) {

  const emailBody = `
    <p>Hello ${foundUser.name},</p>
    <h3>Update on your details</h3>
    <h4>The Transaction ID you have sent (${foundUser.transactionID}) is not verified. Please check your transaction id and try again.</h4>


  `;
  const mailOptions = {
    from: 'Pema Hotel  <noreply@yourapp.com>',
    to: foundUser.email,
    subject: 'Message on your payment',
    html: emailBody
  };
  try {
    transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${foundUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};





export default { sendNotVerifiedMessage, sendVerifiedMessage };