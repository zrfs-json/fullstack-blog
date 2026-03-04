'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize)
    {
      await queryInterface.bulkInsert('Users', [{
        username: 'Nara Saif',
        email: 'narasaif@mail.com',
        password: 'password123',
        role: 'mahasigma',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Zhar Sond',
        email: 'zharsond@mail.com',
        password: 'makanmakanan',
        role: 'Web Dev',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
