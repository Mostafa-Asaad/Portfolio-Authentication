import express from 'express';
const router = express.Router();
export default router;

// Get contacts-page list with /contact-list
router.get('/', DisplayContactListPage);
// display edit/:id -page list with /contact-list/edit:id

