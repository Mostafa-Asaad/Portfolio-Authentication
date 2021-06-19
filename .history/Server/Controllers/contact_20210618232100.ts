/*Name: Mostafa Asaad

ID : 301173762

Course code: Comp229

Assignment 2 - Authentication 

github: github.com/Mostafa-Asaad/Portfolio-Authentication/

application link:  https://mostafaasaad-assignment2-auth.herokuapp.com/   */


import express, { Request, Response, NextFunction } from 'express';

import Contact from "../Models/contact";

// import Util Functions
import { UserDisplayName} from '../Util';

// Display Functions

//(R)ead in CRUD

export function DisplayContactListPage(req: Request, res: Response, next: NextFunction): void
{   
    Contact.find(function(err, contactCollection){
    if(err)
    {
        return console.error(err);
    }
    console.log(contactCollection);
    //Render the clothing-list content partial page
    res.render('index', {title: 'Contact List', page: 'contact-list', contact: contactCollection, displayName: UserDisplayName(req)});
});
}

//Display Edit page
export function DisplayEditPage(req: Request, res:Response, next: NextFunction): void
{
    let id = req.params.id;

    // pass the id to the db
     Contact.findById(id, {}, {}, (err, contactItemToEdit) =>
     {
         if(err)
         {
             console.error(err);
             res.end(err);
         }

         // show the edit view
         res.render('index', {title:'Edit', page: 'update', contact: contactItemToEdit, displayName: UserDisplayName(req)});
     });
}

// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'add', contact: '' , displayName: UserDisplayName(req)});
}



// Process Functions



// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedContactItem = new Contact
    ({
      "_id": id,
      "FirstName": req.body.FirstName,
      "LastName": req.body.LastName,
      "EmailAddress": req.body.EmailAddress,
      "ContactNumber": req.body.ContactNumber,
      "Company": req.body.Company
      
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Contact.updateOne({_id: id}, updatedContactItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contact-list');
    });
}

// Process (C)reate page

export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Contact
  let newContact = new Contact
  ({
    "FirstName": req.body.FirstName,
    "LastName": req.body.LastName,
    "EmailAddress": req.body.EmailAddress,
    "ContactNumber": req.body.ContactNumber,
    "Company": req.body.Company
  });

  // db.contact.insert({contact data is here...})

  Contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}

// Process Delete page

export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.contact.remove({"_id: id"})
  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}