const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM;

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        await sgMail.send({
            to: userEmail,
            from: FROM_EMAIL,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    background: #fff7fb;
                ">
                    <div style="
                        max-width: 550px;
                        margin: auto;
                        background: white;
                        padding: 30px;
                        border-radius: 20px;
                    ">
                        <h2 style="color: #b85c82;">
                            Hi ${userName}! ♡
                        </h2>

                        <p style="color: #555; font-size: 16px;">
                            Your booking for
                            <strong>${eventTitle}</strong>
                            is successfully confirmed.
                        </p>

                        <p style="color: #555;">
                            Thank you for choosing Petal & Yarn! 🌸
                        </p>
                    </div>
                </div>
            `
        });

        console.log('Booking email sent successfully to', userEmail);
    } catch (error) {
        console.error(
            'Error sending booking email:',
            error.response?.body || error.message
        );
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title =
            type === 'account_verification'
                ? 'Verify your Petal & Yarn Account ♡'
                : 'Petal & Yarn Booking Verification';

        const msg =
            type === 'account_verification'
                ? 'Please use the following OTP to verify your new Petal & Yarn account.'
                : 'Please use the following OTP to verify and confirm your booking.';

        await sgMail.send({
            to: userEmail,
            from: FROM_EMAIL,
            subject: title,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 30px;
                    background: #fff7fb;
                ">
                    <div style="
                        max-width: 500px;
                        margin: auto;
                        background: white;
                        padding: 30px;
                        border-radius: 20px;
                    ">
                        <h2 style="color: #b85c82;">
                            ${title}
                        </h2>

                        <p style="
                            color: #666;
                            font-size: 16px;
                        ">
                            ${msg}
                        </p>

                        <div style="
                            margin: 25px auto;
                            padding: 18px 28px;
                            font-size: 30px;
                            font-weight: bold;
                            color: #a94f76;
                            background: #fce8f1;
                            width: max-content;
                            border-radius: 12px;
                            letter-spacing: 7px;
                        ">
                            ${otp}
                        </div>

                        <p style="
                            color: #999;
                            font-size: 12px;
                        ">
                            This code expires in 5 minutes.
                            If you didn't request this, please ignore this email.
                        </p>

                        <p style="
                            color: #d27a9c;
                            margin-top: 25px;
                        ">
                            Made with love, yarn & tiny stitches ♡
                        </p>
                    </div>
                </div>
            `
        });

        console.log(`OTP sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error(
            'Error sending OTP email:',
            error.response?.body || error.message
        );
    }
};

module.exports = {
    sendBookingEmail,
    sendOTPEmail
};