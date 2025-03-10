const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const servicesController = require('./controllers/servicesController');
const adminController = require('./controllers/adminController');
const postHoldersRouter = require('./routes/postholders');
const eventsRouter = require('./routes/events');
const sliderImagesRouter=require('./routes/sliderImages');
const eventRegistrationRouter=require('./routes/eventsRegistration');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const isAuthorized = require("./middlewares/authMiddleware");

if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.use(cors({
        origin: "http://localhost:3000",  // ✅ Allow frontend origin
        credentials: true  // ✅ Allow cookies and authentication headers
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));



app.use('/api/registration',eventRegistrationRouter);
app.use('/api/postHolders', postHoldersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/sliderImages', sliderImagesRouter);
app.post('/api/services', upload.single('image'), servicesController.addServices);
app.get('/api/services', servicesController.getServices);
app.get('/admin/admins', adminController.getAdmins);
app.get('/admin/getsingleadmin',isAuthorized, adminController.getsingleAdmin);
app.post('/admin/add', adminController.addAdmins);
app.post('/admin/login', adminController.loginAdmin);
app.get('/admin/logout',isAuthorized,adminController.logout)

app.post("/api/create-checkout-session", async (req, res) => {
    console.log('Received request body:', req.body); // Add this
    const product = req.body;
    console.log('Product:', product);

    const lineItems = [
        {
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.amount * 100,
            },
            quantity: 1,
        },
    ];

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/home",
            cancel_url: "http://localhost:3000/team",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
