import formidable from 'formidable';
import connectMongo from '../../../lib/mongodb';
import Workshop from '../../../models/Workshop';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parser
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        // Parse the form data
        const form = formidable({ multiples: true });
        const data = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        // Convert title to a string (handles array case)
        const title = Array.isArray(data.fields.title) ? data.fields.title[0] : data.fields.title;

        console.log('Parsed Fields:', data.fields);
        console.log('Parsed Files:', data.files);

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Generate a unique code for the workshop
        const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();

        // Save the workshop
        const newWorkshop = await Workshop.create({
            title,
            uniqueCode,
            certificates: [], // Certificates can be processed separately
        });

        res.status(201).json({ message: 'Workshop created successfully', workshop: newWorkshop });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error creating workshop', error });
    }
}
