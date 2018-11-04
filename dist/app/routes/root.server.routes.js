'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            head: {
                title: 'Hello World'
            },
            content: {
                title: 'Hi there!',
                description: 'You are all set up'
            }
        });
    });
};
//# sourceMappingURL=root.server.routes.js.map