// @ts-nocheck
// doGet(e) ではなく doPost(e) を使う
function doPost(e){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  //sheet.appendRow([new Date(), e.postData.contents]); // e.postData.contents に LINE からの json 形式データがある

  let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する
  let events = data.events;
  for(let i = 0; i < events.length; i++){ // すべてのイベントについて繰り返し処理をする
    let event = events[i];
    if(event.type == 'message'){ // メッセージ受信イベントであるか判定
      if(event.message.type == 'text'){ // 受信したのが普通のテキストメッセージであるか
        sheet.appendRow([new Date(), event.message.text]); // スプレッドシートに追記

        var replyText;
        if(event.message.text == 'ON'){
          Light_ON();
          replyText = 'エアコンをONにした'
        } else if (event.message.text == 'OFF'){
          Light_OFF()
          replyText = 'エアコンをOFFにした'
        } else {
          replyText = '◎△＄♪×￥●＆％＃？！'
        }

        // 送信するデータをオブジェクトとして作成する
        let contents = {
          replyToken: event.replyToken, // event.replyToken は受信したメッセージに含まれる応答トークン
          messages: [{ type: 'text', text:  replyText }],
        };
        reply(contents); // 下で説明
      }
    }
  }
}

function reply(contents){
  let channelAccessToken = "JNpCcI7cFQpq6XIMdjq8Xy6ekXoD3rNliP3QaFTWT9yIG5611fzQF12KjrsGchBjxqP1TbpOfPdk4bfSoDwcTa0e7pM/d6FDnXubRnC3dBZ1xVJcowMCqVQYn18nMGkwo4zB0Qxqt+6MVMu5VnKv2wdB04t89/1O/w1cDnyilFU="; //LINEチャンネルのアクセストークン
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

