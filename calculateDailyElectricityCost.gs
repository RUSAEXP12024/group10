function calculateDailyElectricityCost() {
  // スプレッドシートから使用時間、日付、最初に使用した日付を読み込む
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const usageHours = sheet.getRange('A1').getValue(); // 仮に使用時間がセルA1にある
  const dateString = sheet.getRange('A2').getValue(); // 仮に日付がセルA2にある
  const firstUseDate = sheet.getRange('C1').getValue(); // 仮に最初に使用した日付がセルC1にある

  const date = new Date(dateString);
  const currentYearMonth = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM");
  let cost = 0;

  // 使用電力量を計算
  const powerKWh = 0.635 * usageHours;
  const totalKWh = powerKWh * usageHours;

  // 今月初めての使用かどうかをチェックし、必要なら基本契約金を加算
  if (!firstUseDate || Utilities.formatDate(new Date(firstUseDate), Session.getScriptTimeZone(), "yyyy-MM") !== currentYearMonth) {
    // 今月初めての使用であれば、基本契約金を加算し、日付を更新
    cost += 466.57;
    sheet.getRange('C1').setValue(dateString); // 最初に使用した日付を更新
  }

  // 電気代を段階的に計算
  if (totalKWh > 15) {
    if (totalKWh <= 120) {
      cost += (totalKWh - 15) * 20.21;
    } else if (totalKWh <= 350) {
      cost += (120 - 15) * 20.21 + (totalKWh - 120) * 24.80;
    } else {
      cost += (120 - 15) * 20.21 + (350 - 120) * 24.80 + (totalKWh - 350) * 27.72;
    }
  }

  // 計算結果をスプレッドシートに書き込む
  sheet.getRange('B1').setValue(cost.toFixed(2)); // 仮に結果をセルB1に表示
}
