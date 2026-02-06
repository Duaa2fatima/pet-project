// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch products data
fetch("./data/products.json")
    .then(res => res.json())
    .then(data => {
        // Find product by ID
        const product = data.find(item => item.id == productId);

        // Safety check
        if (!product) {
            document.body.innerHTML = "<h2>Product not found</h2>";
            return;
        }

        // Set data to HTML
        document.getElementById("product-img").src = product.img;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-category").innerText = product.category;
        document.getElementById("product-capacity").innerText = product.capacity;
        document.getElementById("product-price").innerText = `RS/- ${product.price}`;
        document.getElementById("product-description").innerText =
            product.description || "No description available.";
    });