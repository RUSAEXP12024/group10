// 全灯
function Light_ON(){
  const REMO_ACCESS_TOKEN = 'x7pnMuGu5zfpeuIdot-vjFkhxgQCd_MZV7T71LDNCZI.DO6QAuYtwZGRuBy25tHKdkWOsOeqxCXQCcuRmuttmlU' //remoのアクセストークン
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "post",
    "headers" : headers,
  };

  var reply = UrlFetchApp.fetch("https://api.nature.global/1/signals/4979d79e-4236-4bc6-bfab-a6f3021856f6/send", options); //signalの後ろにsignal_idを挿入
}

