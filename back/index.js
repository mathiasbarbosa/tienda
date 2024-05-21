const express = require('express')
const server = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const routerProductos = require('./src/routes/index')

const PORT = process.env.PORT || 3000


server.use(express.json())
server.use(express.static(path.join(__dirname, 'static')))

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5501");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next()
})

server.get('/', (req, res) => {
  res.send('API TIENDA')
})

server.use('/api', routerProductos )

server.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
})