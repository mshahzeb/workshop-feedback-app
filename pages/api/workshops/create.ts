import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';
import authenticate from '../../../middleware/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    await connectMongo();

    try {
        const { title } = req.body;

        // Generate a unique code for the workshop
        const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();

        const newWorkshop = await Workshop.create({
            title,
            uniqueCode,
        });

        res.status(201).json({ message: 'Workshop created successfully', workshop: newWorkshop });
    } catch (error) {
        res.status(500).json({ message: 'Error creating workshop', error });
    }
}
