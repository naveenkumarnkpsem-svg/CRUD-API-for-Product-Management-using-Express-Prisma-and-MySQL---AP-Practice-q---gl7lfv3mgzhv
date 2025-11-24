const express = require('express');
require('dotenv').config();
const { authMiddleware } = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Apply authentication middleware to all product routes
app.use('/api/products', authMiddleware, productRoutes);

// Catch undefined routes
app.use((req, res) => {
    res.status(404).json({
      error: 'Route not found',
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports=app;
