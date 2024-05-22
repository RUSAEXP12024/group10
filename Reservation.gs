/*エアコンの起動予約*/
function reservation(str) {
  if(str=="キャンセル"){
    return cancel();
  }

  time = str.replace(":","");// HH/MM
  Logger.log(time.length);
  if(time.length < 3){
    message = "エアコンの予約をするには〇〇:〇〇の形式で時間を指定してください。\n例:「6:30」「23:59」「00:00」";
    return message;
  }
  time = Number(time);
  hour = Math.trunc(time/100);
  min = time%100;

  if(isNaN(min)||isNaN(hour)){
    message = "エアコンの予約をするには〇〇:〇〇の形式で時間を指定してください。\n例:「6:30」「23:59」「00:00」";
    return message;
  }

  if((hour<0)||(23<hour)){
    message = "正しい時間を入力してください。";
  }else if((min<0)||(60<=min)){
    message = "正しい分を入力してください。";
  }else{
   return setAirconTrigger(hour, min);
  }
  return message;
}

function setAirconTrigger(hour, min){
  //Dateオブジェクトで実行した時間を取得
  let time = new Date();
  //setHours,setMinutesでトリガー登録したい時間を設定
  if(time.getHours() > hour){ /*明日の日時を検討*/
    time.setDate(time.getDate()+1);
    time.setHours(hour);
    time.setMinutes(min);
  }else if((time.getHours() == hour) && (time.getMinutes() > min)){ /*明日の日時を検討*/
    time.setDate(time.getDate()+1);
    time.setHours(hour);
    time.setMinutes(min);
  }else{
    time.setHours(hour);
    time.setMinutes(min);
  }
  //前回の予約を削除
  cancel();
  
  //newTriggerメソッドでAircon_ONを特定日時でトリガー登録。予約設定。
  ScriptApp.newTrigger('Aircon_ON').timeBased().at(time).create();
  message = (time.getMonth()+1 +"月"+ time.getDate() + "日 " + time.getHours() + "時" + time.getMinutes() + "分にエアコンをONにします。(予約をキャンセルする場合は、「キャンセル」と入力してください。)");
  return message;
}

function cancel(){ /*予約トリガーを削除*/
    const triggers = ScriptApp.getProjectTriggers();
  //トリガー登録のforループを実行
  for(let i=0;i<triggers.length;i++){
    //取得したトリガーの関数がAircon_ONの場合、deleteTriggerで削除
    if(triggers[i].getHandlerFunction()==='Aircon_ON'){
      ScriptApp.deleteTrigger(triggers[i]);
      message = "予約をキャンセルしました。";
      return message;
    }
  }
  message = "予約が存在しません。";
  return message;
}