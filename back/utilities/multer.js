const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req,file, cb){
    cb(null, path.join(__dirname, '../static'))
  },

  filename: function(req, file, cb){
    const ext = file.originalname.split(".").pop()
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})

const uploader = multer({ storage: storage })

module.exports = uploader