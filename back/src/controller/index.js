const ProductosModel = require('../model/index')
const Product = require('../model/schemaProduct')


class Productos{
  static async getAll(req, res){
    const {data, error} = await ProductosModel.getAll()
    error ? res.status(400).json({error: 'No hay productos'})
          : res.status(200).json(data)
  }
  static async getByID(req, res){
    const {id} = req.params
    if(!id || !Number(id)) return res.status(400).json({ error: 'No se proporciono un ID valido'})
    const {data, error} = await ProductosModel.getByID(id)
    error ? res.status(400).json({error: 'No existe el producto producto'})
          : res.status(200).json(data)
  }
  static async createOne(req, res){
    const body = req.body
    console.log(req.body);
    console.log(req.file.filename);
    const dataToVerify = {
      ...body,
      id: Number(body.id),
      price: Number(body.price),
      rating: {
        rate: Number(body.rate),
        count: Number(body.count)
      }
    }
    try {
      const producto = Product.parse(dataToVerify)
      const {data, error} = await ProductosModel.createOne({...producto, image:req.file.filename })
      if (data) return res.status(202).json(data)
    } catch (error) {
      res.status(400).json({error: 'Los datos enviados son incorrectos'})
    }
  }
}

module.exports = Productos