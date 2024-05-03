require("dotenv").config();
const express=require("express");
const cookieParser= require('cookie-parser');

const MongoStore= require('connect-mongo');

const expressLayout=require("express-ejs-layouts");
const routes=require("./server/routes/main");
const admin=require("./server/routes/admin");
const connectDB=require('./server/config/db');
const session = require("express-session");
const app=express();
const PORT=3000;

//connect db
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret:'keybord cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    }),
}));

app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout','layouts/main');
app.set('view engine', 'ejs');

//routes
app.use('/',routes);

app.use('/', admin);

//server listen
app.listen(PORT,()=>{
    console.log(`litening server ${PORT}...`);
});