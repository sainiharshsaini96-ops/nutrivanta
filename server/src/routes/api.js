import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const dataFilePath = path.join(__dirname, '../data/products.json');
const getRawData = () => {
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContent);
};

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'ElectroMart API' });
});

// Get all products (with optional filtering by category or search term)
router.get('/products', (req, res) => {
  try {
    const data = getRawData();
    let products = [...data.products];
    const { category, search, flash } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (flash === 'true') {
      products = products.filter(p => p.isFlashDeal);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve products', error: err.message });
  }
});

// Get single product by id
router.get('/products/:id', (req, res) => {
  try {
    const data = getRawData();
    const product = data.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving product', error: err.message });
  }
});

// Get categories
router.get('/categories', (req, res) => {
  try {
    const data = getRawData();
    res.json({ success: true, data: data.categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving categories', error: err.message });
  }
});

// Get brands
router.get('/brands', (req, res) => {
  try {
    const data = getRawData();
    res.json({ success: true, data: data.brands });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving brands', error: err.message });
  }
});

// Get verified reviews
router.get('/reviews', (req, res) => {
  try {
    const data = getRawData();
    res.json({ success: true, data: data.reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving reviews', error: err.message });
  }
});

// Validate promo coupon
router.post('/promo/validate', (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Promo code is required' });
    }

    const data = getRawData();
    const normalizedCode = code.trim().toUpperCase();
    const coupon = data.coupons[normalizedCode];

    if (!coupon) {
      return res.status(400).json({ success: false, message: 'Invalid or expired promo code' });
    }

    if (cartTotal && cartTotal < coupon.minSpend) {
      return res.status(400).json({
        success: false,
        message: `Promo code ${coupon.code} requires a minimum order of $${coupon.minSpend.toFixed(2)}`
      });
    }

    res.json({
      success: true,
      message: `${coupon.code} applied successfully!`,
      data: coupon
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to validate promo code', error: err.message });
  }
});

// Place order
router.post('/orders', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totals } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    const orderId = 'EM-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toISOString();

    const orderResponse = {
      orderId,
      orderDate,
      status: 'Confirmed',
      estimatedDelivery: 'Tomorrow by 2:00 PM',
      shippingAddress: shippingAddress || {
        name: 'Alex Morgan',
        address: '742 Evergreen Terrace, Apt 4B, New York, NY 10001',
        phone: '+1 (555) 924-8182'
      },
      paymentMethod: paymentMethod || 'Credit Card',
      itemsCount: items.reduce((acc, item) => acc + (item.quantity || 1), 0),
      totals: totals || {
        subtotal: 317.99,
        discount: 20.00,
        tax: 26.45,
        shipping: 0.00,
        total: 324.44
      }
    };

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: orderResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to process order', error: err.message });
  }
});

// Newsletter subscription
router.post('/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }
  res.json({
    success: true,
    message: 'Thank you for subscribing! Your $20 discount code is TECH10.'
  });
});

export default router;
