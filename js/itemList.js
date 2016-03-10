$(document).ready(function() {

  var allItems = JSON.parse(localStorage.getItem("allItems"));
  var receiptItems = JSON.parse(localStorage.getItem("receiptItems")) || [];

  init();

  $(".select-button").click(function() {
    var id = parseInt(this.getAttribute("data-id"));
    replaceSelectCount(allItems, receiptItems, id);
  });
});

function replaceSelectCount(allItems, receiptItems, id) {
  allItems.forEach(function(item) {
    if (item.id === id) {
      receiptItems.push({
        item: item,
        count: 1
      });
    }
  });

  localStorage.setItem('receiptItems', JSON.stringify(receiptItems));
  updateSelectCount();
}

function updateSelectCount(){
  var selectedCount = JSON.parse(localStorage.getItem("receiptItems")).length;
  $("#selectedCount").text(selectedCount);
}

function init() {
  var allItems = initAllItems();
  var itemsHTML = addItemsHTML(allItems);

  appendItems(itemsHTML);
  updateSelectCount();
}

function initAllItems() {
  if (localStorage.allItems == null) {
    $.getJSON("./data.json", function(data) {
      localStorage.setItem("allItems", JSON.stringify(data.allItems));
    });
    return JSON.parse(localStorage.getItem("allItems"));
  }
  return JSON.parse(localStorage.getItem("allItems"));
}

function addItemsHTML(allItems) {
  var itemsHTML = '';
  allItems.forEach(function(item) {
    itemsHTML += '<tr id="' + item.id + '"><td class="goods"><span>' + item.name + '</span></td><td class="price">' + item.price + '/' + item.unit + '</td><td><button class="btn btn-default select-button" type="submit" data-id="' + item.id + '">选择</button></td>';
  });
  return itemsHTML;
}

function appendItems(itemsHTML) {
  $("tbody").append(itemsHTML);
}
