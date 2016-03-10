describe("itemList", function() {
  describe("addItemsHTML", function() {
    it("can print itemHTML", function() {
      var allItems = [{
        "id": 1,
        "name": "可口可乐",
        "unit": "瓶",
        "price": 3
      }, {
        "id": 2,
        "name": "雪碧",
        "unit": "瓶",
        "price": 3
      }];
      var result = addItemsHTML(allItems);
      var expectResult = '<tr id="1"><td class="goods"><span>可口可乐</span></td><td class="price">3/瓶</td><td><button class="btn btn-default select-button" type="submit" data-id="1">选择</button></td><tr id="2"><td class="goods"><span>雪碧</span></td><td class="price">3/瓶</td><td><button class="btn btn-default select-button" type="submit" data-id="2">选择</button></td>';

      expect(result).toEqual(expectResult);
    });
  });
});
