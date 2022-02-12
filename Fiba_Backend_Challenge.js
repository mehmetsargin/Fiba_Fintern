var express = require('express');
var bodyParser = require("body-parser");
var _ = require("underscore");
//const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


var app = express();
app.use(bodyParser.json());


var fs = require('fs');
const { response } = require('express');


app.get('/listele', function (req, res) {
    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/ekle', function (req, res) {

    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        _.extend(data, req.body);
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile('Fiba.json', JSON.stringify(data), function (err) {

        });
    });
});

app.delete('/delete', function (req, res, next) {


    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var id = "user" + req.query.id;
        //var x;
        //var veri = fetch("Fiba.json")
        //   .then(response => response.json())
        //  .then(Fiba => {
        //      x = JSON.stringify(Fiba.id[0])
        //      console.log(x);
        //   })

        // if (x === req.query.id) {
        delete data[id]
        console.log(id + " silindi \nKalan kullanıcılar: ");
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile('Fiba.json', JSON.stringify(data), function (err) { });

        // }
        // else if (x != req.query.id) {

        //   console.log('Merhaba Dünya');
        // Promise.resolve().then(function () {
        //     throw new Error('Verilen id bulunamadı')
        // }).catch(next);

        // }
    });
});


app.put('/put', function (req, res) {
    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        _.extend(data, req.body);
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile('Fiba.json', JSON.stringify(data), function (err) {
            // console.log('bir hata oluştu');
        });
    });
});


app.get('/sorgula', function (req, res) {
    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var id = "user" + req.query.id;
        console.log(data[id]);
        res.end(JSON.stringify(data));
    });
});



var server = app.listen(5000, function () {
    console.log('Sunucu aktif');

});

