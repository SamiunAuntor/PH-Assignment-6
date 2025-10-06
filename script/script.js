// Cart array to store items
let cart = [];

const getCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("category-options");
    // categoriesContainer.innerHTML = "";

    for (const category of categories) {
        categoriesContainer.innerHTML += `
        <button onclick="displayCurrentCategoryCards(${category.id}, this)" 
            class="category-btn text-base py-2 px-4 text-left whitespace-nowrap mt-2 rounded-md bg-white text-black">
        ${category.category_name}
        </button>
`;

    }
}

getCategories();


// Show loading spinner
const showLoading = () => {
    const productCards = document.querySelector(".product-cards");
    productCards.innerHTML = `
        <div class="col-span-3 flex justify-center items-center py-20">
            <span class="loading loading-spinner loading-xl text-[#15803D]"></span>
        </div>
    `;
}

const getPlants = (btn) => {
    // Remove active from all buttons
    document.querySelectorAll(".category-btn").forEach(b => {
        b.classList.remove("bg-[#15803D]", "text-white");
        b.classList.add("bg-white", "text-black");
    });

    // Add active to clicked button
    if (btn) {
        btn.classList.add("bg-[#15803D]", "text-white");
        btn.classList.remove("bg-white", "text-black");
    } else {
        // If no button passed, select the first button
        const firstBtn = document.querySelector(".category-btn");
        if (firstBtn) {
            firstBtn.classList.add("bg-[#15803D]", "text-white");
            firstBtn.classList.remove("bg-white", "text-black");
        }
    }

    // Show loading spinner
    showLoading();

    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
        .catch(err => console.log(err));
}

const displayPlants = (plants) => {
    const productCards = document.querySelector(".product-cards");
    productCards.innerHTML = "";

    for (const plant of plants) {
        productCards.innerHTML += `
            <div class="card bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div class="pl-4 pt-4 pr-4 pb-1 flex flex-col flex-1">
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-xl">
            <h2 onclick='showPlantModal(${JSON.stringify(plant)})' class="text-sm font-semibold mt-3 cursor-pointer hover:text-[#15803D] transition-colors">${plant.name}</h2>
            <p class="text-xs text-[#1F2937] mt-1 leading-relaxed flex-1">
                ${plant.description}
            </p>
            <div class="flex justify-between items-center mt-3">
                <h2 class="text-[#15803D] bg-[#DCFCE7] rounded-full py-1 px-3 text-xs font-medium">
                    ${plant.category}
                </h2>
                <h2 class="text-sm font-semibold">
                    <span class="font-semibold">৳</span>${plant.price}
                </h2>
            </div>
            <button onclick='addToCart(${JSON.stringify(plant)})' class="w-full bg-[#15803D] text-white text-base py-2.5 rounded-full mt-3 mb-4 hover:bg-[#166534] transition-colors">
                Add to Cart
            </button>
        </div>
    </div>
        `;
    }
}

// Show plant modal
const showPlantModal = (plant) => {
    document.getElementById('modal-plant-name').textContent = plant.name;
    document.getElementById('modal-plant-image').src = plant.image;
    document.getElementById('modal-plant-description').textContent = plant.description;
    document.getElementById('modal-plant-category').textContent = plant.category;
    document.getElementById('modal-plant-price').textContent = plant.price;
    plant_modal.showModal();
}

// Add to cart function
const addToCart = (plant) => {
    // Check if plant already exists in cart
    const existingItem = cart.find(item => item.name === plant.name);
    
    if (existingItem) {
        // If exists, increase quantity
        existingItem.quantity++;
    } else {
        // If not, add new item with quantity 1
        cart.push({ ...plant, quantity: 1 });
    }
    
    displayCart();
}

// Display cart items
const displayCart = () => {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    // Clear cart display
    cartContainer.innerHTML = '';
    
    // Calculate total
    let total = 0;
    
    // Display each cart item
    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        total += itemTotal;
        
        cartContainer.innerHTML += `
            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <div class="flex flex-col">
                    <span class="text-base font-semibold text-[#1F2937]">${item.name}</span>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-sm text-gray-600">৳${item.price} × ${item.quantity}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="decrementQuantity(${index})" class="bg-gray-200 hover:bg-gray-300 text-[#1F2937] font-bold w-6 h-6 rounded flex items-center justify-center">−</button>
                    <button onclick="incrementQuantity(${index})" class="bg-gray-200 hover:bg-gray-300 text-[#1F2937] font-bold w-6 h-6 rounded flex items-center justify-center">+</button>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 text-lg ml-1">❌</button>
                </div>
            </div>
        `;
    });
    
    // Update total
    totalElement.textContent = total.toFixed(0);
}

// Remove from cart function - removes entire item
const removeFromCart = (index) => {
    cart.splice(index, 1);
    displayCart();
}

// Increment quantity
const incrementQuantity = (index) => {
    cart[index].quantity++;
    displayCart();
}

// Decrement quantity
const decrementQuantity = (index) => {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        displayCart();
    }
}

getPlants();

const displayCurrentCategoryCards = (id, btn) => {
    // Remove active from all buttons
    document.querySelectorAll(".category-btn").forEach(b => {
        b.classList.remove("bg-[#15803D]", "text-white");
        b.classList.add("bg-white", "text-black");
    });

    // Add active to clicked button
    btn.classList.add("bg-[#15803D]", "text-white");
    btn.classList.remove("bg-white", "text-black");

    // Show loading spinner
    showLoading();

    const url = `https://openapi.programming-hero.com/api/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
        .catch(err => console.log(err));

}
