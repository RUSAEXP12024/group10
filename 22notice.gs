//送信するメッセージをシートから抽出して送信。
function createMessage() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');
  const day_hour = sheet.getRange('G1').getValue();
  const day_price = sheet.getRange('H1').getValue();
  const month_price = sheet.getRange('I1').getValue();
  //メッセージを定義する
  message = "今日の利用時間: "+day_hour+"円\n今日の利用料金: "+day_price+"円\n今月の利用料金: "+month_price
  return push(message);
}
