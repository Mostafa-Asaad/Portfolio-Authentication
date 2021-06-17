import mongoose from 'mongoose';

const Schema = mongoose.Schema; // alias for the Mangoose Schema

const ClothingSchema = new Schema 
({
    name: String,
    brand: String,
    category: String,
    colour: String,
    Size: String,
    price: Number
}, {
    collection: "clothing"
})