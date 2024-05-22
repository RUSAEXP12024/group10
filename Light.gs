var REMO_ACCESS_TOKEN = 'x7pnMuGu5zfpeuIdot-vjFkhxgQCd_MZV7T71LDNCZI.DO6QAuYtwZGRuBy25tHKdkWOsOeqxCXQCcuRmuttmlU' //remoのアクセストークン

// 全灯
function Light_ON(){

  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "post",
    "headers" : headers,
  };

  var reply = UrlFetchApp.fetch("https://api.nature.global/1/signals/4979d79e-4236-4bc6-bfab-a6f3021856f6/send", options); //signalの後ろにsignal_idを挿入

  message="電気をONにしました。";
  return message;
}

// 消灯
function Light_OFF(){
  
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "post",
    "headers" : headers,
  };

  var reply = UrlFetchApp.fetch("https://api.nature.global/1/signals/7a8345a3-51e4-453a-b540-e8231757316c/send", options); //signal_id

  message="電気をOFFにしました。"; 
  return message;
}


