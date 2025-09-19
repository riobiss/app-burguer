import * as Yup from "yup"
import Category from "../models/Category.js"
import { Op } from "sequelize"
import User from "../models/User.js"

class CategoryController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      })

      try {
        await schema.validateSync(req.body, { abortEarly: false })
      } catch (err) {
        return res.status(400).json({ error: err.errors })
      }

      const { admin: isAdmin } = await User.findByPk(req.userId)

      if (!isAdmin) {
        return res.status(401).json()
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
    } catch (err) {
      console.log(err)
    }
  }
  async index(req, res) {
    const categories = await Category.findAll()

    return res.json(categories)
  }
}

export default new CategoryController()
