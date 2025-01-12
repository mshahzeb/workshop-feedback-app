import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['organizer', 'attendee'], required: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);