import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    await connectMongo();

    try {
        const { uniqueCode, feedback } = req.body;

        const workshop = await Workshop.findOne({ uniqueCode });
        if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

        // Check if the certificate exists
        const certificate = workshop.certificates.find((cert) =>
            cert.endsWith(`${feedback.email}.pdf`)
        );
        if (!certificate)
            return res.status(404).json({ message: 'Certificate not found for this email.' });

        // Save feedback
        workshop.redeemed.push(feedback);
        await workshop.save();

        res.status(200).json({
            message: 'Certificate redeemed successfully',
            certificateLink: `https://drive.google.com/file/d/${certificate}/view`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error redeeming certificate', error });
    }
}
