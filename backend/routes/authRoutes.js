/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models/Admin');
const { generateToken } = require('../utils/tokenHelper');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const adminExists = await admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await admin.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(admin._id);

        res.status(201).json({
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(admin._id);

        res.json({
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
