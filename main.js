//---------------------FIREBASE-------------------------
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDp7xTU84S2OarxDOIaHsjAFyVULOBLaKE",
    authDomain: "food-store-8d1f2.firebaseapp.com",
    databaseURL: "https://food-store-8d1f2-default-rtdb.firebaseio.com",
    projectId: "food-store-8d1f2",
    storageBucket: "food-store-8d1f2.firebasestorage.app",
    messagingSenderId: "49920328384",
    appId: "1:49920328384:web:23fdea1bb9d83a37bc2325",
    measurementId: "G-TZ72GRPWJ3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
//-----------------------FIREBASE------------------------
// Initialize Swiper JS
new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: -150,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        256: { slidesPerView: 2 },
        512: { slidesPerView: 3 },
        768: { slidesPerView: 4 }
    }
});

// Initialize cart count from localStorage or set to 0 if not present
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

// Update cart count on page load
if (cartCountElement) cartCountElement.textContent = cartCount;

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Get the product details
        const productCard = this.closest('.card-link');
        const productImage = productCard.querySelector('img').src;
        const productTitle = productCard.querySelector('.badge').textContent;

        // Extract the discounted price
        const productPriceElement = productCard.querySelector('.card-title');
        const originalPrice = productPriceElement.querySelector('s') ? productPriceElement.querySelector('s').textContent : null;
        const discountedPrice = productPriceElement.textContent.replace(originalPrice, '').trim(); // Get the discounted price

        // Retrieve or initialize cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cartItems.findIndex(item => item.title === productTitle);

        if (existingProductIndex !== -1) {
            // If product exists, increment its quantity (or handle duplicates as needed)
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart with the discounted price
            cartItems.push({
                image: productImage,
                title: productTitle,
                price: parseFloat(discountedPrice.replace('₹', '').trim()), // Convert to number
                quantity: 1
            });
        }

        // Update localStorage with updated cartItems
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update cart count
        const cartCount = cartItems.length;
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) cartCountElement.textContent = cartCount;
        
        localStorage.setItem('cartCount', cartCount); // Update cart count in localStorage

        // Show notification
        showNotification();
    });
});



// Show notification
function showNotification() {
    cartNotification.classList.add('show');
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}



// Function to change slides automatically
let currentSlide = 0; // Index of the current slide
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;

function changeSlide() {
    // Remove 'active' class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Increment the slide index
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add 'active' class to the new current slide
    slides[currentSlide].classList.add('active');
}

// Set the slide to change every 6 seconds
setInterval(changeSlide, 6000);

// Slide controls for two sliders
let currentIndex1 = 0;
let currentIndex2 = 0;


// Select all the quantity buttons and add event listeners
document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Find the input field in the same parent container (div.quantity)
        const input = this.parentNode.querySelector('input');
        let currentValue = parseInt(input.value);

        // Check if it's the plus button or minus button
        if (this.textContent === '+') {
            currentValue++; // Increase value by 1
        } else if (this.textContent === '-' && currentValue > 1) {
            currentValue--; // Decrease value by 1, but not below 1
        }

        // Update the input value with the new value
        input.value = currentValue;
    });
});

//-------------------------------CUSTOMER SUPP---------------------
// Open customer care popup
document.getElementById('opencustomer').addEventListener('click', opencustomercare);
function opencustomercare() {
    document.getElementById("loginModal1").style.display = "flex";
}
document.getElementById('closecustomer').addEventListener('click', closecustomercare);
// Close customer care popup
function closecustomercare() {
    document.getElementById("loginModal1").style.display = "none";
}


// Retrieve and display the cart count when the page loads
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
});
//-------------------------------CUSTOMER SUPP---------------------

//-----------------------------LOGIN---------------------------------
document.getElementById('login-image').addEventListener('click', openLoginForm);
// Open the login popup
function openLoginForm() {
    console.log("openLoginForm called");
    document.getElementById("loginModal").style.display = "flex";
}

document.getElementById('closelogin').addEventListener('click', closeLoginForm);
// Close the login popup
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}
// Event listeners for tab switching
document.getElementById('tab2').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('login'); // Switch to the registration tab
});

document.getElementById('tab1').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('register'); // Switch back to the login tab
});
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Optionally, update the title or perform other actions
    const title = tabName === 'login' ? 'Login' : 'Register'; // Adjust as necessary
    document.getElementById('login-register-title').textContent = title;
}

// Login form submission handler
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        document.getElementById('login-success').style.display = 'block';
        document.getElementById('login-success').textContent = 'Login Successful!';
        document.getElementById('error-message').style.display = 'none'; // Hide error message
        setTimeout(() => {
          document.getElementById('login-success').style.display = 'none';
        }, 3000);
      })
      .catch((error) => {
        // Error occurred during login
        console.error('Login Error:', error.message);
        const errorMessage = "Invalid credentials, please try again.";
        document.getElementById('error-message').textContent = errorMessage;
        document.getElementById('error-message').style.display = 'block'; // Show error message
      });
});

// Registration form submission handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        alert('Account created successfully! Please log in.');
        document.getElementById('registerErrorMessage').style.display = 'none'; // Hide error message
        location.reload();  // Refresh the current page
      })
      .catch((error) => {
        // Error occurred during registration
        console.error('Registration Error:', error.message);
        const errorMessage = "An error occurred. Please try again.";
        document.getElementById('registerErrorMessage').textContent = errorMessage;
        document.getElementById('registerErrorMessage').style.display = 'block'; // Show error message
      });
});
// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('User is logged in:', user);
    } else {
        console.log('No user is logged in.');
    }
});
//-------------------------------LOGIN----------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Open FAQ Modal - Attach event listener to both header and footer FAQ links
    const faqLinks = document.querySelectorAll('#openfaq-header, #openfaq-footer');
    faqLinks.forEach(link => {
        link.addEventListener('click', openFAQModal);
    });

    // Close FAQ Modal - Close button
    const closeFaqButton = document.getElementById('closefaq');
    if (closeFaqButton) {
        closeFaqButton.addEventListener('click', closeFAQModal);
    }

    // FAQ Toggle - Toggle answers visibility when a question is clicked
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const answer = document.getElementById(`answer-${index}`);
            const arrow = question.querySelector('.arrow');

            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                arrow.innerHTML = '&#9650;'; // Change arrow to "up"
            } else {
                answer.style.display = 'none';
                arrow.innerHTML = '&#9660;'; // Change arrow to "down"
            }
        });
    });
});

// Open FAQ Modal function
function openFAQModal() {
    const modal = document.getElementById("faqModal");
    if (modal) {
        modal.style.display = "flex"; // Show the modal
    }
}

// Close FAQ Modal function
function closeFAQModal() {
    const modal = document.getElementById("faqModal");
    if (modal) {
        modal.style.display = "none"; // Hide the modal
    }
}


//-------------------------------LOGIN----------------------------


//------------------------------SEARCH--------------------------

console.log("main.js is loaded!");

// Sample product data (replace this with actual data if needed)
const products = [
    { name: "Almonds", description: "Healthy and nutritious nuts.", image: "images/almond.jpg" },
    { name: "Hide&Seek", description: "Delicious and creamy biscuits.", image: "images/biscuit.png" },
    { name: "Maggi", description: "World's favourite noodles.", image: "images/Maggi.jpg" },
    { name: "Coca Cola", description: "Refreshing drink.", image: "images/Coca Cola.jpg" },
    { name: "Chips", description: "Your daily snacks.", image: "images/chips.png" },
    { name: "Haldiram's Bhujia", description: "Crispy and tasty snack.", image: "images/b1.png" },
    { name: "Instant Noodles", description: "Quick and easy meal.", image: "images/r1.png" },
    { name: "Aashirvaad Atta", description: "High-quality wheat flour.", image: "images/a1.png" },
    { name: "Towel", description: "Soft and absorbent towel.", image: "images/towel.png" },
    { name: "Shampoo", description: "Gentle and nourishing for your hair.", image: "images/shampoo.png" },
    { name: "Dettol", description: "Kills 99.9% of germs.", image: "images/dettol.png" },
    { name: "Soap", description: "Pack of 3, cleanses and refreshes.", image: "images/soap.png" },
    { name: "Shower Sponge", description: "Perfect for exfoliating skin.", image: "images/s1.png" },
    { name: "Bathrobe", description: "Comfortable and luxurious.", image: "images/b2.png" },
    { name: "Back Scrubber", description: "Reaches hard-to-clean areas.", image: "images/s2.png" },
    { name: "Soothing Gel", description: "Calming and hydrating.", image: "images/s3.png" },
    { name: "Ceramic Accessory", description: "Stylish and practical ceramic set.", image: "images/s4.png" },
    { name: "Hennessy", description: "A premium cognac with rich, warm flavors and a smooth finish.", image: "cat/wine/hennessy.png" },
    { name: "Duplin", description: "A sweet and fruity wine, perfect for light and refreshing sips.", image: "cat/wine/duplin.png" },
    { name: "Mercer", description: "A bold red wine with notes of dark berries and a hint of spice.", image: "cat/wine/mercer.png" },
    { name: "Lazona", description: "An elegant white wine with citrus and floral undertones.", image: "cat/wine/lazona.png" },
    { name: "Holy Trinity", description: "A vibrant blend of fruity and earthy flavors, a true crowd-pleaser.", image: "cat/wine/holytrinity.png" },
    { name: "Leonard", description: "A budget-friendly wine with a light, crisp profile.", image: "cat/wine/leonard.png" },
    { name: "Francois Rose", description: "A luxurious rosé with delicate flavors of strawberry and rose petals.", image: "cat/wine/Francois Rose.png" },
    { name: "Yalumba Baroosa", description: "A robust red wine with rich tannins and a velvety finish.", image: "cat/wine/GSM.png" },
    { name: "Urlar", description: "A smooth and earthy wine with organic origins.", image: "cat/wine/Urlar.png" },
    { name: "Bacardi", description: "A refreshing and classic white wine with tropical hints.", image: "cat/wine/Bacardi.png" },
    { name: "Cabbage", description: "Fresh and crunchy, perfect for salads or cooking.", image: "cat/vegetables/cabbage.png" },
    { name: "Tomato(1kg)", description: "Juicy and ripe tomatoes, ideal for cooking or salads.", image: "cat/vegetables/tomato.png" },
    { name: "Red Pepper(125g)", description: "Sweet and vibrant peppers, perfect for stir-fries and roasting.", image: "cat/vegetables/pepper.png" },
    { name: "Carrot(200g-250g)", description: "Fresh and crunchy carrots, great for snacking or cooking.", image: "cat/vegetables/carrot.png" },
    { name: "Avocado(150g)", description: "Creamy and nutrient-rich, perfect for guacamole or toast.", image: "cat/vegetables/avacado.png" },
    { name: "Rajma(500g)", description: "High-quality kidney beans, perfect for curries and stews.", image: "cat/vegetables/rajma.png" },
    { name: "Cauliflower(400g)", description: "Fresh and tender cauliflower, great for various dishes.", image: "cat/vegetables/cauliflower.png" },
    { name: "Celery(250g)", description: "Crisp and fresh celery, great for salads or snacking.", image: "cat/vegetables/celery.png" },
    { name: "Onion(1kg)", description: "Versatile and flavorful, a kitchen staple for cooking.", image: "cat/vegetables/onion.png" },
    { name: "Raddish(500g)", description: "Crisp and peppery radishes, perfect for salads or pickling.", image: "cat/vegetables/raddish.png" },
    { name: "Racquet (Pair)", description: "High-quality tennis racquets for professional and casual players.", image: "cat/tennis/t1.png" },
    { name: "Tennis Ball (Set of 4)", description: "Durable tennis balls, designed for extended play and performance.", image: "cat/tennis/t2.png" },
    { name: "Auto Ball Launcher", description: "An automatic ball launcher for solo practice and skill development.", image: "cat/tennis/t3.png" },
    { name: "Racquet Cover", description: "Protect your racquet with this durable and stylish cover.", image: "cat/tennis/t4.png" },
    { name: "Tennis Shoes", description: "Comfortable and high-performance shoes designed for tennis players.", image: "cat/tennis/t5.png" },
    { name: "Ambri Apple (1 dz)", description: "Fresh Ambri apples from Kashmir, known for their sweetness and crispness.", image: "cat/kashmir/a1.png" },
    { name: "Aam Papad (100g)", description: "Tangy and delicious Aam Papad, a favorite snack from Kashmir.", image: "cat/kashmir/k1.png" },
    { name: "Saffron (1 gm)", description: "Pure saffron sourced from Kashmir, known for its premium quality and rich color.", image: "cat/kashmir/k8.png" },
    { name: "Dates (500 g)", description: "Organic Dates, perfect for breakfast.", image: "cat/kashmir/k7.png" },
    { name: "Pinto Beans (500 g)", description: "High-quality Pinto Beans, rich in protein and fiber.", image: "cat/kashmir/k2.png" },
    { name: "Pista (250 g)", description: "Fresh pistachios from Kashmir, offering a rich, creamy taste.", image: "cat/kashmir/k5.png" },
    { name: "Walnut (250 g)", description: "Kashmir walnuts, known for their rich flavor and health benefits.", image: "cat/kashmir/k6.png" },
    { name: "Fox Nut (250 g)", description: "Crispy and healthy fox nuts (makhana) from Kashmir, ideal for snacking.", image: "cat/kashmir/k3.png" },
    { name: "Cashew (250 g)", description: "Premium Kashmiri cashews, perfect for snacking or cooking.", image: "cat/kashmir/k4.png" },
    { name: "Almond Oil (20 ml)", description: "Pure almond oil, ideal for skin care and culinary uses.", image: "cat/kashmir/k9.png" },
    { name: "Red Chilli Powder (500 g)", description: "Spicy and aromatic Kashmiri red chilli powder, known for its vibrant color.", image: "cat/kashmir/k10.png" },
    { name: "Coriander Powder (500 g)", description: "Kashmiri coriander powder, perfect for adding flavor to any dish.", image: "cat/kashmir/k11.png" },
    { name: "Turmeric Powder (500 g)", description: "Pure and high-quality Kashmiri turmeric powder, great for cooking and health.", image: "cat/kashmir/k12.png" },
    { name: "Fennel Powder (500 g)", description: "Aromatic fennel powder from Kashmir, used in a variety of dishes.", image: "cat/kashmir/k13.png" },
    { name: "Cinnamon Powder (500 g)", description: "Freshly ground cinnamon powder from Kashmir, perfect for sweet and savory dishes.", image: "cat/kashmir/k14.png" } 
];


// References to HTML elements
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const resultsContainer = document.createElement('div');

// Add class and append results container to the body
resultsContainer.classList.add('search-results');
document.querySelector('.search-bar').appendChild(resultsContainer); // Append it to the search bar


// Function to filter and display results
function filterProducts(query) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter products by the search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    // Debug log to check filtered products
    console.log("Filtered Products:", filteredProducts);

    // Display filtered results
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item'); // Add class for styling
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            </div>
        `;
        resultsContainer.appendChild(productItem);
    });

    // Show a message if no products match
    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = `<p>No products found.</p>`;
    }
}

// Event listener for search input (when user types)
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        filterProducts(query);
        resultsContainer.style.display = 'block'; // Show results container
    } else {
        resultsContainer.style.display = 'none'; // Hide results container
    }
});

// Event listener for the search button (when user clicks)
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    console.log("Search button clicked. Query:", query); // Debug log
    if (query.length > 0) {
        filterProducts(query);
        resultsContainer.style.display = 'block'; // Show results container
    } else {
        resultsContainer.style.display = 'none'; // Hide results container
    }
});

console.log("Products:", products); // Verify products data


//------------------------------SEARCH--------------------------

// Function to check location availability
function checkLocationAvailability(event) {
    event.preventDefault(); // Prevent form submission (default behavior)

    const location = document.getElementById('location').value.trim();
    const availableLocations = [
        "Kashmir", "kashmir", "KASHMIR",
        "Mumbai", "mumbai", "MUMBAI",
        "Delhi", "delhi", "DELHI",
        "Chennai", "chennai", "CHENNAI",
        "Kolkata", "kolkata", "KOLKATA",
        "Bengaluru", "bengaluru", "BENGALURU",
        "Hyderabad", "hyderabad", "HYDERABAD",
        "Ahmedabad", "ahmedabad", "AHMEDABAD",
        "Pune", "pune", "PUNE",
        "Jaipur", "jaipur", "JAIPUR",
        "Lucknow", "lucknow", "LUCKNOW",
        "Bhopal", "bhopal", "BHOPAL",
        "Indore", "indore", "INDORE"
    ];

    // Check if the location is in the availableLocations array
    if (availableLocations.includes(location)) {
        alert(`✅ Service is available in ${location}!`);
    } else {
        alert(`❌ Sorry, we don’t serve ${location} yet.`);
    }

    // Close the modal after submission (optional)
    closecustomercare();
}

// Attach the checkLocationAvailability function to the form submit
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('locationForm');
    if (form) {
        form.addEventListener('submit', checkLocationAvailability); // Listen to the submit event
    }
});