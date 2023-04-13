const express = require(`express`);
const app = express();
const PORT =  8080;
const dotenv = require(`dotenv`)
const mongoose = require('mongoose')

dotenv.config({path : `.env`})

/*MONGODB CONNECTION START*/
const MONGO_URL = process.env.MONGO_URL ;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error', (err) => {
    console.log("Error Connecting to Database", err)
})
/*MONGODB CONNECTION END*/

app.use(express.json());



app.get('/', (req, res) => {
    res.send(`Welcome to Scizers Assignment !!!    Made by Trisha Sahu`);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})