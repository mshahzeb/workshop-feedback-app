import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    await connectMongo();

    try {
        const { uniqueCode, feedback } = req.body;

        const workshop = await Workshop.findOne({ uniqueCode });
        if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

        workshop.redeemed.push(feedback);
        await workshop.save();

        res.status(200).json({ message: 'Certificate redeemed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error redeeming certificate', error });
    }
}
