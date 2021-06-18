import express from 'express';
const router = express.Router();
export default router;

// Create an clothing controller instance
import {DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage} from '../Controllers/contact';

// Get contacts-page list with /contact-list
router.get('/', DisplayContactListPage);

/* GET - display /clothing-list/add page. */
router.get('/add', DisplayAddPage);

// display edit/:id -page list with /contact-list/edit:id

router.get('/edit/:id', DisplayEditPage);

/* POST - process /clothing-list/add page */
router.post('/add', ProcessAddPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/edit/:id', ProcessEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/delete/:id', ProcessDeletePage);