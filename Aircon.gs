  var token = "x7pnMuGu5zfpeuIdot-vjFkhxgQCd_MZV7T71LDNCZI.DO6QAuYtwZGRuBy25tHKdkWOsOeqxCXQCcuRmuttmlU"; // Nature Remo3 API のアクセストークンを設定
  var deviceId = "c9a63f3f-4520-45ff-bb73-567d2fb2a1fb"; // Nature Remo3 デバイスのIDを設定

function Aircon_ON() {
  var url = "https://api.nature.global/1/appliances/" + deviceId + "/aircon_settings"; // Nature Remo3 APIのエアコン設定エンドポイント

  var headers = {
    "Authorization": "Bearer " + token
  };
  var payload = {
    "button":""/*エアコンのONはbuttonに空文字*/
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "payload": payload
  };

  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());

  message = "エアコンをONにしました";
  return message;
}

function Aircon_OFF() {
  var url = "https://api.nature.global/1/appliances/" + deviceId + "/aircon_settings"; // Nature Remo3 APIのエアコン設定エンドポイント

  var headers = {
    "Authorization": "Bearer " + token
  };
  var payload = {
    "button":"power-off"/*エアコンのOFFを指定*/
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "payload": payload
  };

  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());

  message = "エアコンをOFFにしました";
  return message;
}

