const dotenv = require('dotenv')
dotenv.config()

const {MongoClient} = require('mongodb')

const client = new MongoClient(process.env.MONGO_URL)

async function connectToMongoDB(){
  try {
    await client.connect()
    console.log("Conectado a MONGODB");
    return client 
  } catch (error) {
    console.log('Eror al conectar con MONGO DB');
    return null
  }
}

async function disconnectToMongoDB(){
  try {
    await client.close()
    console.log("Desconectado de MONGODB");
  } catch (error) {
    console.log("Error al desconectar de MONGODB ", error);
  }
}

module.exports = {connectToMongoDB, disconnectToMongoDB}