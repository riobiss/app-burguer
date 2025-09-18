import * as Yup from "yup"
import Category from "../models/Category.js"
import { Op } from "sequelize"

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }
    const { name } = req.body

    const existingCategory = await Category.findOne({
      where: {
        name: { [Op.iLike]: name }, //case insensitive
      },
    })
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" })
    }
    const { id } = await Category.create({
      name,
    })

    return res.json({ name, id })
  }

  async index(req, res) {
    const categories = await Category.findAll()

    return res.json(categories)
  }
}

export default new CategoryController()
