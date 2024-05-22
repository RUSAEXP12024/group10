function calculateDailyElectricBill() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dailyUsageHours = sheet.getRange("A2").getValue(); // 一日の使用時間をA2セルから取得
  var powerConsumption = 0.635; // 消費電力(kWh)
  
  // 料金単価（税込）
  var basePrice = 466.57; // 最低料金（最初の15kWhまで）
  var tier1Limit = 15;
  var tier2Price = 20.21; // 15kWhを超え120kWhまでの料金単価
  var tier2Limit = 120;
  var tier3Price = 24.80; // 120kWhを超え350kWhまでの料金単価
  var tier3Limit = 350;
  var tier4Price = 27.72; // 350kWhを超える分の料金単価
  
  // 一日の使用量に基づいて料金を計算
  var totalPower = dailyUsageHours * powerConsumption;
  var price; // 一日当たりの電気代

  if (totalPower <= tier1Limit) {
    price = basePrice;
  } else if (totalPower <= tier2Limit) {
    price = tier2Price * (totalPower - tier1Limit) + basePrice;
  } else if (totalPower <= tier3Limit) {
    price = tier2Price * (tier2Limit - tier1Limit) +
            tier3Price * (totalPower - tier2Limit) + basePrice;
  } else {
    price = tier2Price * (tier2Limit - tier1Limit) +
            tier3Price * (tier3Limit - tier2Limit) +
            tier4Price * (totalPower - tier3Limit) + basePrice;
  }
  
  sheet.getRange("B2").setValue(price); // 計算した電気代をB2セルに設定
}
