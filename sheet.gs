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

/*function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}*/
