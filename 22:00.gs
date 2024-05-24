function tenPM(){

  //利用時間の整理(スプレッドシート)
  var d = new Date(); 
  if(setLog(d, false)){
    CompileTime();
    setLog(d, true);
  }
  CompileTime10();

  //電気代の計算
  calculateDailyElectricBill();
  calculateMonthlyElectricBill();

  //メッセージの作成・送信
  createMessage(d);

  const triggers = ScriptApp.getProjectTriggers();
  //トリガー登録のforループを実行
  for(let i=0;i<triggers.length;i++){
    //取得したトリガーの関数がtriggerTestの場合、deleteTriggerで削除
    if(triggers[i].getHandlerFunction()==='tenPM'){
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
  ScriptApp.newTrigger('tenPM').timeBased().at(time).create();
}