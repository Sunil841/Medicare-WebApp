import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ""
    },
    shipping: {
        type: Boolean
    }


}, { timestamps: true })

export default mongoose.model('products', productSchema)












