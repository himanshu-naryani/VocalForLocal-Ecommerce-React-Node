const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./Routes/routes')

mongoose.set('useFindAndModify', false);

const app = express();

app.use(cors())
app.use(bodyParser.json())
// app.use(express.json())
app.use('/', router)                    //Base Route
// app.get('/' ,  (req, res) => {
//     return res.send("Hello I ma fine")
// })
const URI = "mongodb+srv://coderangers:coderangers@cluster0.xchrd.mongodb.net/vocalforlocaldb?retryWrites=true&w=majority"
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to Vocalforlocal DB")                                                //Connection to DB
})



app.listen(process.env.PORT || 9000, () => {
    console.log("Server is running on the port: " + (process.env.PORT || 9000))              //Setting up server
})


//////In master Branch