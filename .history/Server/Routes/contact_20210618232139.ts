/*Name: Mostafa Asaad

ID : 301173762

Course code: Comp229

Assignment 2 - Authentication 

github: github.com/Mostafa-Asaad/Portfolio-Authentication/

application link:  https://mostafaasaad-assignment2-auth.herokuapp.com/   */


import express from 'express';
const router = express.Router();
export default router;

// Create an contact controller instance
import {DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage} from '../Controllers/contact';

// import Util functions
import { AuthGuard } from '../Util/index';

// Get contacts-page list with /contact-list
router.get('/', DisplayContactListPage);

/* GET - display /clothing-list/add page. */
router.get('/add', AuthGuard, DisplayAddPage);

// display edit/:id -page list with /contact-list/edit:id

router.get('/edit/:id', AuthGuard, DisplayEditPage);

/* POST - process /contact-list/add page */
router.post('/add', AuthGuard, ProcessAddPage);

/* POST - process /contact-list/edit/:id page */
router.post('/edit/:id', AuthGuard, ProcessEditPage);

/* GET - process /contact-list/delete/:id */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);