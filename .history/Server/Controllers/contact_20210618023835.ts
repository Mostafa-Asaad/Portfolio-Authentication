import express, { Request, Response, NextFunction } from 'express';

import Contact from "../Models/contact";

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
    res.render('index', {title: 'Contact List', page: 'contact-list', contact: contactCollection});
});
}

//Display Edit page
export function DisplayEditPage(req: Request, res:Response, next: NextFunction):void
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
         res.render('index', {title:'Edit', page: 'update', contact: contactItemToEdit});
     })
}

// Display (C)reate page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'add', contact: '' });
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
      "FullName": req.body.FullName,
      "EmailAddress": req.body.EmailAddress,
      "ContactNumber": req.body.ContactNumber
      
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Contact.update({_id: id}, updatedContactItem, {}, (err) =>{
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
    "FullName": req.body.FullName,
    "EmailAddress": req.body.EmailAddress,
    "ContactNumber": req.body.ContactNumber
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