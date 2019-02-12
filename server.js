const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const files = fs.readdirSync(__dirname)
if(files.indexOf("tweet.json") === -1){
    fs.writeFileSync("tweet.json" , JSON.stringify([]))
}

//Skapat en server men den lyssnar inte nån stans
const app = express()
app.use(bodyParser.json())

//Nu lyssnar den
app.listen(3000, () => {
    console.log('Server is up and running')
})

app.get('/', (req, res) => {
    const tweet = JSON.parse(fs.readFileSync("tweet.json").toString())
    res.json(tweet)
})

app.post('/', (req, res) => {
    if( !req.body.hasOwnProperty("content") || req.body.content === "") {
        return res.status(400).send("Sorry")
    }
    if( !req.body.hasOwnProperty("author") || req.body.author === "") {
        return res.status(400).send("Sorry")
    }
   

    
    const tweet = JSON.parse(fs.readFileSync("tweet.json").toString())
    tweet.push({
        content: req.body.content, 
        author: req.body.author
       })
       fs.writeFileSync("tweet.json", JSON.stringify(tweet))

    res.json({success: true})
})

