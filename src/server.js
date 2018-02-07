const express = require('express');
const project = require('./components'); //项目接口目录
const app = express();

const bodyParser = require('body-parser');

app.use(crossDomain)
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

// 注入接口函数
Object.keys(project).forEach(pro_name => {
    const pro_item = project[pro_name];
    Object.keys(pro_item).forEach((url) => {
        const url_data = pro_item[url];
        app[url_data.methods](url, (req, res) => {
            if (url_data.methods == 'get') {
                vailedHandle(url_data.vailed, req.query, url_data.mock(), res);
            } else {
                vailedHandle(url_data.vailed, req.body, url_data.mock(), res);
            }
        });
    })
});

app.listen(8000);

// 跨域配置
function crossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};

// 验证参数
function vailedHandle(vailed, query, mock, res) {
    const query_list = Object.keys(query).join(',');
    const params = [];
    if (!vailed) {
         res.json(mock);
    };
    vailed.forEach(key => {
        if(query_list.indexOf(key) === -1) {
            params.push(key)
        }
    });
    if(params.length > 0) {
        res
            .status(400)
            .json({
                status: 400,
                msg: `缺少${params.map(item => item)}`
            })
    }
    if(params.length === 0) {
        res.json(mock);
    }
};