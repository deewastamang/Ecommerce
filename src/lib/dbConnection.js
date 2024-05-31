import mongoose from 'mongoose'

export const connection = {}

export const connectToDb = async () => {
    try {
        if(connection.isConnected) {
            console.log("Using existing connection...")
            return 
        }

    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = dbConnection.connections[0].readyState;
    if(connection.isConnected) {
        console.log("Connected to database...")
        return dbConnection;
    }else {
        throw new Error("Connection to database failed ")
    }
    } catch (error) {
        console.log("Connection to database failed ", error)
    }
}