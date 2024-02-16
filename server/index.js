const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes= REQUIRE("/routes/userRoutes");
const app = express();
const dotenv = require('dotenv');
dotenv.config();app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)


mongoose.connect(process.env.MONGO_URL,{
userNewUrlParser: true,
userUnifiedTopology: true,
}).then(()=>console.log('Database Connected')).catch((err)=>console.log(err));


const server=app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
}) 