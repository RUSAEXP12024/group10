// LINE Developersに書いてあるChannel Access Token
var access_token = "JNpCcI7cFQpq6XIMdjq8Xy6ekXoD3rNliP3QaFTWT9yIG5611fzQF12KjrsGchBjxqP1TbpOfPdk4bfSoDwcTa0e7pM/d6FDnXubRnC3dBZ1xVJcowMCqVQYn18nMGkwo4zB0Qxqt+6MVMu5VnKv2wdB04t89/1O/w1cDnyilFU="
// 自分のユーザーIDを指定。LINE Developersの「Your user ID」の部分。
var to = "Uac5d178df0c37d14e00d254d9f208ae4"

//メッセージを送信(textが送信したいメッセージ).無料の場合push関数は月200回まで。
//夜22:00の通知にのみ使用
function push(text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };

  var postData = {
    "to" : to,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
  };

  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}

