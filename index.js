const express = require('express')
const multer=require('multer')
const fs = require('fs');

// Configure multer for file uploads

const app = express()
const port = 3000


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname)
    }
  })


const upload = multer({storage});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    if (!file) {
         res.status(400).json({ error: 'No file uploaded' });
    }

    
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
        fs.unlinkSync(file.path); 
         res.status(400).json({ error: 'File size exceeds limit' });
    }

    res.json({message:"file uploaded"})

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
