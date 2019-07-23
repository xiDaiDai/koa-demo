const UserModel = require("../modules/user");

class userController {

    /**
     * 创建
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        console.log(req)
        if(req.name && req.code && req.nick_name && req.gender){
            try{
                const ret = await UserModel.createUser(req);
                const data = await UserModel.getUserModelDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 获取详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                let data = await UserModel.getUserModelDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: 'ID必须传'
            }
        }
    }
}

module.exports = userController;