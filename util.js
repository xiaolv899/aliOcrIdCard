/**
 * Created by yecl on 16/9/27.
 */
var crypto = require('crypto');

/**
 * md5 加密
 * @param buffer
 * @returns {*}
 */
exports.md5 = function (buffer) {
    return crypto.createHash('md5').update(buffer).digest('base64');
}

/**
 * sha256 编码
 * @param source
 * @param secret
 * @returns {string}
 */
exports.sha256 = function (source, secret) {
    return crypto.createHmac('sha256', secret).update(source).digest().toString('base64');
}
