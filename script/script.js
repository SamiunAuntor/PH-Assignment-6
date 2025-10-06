const getCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("category-options");
    categoriesContainer.innerHTML = "";

    for (const category of categories) {
        categoriesContainer.innerHTML += `
            <button class="text-base py-2 px-4 text-left whitespace-nowrap">
                ${category.category_name}
            </button>
        `;
    }
}

getCategories();


const getPlants = () => {
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
            <h2 class="text-sm font-semibold mt-3">${plant.name}</h2>
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
            <button class="w-full bg-[#15803D] text-white text-base py-2.5 rounded-full mt-3 mb-4 hover:bg-[#166534] transition-colors">
                Add to Cart
            </button>
        </div>
    </div>
        `;
    }
}

getPlants();
