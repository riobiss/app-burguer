"use strict"

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER, // tipo inteiro
        allowNull: false, // não pode ser nulo
        autoIncrement: true, // auto incrementa a cada novo registro
        primaryKey: true, // chave primaria, não pode repetir
      },
      name: {
        type: Sequelize.STRING, // tipo string
        allowNull: false, // não pode ser nulo
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), // tipo decimal com 10 digitos e 2 casas decimais
        allowNull: false, // não pode ser nulo
      },
      category: {
        type: Sequelize.STRING, // tipo string
        allowNull: false, // não pode ser nuloF
      },
      path: {
        type: Sequelize.STRING, // tipo string
        allowNull: false, // não pode ser nulo
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("products")
  },
}
