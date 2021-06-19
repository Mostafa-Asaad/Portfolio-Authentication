/*Name: Mostafa Asaad

Course code: Comp229

Assignment 2 - Authentication 

github: github.com/Mostafa-Asaad/Portfolio-Authentication/

application link:  https://mostafaasaad-assignment2-auth.herokuapp.com/   */



import mongoose from 'mongoose';

const Schema = mongoose.Schema; // alias for the Mangoose Schema

const ContactSchema = new Schema 
({
    FirstName: String,
    LastName: String,
    EmailAddress: String,
    ContactNumber: String,
    Company: String,
}, 
{
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;