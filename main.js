// 商品資料（你之後可以自己加）
const products = [
  {
    id: 1,
    name: "Black Jacket",
    price: 1680,
    image: "images/black-jacket.jpg",
    sizes: ["S", "M", "L"]
  },
  {
    id: 2,
    name: "Wide Pants",
    price: 1280,
    image: "images/wide-pants.jpg",
    sizes: ["M", "L"]
  },
  {
    id: 3,
    name: "Basic Tee",
    price: 890,
    image: "images/basic-tee.jpg",
    sizes: ["S", "M", "L", "XL"]
  }
];

const productList = document.getElementById("productList");

// 如果是在 shop.html 才執行
if (productList) {
  products.forEach(item => {
    const div = document.createElement("div");
    div.className = "product";

  div.innerHTML = `
  <img src="${item.image}">
  <h3>${item.name}</h3>
  <p>$${item.price}</p>

  <label>尺寸</label>
  <select id="size-${item.id}">
    ${item.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
  </select>

  <label>數量</label>
  <input type="number" id="qty-${item.id}" value="1" min="1">

  <button onclick="addToCart(${item.id})">
    加入購物車
  </button>
`;



    productList.appendChild(div);
  });
}

// 加入購物車
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);

  const size = document.getElementById(`size-${id}`).value;
  const qty = Number(document.getElementById(`qty-${id}`).value);

  cart.push({
    ...product,
    size: size,
    qty: qty
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車");
}
// ===== 購物車頁面 =====
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");

if (cartList && cartTotal) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;


    const div = document.createElement("div");
    div.className = "cart-item";

   div.innerHTML = `
  <img src="${item.image}">
  <div>
    <h3>${item.name}</h3>
    <p>尺寸：${item.size}</p>
    <p>數量：${item.qty}</p>
    <p>小計：$${item.price * item.qty}</p>
    <button onclick="removeFromCart(${index})">
      移除
    </button>
  </div>
`;


    cartList.appendChild(div);
  });

  cartTotal.innerHTML = `總金額：$${total}`;
}

// 移除商品
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

  const firebaseConfig = {
    apiKey: "你的",
    authDomain: "你的",
    projectId: "你的",
    storageBucket: "你的",
    messagingSenderId: "你的",
    appId: "你的"
  };

  initializeApp(firebaseConfig);
</script>
