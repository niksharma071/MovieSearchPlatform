import 'dotenv/config';
import app from "./src/app.js"
import connectDB from "./src/db/index.js";

import dns from 'dns';

dns.setServers(['1.1.1.1', '1.0.0.1', '2606:4700:4700::1111']);
const port = process.env.PORT || 3080
connectDB().then(()=>{
    app.listen(port,()=>{
    console.log(`listening to port ${port}`);
    })
})
.catch((err)=>{
    console.error("db connection failed", err)
    process.exit(1)
})