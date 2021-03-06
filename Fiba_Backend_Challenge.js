var express = require('express');
var bodyParser = require("body-parser");
var _ = require("underscore");
const date = require('date-and-time');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

var app = express();
app.use(bodyParser.json());


var fs = require('fs');
const { response } = require('express');
const { result } = require('underscore');


app.post('/add', function (req, res) {

    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        _.extend(data, req.body);

        //const value = date.format((new Date('06, 17, 1995 ')), 'YYYY/MM/DD');
        //console.log("date and time : " + value)

        console.log(req.body);
        console.log("Eklendi");
        res.end(JSON.stringify(req.body));
        fs.writeFile('Fiba.json', JSON.stringify(data), function (err) {

        });
    });
});

app.delete('/delete', function (req, res, next) {


    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var id = "user" + req.query.id;
        var isUserExist = data[id];
        if (isUserExist) {

            //console.log(isUserExist + "  isUserExist Burada.");
            delete data[id]
            console.log(id + " silindi \nKalan kullanıcılar: ");
            console.log(data);
            res.end(JSON.stringify(data));
            fs.writeFile('Fiba.json', JSON.stringify(data), function (err) { });

        }
        else {

            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify("Hatalı Giriş"));
            console.log("Hatalı Giriş");

        }
    });
});


app.put('/update', function (req, res) {
    fs.readFile('Fiba.json', 'utf8', function (err, data) {
        data = JSON.parse(data);

        _.extend(data, req.body);
        console.log("Update Başarılı, \nGüncellenen Kullanıcı:")
        console.log(req.body);
        res.end(JSON.stringify(data));
        fs.writeFile('Fiba.json', JSON.stringify(data), function (err) {

        });
    });
});


app.get('/list', function (req, res) {

    if (req.query.createdDate == "") {
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify("Lütfen geçerli bir tarih giriniz"));
        console.log("Lütfen geçerli bir tarih giriniz");
    }
    fs.readFile('Fiba.json', 'utf8', function (err, data) {



        var data = JSON.parse(data);
        const length = Object.keys(data).length; //json dosyasının eleman sayısı
        var users = Object.keys(data);
        var tarih = req.query.createdDate; //postmanden gelen tarih
        var array = [];
        var i;
        console.log("Girilen tarihten daha yeni kullanıcılar: ");
        users.forEach(user => {

            var isUserExist = data[user];
            var dates = isUserExist[0];
            //console.log(dates);
            var str = JSON.stringify(dates);
            var tarihim = str.slice(16, 26);

            if (tarih < tarihim) {
                var arraytutan = JSON.stringify(data[user]);
                array.push(arraytutan);
                //console.log(tarihim);
                console.log(data[user]);
                //console.log(array + "array verisi");

            }

        });






        if (array != "") {
            res.end(JSON.stringify(array));

        }
        else {
            res.end(JSON.stringify("Girilen tarihten daha yeni kullanıcı bulunamadı."));
        }

        array = [];

    });
});






var server = app.listen(5000, function () {
    console.log('Sunucu aktif');

});

