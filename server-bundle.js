'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set("PORT", process.env.PORT || 5000);

var env = process.env.NODE_ENV;
if (env === 'production') {
    app.use('/', _express2.default.static(__dirname + '/randomnumbers-app/build'));
}

app.get("/api", function (req, res) {
    res.send('Welcome to our api');
});

app.get("/api/random", function (req, res) {
    var number = Math.floor(Math.random() * (100 - 1 + 1));
    res.json({ number: number });
});

app.get("/api/random/:type", function (req, res) {
    var number = Math.floor(Math.random() * (100 - 1 + 1));
    var type = req.params.type;

    if (type == "even" || type == "odd") {
        if (type == "odd") {
            if (number % 2 != 1) ++number;
        }
        if (type == "even") {
            if (number % 2 != 0) ++number;
        }
        res.json({ number: number });
    } else {
        res.send("Incorrect type number");
    }
});

app.listen(app.get("PORT"), function () {
    console.log('API running at: localhost: ' + app.get("PORT"));
});
