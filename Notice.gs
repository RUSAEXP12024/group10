//送信するメッセージをシートから抽出して送信。
function createMessage() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');
  const day_hour = sheet.getRange('G1').getValue();
  const day_price = sheet.getRange('H1').getValue();
  const month_price = sheet.getRange('I1').getValue();
  //メッセージを定義する
  message = "今日の利用時間: "+day_hour+"時間\n今日の利用料金: "+day_price+"円\n今月の利用料金: "+month_price+"円"
  push(message);

  const triggers = ScriptApp.getProjectTriggers();
  //トリガー登録のforループを実行
  for(let i=0;i<triggers.length;i++){
    //取得したトリガーの関数がtriggerTestの場合、deleteTriggerで削除
    if(triggers[i].getHandlerFunction()==='createMessage'){
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  return;
}

function setTrigger(){ /*この関数自体はGASのトリガーで定期実行*/
  //Dateオブジェクトで実行した時間を取得
  let time = new Date();
  //setHours,setMinutesでトリガー登録したい時間を設定(22:00)
  time.setHours(22);
  time.setMinutes(00);
  //newTriggerメソッドでtriggerTestを特定日時でトリガー登録
  ScriptApp.newTrigger('createMessage').timeBased().at(time).create();
}