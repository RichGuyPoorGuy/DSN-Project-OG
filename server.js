const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51QQXJiF43iHU3dyOzGJSxZBuuN96OLvyzRvuCzJMHVjKa3Q1ZkFL7oQQZnZki8KBvEupYJ7F8uKCYaWquMK40d2W00NzlNPVIg'); // Load Stripe with the secret key
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 4242;

// Middleware
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(bodyParser.json());

// Create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items } = req.body;

        // Transform items into the format required by Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price, // Price in paise
            },
            quantity: item.quantity,
        }));

        // Create the session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Specify allowed payment methods
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/success.html`, // Redirect on success
            cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,  // Redirect on cancellation
        });

        res.status(200).json({ id: session.id }); // Return session ID to frontend
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Failed to create Stripe session' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
