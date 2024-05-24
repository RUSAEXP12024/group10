// LINE Developersに書いてあるChannel Access Token
var access_token = "M5jXJSDOM/VllxS9kuhhnuUy2ZutThS+XpkGl7wSn5rfzBs6TgWMyE+S2GittFJt9yTLOmYZbDdmtBc7izeelIz9ZXaK6Do35axLMF8h4wC6HEKGwHKxbs9nLDQ3u8YaQxAhvwaK4ql16Ys2V4TVcQdB04t89/1O/w1cDnyilFU="
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

//送信するメッセージをシートから抽出して送信。
function createMessage(d) {
  var sheet = getSheet('compilation');
  var day_hour = sheet.getRange('B'+ (d.getDate()+1)).getValue(); //今日の利用時間を取得
  day_hour = (day_hour.getHours() + day_hour.getMinutes()/60).toFixed(1) //今日の利用時間を単位変換(hour)・小数点1桁
  var day_price = sheet.getRange('D'+ (d.getDate()+1)).getValue() //今日の料金を取得
  day_price = day_price.toFixed(0); //小数点以下切り捨て
  var month_price = sheet.getRange('E2').getValue() //今月の料金を取得
  month_price = month_price.toFixed(0); //小数点以下切り捨て
  //メッセージを定義する
  message = "<通知>\n今日の利用時間: "+day_hour+"時間\n今日の利用料金: "+day_price+"円\n今月の利用料金: "+month_price+"円"
  //push(message);
  Logger.log(message);
}
