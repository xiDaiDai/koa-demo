// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../schema/user');
// User.sync({force: false}); //自动创建表

class UserModel {

    /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data){
        return await User.create({
            name: data.name,
            code: data.code,
            nick_name: data.nick_name,
            gender: data.gender
        });
    }

    /**
     * 查询详情
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async getUserModelDetail(id){
        return await User.findOne({
            where:{
                id
            }
        });
    }
}

module.exports = UserModel;