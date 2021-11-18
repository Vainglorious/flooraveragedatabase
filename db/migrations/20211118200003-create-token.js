'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token_id: {
        type: Sequelize.INTEGER
      },
      ask_price: {
        type: Sequelize.INTEGER
      },
      ask_sale_date: {
        type: Sequelize.DATE
      },
      last_sale: {
        type: Sequelize.INTEGER
      },
      last_sale_date: {
        type: Sequelize.DATE
      },
      opensea_link: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tokens');
  }
};