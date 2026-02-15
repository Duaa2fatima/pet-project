// ================= MOBILE NAV =================
const mobile_nav = document.querySelector(".navbar-mobile");
const toggle = document.querySelector(".toggle");
const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileDropdownItems = document.querySelector(".mobile-dropdown-items");

if (toggle) {
  toggle.addEventListener("click", () => {
    mobile_nav.classList.toggle("hide");
  });
}

if (mobileDropdown) {
  mobileDropdown.addEventListener("click", () => {
    mobileDropdownItems.classList.toggle("hide");
  });
}

// ================= CATEGORY FILTER =================
const category_filter_btn = document.querySelectorAll(".category-filter button");
const container = document.querySelector(".cards-container");

if (category_filter_btn.length > 0 && container) {
  category_filter_btn[0].classList.add("active_category");

  category_filter_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      category_filter_btn.forEach(b => b.classList.remove("active_category"));
      btn.classList.add("active_category");

      const selectedCategory = btn.innerText.toLowerCase().trim();

      fetch("./data/products.json")
        .then(res => res.json())
        .then(data => {
          let html = "";

          const filteredData =
            selectedCategory === "all"
              ? data
              : data.filter(item => {
                const cat = item.category.toLowerCase();
                if (selectedCategory === "jar") return cat.includes("jar");
                if (selectedCategory === "bottle") return cat.includes("bottle");
              });

          filteredData.forEach(item => {
            html += `
              <a href="./product-detail.html?id=${item.id}">
                <div class="card">
                  <div class="card-banner">
                    <img src="${item.img}" alt="">
                  </div>
                  <div class="card-text">
                    <div>
                      <h3>${item.name}</h3>
                      <p>${item.capacity}</p>
                    </div>
                    <div>
                      <p>${item.category}</p>
                      <p>RS/- ${item.price}</p>
                    </div>
                     
                  </div>
                </div>
              </a>
            `;
          });

          container.innerHTML =
            filteredData.length ? html : "<p>No products found</p>";
        });
    });
  });
}

// ================= LOAD ALL PRODUCTS (DEFAULT) =================

fetch("./data/products.json")
  .then(res => res.json())
  .then(data => {
    let html = "";

    data.forEach(element => {
      html += `
        <div class="card">

          <a href="./product-detail.html?id=${element.id}" class="card-link">
            <div class="card-banner">
              <img src="${element.img}" alt="${element.name}">
            </div>
          </a>

          <div class="card-text">
            <div class="card-top">
              <h3>${element.name}</h3>
              <p>${element.capacity}</p>
            </div>

            <div class="card-middle">
              <p class="category">${element.category}</p>
              <p class="price">RS/- ${element.price}</p>
            </div>

            <div class="card-bottom">
              <a href="${element.pdf}" download class="download-btn">
                Product Details
              </a>
            </div>
          </div>

        </div>
      `;
    });

    if (container) container.innerHTML = html;
  });






// For Jars
fetch("./data/products.json")
  .then((res) => res.json())
  .then((data) => {
    let bottle = "";
    data.filter(item => item.category === "Jar").forEach((element) => {
      bottle += `
             <a href="./product-detail.html?id=${element.id}">
            <div class="card">
                <div class="card-banner">
                    <img src="${element.img}" alt="">
                </div>
                <div class="card-text">
                <div>
                    <h3>${element.name}</h3>
                    <p>${element.capacity}</p>
                </div>
                <div>
                    <p>${element.category}</p>
                    <p>RS/- ${element.price}</p>
                </div>
               
                </div>
            </div>
            </a>
        `;

      document.getElementsByClassName("jars-cards-container")[0].innerHTML = bottle;
    });
  });

// For Bottles
fetch("./data/products.json")
  .then((res) => res.json())
  .then((data) => {
    let bottle = "";
    data.filter(item => item.category === "Bottle").forEach((element) => {
      bottle += `
            <a href="./product-detail.html?id=${element.id}">
            <div class="card">
                <div class="card-banner">
                    <img src="${element.img}" alt="">
                </div>
                <div class="card-text">
                <div>
                    <h3>${element.name}</h3>
                    <p>${element.capacity}</p>
                </div>
                <div>
                    <p>${element.category}</p>
                    <p>RS/- ${element.price}</p>
                </div>
                
                </div>
            </div>
            </a>
        `;

      document.getElementsByClassName("bottles-cards-container")[0].innerHTML = bottle;
    });
  });

// ================= GALLERY =================
fetch("./data/gallery.json")
  .then(res => res.json())
  .then(data => {
    const topRow = document.querySelector(".top-row");
    const bottomRow = document.querySelector(".bottom-row");

    if (!topRow || !bottomRow) return;

    const half = Math.ceil(data.length / 2);
    const topImages = data.slice(0, half);
    const bottomImages = data.slice(half);

    const createImages = (images) =>
      images.map(img => `
        <div class="gallery-img">
          <img src="${img.item}" alt="Gallery Image">
        </div>
      `).join("");

    topRow.innerHTML = createImages(topImages) + createImages(topImages);
    bottomRow.innerHTML = createImages(bottomImages) + createImages(bottomImages);
  })
  .catch(err => console.error("Gallery error:", err));

// ================= FEEDBACK FORM =================
const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Feedback Submitted");
    form.reset();
  });
}

// ================= CONTACT FORM =================
const contact = document.getElementById("contact");

if (contact) {
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message Sent");
    // contact.reset();
  });
}