import mongoose from "mongoose";


const connectdb =  async() => {
    try{
        const connInstance = await mongoose
        .connect(process.env.MONGO_URI,{
            dbName: "HMS_BACKEND"
        });
        console.log(`MONGODB CONNECTED!! DB HOST: ${connInstance.connection.host}`);

    }catch(error){
        console.log("MONGODB CONNECTION FAILED", error);
        process.exit(1)
    }



}

export default connectdb;