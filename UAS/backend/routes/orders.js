const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
router.post('/', async (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    products: req.body.products
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get 
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Update an order
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.customerId != null) {
    res.order.customerId = req.body.customerId;
  }
  if (req.body.products != null) {
    res.order.products = req.body.products;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await Order.deleteOne({ _id: res.order._id });
    res.json({ message: 'Deleted Order' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id).populate('customerId').populate('products.productId');
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

module.exports = router;
