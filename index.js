const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const storeItemList = document.querySelector(".store--item-list");

function renderStoreItems() {
  storeItemList.innerHTML = "";

  state.items.forEach((item) => {

    const li = document.createElement("li");
    li.innerHTML = `
  <div class="store--item-icon">
    <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
  </div>
  <button data-id="${item.id}">Add to cart </button>`;

    storeItemList.appendChild(li);
  });
}
  renderStoreItems();

const cartItemList = document.querySelector(".cart--item-list");

function renderCartItems() {
  cartItemList.innerHTML = "";

  state.cart.forEach((cartItem) => {

    const li = document.createElement("li");


    li.innerHTML = `
      <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn center" data-id="${cartItem.id}">-</button>
      <span class="quantity-text center">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn center" data-id="${cartItem.id}">+</button>
    `;

    cartItemList.appendChild(li);
  });

  const total = state.cart.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );
  const totalNumber = document.querySelector(".total-number");
  totalNumber.textContent = `£${total.toFixed(2)}`;
}


storeItemList.addEventListener("click", (event) => {

  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  const item = state.items.find((i) => i.id === id);

  const cartItem = state.cart.find((i) => i.id === id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCartItems();
});

cartItemList.addEventListener("click", (event) => {

  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  const cartItem = state.cart.find((i) => i.id === id);

  if (event.target.classList.contains("add-btn")) {
    cartItem.quantity += 1;
  } else if (event.target.classList.contains("remove-btn")) {
    cartItem.quantity -= 1;
  }
  if (cartItem.quantity <= 0) {
    state.cart = state.cart.filter((i) => i.id !== id);
  }
  renderCartItems();
});
