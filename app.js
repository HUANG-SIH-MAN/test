const express = require('express')
const exphbs = require('express-handlebars')
const moongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')

const app = express()
const port = 3000

moongoose.connect('mongodb://localhost/picture')
const db = moongoose.connection
db.on('error', ()=>{
    console.log('mongodb error!')
})
db.once('open', ()=>{
    console.log('mongodb connented!')
})
const picture = require('./models/picture')
const { Console } = require('console')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', upload.single('picture'), (req, res)=>{
    console.log(req)
    console.log(req.file)
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64'); //將圖片做base64編碼
    picture.create({encode_image})
    .then(console.log("1 image inserted"))

})

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})