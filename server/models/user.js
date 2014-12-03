'use strict';

var bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    AWS        = require('aws-sdk'),
    crypto = require('crypto'),
    pg         = require('../postgres/manager');

function User(obj){
    this.username = obj.username;
}

User.register = function(obj, cb){
    var user = new User(obj);
    download(obj.avatar, function(url){
        user.avatar = url;
        user.password = bcrypt.hashSync(obj.password, 8);
        pg.query('insert into users (username, password, avatar) values ($1, $2, $3) returning id', [user.username, user.password, user.avatar], function(err, results){
            console.log('err', err);
            console.log('results', results);
            cb();
        });
    });

};

function download(url, cb){
    var s3   = new AWS.S3(),
        ext  = path.extname(url);

    crypto.randomBytes(48, function(ex, buf){
        var token = buf.toString('hex'),
            file = token + '.avatar' + ext,
            avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

        request({url: url, encoding: null}, function(err, response, body){
            var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
            s3.putObject(params, function(){
                cb(avatar);
            });
        });
    });

}


module.exports = User;
