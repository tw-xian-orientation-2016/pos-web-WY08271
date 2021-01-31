describe("cart", function() {
  describe("calculatepriceTotal", function() {
    it("can calculate allItems price", function() {
      var receiptItems = [{
        item: {
          "id": 2,
          "name": "雪碧",
          "unit": "瓶",
          "price": 3
        },
        count: 1
      }];
      var result = calculatepriceTotal(receiptItems);

      expect(result).toEqual(3);
    });
  });
});
