'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('ArticleCategories', [{
      category_id: 1,
      article_id: 1
    },
    {
      category_id: 2,
      article_id: 1
    },{
      category_id: 1,
      article_id: 2
    },
    {
      category_id: 3,
      article_id: 1
    }], {});
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
