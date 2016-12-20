/**
 * Created by yecl on 16/9/27.
 */
var request = require('request'),
    url = require('url'),
    crypto = require('crypto');

var util = require('./util');

var AliOcrIdCard = function (key, secret) {
    this._key = key;
    this._secret = secret;
}

/**
 * 解析身份证图片信息
 * @param base64_image_string
 * @param side {身份证正反面类型: face/back}
 * @param callback
 * @returns {*}
 */
AliOcrIdCard.prototype.get = function (base64_image_string, side, callback) {

    var date = new Date().toUTCString();

    var options = {
        rejectUnauthorized: false,
        url: 'https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
        method: 'POST',
        body: JSON.stringify({
            "inputs": [
                {
                    "image": {
                        "dataType": 50,
                        "dataValue": base64_image_string
                    },
                    "configure": {
                        "dataType": 50,
                        "dataValue": "{\"side\": \"" + side + "\"}"
                    }
                }]
        }),
        headers: {
            'Accept': 'json',
            'Content-Type': 'application/json',
            'Date': date,
            'X-Ca-Key': this._key,
            'X-Ca-Signature-Headers': 'X-Ca-Key'
        }
    }

    var bodymd5 = util.md5(new Buffer(options.body));
    var span = '\n'
    var stringToSign = options.method + span + options.headers.Accept + span + bodymd5 + span + options.headers['Content-Type'] + span + options.headers.Date + span + "X-Ca-Key:" + this._key + span + url.parse(options.url).path;
    var signature = util.sha256(stringToSign, this._secret);

    options.headers['Content-MD5'] = bodymd5;
    options.headers['X-Ca-Signature'] = signature;

    return request(options, callback);

}


module.exports = exports = AliOcrIdCard;
