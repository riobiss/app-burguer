import { v4 } from "uuid"
import User from "../models/User.js"
import Yup from "yup"
/* 
store => cadastrar/adicionar
index => listar
show => mostrar um unico
update => atualizar
delete => deletar
*/

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      admin: Yup.boolean(),
    })
    /*     if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" })
    } */

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = req.body

    const userExists = await User.findOne({ where: { email } }) //vai no banco com o findOne e procura um email igual ao que ta chegando no corpo da requisição

    //null, false, underfined => não tem valor
    if (userExists) {
      return res.status(400).json({ error: "User already exists" })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })
    return res.status(201).json({ id: user.id, name, email, admin }) //retorna pra o front apenas os dados que queremos
  }
}

export default new UserController()
