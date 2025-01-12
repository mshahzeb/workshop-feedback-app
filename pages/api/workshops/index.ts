import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    await connectMongo();

    try {
        const workshops = await Workshop.find();
        res.status(200).json({ workshops });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workshops', error });
    }
}
