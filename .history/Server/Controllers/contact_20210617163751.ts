import express, { Request, Response, NextFunction } from 'express';

import Contact from "../Models/contact";

export function DisplayContactListPage(req: Request, res: Response, next: NextFunction): void
{   
    Contact.find(function(err, contactCollection){
    if(err)
    {
        return console.error(err);
    }
    console.log(contacts);
    //Render the clothing-list content partial page
    res.render('index', {title: 'Contact List', page: 'contact-list', contact: contactCollection});
});
}

export function DisplayEditPage(req: Request, res:Response, next: NextFunction):void
{
    let id = req.params.id;
}