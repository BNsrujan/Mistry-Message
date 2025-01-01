import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {

}

export async function dbConnect(): Promise<void> {
    // we are testing if we currency have a data base connection if we have we will not reconnect although DB can connect with 
    //multipals connection string but it can create a database chocking the performance will be degraded 
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }


    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        // console.log(db)
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected Successfully")
    }
    catch (error) {
        console.log("Database connection Successfully")
        process.exit(1)
    }
}