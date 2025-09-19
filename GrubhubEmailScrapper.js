function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Grab Grubings')                // Name of menu in '' 
    .addItem('Scrape Email', 'grabGrubMail')    //'[Name that'll show up on Spreadsheet menu], '[name of fuction]' 
    .addToUi();
}

function grabGrubMail(){
  var emails = GmailApp.getUserLabelByName("Dining Dollar expenses (Grubhub)").getThreads();
  // You can change the label to anything really, but you'd have to change the regex and if statements too.

  var items = []; 
  var prices = [];
  var dates = [];
  var stores = []; 

  for(let i = 0; i < emails.length; i++){
    var messages = emails[i].getMessages();
    var body = messages[0].getPlainBody();
    var bodyLines = body.split(/\r?\n/);
    var totalRegex = "Total: $"
    var shopRegex = "Shop: "
    var itemRegex = /(?<! $0.00): |(?<! $ 0.00): |\d|[$.]/g;
    var itemPerOrder = 0;

    for(let j = 0; j < bodyLines.length; j++) {


      if(bodyLines[j].startsWith(shopRegex) == true) {
        
        stores.push(bodyLines[j].replace(shopRegex,'').replace('&#x27;',"'"));

      } else if(bodyLines[j].startsWith("1 x ") == true) {
        items.push(bodyLines[j].replace(itemRegex, '').replace('&amp;',"&").replace(' x ', '').replace(' in', '6 in'));
        itemPerOrder++;

        if(itemPerOrder < 2) {
        } else {
          stores.push('');
        }
        
      } else if(bodyLines[j].startsWith(totalRegex) == true) {

        if(itemPerOrder < 2) {
        prices.push(bodyLines[j].replace(totalRegex,''));
        dates.push(messages[0].getDate());
        } else {
          prices.push(bodyLines[j].replace(totalRegex,''));
          prices.push('');
          dates.push(messages[0].getDate());
          dates.push('');
        }
      
      } 

    }
  }

  // Dev logs to make sure they were all saving to the right things + if empty data spots were working or not

  // Logger.log(items);
  // Logger.log(prices);
  // Logger.log(dates);
  // Logger.log(stores);

  splitGrubData(items, prices, dates, stores);
  
}



function splitGrubData(itemsL, pricesL, datesL, storesL){

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // grab spreadsheet we're working in 
  var itemsC, priceC, dateC, shopC; 

  for(let i = 0; i < itemsL.length; i++ ){
    itemsC = sheet.getRange("A" + (i + 2));
    priceC = sheet.getRange("B" + (i + 2 ));
    dateC = sheet.getRange("C" + (i + 2));
    shopC = sheet.getRange("D" + (i + 2));

    itemsC.setValue(itemsL[i]);
    priceC.setValue(pricesL[i]);
    dateC.setValue(datesL[i]);
    shopC.setValue(storesL[i]);
  }

}