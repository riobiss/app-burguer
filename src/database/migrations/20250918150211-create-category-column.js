"use strict"

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "category_id", {
      //adiciona a coluna category_id na tabela products
      type: Sequelize.INTEGER,
      references: { model: "categories", key: "id" },
      //relacionamento da tabela categories vai ser feito pelo id
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("products", "category_id")
    //remove da tabela products a coluna id
  },
}
