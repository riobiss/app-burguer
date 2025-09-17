import * as Yup from "yup"
import Product from "../models/Product.js"

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().positive().required(), // preço tem que ser positivo
      category: Yup.string().required(),
    })

    try {
      await schema.validateSync(req.body, { abortEarly: false }) // abortEarly: false para validar todos os campos e retornar todos os erros de uma vez
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }
    const { filename: path } = req.file // apelido do filename vira path
    const { name, price, category } = req.body
    const product = await Product.create({
      name,
      price,
      category,
      path,
    })

    return res.json(product)
  }
  async index(req, res) {
    const products = await Product.findAll() // traz todos os produtos

    return res.json(products) // retorna em formato json
  }
}

export default new ProductController()
