const express = require(`express`);
const app = express();
const PORT =  8080;
const dotenv = require(`dotenv`);
const mongoose = require('mongoose');
const auth = require("./middleware/userAuth.js");

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


/*ROUTE PATH STARTS*/
const userAuthRoute = require('./routes/userAuthRoute.js');
const contactRoute = require('./routes/contactRoute.js');
/*ROUTE PATH ENDS*/

app.use(express.json());
app.use(require("cors")());

app.use('/user', userAuthRoute);
app.use('/contact', contactRoute);


app.get("/protected",auth,(req,res)=>{
    return res.status(200).json({...req.user._doc});
})

app.get('/', (req, res) => {
    res.send(`Welcome to Scizers Assignment !!!    Made by Trisha Sahu`);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})