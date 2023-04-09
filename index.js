const express = require("express");
const multer = require('multer');
 
const tesseract = require("node-tesseract-ocr");
 const port = 9001;
 
const path = require('path')
 
const app = express()
 
app.use(express.static(path.join(__dirname + '/uploads')))
 
app.set('view engine', "ejs")
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
 
const upload = multer({storage:storage})
 
app.get('/', (req, res) => {
    res.render('home',{data:''})
})
 
app.post('/extractCaptcha',
 upload.single('file'),
 (req, res) => {
    console.log(req.file.path)
  
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };
 
    tesseract
      .recognize(req.file.path, config)
      .then((text) => {
          console.log("Result:", text);
          
          res.render('home',{data:text})
      })
      .catch((error) => {
        console.log(error.message);
      });
})
 
 

//  app.post("/extractCaptcha", upload.single('file'),(req,res)=>{

//  })
 app.listen(port, ()=>{
    console.log(`yuppp server is running on port : ${port}`);
 })


// const tesseract = require("node-tesseract-ocr")

// const config = {
//   lang: "eng",
//   oem: 1,
//   psm: 3,
// }

// tesseract
//   .recognize("https://i.ibb.co/jTKYQqP/Captcha-United.png", config)
//   .then((text) => {
//     console.log("Result:", text)
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })