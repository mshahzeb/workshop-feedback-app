import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    try {
        await connectMongo();

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}
