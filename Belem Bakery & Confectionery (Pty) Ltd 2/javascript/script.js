// ===============================
// Belem Bakery - Fully Optimized + Cleaned Main JS
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // NAVBAR TOGGLE + ACTIVE LINK
  // ===============================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if ((currentPath === "/" || currentPath.endsWith("index.html")) && href === "index.html") {
      link.classList.add('active');
    } else if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // ===============================
  // ACCORDIONS
  // ===============================
  document.querySelectorAll('.accordion').forEach(acc => {
    acc.addEventListener('click', () => {
      acc.classList.toggle('active');
      const panel = acc.nextElementSibling;
      panel.style.maxHeight = acc.classList.contains('active') ? `${panel.scrollHeight}px` : null;
    });
  });


  // ===============================
  // TABS
  // ===============================
  const tabButtons = document.querySelectorAll('.tab-buttons button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(tc => {
        tc.style.display = tc.id === btn.dataset.tab ? 'block' : 'none';
      });
    });
  });


  // ===============================
  // MODALS WITH OVERLAY
  // ===============================
  const overlay = document.querySelector('.modal-overlay');

  document.querySelectorAll('[data-target]').forEach(btn => {
    const target = document.getElementById(btn.dataset.target);
    const closeBtn = target?.querySelector('.modal-close');

    if (target && closeBtn) {
      btn.addEventListener('click', () => {
        target.classList.add('active');
        overlay?.classList.add('active');
      });

      closeBtn.addEventListener('click', () => {
        target.classList.remove('active');
        overlay?.classList.remove('active');
      });
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
      overlay.classList.remove('active');
    });
  }


  // ===============================
  // MAP
  // ===============================
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map('map').setView([-26.2411699, 28.0681872], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-26.2411699, 28.0681872]).addTo(map).bindPopup('Belem Bakery');
  }


  // ===============================
  // AOS ANIMATIONS
  // ===============================
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }


  // ===============================
  // GALLERY LIGHTBOX
  // ===============================
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }


  // ===============================
  // PRODUCT SEARCH + SORT
  // ===============================
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (productGrid) {
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        productCards.forEach(card => {
          card.style.display = card.dataset.name.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const sorted = [...productCards];
        sorted.sort((a, b) => {
          return sortSelect.value === 'name'
            ? a.dataset.name.localeCompare(b.dataset.name)
            : parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        });
        sorted.forEach(card => productGrid.appendChild(card));
      });
    }
  }


  // ===============================
  // ENQUIRY FORM
  // ===============================
  const enquiryForm = document.getElementById('enquiry-form');
  const enquiryResponse = document.getElementById('enquiry-response');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', e => {
      e.preventDefault();

      enquiryForm.querySelectorAll('.error-message').forEach(el => el.textContent = '');

      const name = enquiryForm.name.value.trim();
      const email = enquiryForm.email.value.trim();
      const enquiryType = enquiryForm.enquiryType.value;
      const details = enquiryForm.details.value.trim();

      let valid = true;
      if (!name) {
        enquiryForm.querySelector('#name-error').textContent = 'Please enter your name.';
        valid = false;
      }
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        enquiryForm.querySelector('#email-error').textContent = 'Enter a valid email.';
        valid = false;
      }
      if (!details) {
        enquiryForm.querySelector('#details-error').textContent = 'Please enter details.';
        valid = false;
      }

      if (!valid) return;

      enquiryResponse.textContent = 'Submitting...';
      enquiryResponse.style.color = 'blue';

      setTimeout(() => {
        enquiryResponse.textContent = `Thanks, ${name}! Your enquiry about "${enquiryType}" has been submitted.`;
        enquiryResponse.style.color = 'green';
        enquiryForm.reset();

        setTimeout(() => enquiryResponse.textContent = '', 4000);
      }, 1000);
    });
  }


  // ===============================
  // CONTACT FORM
  // ===============================
  const contactForm = document.getElementById('contact-form');
  const contactResponse = document.getElementById('contact-response');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const msg = contactForm.message.value.trim();

      if (!name || !email || !subject || !msg) {
        contactResponse.textContent = 'Fill in all fields.';
        contactResponse.style.color = 'red';
        return;
      }

      contactResponse.textContent = 'Sending...';
      contactResponse.style.color = 'blue';

      setTimeout(() => {
        contactResponse.textContent = `Thanks, ${name}! Your message has been sent.`;
        contactResponse.style.color = 'green';
        contactForm.reset();
      }, 1000);
    });
  }


  // ===============================
  // DARK MODE
  // ===============================
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (darkModeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️ Light Mode';
    }

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const dark = document.body.classList.contains('dark-mode');
      darkModeToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }


  // ===============================
  // CART SYSTEM (CLEAN + FINAL)
  // ===============================
  let cart = [];

  /* DOM ELEMENTS */
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const cartModal = document.getElementById("cartModal");
  const cartClose = document.querySelector(".cart-close");

  const orderMenu = document.getElementById("orderMenu");
  const cartItemsList = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");

  const cartItemsModal = document.getElementById("cartItemsModal");
  const cartTotalModal = document.getElementById("cartTotalModal");

  const detailsForm = document.getElementById("detailsForm");
  const customerFormSection = document.getElementById("customerForm");
  const cartSection = document.getElementById("cartSection");

  const checkoutBtn = document.getElementById("checkoutBtn");
  const orderModal = document.getElementById("orderModal");
  const orderModalClose = document.querySelector(".close-btn");
  const orderMsg = document.getElementById("order-confirmation");

  /* MENU ITEMS */
  const menuItems = [
    { id: 1, name: "Pastéis de Nata", price: 15 },
    { id: 2, name: "Brown Coffee", price: 38 },
    { id: 3, name: "Prawn Rissoles", price: 18 },
    { id: 4, name: "Latte", price: 35 },
    { id: 5, name: "Portuguese Rolls (each)", price: 6 },
    { id: 6, name: "Portuguese Rolls (6 pack)", price: 30 },
    { id: 7, name: "Chicken Pie", price: 25 },
    { id: 8, name: "Bolo de Bolacha (slice)", price: 40 },
    { id: 9, name: "White Mocha Latte", price: 40 },
    { id: 10, name: "Iced Mocha", price: 42 }
  ];

  /* RENDER MENU */
  function loadMenu() {
    orderMenu.innerHTML = "";
    menuItems.forEach(item => {
      orderMenu.innerHTML += `
      <div class="menu-item">
        <h4>${item.name}</h4>
        <p>R${item.price}</p>
        <button class="addToCart" data-id="${item.id}">Add to Cart</button>
      </div>`;
    });
  }

  /* ADD TO CART */
  document.addEventListener("click", e => {
    if (e.target.classList.contains("addToCart")) {
      const id = Number(e.target.dataset.id);
      const product = menuItems.find(i => i.id === id);

      const existing = cart.find(i => i.id === id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCart();
    }
  });

  /* UPDATE CART */
  function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;

      cartItemsList.innerHTML += `
      <li>
        ${item.name}
        <button class="minus" data-id="${item.id}">-</button>
        ${item.quantity}
        <button class="plus" data-id="${item.id}">+</button>
        <span>R${item.price * item.quantity}</span>
      </li>`;
    });

    totalPriceEl.textContent = `Total: R${total}`;

    // Update modal cart
    renderModalCart();

    // Update cart badge
    let count = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "inline-block" : "none";
  }

  /* MODAL CART */
  function renderModalCart() {
    cartItemsModal.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;

      cartItemsModal.innerHTML += `
      <li>
        <strong>${item.name}</strong>
        <button class="minus" data-id="${item.id}">-</button>
        ${item.quantity}
        <button class="plus" data-id="${item.id}">+</button>
        <span>R${item.price * item.quantity}</span>
      </li>`;
    });

    cartTotalModal.textContent = `Total: R${total}`;
  }

  /* QUANTITY BUTTONS */
  document.addEventListener("click", e => {
    if (e.target.classList.contains("plus")) {
      const id = Number(e.target.dataset.id);
      cart.find(i => i.id === id).quantity++;
      updateCart();
    }

    if (e.target.classList.contains("minus")) {
      const id = Number(e.target.dataset.id);
      const item = cart.find(i => i.id === id);

      item.quantity--;
      if (item.quantity === 0) {
        cart = cart.filter(i => i.id !== id);
      }
      updateCart();
    }
  });

  /* OPEN/CLOSE CART MODAL */
  cartIcon.addEventListener("click", () => cartModal.classList.add("active"));
  cartClose.addEventListener("click", () => cartModal.classList.remove("active"));
  cartModal.addEventListener("click", e => {
    if (e.target === cartModal) cartModal.classList.remove("active");
  });

  /* CUSTOMER DETAILS → SHOW MENU */
  detailsForm.addEventListener("submit", e => {
    e.preventDefault();
    customerFormSection.style.display = "none";
    cartSection.style.display = "block";
    loadMenu();
  });

  /* CHECKOUT */
  const submitOrderBtn = document.getElementById("submitOrder");

submitOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add items to your order.");
    return;
  }

  // Show order confirmation modal
  orderModal.style.display = "flex";
  orderMsg.textContent = "Thank you! Your order has been received.";

  // Clear cart
  cart = [];
  updateCart();
});

  /* CLOSE ORDER CONFIRMATION */
  orderModalClose.addEventListener("click", () => {
    orderModal.style.display = "none";
  });
});