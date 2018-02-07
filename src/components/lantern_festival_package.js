const mock = require('mockjs');

const index = {
    '/discover/getInfo': {
        mock: () => {
            return mock.mock({
                "status": 200,
                "code": 0,
                "data|1-9": [{
                    "name|5-8": /[a-zA-Z]/,
                    "id|+1": 1,
                    "value|0-500": 20,
                    "length|0-500": 20,
                }]
            });
        },
        vailed: ['test1', 'test2'],
        methods: 'get'
    },
    '/discover/getInfo1': {
        mock: () => {
            return mock.mock({
                "status": 200,
                "code": 0,
                "data|1-9": [{
                    "name|5-8": /[a-zA-Z]/,
                    "id|+1": 1,
                    "value|0-500": 20
                }]
            });
        },
        vailed: ['test1', 'test2'],
        methods: 'post'
    }
};

module.exports = index;