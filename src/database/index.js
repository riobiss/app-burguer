import Sequelize from "sequelize"
import ConfigDataBase from "../config/database.js"
import User from "../app/models/User.js"
import Product from "../app/models/Product.js"

const models = [User, Product]

class Database {
  constructor() {
    this.init()
  }
  init() {
    this.connection = new Sequelize(ConfigDataBase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
