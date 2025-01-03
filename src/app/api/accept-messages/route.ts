import { getServerSession } from "next-auth";
import { User } from "@/model/User";
import UserModel from "@/model/User";
import { dbConnect } from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user;

    if (!session || !session.user) {



        return Response.json({
            success: false,
            message: 'Not authenticated'
        }, {
            status: 401
        });

    }

    const userID = user._id;
    const { acceptingMessage } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            { isAcceptingMessages: acceptingMessage },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "unable to find user to update message accepting status",
                }, {
                status: 404
            }
            )
        }

        return Response.json(
            {
                success: true,
                message: 'Message acceptance status updated successfully',
                updatedUser,
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("Error updating message acceptance status:", error);
        return Response.json(
            { success: false, message: 'Error updating message accepting status' },
            { status: 500 }
        )
    }
}


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions);

    const user = session?.user;

    if (!session && user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const foundUser = await UserModel.findById(user._id);

        if (!foundUser) {
            // User not found
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Return the user's message acceptance status
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log('Error retrieving message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error retrieving message accepting status' },
            { status: 500 }
        );
    }
}