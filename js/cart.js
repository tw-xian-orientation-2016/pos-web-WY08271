$(document).ready(function() {
  var receiptItems = JSON.parse(localStorage.getItem("receiptItems"));

  updateCart(receiptItems);
  updateSelectCount(receiptItems);
  updatepriceTotal(receiptItems);

  $(".delete-button").click(function() {
    var id = parseInt(this.getAttribute("data-id"));
    $(this).parent().parent().hide();

    deleteReceiptItem(id, receiptItems);
  });

  $(".navbar-link").click(function() {
    saveReceiptList();
  });
});

function saveReceiptList() {
  var receiptItems = JSON.parse(localStorage.getItem("receiptItems"));
  var selectCount = updateSelectCount(receiptItems);
  var priceTotal = updatepriceTotal(receiptItems);
  var receiptList = [];
  var date = new Date();

  receiptList.push({
    date: date.toLocaleDateString(),
    receiptItems: receiptItems,
    count: selectCount,
    amount: priceTotal
  });

  localStorage.removeItem("receiptItems");
}

function deleteReceiptItem(id, receiptItems) {
  receiptItems.forEach(function(receiptItem, index) {
    if (receiptItem.item.id === id) {
      receiptItems.splice(index - 1, 1);
      localStorage.removeItem("receiptItems");
      localStorage.setItem('receiptItems', JSON.stringify(receiptItems))
    }
  });

  updateSelectCount(receiptItems);
  updatepriceTotal(receiptItems);
}

function updateCart(receiptItems) {
  var itemHTML = '';
  receiptItems.forEach(function(receiptItem) {
    var item = receiptItem.item;
    itemHTML += '<tr id="' + item.id + '"><td class="goods">' + item.name + '</td><td class="price">' + item.price + '/' + item.unit + '</td><td class="count"><input class="count-input" type="text" value="1"/></td><td class="subTotal">' +
      item.price * receiptItem.count + '</td><td><button class="btn btn-default delete-button" type="submit" data-id="' + item.id + '">删除</button></td></tr>';
  });
  $('tbody').append(itemHTML);
}

function updateSelectCount(receiptItems) {
  var selectedCount = receiptItems.length;
  $("#selectedCount").text(selectedCount);
}

function updatepriceTotal(receiptItems) {
  var priceTotal = 0;

  receiptItems.forEach(function(receiptItem) {
    priceTotal += receiptItem.item.price * receiptItem.count;
  });

  $("#priceTotal").text(priceTotal);
}
