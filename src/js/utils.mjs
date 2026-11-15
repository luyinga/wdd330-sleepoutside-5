// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(
    position,
    data.map((item) => template(item)).join("")
  );
}

export function updateCartCount() {
  const cartCount = qs("#cart-count");
  if (cartCount) {
    cartCount.textContent = getLocalStorage("so-cart")?.length ?? 0;
  }
}

export function renderListWithTemplate(template, parentElement, list, position = 'afterbegin', clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
export async function loadTemplate(templatePath) {
  const res = await fetch(templatePath);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerElement = document.querySelector('footer');
  const headerElement = document.querySelector('header');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

//export function updateCartCount() {
 // const cartItems = getLocalStorage('so-cart') || [];
 // const cartCountElement = document.querySelector('#cart-count');
 // if (cartCountElement) {
  //  cartCountElement.textContent = cartItems.length;
  //}
//}
