import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";



export async function POST(request: Request) {
    await dbConnect()

    try {
        const data = await request.json()
        // console.log("data", data)
        const { username, code } = data;

        const decodedUsername = decodeURIComponent(username)// it is used to decode the message like space will be represented as %d  

        const user = await UserModel.findOne({ username: decodedUsername })


        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 500 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        console.log("is code not expired ", new Date(user.verifyCodeExpiry), ">", new Date())

        if (isCodeValid && isCodeNotExpired) {
            // Update the user's verification status
            user.isVerified = true;
            user.save();

            return Response.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );
        } else if (!isCodeNotExpired) {
            // code is expired
            return Response.json(
                {
                    success: false,
                    message:
                        'Verification code has expired. Please sign up again to get a new code.',
                },
                { status: 400 }
            );
        } else {
            //code is incorrect
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }


    } catch (error) {
        console.log("Error verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            }, {
            status: 500
        }
        )
    }
}



{
    username :"srujan",
    type:'image',
    format: ".jpg",
    link:"/public/image.jpg"
}