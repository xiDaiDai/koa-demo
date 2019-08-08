// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Bid = Sequelize.import('../schema/bid');

Bid.sync({force: false}); //自动创建表

const request = require('request');
const cheerio = require('cheerio');


class BidModel {

    static spiderAndSave(){
        return new Promise((resolve,reject) => {
            let url = 'http://snzb.minegoods.com/sdnycms/category/bulletinList.html?searchDate=1994-07-25&dates=300&word=&categoryId=2&tabName=%E6%8B%9B%E6%A0%87%E5%85%AC%E5%91%8A&industryName=&status=&page=1'
            request(url, async (error, response, body) => {

                if (!error && response.statusCode == 200) {

                    let $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
                    let bidList = [];
                    let size = $('.newslist > li').length;
                    $('.newslist > li').each(function (i, el) {

                        let title = $(this).find('h1').text();
                        let url = $(this).find('a').attr('href');

                        let code = '';
                        let method = '';
                        let deadline = '';

                        $(this).find('.newsinfo li').each(function (i, el) {
                            if (i == 0) {
                                code = $(this).find('span').text();
                            }
                            if (i == 1) {
                                method = $(this).find('span').text();
                            }
                            if (i == 2) {
                                deadline = $(this).find('span').text();
                            }
                        });

                        let publishTime = $(this).find('.newsDate div').text();

                        let bid = {
                            title,
                            url,
                            code,
                            method,
                            deadline,
                            publishTime

                        }

                        bidList.push(bid);

                    });
                    //循环查询，判断是否已经存在
                    if (bidList && bidList.length > 0) {
                        for(let bid of bidList){
                            await Bid.findOrCreate({where: {url: bid.url}, defaults: bid})
                        }
                    }
                    // Bid.bulkCreate(bidList)
                    resolve(bidList)

                } else {
                    reject([])
                }

            })

        } )


    }

    /**
     * 查询详情
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async findAndCountAll(data){
        return await Bid.findAndCountAll({
            offset: data.offset,
            limit: data.limit
        })
    }
}

module.exports = BidModel;