/**
 * dyc
 * sequelize实例
 */

const Sequelize = require('sequelize');

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database;


const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
    scopes: {
        bh: {
            attributes: {
            exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
            }
        },
        iv: {
            attributes: {
            exclude: ['content', 'password', 'updated_at', 'deleted_at']
            }
        }
    }

})

// 创建模型, 同步数据库
sequelize.sync({ force: false })

sequelize.authenticate().then(res => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})


module.exports = {
    sequelize
}