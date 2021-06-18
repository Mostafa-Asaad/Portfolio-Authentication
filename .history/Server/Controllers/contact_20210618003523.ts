import express, { Request, Response, NextFunction } from 'express';

import Contact from "../Models/contact";

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

export function DisplayEditPage(req: Request, res:Response, next: NextFunction):void
{
    let id = req.params.id;

    // pass the id to the db
     Contact.findById(id,{},{}, (err, contactItemToEdit) =>
     {
         if(err)
         {
             console.error(err);
             res.end(err);
         }

         // show the edit view
         res.render('index', {title:'Edit', page: 'edit', item: contactItemToEdit});
     })
}

/ Process Functions

// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedClothingItem = new Contact
    ({
      "_id": id,
      "Name": req.body.FullName,
      "Email address": req.body.EmailAddress,
      "Number": req.body.ContactNumber
      
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Contact.updateOne({_id: id}, updatedClothingItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contact-list');
    });
}