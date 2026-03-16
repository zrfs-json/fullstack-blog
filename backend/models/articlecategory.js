'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleCategory.belongsTo(models.Category,{
        through: "Cateogry",
        foreignKey: "category_id"
      })

      ArticleCategory.belongsTo(models.articles,{
        through: "articles",
        foreignKey: "article_id"
      })
    }
  }
  ArticleCategory.init({
    article_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleCategory',
  });
  return ArticleCategory;
};