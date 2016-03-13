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

  $(".checkout-button").click(function() {
    saveReceiptList();
  });

  $(".count-input").on("input", function() {
    var id = parseInt(this.getAttribute("data-id"));
    var price = parseInt(this.getAttribute("data-price"));
    var count = parseInt($(this).val() !== '' ? $(this).val() : 1);

    $(this).parent().parent().find("[class='subTotal']").text(price * count);

    var receiptItems = JSON.parse(localStorage.getItem("receiptItems"));
    receiptItems = updateReceiptItems(receiptItems, id, count);
    localStorage["receiptItems"] = JSON.stringify(receiptItems);
    updatepriceTotal(receiptItems);
  });
});

function updateReceiptItems(receiptItems, id, count) {
  receiptItems.forEach(function(receiptItem) {
    if (receiptItem.item.id === id) {
      receiptItem.count = count;
    }
  });

  return receiptItems;
}

function saveReceiptList() {
  var receiptItems = JSON.parse(localStorage.getItem("receiptItems"));
  var receiptList = JSON.parse(localStorage.getItem("receiptList"));
  var priceTotal = calculatepriceTotal(receiptItems);
  var date = new Date().getTime();
  var tempReceipt = {
    date: date,
    receiptItems: receiptItems,
    amount: priceTotal
  };
  receiptList.push(tempReceipt);

  localStorage["receiptList"] = JSON.stringify(receiptList);
  localStorage["tempReceipt"] = JSON.stringify(tempReceipt);
  localStorage["receiptItems"] = [];

  window.location.href = "receipt.html";
}

function calculatepriceTotal(receiptItems) {
  var priceTotal = 0;
  receiptItems.forEach(function(receiptItem) {
    priceTotal += receiptItem.item.price * receiptItem.count;
  });

  return priceTotal;
}

function deleteReceiptItem(id, receiptItems) {
  receiptItems.forEach(function(receiptItem, index) {
    if (receiptItem.item.id === id) {
      receiptItems.splice(index - 1, 1);
      localStorage.removeItem("receiptItems");
      localStorage.setItem('receiptItems', JSON.stringify(receiptItems));
    }
  });

  updateSelectCount(receiptItems);
  updatepriceTotal(receiptItems);
}

function updateCart(receiptItems) {
  var itemHTML = '';
  receiptItems.forEach(function(receiptItem) {
    var item = receiptItem.item;
    itemHTML += '<tr id="' + item.id + '"><td class="goods">' + item.name + '</td><td class="price">' + item.price + '/' + item.unit + '</td><td class="count"><input class="count-input" type="text" value="' + receiptItem.count + '" data-id="' + item.id + '" data-price="' + item.price + '"/></td><td class="subTotal">' +
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
