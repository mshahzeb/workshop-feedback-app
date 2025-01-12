import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    uniqueCode: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    certificates: { type: [String], default: [] },
    redeemed: { type: [Object], default: [] },
});

export default mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);
