function get_signalid() { //家電シグナルidの取得
  const REMO_ACCESS_TOKEN = 'x7pnMuGu5zfpeuIdot-vjFkhxgQCd_MZV7T71LDNCZI.DO6QAuYtwZGRuBy25tHKdkWOsOeqxCXQCcuRmuttmlU' //remoのアクセストークン
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };

  var reply = UrlFetchApp.fetch("https://api.nature.global/1/" + "appliances", options); 
  return reply;
}

function write(){
  Logger.log(get_signalid());
}
