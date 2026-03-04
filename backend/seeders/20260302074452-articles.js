'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articles', [{
      title: "Lelaki Menangis",
      subtitle: "Menangis Soal harga diri",
      image: "https://picsum.photos/300/200?random=1",
      content: `
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates at totam dolores fuga, culpa laudantium velit debitis illo eaque, soluta sit illum cum eveniet necessitatibus laborum qui eum ut sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Quos impedit nemo reiciendis, veniam facere sunt, consectetur illum neque pariatur quo inventore recusandae minus distinctio beatae sequi dolorum sit odio similique nobis temporibus. Ratione officia vero aperiam debitis, quis officiis laborum, reiciendis consequatur, accusamus maiores eaque ipsa qui earum veritatis amet!</p>`,
      like:10,
      date:'2025-1-29',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Lamunan Gunung",
      subtitle: "Angin memeluk erat, pada senja terberat",
      image: "https://picsum.photos/300/200?random=2",
      content: `
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates at totam dolores fuga, culpa laudantium velit debitis illo eaque, soluta sit illum cum eveniet necessitatibus laborum qui eum ut sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Quos impedit nemo reiciendis, veniam facere sunt, consectetur illum neque pariatur quo inventore recusandae minus distinctio beatae sequi dolorum sit odio similique nobis temporibus. Ratione officia vero aperiam debitis, quis officiis laborum, reiciendis consequatur, accusamus maiores eaque ipsa qui earum veritatis amet!</p>`,
      like:14,
      date:'2025-5-29',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Untuknya, yang tak pernah ada",
      subtitle: "Sampai tidaknya tulisan ini, semoga kamu mengerti",
      image: "https://picsum.photos/300/200?random=3",
      content: `
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates at totam dolores fuga, culpa laudantium velit debitis illo eaque, soluta sit illum cum eveniet necessitatibus laborum qui eum ut sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Quos impedit nemo reiciendis, veniam facere sunt, consectetur illum neque pariatur quo inventore recusandae minus distinctio beatae sequi dolorum sit odio similique nobis temporibus. Ratione officia vero aperiam debitis, quis officiis laborum, reiciendis consequatur, accusamus maiores eaque ipsa qui earum veritatis amet!</p>`,
      like:81,
      date:'2025-3-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
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
