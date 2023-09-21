const express = require('express')
const mongos = require('mongoose')
const bodyparse = require('body-parser')
const cors = require('cors');


let app = express();
app.use(bodyparse.json())
app.use(cors())

mongos.connect('mongodb+srv://kumar:1321@cluster0.ieyot4h.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'users' })
    .then(() => {
        console.log("Connect To Mongodb")
    })
    .catch(err => (
        console.log(err)
    ));



let userSchema = new mongos.Schema({
    fname: String,
    email: String,
    mobile: Number,
    address: String,
    address2: String,
    country: String,
    state: String,
    pincode: Number,
})

let userModel = mongos.model('userlists', userSchema)


app.get('/view', (req, res) => {
    userModel.find({})
        .then(rest => {
            res.send(rest)
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/getid/:id', (req, res) => {
    userModel.findById({ _id: req.params.id })
        .then(resp => res.send(resp))
        .catch(err => res.json(err))
})


app.delete('/duser/:id', (req, res) => {
    userModel.findByIdAndDelete({ _id: req.params.id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.post('/creatuser', (req, res) => {
    let clist = new userModel({
        fname: req.body.fname,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
    });

    clist.save()
        .then(rest => {
            res.send(rest)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.put('/updateuser/:id', (req, res) => {

    userModel.findByIdAndUpdate({ _id: req.params.id }, {
        fname: req.body.fname,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        pincode: req.body.pincode,
    }).then(rest => {
        res.send(rest)
    })
        .catch((err) => {
            console.log(err)
        })
})





let PORT = 8000;

app.listen(PORT, () => {
    console.log(`Port Number : ${PORT}`)
})