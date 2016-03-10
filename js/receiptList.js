$(document).ready(function() {
  var receiptList = JSON.parse(localStorage.getItem("receiptList"));

  updatePage(receiptList);

  $(".info-button").click(function() {
  var date = parseInt(this.getAttribute("data-date"));

  findReceiptItem(date, receiptList);
});

$(".delete-button").click(function(){
  var date = parseInt(this.getAttribute("data-date"));
  $(this).parent().parent().parent().hide();

  deleteReceiptItem(date, receiptList);
});
});

function deleteReceiptItem(date, receiptList){
  receiptList.forEach(function(printItem, index){
    if(printItem.date === date){
      receiptList.splice(index - 1, 1);
      localStorage.removeItem("receiptList");
      localStorage.setItem("receiptList", JSON.stringify(receiptList));
    }
  });
}

function findReceiptItem(date, receiptList){
  var tempReceipt;

  receiptList.forEach(function(printItem){
    if(printItem.date === date){
      tempReceipt = printItem;
    }
  });

  localStorage.setItem('tempReceipt',JSON.stringify(tempReceipt));
  window.location.href="receipt.html";
}

function updatePage(receiptList) {
  var printHTML = '';

  receiptList.forEach(function(printItem) {
    printHTML += '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + printItem.date
    + '</h3></div><div class="panel-body row"><div class="panel-content col-md-4"> 总计:<span id="priceTotal">'
      + printItem.amount + '</span></div><div class="panel-content col-md-4"><button class="btn btn-default info-button" type="submit" data-date="'+ printItem.date
        +'">查看详情</button></div><div class="panel-content col-md-4"><button class="btn btn-default delete-button" type="submit" data-date="' + printItem.date
          + '">删除</button></div></div></div>';
  });

  $(".page-header").append(printHTML);
}
