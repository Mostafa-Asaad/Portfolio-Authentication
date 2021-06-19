/*Name: Mostafa Asaad

Course code: Comp229

Assignment 2 - Authentication 

github: github.com/Mostafa-Asaad/Portfolio-Authentication/

application link:  https://mostafaasaad-assignment2-auth.herokuapp.com/   */


import express, { Request, Response, NextFunction } from 'express';

import * as DBConfig from '../Config/db';

// exporting use display name

export function UserDisplayName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }

    // in case no user

    return '';
}

// exporting AuthGuard

export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}