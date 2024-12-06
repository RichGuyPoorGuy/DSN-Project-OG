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

// Initialize cart count from localStorage or set to 0 if not present
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

// Display the initial cart count on page load
cartCountElement.textContent = cartCount;

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the closest product container (assuming the button is inside the product container)
        const productBox = this.closest('.product-box');
        
        // Get product image, title, and quantity
        const productImage = productBox.querySelector('img').src; // assuming product image is in an <img> tag
        const productTitle = productBox.querySelector('h3').textContent; // assuming product title is in an <h3> tag
        const productQuantity = productBox.querySelector('.quantity input').value; // assuming quantity input is inside an element with class 'quantity'
        const productPrice= productBox.querySelector('.price').textContent.split(' ')[1];
        console.log(productBox.querySelector('.price').textContent.split(' '))

        // Add the product details to the cart (you can store it in an array or object)
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // retrieve existing cart items or initialize an empty array
        
        // Check if the item already exists in the cart, if not, add it
        const existingProductIndex = cartItems.findIndex(item => item.title === productTitle && item.image === productImage && item.price == productPrice);
        
        if (existingProductIndex !== -1) {
            // If product is already in cart, update the quantity
            cartItems[existingProductIndex].quantity += parseInt(productQuantity-cartItems[existingProductIndex].quantity);
        } else {
            // If product is not in cart, add a new entry
            cartItems.push({
                image: productImage,
                title: productTitle,
                price: productPrice,
                quantity: parseInt(productQuantity),
            });
        }
        
        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Increment cart count
        cartCount = parseInt(cartItems.length);
        cartCountElement.textContent = cartCount;

        // Store the updated cart count in localStorage
        localStorage.setItem('cartCount', cartCount);

        showNotification();
    });
});

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
    { name: "Hennessy", description: "A premium cognac with rich, warm flavors and a smooth finish.", image: "wine/hennessy.png" },
    { name: "Duplin", description: "A sweet and fruity wine, perfect for light and refreshing sips.", image: "wine/duplin.png" },
    { name: "Mercer", description: "A bold red wine with notes of dark berries and a hint of spice.", image: "wine/mercer.png" },
    { name: "Lazona", description: "An elegant white wine with citrus and floral undertones.", image: "wine/lazona.png" },
    { name: "Holy Trinity", description: "A vibrant blend of fruity and earthy flavors, a true crowd-pleaser.", image: "wine/holytrinity.png" },
    { name: "Leonard", description: "A budget-friendly wine with a light, crisp profile.", image: "wine/leonard.png" },
    { name: "Francois Rose", description: "A luxurious rosé with delicate flavors of strawberry and rose petals.", image: "wine/Francois Rose.png" },
    { name: "Yalumba Baroosa", description: "A robust red wine with rich tannins and a velvety finish.", image: "wine/GSM.png" },
    { name: "Urlar", description: "A smooth and earthy wine with organic origins.", image: "wine/Urlar.png" },
    { name: "Bacardi", description: "A refreshing and classic white wine with tropical hints.", image: "wine/Bacardi.png" },
    { name: "Cabbage", description: "Fresh and crunchy, perfect for salads or cooking.", image: "vegetables/cabbage.png" },
    { name: "Tomato(1kg)", description: "Juicy and ripe tomatoes, ideal for cooking or salads.", image: "vegetables/tomato.png" },
    { name: "Red Pepper(125g)", description: "Sweet and vibrant peppers, perfect for stir-fries and roasting.", image: "vegetables/pepper.png" },
    { name: "Carrot(200g-250g)", description: "Fresh and crunchy carrots, great for snacking or cooking.", image: "vegetables/carrot.png" },
    { name: "Avocado(150g)", description: "Creamy and nutrient-rich, perfect for guacamole or toast.", image: "vegetables/avacado.png" },
    { name: "Rajma(500g)", description: "High-quality kidney beans, perfect for curries and stews.", image: "vegetables/rajma.png" },
    { name: "Cauliflower(400g)", description: "Fresh and tender cauliflower, great for various dishes.", image: "vegetables/cauliflower.png" },
    { name: "Celery(250g)", description: "Crisp and fresh celery, great for salads or snacking.", image: "vegetables/celery.png" },
    { name: "Onion(1kg)", description: "Versatile and flavorful, a kitchen staple for cooking.", image: "vegetables/onion.png" },
    { name: "Raddish(500g)", description: "Crisp and peppery radishes, perfect for salads or pickling.", image: "vegetables/raddish.png" }
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