const mongoose = require('mongoose')
const data = require('./data.json')

mongoose.connect('mongodb://localhost:27017/store').then(res =>{
    console.log("connect")
});

const Product = mongoose.model('Product', {
    type: String,
    title: String,
    description: String,
    shipping: Object,
    pricing: Object,
    details: Object
})

async function insertDB(){
    let result = data.slice[1]
    await Product.create(data[0]).then((res)=>{
        console.log("insert one")})
    await Product.insertMany(result).then((res)=>{
        console.log("insert many")})
}

function readCommand(cmd) {
    switch (cmd) {
        case '1':
            Product.find({}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '2':
            Product.find(function (err, data) {
                if (err) console.log(err)
                console.table(data)
            })
            break
        case '3':
            Product.find({}, {_id: false}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '4':
            Product.find({type: "Audio Album"}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '5':
            Product.find({"pricing.retail": {$lt: 5000}}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '6':
            Product.find({type: {$ne: "Film"}}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '7':
            Product.find({"shipping.weight": {$gt: 15}}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '8':
            Product.updateOne({"details.title": "The Matrix"}, {"pricing.list": 2500}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '9':
            Product.find({
                $and: [
                    {type: "Film"},
                    {"shipping.dimensions.depth": 1}
                ]
            }, function (err, products) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '10':
            Product.count({type: "Film"}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '11':
            Product.find({"details.writer": {$regex: "Jonathan Nolan"}}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '12': // show, max pricing.savings
            Product.find({}).sort("-pricing.savings").exec(function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '13': // show, details.title includes x
            Product.find({"details.title": {$regex: "x"}}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        case '14':
            Product.deleteOne({"details.aspect_ratio": "1.66:1"}, function (err, data) {
                if (err) console.log(err)
                console.log(data)
            })
            break
        default:
            console.log('not exist')
    }
}
 insertDB().then((err,data)=>{
     if(err){
         console.log(err)
     }
     else{
     }
 })
