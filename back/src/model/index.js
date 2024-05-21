// const data = require('../../data.json')
const {connectToMongoDB, disconnectToMongoDB} = require('../config/index')

class ProductosModel{
  static async getAll(){
    try {
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error('Error al conectar con Mongo')
      }  
      const result = await clientMongo.db('tienda').collection('productos').find().toArray()
      await disconnectToMongoDB()
      if (!result) return {data:null, error:true}
      return {data:result, error:false}

    } catch (error) {
      return {data:null, error}
    }
  }

  static async getByID(id){
    try {
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error('Error al conectar con Mongo')
      }
      const result = await clientMongo.db('tienda').collection('productos').findOne({id: Number(id)})
      await disconnectToMongoDB()
      if (!result) return {data:null, error:true}
      return {data:result, error:false}

    } catch (error) {
      return {data:null, error: true}
    }
  }

  static async createOne(body){
    try {
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error('Error al conectar con Mongo')
      }
      const insert = await clientMongo.db('tienda').collection('productos').insertOne(body)
      console.log(insert);
      if(insert.acknowledged) return {data:{...body, _id: insert.insertedId}, error: false}
      await disconnectToMongoDB()
      return {data:null, error: true}
    } catch (error) {
      return {data:null, error: true}
    }
  }
}

module.exports = ProductosModel