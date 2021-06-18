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

