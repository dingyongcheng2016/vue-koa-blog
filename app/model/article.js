const moment = require('moment');
const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')
// 定义文章模型
class Article extends Model {
}

Article.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '文章id'
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '文章标题'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章简介'
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章封面图url'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '文章内容'
    },
    seo_keyword: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '文章seo关键词'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: '文章展示状态：0-隐藏，1-显示'
    },
    sort_order: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 1,
        comment: '排序编号，默认1，数值越大排序越靠前，数值相等自然排序'
    },
    browse: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '文章浏览次数'
    },
    favorite_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '文章点赞次数'
    },
    admin_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        comment: '发布文章的管理员id'
    },
    category_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        comment: '分类id'
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
},{
  sequelize,
  modelName: 'article',
  tableName: 'article'
})

module.exports = {
    Article
}