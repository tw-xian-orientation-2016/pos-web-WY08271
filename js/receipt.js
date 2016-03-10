$(document).ready(function() {
  var receiptList = JSON.parse(localStorage.getItem("receiptList"));

  updateReceipt(receiptList[receiptList.length - 1]);
});

function updateReceipt(printItems) {
  var receiptHTML = '';
  var time = printItems.date;
  var amount = printItems.amount;
  var receiptItems = printItems.receiptItems;


  receiptItems.forEach(function(receiptItem) {
    receiptHTML += '<tr><td class="goods col-md-4" >' + receiptItem.item.name + '</td><td class ="price col-md-4" >' + receiptItem.item.price + '/' + receiptItem.item.unit + '</td> <td class="count col-md-4" >' + receiptItem.count + '</td><td class="subTotal col-md-4" >' + receiptItem.item.price * receiptItem.count + '</td></tr>'
  });

  updateHTML(receiptHTML, time, amount);
}

function updateHTML(receiptHTML, time, amount) {
  $('tbody').append(receiptHTML);
  $('.panel-title').text(time);
  $('.time').text(time);
  $('#priceTotal').text(amount);
}
