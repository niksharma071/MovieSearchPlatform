import express, { urlencoded } from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// Request logging middleware to help diagnose Postman requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl} - Host: ${req.headers.host}`);
  next();
})

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]

}))



app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);

app.get('/api/health', (req, res) => {
  console.log("hii")
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get("/",(req,res)=>{
    res.send("hii")
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorHandler);


export default app;