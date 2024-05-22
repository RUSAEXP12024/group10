
function test() {
  var d = new Date(2000, 0, 1, 9, 10, 30, 750);
  var d2 = new Date(d);
  Logger.log(d);
  d2.setMilliseconds(d2.getMilliseconds()+400);
  Logger.log(d);
  Logger.log(d2);
}

function testWhenToggled() {
  //var d = new Date();
  var d = new Date(2024, 05, 1, 8, 15);
  setLog(d, true);
  if(setLog(AddTime(d, new Date(2000, 0, 1, 1, 15, 0)), false)){
    CompileTime();
  }
}

function test10oclock() {
  //var d = new Date();
  var d = new Date(2024, 05, 1, 22, 00);
  if(setLog(d, false)){
    CompileTime();
    setLog(d, true);
  }
  CompileTime10();
}

//シートcompilationを初期化
function initCompilation() {
  let sheet = getSheet('compilation');
  let d = new Date();
  let monthCounter = sheet.getRange('A6').getValue();
  sheet.getRange('A4').setValue(d.setHours(0, 0, 0, 0));
  sheet.getRange('C2').setValue(d.setHours(0, 0, 0, 0));
  for (let i = 0; i < 31; i++) {
    sheet.getRange(i+2, 2).setValue('');
  }
  for (let i = 3; i <= monthCounter; i++) {
    sheet.getRange(i, 3).setValue('');
  }
}

//logを残す。エアコンの状態が変わっていないならfalseを返す。
// d : 日時
// mode : ONにするかどうか
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
  //let today = new Date(2024, 05, 1, 22, 00);
  let tomorrow = new Date();
  //let tomorrow = new Date(2024, 05, 1, 22, 00);
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