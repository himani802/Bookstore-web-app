const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Books = require('./schema/bookSchema')
const User = require('./schema/userSchema')
const dotenv = require('dotenv')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
const validator = require('validator')
const stripe = require('stripe')('secret_key') // secretKey



dotenv.config()
const app = express()
app.use(bodyParser.json())
const router = express.Router()

const db = require('./db')

const allowedOrigin = [process.env.FRONTEND_URL]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, it works'
    })
})

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


// Storing book in database with file upload
app.post('/enterBook', upload.single('uploaded_file'), async (req, res) => {
    try {

        let filePath = null;
        if (req.file) {
            filePath = '/uploads/' + req.file.filename;
        }

        const { title,description, category, author,quantity, amt } = req.body

        let newBook = new Books({
            title: title,
            description: description,
            category: category,
            author: author,
            quantity: quantity,
            amount: amt,
            image: filePath 
        })

        await newBook.save()

        res.status(200).json({
            message: 'Book added successfully',
            book: newBook
        })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({
            message: 'Error adding book',
            error: e.message
        })
    }
})



// Fetching books
app.get('/books', async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json(books)
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: 'Error fetching books',
            error: e.message
        })
    }
})

// Deleting books
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Books.findByIdAndDelete(id); // Ensure 'Books' is your correct model

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
});




// Registering Users
app.post('/register', async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password, password2 } = req.body

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        if (password !== password2) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        let newUser = new User({
            email: email,
            password: password
            // passward2:passward2
        })
        await newUser.save()
        res.status(200).json({ message: 'User registered successfully' })

    }
    catch (e) {
        console.error(e)
        if (e.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        res.status(500).json({ message: 'An error occurred', error: e.message })
    }
})


// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('Login attempt for email:', email); // Log the email


        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: 'user not registered' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        const token = jwt.sign({ message: 'Login successful', userId: user._id }, process.env.SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.status(200).json({ token: token, userId: user._id })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred', error: error.message })
    }
})


//Payment
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { lineItems } = req.body;

        if (!lineItems || !Array.isArray(lineItems)) {
            return res.status(400).json({ error: 'Invalid or missing lineItems' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the checkout session' });
    }
});

app.get('/success', function (req, res) {
    res.send('Payment successful!');
});

app.get('/cancel', function (req, res) {
    res.send('Payment cancelled!');
});



// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})