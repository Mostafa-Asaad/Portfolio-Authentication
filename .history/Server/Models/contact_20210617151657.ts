import mongoose from 'mongoose';

const Schema = mongoose.Schema; // alias for the Mangoose Schema

const ContactSchema = new Schema 
({
    FirstName: String,
    EmailAddress: String,
    ContactNumber: String,
}, 
{
    collection: "Contacts"
});

const Model = mongoose.model("Contacts", ContactSchema);
export default Model;