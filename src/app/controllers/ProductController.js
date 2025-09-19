import * as Yup from "yup"
import Product from "../models/Product.js"
import Category from "../models/Category.js"
import User from "../models/User.js"

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().positive().required(), // preço tem que ser positivo
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    })
    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }

    try {
      await schema.validateSync(req.body, { abortEarly: false }) // abortEarly: false para validar todos os campos e retornar todos os erros de uma vez
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }
    const { filename: path } = req.file // apelido do filename vira path
    const { name, price, category_id, offer } = req.body
    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    })

    return res.json(product)
  }
  async index(req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    }) // traz todos os produtos

    return res.json(products) // retorna em formato json
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number().positive(), // preço tem que ser positivo
      category_id: Yup.number(),
      offer: Yup.boolean(),
    })
    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }
    const id = req.params.id

    const product = await Product.findByPk(id) //procura pelo id

    if (!product) {
      return res.status(401).json({ Message: "produto errado" })
    }
    let path
    if (req.file) {
      path = req.file.filename
    }

    const { name, price, category_id, offer } = req.body
    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      { where: { id } },
    )

    return res.json()
  }
  catch(err) {
    console.log(err)
  }
}

export default new ProductController()
