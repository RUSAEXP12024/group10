/*LINEbotからのメッセージ受信と返信 */
function doPost(e){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  //sheet.appendRow([new Date(), e.postData.contents]); // e.postData.contents に LINE からの json 形式データがある
  let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する

  let events = data.events; 
  for(let i = 0; i < events.length; i++){ // すべてのイベントについて繰り返し処理をする
    let event = events[i];
    if(event.type == 'message'){ // メッセージ受信イベントであるか判定
      if(event.message.type == 'text'){ // 受信したのが普通のテキストメッセージであるか
        //sheet.appendRow([new Date(), event.message.text]); // スプレッドシートに追記
        var replyText; /*返信メッセージ*/
        if(event.message.text == 'ON'){
          //Aircon_ON();
          if(setLog(new Date(), true)){
            replyText = Light_ON();
          }else{
            replyText = "既にONです。";
          }
        } else if (event.message.text == 'OFF'){
          //Aircon_OFF()
          if(setLog(new Date(), false)){
            replyText = Light_OFF();
            CompileTime();
          }else{
            replyText = "既にOFFです。";
          }
        } else {
          replyText = reservation(event.message.text);
        }

        // 送信するデータ(メッセージ)をオブジェクトとして作成する
        let contents = {
          replyToken: event.replyToken, // event.replyToken は受信したメッセージに含まれる応答トークン
          messages: [{ type: 'text', text:  replyText }],
        };
        reply(contents); 
      }
    }
  }
}

function reply(contents){
  let channelAccessToken = "M5jXJSDOM/VllxS9kuhhnuUy2ZutThS+XpkGl7wSn5rfzBs6TgWMyE+S2GittFJt9yTLOmYZbDdmtBc7izeelIz9ZXaK6Do35axLMF8h4wC6HEKGwHKxbs9nLDQ3u8YaQxAhvwaK4ql16Ys2V4TVcQdB04t89/1O/w1cDnyilFU="; //LINEチャンネルのアクセストークン
  let replyUrl = "https://api.line.me/v2/bot/message/reply"; // LINE にデータを送り返すときに使う URL
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // リクエストボディは payload に入れる
  };
  UrlFetchApp.fetch(replyUrl, options);
}

