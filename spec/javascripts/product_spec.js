describe("Product", function() {
  beforeEach(function() {
    product = Product.wooden_sword();
  });
  it("default amount", function() {
    expect(product.amount).toEqual(1);
  });
});