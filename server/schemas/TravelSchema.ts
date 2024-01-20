import mongoose, { Schema, Document } from 'mongoose';

interface ITravel extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    country: mongoose.Schema.Types.ObjectId;
    thingsToPack: string[];
}

const travelSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    thingsToPack: [{
        type: String,
    }],
});

export default mongoose.model<ITravel>('Travel', travelSchema);
