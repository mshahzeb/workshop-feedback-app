import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password, type } = req.body;

    try {
        await connectMongo();

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, type });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}
