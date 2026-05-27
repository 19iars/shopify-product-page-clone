document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  function getCartInfo() {
    const params = new URLSearchParams(window.location.search);
    return {
      color: params.get("color") || "Black",
      size: params.get("size") || "S",
      qty: Number(params.get("qty") || 1),
      unitPrice: 89.99,
      name: "Premium Oversized Hoodie",
    };
  }

  function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
  }

  function renderCartPage() {
    const { color, size, qty, unitPrice, name } = getCartInfo();
    const cartSummary = document.getElementById("cartSummary");
    const subtotalAmount = document.getElementById("subtotalAmount");
    const totalAmount = document.getElementById("totalAmount");
    const checkoutLink = document.getElementById("checkoutLink");

    if (!cartSummary || !subtotalAmount || !totalAmount || !checkoutLink) {
      return;
    }

    const subtotal = unitPrice * qty;
    cartSummary.innerHTML = `
      <div class="cart-item">
        <img src="assets/clothing-1.svg" alt="${name} product image" class="cart-item-image">
        <div class="cart-item-details">
          <p class="cart-item-label">${name}</p>
          <p>${color} / ${size}</p>
          <p>Quantity: ${qty}</p>
          <p class="cart-item-price">${formatCurrency(unitPrice)}</p>
        </div>
      </div>
    `;

    subtotalAmount.textContent = formatCurrency(subtotal);
    totalAmount.textContent = formatCurrency(subtotal);
    checkoutLink.href = `checkout.html?color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}&qty=${qty}`;
  }

  function renderCheckoutPage() {
    const { color, size, qty, unitPrice, name } = getCartInfo();
    const checkoutSummary = document.getElementById("checkoutSummary");
    const checkoutSubtotal = document.getElementById("checkoutSubtotal");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const placeOrderBtn = document.getElementById("placeOrderBtn");

    if (!checkoutSummary || !checkoutSubtotal || !checkoutTotal || !placeOrderBtn) {
      return;
    }

    const subtotal = unitPrice * qty;
    checkoutSummary.innerHTML = `
      <div class="checkout-item">
        <img src="assets/clothing-1.svg" alt="${name} product image" class="checkout-item-image">
        <div class="checkout-item-details">
          <p class="checkout-item-label">${name}</p>
          <p>${color} / ${size}</p>
          <p>Quantity: ${qty}</p>
          <p class="checkout-item-price">${formatCurrency(subtotal)}</p>
        </div>
      </div>
      <div class="checkout-notice">
        <p>Please confirm your order details and click Place order to complete the checkout process.</p>
      </div>
    `;

    checkoutSubtotal.textContent = formatCurrency(subtotal);
    checkoutTotal.textContent = formatCurrency(subtotal);

    placeOrderBtn.addEventListener("click", () => {
      window.location.href = "product.html";
    });
  }

  if (currentPath.endsWith("cart.html")) {
    renderCartPage();
    return;
  }

  if (currentPath.endsWith("checkout.html")) {
    renderCheckoutPage();
    return;
  }

  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".gallery-thumb");
  const colorButtons = document.querySelectorAll(".variant-btn--color");
  const sizeButtons = document.querySelectorAll(".variant-group[aria-label='Size options'] .variant-btn");
  const quantityValue = document.getElementById("quantity");
  const minusBtn = document.getElementById("minus");
  const plusBtn = document.getElementById("plus");
  const addToCartBtn = document.getElementById("addToCart");
  const buyNowBtn = document.getElementById("buyNow");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  let quantity = 1;

  function updateActive(elements, activeElement) {
    elements.forEach((element) => {
      const isActive = element === activeElement;
      element.classList.toggle("active", isActive);
      if (element.hasAttribute("aria-pressed")) {
        element.setAttribute("aria-pressed", isActive ? "true" : "false");
      }
    });
  }

  function setMainImage(src) {
    if (!mainImage) return;
    mainImage.src = src;
    mainImage.alt = `Premium Oversized Hoodie product image`;
  }

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      updateActive(thumbnails, thumb);
      setMainImage(thumb.dataset.image);
    });
  });

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateActive(colorButtons, button);
      setMainImage(button.dataset.variantImage);
    });
  });

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => updateActive(sizeButtons, button));
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      quantityValue.textContent = quantity;
    }
  });

  plusBtn.addEventListener("click", () => {
    quantity += 1;
    quantityValue.textContent = quantity;
  });

  function getActiveOption(selector) {
    const activeButton = document.querySelector(selector);
    return activeButton ? activeButton.dataset.option : "Black";
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const selectedColor = getActiveOption(".variant-btn--color.active");
      const selectedSize = getActiveOption(".variant-group[aria-label='Size options'] .variant-btn.active");
      window.location.href = `cart.html?color=${encodeURIComponent(selectedColor)}&size=${encodeURIComponent(selectedSize)}&qty=${quantity}`;
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const selectedColor = getActiveOption(".variant-btn--color.active");
      const selectedSize = getActiveOption(".variant-group[aria-label='Size options'] .variant-btn.active");
      window.location.href = `checkout.html?color=${encodeURIComponent(selectedColor)}&size=${encodeURIComponent(selectedSize)}&qty=${quantity}`;
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateActive(tabButtons, button);
      tabButtons.forEach((btn) => btn.setAttribute("aria-selected", btn === button ? "true" : "false"));
      tabPanels.forEach((panel) => panel.classList.toggle("active", panel.id === button.dataset.tab));
    });
  });
});
