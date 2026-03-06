'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize)
    {
      await queryInterface.bulkInsert('Users', [{
        name: 'Nara Saif',
        email: 'narasaif@mail.com',
        password: 'password123',
        biography: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore commodi non quo animi! Pariatur hic consequatur aut placeat dicta! Perferendis libero tenetur natus nesciunt minima beatae! Aut, ducimus ut.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zhar Sond',
        email: 'zharsond@mail.com',
        password: 'makanmakanan',
        biography: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore commodi non quo animi! Pariatur hic consequatur aut placeat dicta! Perferendis libero tenetur natus nesciunt minima beatae! Aut, ducimus ut.',
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
