import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    await connectMongo();

    try {
        const { email } = req.query;

        const workshops = await Workshop.find({ 'redeemed.email': email });

        res.status(200).json({ certificates: workshops });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certificates', error });
    }
}
