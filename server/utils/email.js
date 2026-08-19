const { Resend } = require('resend');

require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's testing sender.
// For production, we'll replace this with your verified domain later.
const FROM_EMAIL = 'onboarding@resend.dev';

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [userEmail],
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    background-color: #fff7fb;
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

        if (error) {
            console.error('Error sending booking email:', error);
            return;
        }

        console.log(
            'Booking email sent successfully:',
            data?.id
        );
    } catch (error) {
        console.error('Error sending booking email:', error);
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

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [userEmail],
            subject: title,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 30px;
                    background-color: #fff7fb;
                ">
                    <div style="
                        max-width: 500px;
                        margin: 0 auto;
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

        if (error) {
            console.error('Error sending OTP email:', error);
            return;
        }

        console.log(
            `OTP sent to ${userEmail} for ${type}:`,
            data?.id
        );
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = {
    sendBookingEmail,
    sendOTPEmail
};