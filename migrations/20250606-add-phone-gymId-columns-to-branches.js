'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Branches', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Branches', 'gymId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Gyms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Branches', 'phone');
    await queryInterface.removeColumn('Branches', 'gymId');
  }
};
