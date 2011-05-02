describe("Product", function() {
  beforeEach(function() {
    product = Product.wooden_sword();
  });
  it("should default amount", function() {
    expect(product.amount).toEqual(1);
  });
  it("should have value", function() {
    expect(product.value).toBeDefined();
  });
  it("should not allow negative value", function() {
    expect(new Product({name: 'A', value: -3 }).value).toEqual(3);
    expect(new Product({name: 'A', value: 4.2 }).value).toEqual(4.2);
    expect(new Product({name: 'A', value: 0 }).value).toEqual(1);
  });
  it("should not be for sale", function() {
    expect(product.forSale).toBeFalsy();
  });
});