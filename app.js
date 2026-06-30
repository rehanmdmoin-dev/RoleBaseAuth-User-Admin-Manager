require('dotenv').config();
const express = require('express');
const connectDB = require('./app/config/db');
const Session=require('express-session');
const cookieParser=require('cookie-parser');
const flash = require('connect-flash');

const app = express();
connectDB();

app.use(express.static('public'))


app.use(Session({
    secret:process.env.SESSION_SECRECT || "secrect",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24 //1 day
    }
}));

app.use(cookieParser());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));







const userRoute=require('./app/routes/api/userRoute')
app.use('/api', userRoute)

const authRoute=require('./app/routes/api/authRoute')

app.use('/api', authRoute)

const AuthEjsRoute=require('./app/routes/api/authEjsRoute')
app.use(AuthEjsRoute)






const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if (error) {
        console.log('Error starting server:', error);
    } else {
        console.log("Server is running on port", `http://localhost:${PORT}`);
    }
})