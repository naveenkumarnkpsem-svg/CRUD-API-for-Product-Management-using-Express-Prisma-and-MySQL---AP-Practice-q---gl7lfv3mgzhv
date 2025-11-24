const express = require('express');
const { prisma } = require('../db/config');
const router = express.Router();

// POST /api/products/create - Create a new product
router.post('/create', async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    // Check if all required fields are provided
    if (!name || stock === undefined || price === undefined) {
      return res.status(400).json({
        error: "All fields required"
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        stock: parseInt(stock),
        price: parseFloat(price)
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// GET /api/products/get - Retrieve all products
router.get('/get', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// GET /api/products/getById/:id - Retrieve product by ID
router.get('/getById/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(404).json({
      error: "Product not found"
    });
  }
});

// PUT /api/products/put/:id - Update a product (full update)
router.put('/put/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, stock, price } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name: name,
        stock: parseInt(stock),
        price: parseFloat(price)
      }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// PATCH /api/products/patch/:id - Partially update a product
router.patch('/patch/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updates = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    // Build update data object
    const updateData = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.stock !== undefined) updateData.stock = parseInt(updates.stock);
    if (updates.price !== undefined) updateData.price = parseFloat(updates.price);

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: updateData
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// DELETE /api/products/delete/:id - Delete a product
router.delete('/delete/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    await prisma.product.delete({
      where: {
        id: productId
      }
    });

    res.status(200).json({
      message: "Product is deleted"
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
