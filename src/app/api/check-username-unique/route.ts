import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/sighUpSchema"
import { z } from 'zod'


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    if (request.method != 'GET') {
        return Response.json({
            success: false,
            message: "Method not allowed",
        }, {
            status: 405
        })
    }
    await dbConnect();

    try {
        const data = new URL(request.url)
        // console.log('data', data)
        const { searchParams } = new URL(request.url);
        // console.log('searchParams', searchParams)

        const queryParams = {
            username: searchParams.get('username'),
        }

        const result = UsernameQuerySchema.safeParse(queryParams);
        // console.log('result', result)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameError?.length > 0
                        ? usernameError.join(',')
                        : 'Invalid query parameters'
                }, {
                status: 400
            }
            )
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, {
                status: 200
            })
        }
        return Response.json({
            success: true,
            message: "Username is unique",
        }, {
            status: 200
        })


    } catch (error) {
        console.log('Error checking username:', error);
        return Response.json({
            success: false,
            message: 'Error checking username'
        },
            { status: 500 }
        );
    }
}