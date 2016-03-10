$(document).ready(function(){
  var allItems = initAllItems();
  var itemsHTML = addItemsHTML(allItems);
  appendItems(itemsHTML);
});

function initAllItems() {
  if (localStorage.allItems == null) {
    $.getJSON("./data.json", function(data) {
      localStorage.setItem("allItems", JSON.stringify(data.allItems));
    });
  }
  return JSON.parse(localStorage.getItem("allItems"));
}

function addItemsHTML(allItems) {
  var itemsHTML = '';
  allItems.forEach(function(item){
    itemsHTML += '<tr><td class="goods"><span>' + item.name + '</span></td><td class="price">' + item.price + '/' + item.unit + '</td><td class="operation"><span class="select">选择</span></td>';
  });
  return itemsHTML;
}

function appendItems(itemsHTML) {
  $("tbody").append(itemsHTML);
}
