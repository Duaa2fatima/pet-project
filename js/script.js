const mobile_nav = document.getElementsByClassName("navbar-mobile")[0];
const toggle = document.getElementsByClassName("toggle")[0];
const mobileDropdown = document.querySelector('.mobile-dropdown');
const mobileDropdownItems = document.querySelector('.mobile-dropdown-items');
const category_filter_btn = document.querySelectorAll(".category-filter button");
console.log(category_filter_btn);

const container = document.querySelector(".cards-container");

category_filter_btn[0].classList.add("active_category");

category_filter_btn.forEach((btn) => {
    btn.addEventListener("click", () => {

        category_filter_btn.forEach(b => b.classList.remove("active_category"));
        btn.classList.add("active_category");

        const selectedCategory = btn.innerText.trim().toLowerCase();

        fetch("../../api/products.json")
            .then(res => res.json())
            .then(data => {

                let html = "";

                const filteredData =
                    selectedCategory === "all"
                        ? data
                        : data.filter(item =>
                            item.category.toLowerCase() === selectedCategory
                        );

                filteredData.forEach(element => {
                    html += `
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
                });

                container.innerHTML = html;
            });
    });
});

toggle.addEventListener("click", () => {
    mobile_nav.classList.toggle("hide");
});

mobileDropdown.addEventListener('click', () => {
    mobileDropdownItems.classList.toggle('hide');
});


