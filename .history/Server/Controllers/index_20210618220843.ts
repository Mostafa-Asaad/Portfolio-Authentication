/*Name: Mostafa Asaad

Course code: Comp229

Assignment 2 - Authentication 

github: github.com/Mostafa-Asaad/Portfolio-Authentication/

application link:  https://mostafaasaad-assignment2-auth.herokuapp.com/   */


import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

// create an instance of the User model
import User from '../Models/user';

// import Util functions
import { UserDisplayName } from '../Util';

// export the display of home page

export function DisplayHomePage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}


// export the display of about me page

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'About Me', page: 'about', displayName: UserDisplayName(req)  });
}


// export the display of projects page

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'My Projects', page: 'projects', displayName: UserDisplayName(req)  });
}


// export the display of services page

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'My Services', page: 'services', displayName: UserDisplayName(req)  });
}


// export the display of contact me page

export function DisplayContactPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Contact me', page: 'contact', displayName: UserDisplayName(req)  });
}


// export the display of login page

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)  });
    }

    return res.redirect('/contact-list');
}


// export the display of register page

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)  });
    }

    return res.redirect('/contact-list');
}


// export the process of login page

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        // are there login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) =>
        // are there db errors?
        {
            if(err)
            {
                console.error(err);
                return next(err);
            }

            return res.redirect('/contact-list');

        });
    })(req, res, next);
}

// export the process of register page

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new User Object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        // after successful registration - login the user
        return passport.authenticate('local')(req, res, () =>{
            return res.redirect('/contact-list');
        });
    });
}


// export the process of logout page


export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();

    res.redirect('/login');
}