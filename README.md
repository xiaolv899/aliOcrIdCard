## 阿里云API － 身份证图片信息识别

## 添加到你的项目中

1. Run `npm install aliOcrIdCard --save`
2. `var AliOcrIdCard = require('aliOcrIdCard');`

## DEMO

```javascript

var AliOcrIdCard = require('aliOcrIdCard');
var ocr = new AliOcrIdCard('key', 'secret');
ocr.get(base64_string, 'face', function (err, response, body) {
    console.log(body);
});

```