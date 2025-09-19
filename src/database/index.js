import Sequelize from "sequelize"
import mongoose from "mongoose"

import ConfigDataBase from "../config/database.js"

import User from "../app/models/User.js"
import Product from "../app/models/Product.js"
import Category from "../app/models/Category.js"

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }
  init() {
    this.connection = new Sequelize(ConfigDataBase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/codeburguer",
    )
  }
}

export default new Database()
