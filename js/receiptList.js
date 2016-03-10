$(document).ready(function() {
  var receiptList = JSON.parse(localStorage.getItem("receiptList"));

  updatePage(receiptList);
});

function updatePage(receiptList) {
  var printHTML = '';

  receiptList.forEach(function(printItem) {
    printHTML += '<div class="panel panel-default"> < div class = "panel-heading" >
      < h3 class = "panel-title" > ' + printItem.date + ' < /h3> < /div> < div class = "panel-body row" >
      < div class = "panel-content col-md-4" > 总计: < span id = "priceTotal" > ' printItem.amount ' < /span></div >
      < div class = "panel-content col-md-4" > < a href = "receipt.html" > 查看详情 < /a></div >
      < div class = "panel-content operation col-md-4" > < span class = "delete" > 删除 < /span></div >
      < /div> < /div>';
  });

  $(".page-header").append(printHTML);
}
