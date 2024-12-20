/* eslint-disable @typescript-eslint/no-var-requires */

const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProducts, createProduct };
