import mongoose, { connect } from "mongoose";

const ConnectDb = async () => {
    try {
        mongoose.connection.on('connected', () => console.log
            ('DataBase Connected')
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDb;