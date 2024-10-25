// Initialize cart count from localStorage or set to 0 if not present
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

// Display the initial cart count on page load
cartCountElement.textContent = cartCount;

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
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

function moveSlide(direction, sliderClass) {
    const slides = document.querySelectorAll(`.${sliderClass} .product-slide`);
    const totalSlides = slides.length;

    let currentIndex = (sliderClass === 'slider1') ? currentIndex1 : currentIndex2;
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Wrap back to the last slide
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Wrap to the first slide
    }

    const offset = -currentIndex * 100;
    document.querySelector(`.${sliderClass}`).style.transform = `translateX(${offset}%)`;

    // Update the appropriate currentIndex based on the slider
    if (sliderClass === 'slider1') {
        currentIndex1 = currentIndex;
    } else {
        currentIndex2 = currentIndex;
    }
}

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

// Open the login popup
function openLoginForm() {
    document.getElementById("loginModal").style.display = "flex";
}

// Close the login popup
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Open customer care popup
function opencustomercare() {
    document.getElementById("loginModal1").style.display = "flex";
}

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


// Login form submission handler
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User logged in successfully
        document.getElementById('login-success').style.display = 'block';
        document.getElementById('login-success').textContent = 'Login Successful!';
        setTimeout(() => {
          document.getElementById('login-success').style.display = 'none';
        }, 3000);
      })
      .catch((error) => {
        // Error occurred during login
      });
  });
      
  // Listen for authentication state changes
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const usersRef = firebase.database().ref('users');
        usersRef.child(uid).on('value', (snapshot) => {
          const userData = snapshot.val();
          console.log('User data:', userData);
        });
      }
    });
  
  // After successful registration, redirect to login
  alert('Account created successfully! Please log in.');
  window.location.href = 'login.html';  // Change 'login.html' to your login page if needed.
  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
  // Existing and future Auth states will now persist across tabs and reloads
      console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
      console.error('Error setting persistence:', error);
  });
  