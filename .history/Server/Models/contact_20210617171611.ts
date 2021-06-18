import mongoose from 'mongoose';

const Schema = mongoose.Schema; // alias for the Mangoose Schema

const ContactSchema = new Schema 
({
    FirstName: String,
    EmailAddress: String,
    ContactNumber: String,
}, 
{
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;