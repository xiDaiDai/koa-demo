const BidModel = require("../modules/bid");

class BidController {


    static async spiderAndSave(ctx){
        let data = await BidModel.spiderAndSave();
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '抓取成功',
            data
        }
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