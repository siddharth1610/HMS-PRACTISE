import { config } from "dotenv";
import connectdb from "./db/dbcon.js";
import { app } from "./app.js";




config({
    path: "./config.env"
})

connectdb()
.then(() =>{
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running at port : http://localhost:${4000}`);
    })
} )
.catch((err) =>{
    console.log("MONGO db is connection failed !!!", err);
} )