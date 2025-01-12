import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    try {
        // Connect to MongoDB
        await connectMongo();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Invalid credentials' });

        // Compare the hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}
