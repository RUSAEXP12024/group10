  // 料金単価（税込）
  var basePrice = 466.57; // 最低料金（最初の15kWhまで）
  var tier1Limit = 15;
  var tier2Price = 20.21; // 15kWhを超え120kWhまでの料金単価
  var tier2Limit = 120;
  var tier3Price = 24.80; // 120kWhを超え350kWhまでの料金単価
  var tier3Limit = 350;
  var tier4Price = 27.72; // 350kWhを超える分の料金単価

function calculateMonthlyElectricBill() { //ひと月分の料金を計算
  var sheet = getSheet('compilation');
  var monthlyUsageHours = sheet.getRange(2,3).getValue(); // 一日の使用時間を取得(今日の電気料を含む)
  monthlyUsageHours = monthlyUsageHours.getHours() + monthlyUsageHours.getMinutes()/60 //分までの数字を単位変換(hour)
  var powerConsumption = 0.635; // 消費電力(kWh)
  
  // 一日の使用量に基づいて料金を計算
  var monthlyPower = monthlyUsageHours * powerConsumption;
  var price; // 一日当たりの電気代

  if (monthlyPower <= tier1Limit) {
    price = basePrice;
  } else if (monthlyPower <= tier2Limit) {
    price = tier2Price * (monthlyPower - tier1Limit) + basePrice;
  } else if (monthlyPower <= tier3Limit) {
    price = tier2Price * (tier2Limit - tier1Limit) + tier3Price * (monthlyPower - tier2Limit) + basePrice;
  } else {
    price = tier2Price * (tier2Limit - tier1Limit) + tier3Price * (tier3Limit - tier2Limit) + tier4Price * (monthlyPower - tier3Limit) + basePrice;
  }
  
  sheet.getRange(2,5).setValue(price); // 計算した電気代をB2セルに設定
}

function calculateDailyElectricBill() { //一日分の料金を計算
  var today = new Date();
  let sheet = getSheet('compilation');
  var dailyUsageHours = sheet.getRange(today.getDate()+1, 2).getValue(); // 一日の使用時間を取得
  dailyUsageHours = dailyUsageHours.getHours() + dailyUsageHours.getMinutes()/60 //分までの数字を単位変換(hour)
  var monthlyUsageHours = sheet.getRange(2,3).getValue(); //今月の使用時間を取得
  monthlyUsageHours = monthlyUsageHours.getHours() + monthlyUsageHours.getMinutes()/60 //分までの数字を単位変換(hour)
  var powerConsumption = 0.635; // 消費電力(kWh)
  
  // 一日の使用量に基づいて料金を計算
  var daylyPower = dailyUsageHours * powerConsumption; //一日の使用電気料
  var monthlyPower = monthlyUsageHours * powerConsumption - daylyPower; //今月の使用電気料(昨日まで)
  var price; // 一日当たりの電気代

  //現在の料金単価を調べる
  if (monthlyPower <= tier1Limit) {
    price = base(monthlyPower, daylyPower);
  } else if (monthlyPower <= tier2Limit) {
    price = tier2(monthlyPower, daylyPower);
  } else if (monthlyPower <= tier3Limit) {
    price = tier3(monthlyPower, daylyPower);
  } else {
    price = tier4(daylyPower);
  }
  
  sheet.getRange(today.getDate()+1, 4).setValue(price); // 計算した電気代をB2セルに設定
}

function base(monthlyPower, daylyPower){ //料金プラン１
  if((monthlyPower + daylyPower - tier1Limit) <= 0){ //現階層から溢れない場合
    price = 0;//契約金の場合Dailyでは0円を示す
  }else{
    price = basePrice + tier2(tier1Limit, monthlyPower + daylyPower - tier1Limit); //(次階層の最低電力量, 現階層を溢れた分の電力量)
  }
  return price;
}

function tier2(monthlyPower, daylyPower){ //料金プラン２
  if((monthlyPower + daylyPower - tier2Limit) <= 0){ //現階層から溢れない場合
    price = daylyPower * tier2Price;
  }else{
    price = (tier2Limit-monthlyPower)*tier2Price + tier3(tier2Limit, monthlyPower + daylyPower - tier2Limit); //(次階層の最低電力量, 現階層を溢れた分の電力量)
  }
  return price;
}

function tier3(monthlyPower, daylyPower){ //料金プラン3
  if((monthlyPower + daylyPower - tier3Limit) <= 0){ //現階層から溢れない場合
    price = daylyPower * tier3Price;
  }else{
    price = (tier3Limit-monthlyPower)*tier3Price + tier4(monthlyPower + daylyPower - tier3Limit); //(次階層の最低電力量, 現階層を溢れた分の電力量)
  }
  return price;
}

function tier4(daylyPower){ //料金プラン4
  price = daylyPower * tier4Price;
  return price;
}
