/*予約のエアコンONではこの関数を実行*/
function reservation_Aircon_ON(){

  var message;

  if(setLog(new Date(), true)){
    message = Aircon_ON();
  }else{
    message = "既にONです。";
  }

  cancel(); /*トリガー、予約の削除。繰り返し防止*/

  push("【予約】" + message);
}
