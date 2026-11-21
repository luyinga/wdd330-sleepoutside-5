import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";

const searchQuery = getParam("search");
const searchTerm = searchQuery ? searchQuery.trim() : "";
const category = searchTerm || getParam("category");
const productData = new ProductData();
const htmlElement = document.querySelector(".product-list");
const productList = new ProductList(category, productData, htmlElement);

(async () => {
  await loadHeaderFooter();
  updateCartCount();

  if (searchTerm) {
    document.querySelector("#product-list-title").textContent =
      `Search results for "${searchTerm}"`;
    document.querySelector("#product-search").value = searchTerm;
  }

  await productList.init(searchTerm);
})();
