/**
 * Extracts the first name from a full name string.
 *
 * @param {string} fullName - The full user name separated by blank spaces.
 * @returns {string} - The first name extracted from the full name, or the name itself if no blank space is found.
 */
function firstName(fullName) {
  fullName = fullName.trim(); // Removing additional spaces at the beginning and end of the name
  const blankSpace = fullName.indexOf(" "); // Using 'indexOf' to find the first space

  if (blankSpace === -1)
    return fullName; // If no space is found, the full name must be returned
  else return fullName.slice(0, blankSpace); // Otherwise, return the first name, removing the first space
}

/**
 * Verifies the availability of a product in stock based on its type and desired quantity.
 *
 * @param {string} productType - The type of the product to check for availability.
 * @param {number} qty - The desired quantity of the product to check.
 * @returns {boolean} - Returns true if the desired quantity of the specified product type is available in stock,
 *                      otherwise returns false.
 */
function verifyStockAvailability(productType, qty) {
  const stock = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    book: 0,
  };

  const availableStock = stock[productType];
  if (availableStock === undefined || availableStock < qty)
    return false; // If the product is not listed or the desired quantity is less than available, it must return false
  else return true; // Otherwise, it must return true, informing that the product is in stock
}

/**
 * Calculates the total price of an array of products in an e-commerce application.
 *
 * @param {Array} products - An array of product objects, each containing 'price' and 'quantity' properties.
 * @returns {number} - The total price obtained by multiplying the price of each product by its quantity
 *                    and summing up the individual product prices.
 *
 * Example of products array:
 *   [
 *     { name: 'Product 1', price: 10, quantity: 2 },
 *     { name: 'Product 2', price: 15, quantity: 2 },
 *     { name: 'Product 3', price: 20, quantity: 1 }
 *   ]
 */
function calculateTotalPrice(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity; // Fix: Accumulating the total value of the product
  }
  return total;
}

module.exports = { firstName, verifyStockAvailability, calculateTotalPrice };
