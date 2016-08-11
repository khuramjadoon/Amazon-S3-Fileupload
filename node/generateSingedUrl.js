var AWS = require('aws-sdk');

var Siteconfig = require('../config/config.json');

module.exports = function (app) {

    app.post('/amazon_presigned_url', function (req, res) {
        //check first params are supplied or not

        // get amazon access key and SECRET key from configuration file
        AWS.config.update({ accessKeyId: "your amazon access key", secretAccessKey: "amazon secrete key" });
        //create aws object and populate params
        AWS.config.region = req.body.region;

        var s3 = new AWS.S3();
        var params = { Bucket: req.body.bucketname, ACL: 'public-read', Key: req.body.name, ContentType: req.body.type };
        //now create signed url request
        s3.getSignedUrl('putObject', params, function (err, url) {
            if (err) {
                //error occure
                console.log(err);

                res.send("false");

            } else {
                //url is created and return to client
                var response = "true";
                response.url = url;

                res.send(response);

            }
        });
    });

}