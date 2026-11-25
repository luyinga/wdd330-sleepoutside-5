import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";

const searchQuery = getParam("search");
const searchTerm = searchQuery ? searchQuery.trim() : "";
const category = searchTerm || getParam("category");
const dataSource = new ExternalServices();
const htmlElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, htmlElement);

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
