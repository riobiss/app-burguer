import Sequelize, { Model } from "sequelize"

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL(10, 2),
        category: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, // campo virtual, não existe na tabela
          get() {
            return `http://localhost:3000/product-file/${this.path}`
          },
        },
      },
      { sequelize },
    )
  }
}
export default Product
