const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
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
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}