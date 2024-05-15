// 消灯
function Light_OFF(){
  const REMO_ACCESS_TOKEN = 'x7pnMuGu5zfpeuIdot-vjFkhxgQCd_MZV7T71LDNCZI.DO6QAuYtwZGRuBy25tHKdkWOsOeqxCXQCcuRmuttmlU' //remoのアクセストークン
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "post",
    "headers" : headers,
  };

  var reply = UrlFetchApp.fetch("https://api.nature.global/1/signals/7a8345a3-51e4-453a-b540-e8231757316c/send", options); //signal_id
}
