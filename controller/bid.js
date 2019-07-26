const BidModel = require("../modules/bid");

class BidController {

    /**
     * 创建
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async save(ctx){

        let pageIndex = parseInt(ctx.query.pageIndex||1);
        await BidModel.save(pageIndex);
        ctx.body = 'done'

    }

    static async spiderAndSave(ctx){

        for(let i=1 ; i<100 ; i++){
            await BidModel.save(i);
        }

        ctx.body = 'done'

    }

    static async query(ctx){

      let pageIndex = parseInt(ctx.query.pageIndex||1);

      let result =   await BidModel.findAndCountAll({
                offset: (pageIndex-1) * 9,
                limit: 10
            })

        let data = {
            data: result.rows,
            totalCount: result.count,
            pageIndex: pageIndex,
            pageSize: 10,
        }

        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data
        }
    }

}

module.exports = BidController;