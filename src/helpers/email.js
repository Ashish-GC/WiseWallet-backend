import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});

async function sendEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for verification",
    text: `Your OTP for verification is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
}

async function sendNotificationEmail(userEmail, productName) {
  console.log(userEmail, productName);
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Product Notification",
    text: `The product ${productName} is now available`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to user", userEmail);
  } catch (error) {
    console.log("Error sending notification email: ", error);
  }
}

async function sendNotificationToSeller(
  sellerEmail,
  productName,
  buyerName,
  buyerEmail,
  buyerPhone,
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: sellerEmail,
    subject: `Interest in ${productName}`,
    text: `Hello,\n\nSomeone is interested in buying your product "${productName}". You can contact them using the following details:\n\nBuyer Name: ${buyerName}\nBuyer Email: ${buyerEmail}\nBuyer Phone: ${buyerPhone}\n\nPlease contact them to complete the transaction.\n\nBest regards,\nUniReuse Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to seller:", sellerEmail);
  } catch (error) {
    console.log("Error sending notification email to seller:", error);
  }
}

async function sendNotificationToBuyer(
  buyerEmail,
  sellerName,
  sellerEmail,
  sellerPhone,
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: buyerEmail,
    subject: `Contact Details for ${sellerName}`,
    text: `Hello,\n\nHere are the contact details of the seller for the product you're interested in:\n\nSeller Name: ${sellerName}\nSeller Email: ${sellerEmail}\nSeller Phone: ${sellerPhone}\n\nPlease contact the seller to complete the transaction.\n\nBest regards,\nUniReuse Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to buyer:", buyerEmail);
  } catch (error) {
    console.log("Error sending notification email to buyer:", error);
  }
}

export {
  sendEmail,
  sendNotificationEmail,
  sendNotificationToBuyer,
  sendNotificationToSeller,
};
