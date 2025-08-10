const router = require('express').Router();
const Admin = require('../models/admin.model');
const Customer = require('../models/customer.model');
const jwt = require('jsonwebtoken');

// Admin Login
router.route('/admin/login').post(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      branch: admin.branch,
      token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    });
  } else {
    res.status(401).json('Invalid email or password');
  }
});

// Customer Login
router.route('/customer/login').post(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      email: customer.email,
      token: jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    });
  } else {
    res.status(401).json('Invalid email or password');
  }
});

// Customer Signup
router.route('/customer/signup').post(async (req, res) => {
  const { email, password, cellphoneNumber, city, address } = req.body;

  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400).json('Customer already exists');
    return;
  }

  const customer = await Customer.create({
    email,
    password,
    cellphoneNumber,
    city,
    address
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      email: customer.email,
      token: jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    });
  } else {
    res.status(400).json('Invalid customer data');
  }
});

module.exports = router;
