/**
 * @description admin的数据访问对象
 * @author dyc
 */

const { Admin } = require('../model/admin')

class AdminDao {
    static async create(params){
        const { email, password, nickname } = params;

        const hasAdmin = await Admin.findOne({
            where:{
                email,
                deleted_at: null
            }
        });
        if(hasAdmin){
            new global.err.Exisiting('管理员已存在');
        };

        const admin = new Admin();

        admin.email = email;
        admin.password = password;
        admin.nickname = nickname;

        try {
            const res = await Admin.save()
            const data = {
                email: res.email,
                nickname: res.nickname
            }
            return [null, data]
        } catch (error) {
            return [error, null]
        }
    }
}

module.exports = {
    AdminDao
}