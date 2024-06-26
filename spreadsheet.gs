function getSheet(name){
  const SPREADSHEET_ID = '1zOAJpmF7q0e-7_QCEXvL_CKSN3adiuKqeAhF4eDsMD4';
  const sheet = SpreadsheetApp.getActiveSheet();

  if (sheet.getName() == name){
    return sheet
  }else{
    const active = SpreadsheetApp.getActive(); 
    if (active){
      return active.getSheetByName(name);
    }else{
      return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name)
    }
  }
}

//logを残す。エアコンの状態が変わっていないならfalseを返す。
// d : 日時
// mode : ONするかどうか 
function setLog(d, mode) {
  let sheet = getSheet('log');
  let recentRow = sheet.getDataRange().getValues().length;

  let wasACOn = false;
  if (sheet.getRange(recentRow, 2).getValue() == ''){
    wasACOn = true;
  }

  if (wasACOn == mode){
    return false;
  }

  if (mode){
    sheet.getRange(recentRow+1, 1).setValue(d);
    return true;
  }
  sheet.getRange(recentRow, 2).setValue(d);
  return true;
}

//その日の合計時間に加算
function CompileTime() {
  let sheet = getSheet('compilation');

  let lastTime = new Date(sheet.getRange('A2').getValue());
  let prevSum = new Date(sheet.getRange('A4').getValue());
  sheet.getRange('A4').setValue(AddTime(prevSum, lastTime));
}

//10時にデータをまとめる
function CompileTime10() {
  let sheet = getSheet('compilation');

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);

  let monthCounter = sheet.getRange('A6').getValue();
  let todaySum = new Date(sheet.getRange('A4').getValue());
  sheet.getRange(today.getDate()+1, 2).setValue(todaySum);
  let prevSum = new Date(sheet.getRange(monthCounter, 3).getValue());
  sheet.getRange(monthCounter, 3).setValue(AddTime(prevSum, todaySum));
  sheet.getRange('A4').setValue(new Date(tomorrow.setHours(0, 0, 0, 0)));

  if (today.getMonth() != tomorrow.getMonth()){
    for (let i = 0; i < 31; i++) {
      sheet.getRange(i+2, 2).setValue('');
    }
    sheet.getRange(monthCounter+1, 3).setValue(new Date(tomorrow.setHours(0, 0, 0, 0)));
  }
}

// 年月日に実質的意味はないが、第1引数の日付を継承
function AddTime(t1, t2) {
  var res = new Date(t1);
  res.setMilliseconds(t1.getMilliseconds()+t2.getMilliseconds());
  res.setSeconds(t1.getSeconds()+t2.getSeconds());
  res.setMinutes(t1.getMinutes()+t2.getMinutes());
  res.setHours(t1.getHours()+t2.getHours());
  var ms0 = t1.getMilliseconds() + t2.getMilliseconds();
  // getMonth()は0~11
  return res;
}