import { resend } from '@/lib/resend';
import VerificationEmailProps from '../../email/VerificationEmail'
import { ApiResponse } from '@/types/Apiresponse';

export async function sendVerificationEmail(
    username: string,
    email: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmailProps({ username, otp: verifyCode }),
        })
        return { success: true, message: "Verification Email send successfully" }
    } catch (EmailError) {
        console.log("Error : sending verification email", EmailError);
        return { success: false, message: "Failed to send verification code" }
    }
}