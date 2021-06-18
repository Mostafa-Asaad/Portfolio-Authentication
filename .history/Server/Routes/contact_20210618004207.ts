import express from 'express';
const router = express.Router();
export default router;

// Create an clothing controller instance
import {DisplayContactListPage, DisplayEditPage, ProcessEditPage} from '../Controllers/contact';

// Get contacts-page list with /contact-list
router.get('/', DisplayContactListPage);

// display edit/:id -page list with /contact-list/edit:id

router.get('/edit/:id', DisplayEditPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/edit/:id', ProcessEditPage);