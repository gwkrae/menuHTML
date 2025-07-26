document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === "dark-mode") {
      sunIcon.style.transform = "translateY(-100%)";
      sunIcon.style.opacity = "0";
      moonIcon.style.transform = "translateY(0)";
      moonIcon.style.opacity = "1";
    }
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light-mode");
      sunIcon.style.transform = "translateY(0)";
      sunIcon.style.opacity = "1";
      moonIcon.style.transform = "translateY(100%)";
      moonIcon.style.opacity = "0";
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
      sunIcon.style.transform = "translateY(-100%)";
      sunIcon.style.opacity = "0";
      moonIcon.style.transform = "translateY(0)";
      moonIcon.style.opacity = "1";
    }
  });

  const quickViewToggle = document.getElementById("quick-view-toggle");
  const detailedViewToggle = document.getElementById("detailed-view-toggle");
  const menuItemsContainer = document.querySelector(".menu-items");
  const itemCards = document.querySelectorAll(".item-card");

  const detailedViewModal = document.getElementById("detailedViewModal");
  const closeModal = document.querySelector(".close-button");
  const modalItemImage = document.getElementById("modal-item-image");
  const modalItemName = document.getElementById("modal-item-name");
  const modalItemDescription = document.getElementById(
    "modal-item-description"
  );
  const modalItemPrice = document.getElementById("modal-item-price");
  const prevItemBtn = document.getElementById("prevItemBtn");
  const nextItemBtn = document.getElementById("nextItemBtn");

  let currentItemIndex = 0;
  const items = Array.from(itemCards);

  function showItemInModal(index) {
    if (index < 0) {
      currentItemIndex = items.length - 1;
    } else if (index >= items.length) {
      currentItemIndex = 0;
    } else {
      currentItemIndex = index;
    }

    const currentItem = items[currentItemIndex];
    const imageSrc = currentItem.querySelector(".item-image img").src;
    const name = currentItem.querySelector("h2").textContent;
    const description =
      currentItem.querySelector(".item-description").textContent;
    const price = currentItem.querySelector(".item-price").textContent;

    modalItemImage.src = imageSrc;
    modalItemImage.alt = name;
    modalItemName.textContent = name;
    modalItemDescription.textContent = description;
    modalItemPrice.textContent = price;

    detailedViewModal.style.display = "block";
  }

  quickViewToggle.addEventListener("click", () => {
    quickViewToggle.classList.add("active");
    detailedViewToggle.classList.remove("active");
    menuItemsContainer.classList.add("quick-view");
    detailedViewModal.style.display = "none";
  });

  detailedViewToggle.addEventListener("click", () => {
    detailedViewToggle.classList.add("active");
    quickViewToggle.classList.remove("active");
    menuItemsContainer.classList.remove("quick-view");
    showItemInModal(0);
  });

  itemCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (quickViewToggle.classList.contains("active")) {
        showItemInModal(index);
      }
    });
  });

  closeModal.addEventListener("click", () => {
    detailedViewModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === detailedViewModal) {
      detailedViewModal.style.display = "none";
    }
  });

  prevItemBtn.addEventListener("click", () => {
    showItemInModal(currentItemIndex - 1);
  });

  nextItemBtn.addEventListener("click", () => {
    showItemInModal(currentItemIndex + 1);
  });
});
