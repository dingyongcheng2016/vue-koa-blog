const { sequelize } = require('@core/db');

const bcryptjs = require('bcryptjs')

const { Model, DataTypes } = require('sequelize');

const Moment = require('moment')

// 定义管理员模型
class Admin extends Model {

}

// 初始化管理员模型
Admin.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED, // 
        primaryKey: true,
        autoIncrement: true,
        comment: '管理员id'
    },
    email: {
        type: DataTypes.STRING(50),
        unique: 'admin_email_unique',
        allowNull: false,
        comment: '登录邮箱'
    },
    password: {
        type: DataTypes.STRING,
        set(val){
            // 盐值
            const salt = bcryptjs.getSalt(10);
            // 生成加密密码
            const pwd = bcryptjs.hashSync(val, salt);
            // 存入数据库
            this.setDataValue("password", pwd);
        },
        allowNull: false,
        comment: '登录密码'
    },
    nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '管理员昵称'
    },
    create_at:{
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            return Moment(this.getDataValue('create_at')).format("YYYY-MM-DD HH:mm:ss")
        },
        comment: '创建时间'
    }


},{
    sequelize,
    modelName: 'admin',
    tableName: 'admin'
})
