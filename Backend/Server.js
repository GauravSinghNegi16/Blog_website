import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import ConnectDb from './Config/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express()

await ConnectDb();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello! backend");
})

app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

app.listen(PORT,()=>{
    console.log(`Server is running🚀 on ${PORT}`)
})