// Testando a função 'firstName()'
const { firstName } = require("./validations");

describe("firstName()", () => {
  it("should return the first name, given that it is receiving a full name", () => {
    const fullName = "Davi Brenno Calheiro Souza";
    const result = firstName(fullName);
    expect(result).toBe("Davi");
  });

  it("should return the full name even without spaces", () => {
    const fullName = "Alice";
    const result = firstName(fullName);
    expect(result).toBe("Alice");
  });

  it("should return the first name ignoring spaces at the beginning and end", () => {
    const fullName = "  João Silva  ";
    const result = firstName(fullName);
    expect(result).toBe("João");
  });
});

// Testando a função 'verifyStockAvailability()'
const { verifyStockAvailability } = require("../utils/validations");

describe("verifyStockAvailability()", () => {
  it("should return 'true' if the product is available", () => {
    const product = "smartphone";
    const qty = 20;
    const result = verifyStockAvailability(product, qty);
    expect(result).toBe(true);
  });

  it("should return 'false' if the product is unavailable", () => {
    const product = "book";
    const qty = 1;
    const result = verifyStockAvailability(product, qty);
    expect(result).toBe(false);
  });

  it("should return 'false' if a quantity larger than available is requested", () => {
    const product = "laptop";
    const qty = 15;
    const result = verifyStockAvailability(product, qty);
    expect(result).toBe(false);
  });

  it("should return 'false' if the product is not listed in stock", () => {
    const product = "pencil";
    const qty = 25;
    const result = verifyStockAvailability(product, qty);
    expect(result).toBe(false);
  });
});

// Testando a função 'calculateTotalPrice()'
const { calculateTotalPrice } = require("../utils/validations");

describe("calculateTotalPrice()", () => {
  it("should calculate the total price of products", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 30, quantity: 1 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(80);
  });

  it("should return 0 if the product list is empty", () => {
    const products = [];
    const result = calculateTotalPrice(products);
    expect(result).toBe(0);
  });

  it("should ignore products with zero quantity", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 0 },
      { name: "Product 2", price: 15, quantity: 2 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(30);
  });

  it("should ignore products with zero prices", () => {
    const products = [
      { name: "Product 1", price: 0, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(30);
  });

  it("should ignore products with zero quantity and price", () => {
    const products = [
      { name: "Product 1", price: 0, quantity: 0 },
      { name: "Product 2", price: 15, quantity: 2 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(30);
  });
});
