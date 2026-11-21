const baseUrl = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {}
  async getData(category) {
    const response = await fetch(
      `${baseUrl}products/search/${encodeURIComponent(category)}`
    );
    const data = await convertToJson(response);
    return data.Result;
  }
  async searchProducts(searchTerm) {
    const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
    const productsByCategory = await Promise.all(
      categories.map((category) => this.getData(category))
    );
    const normalizedSearchTerm = searchTerm.toLocaleLowerCase();

    return productsByCategory.flat().filter((product) => {
      const searchableText = [
        product.Name,
        product.NameWithoutBrand,
        product.Brand.Name,
        product.Category,
      ]
        .join(' ')
        .toLocaleLowerCase();
      return searchableText.includes(normalizedSearchTerm);
    });
  }
  async findProductById(id) {
    const response = await fetch(`${baseUrl}product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }
}
