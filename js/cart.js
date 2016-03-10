$(document).ready(function() {
  var receiptItems = JSON.parse(localStorage.getItem("receiptItems"));

  updateCart(receiptItems);
});

function updateCart(receiptItems){
  var itemHTML = '';
  receiptItems.forEach(function(receiptItem){
    var item = receiptItem.item;
    itemHTML += '<tr><td class="goods">' + item.name + '</td><td class="price">' + item.price + '/' + item.unit
    + '</td><td class="count"><input class="count-input" type="text" value="1"/></td><td class="subTotal">' +
    item.price*receiptItem.count + '</td><td class="operation"><span class="delete">删除</span></td></tr>';
  });
  $('tbody').append(itemHTML);
}
