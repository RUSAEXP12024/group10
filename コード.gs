
function myFunction() {
  let sheet = SpreadsheetApp.getActive().getSheetByName('log');
  let datas = sheet.getDataRange().getValues();
  var data = datas[datas.length - 1];
  var ACOn = false;
  if (data[1] == ""){
    ACOn = true;
  }

  if (ACOn){
    //Logger.log(datas.length);
    sheet.getRange(datas.length, 2).setValue(new Date());
    CompileTime(data[0], sheet.getRange(datas.length, 3).getValue());
  }
  else{
    sheet.getRange(datas.length+1, 1).setValue(new Date());
  }
}

function CompileTime(time, len) {
  let sheet = SpreadsheetApp.getActive().getSheetByName('compilation');
  var counter = sheet.getRange('A2').getValue();
  var prev = sheet.getRange(counter+1, 3).getValue();
  if (prev == ''){
    prev = new Date(2000, 1, 1, 0, 0, 0);
  }else{
    prev = new Date(prev);
  }
  sheet.getRange(counter+1, 3).setValue(AddTime(new Date(len), prev));

}

function AddTime(t1, t2) {
  var ms0 = t1.getMilliseconds() + t2.getMilliseconds();
  var ms = ms0 % 1000;
  var seconds0 = Math.floor(ms0/1000) + t1.getSeconds() + t2.getSeconds();
  var seconds = seconds0 % 60;
  var minutes0 = Math.floor(seconds0/60) + t1.getMinutes() + t2.getMinutes();
  var minutes = minutes0 % 60;
  var hours = Math.floor(minutes0/60) + t1.getHours() + t2.getHours();
  var d = new Date(2000, 1, 1, hours, minutes, seconds, ms);
  return d;
}