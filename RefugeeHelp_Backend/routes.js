const router = require('express').Router();
const {body} = require('express-validator');

const { getUsers } = require('./controllers/getUsersController');
const {postRequest} = require('./controllers/requestsController');
const {registerCenter} = require('./controllers/centersController');
const {profileSubmission} = require('./controllers/profileSubmissionController');

router.get('/getUsers', getUsers);
router.post('/postRequest',[
    body('centerId', 'Invalid'),
    body('description', "Please add description").notEmpty(),
    body('status', 'Invalid')
], postRequest);

router.post('/registerCenter',[
    body('identityGuid', 'Invalid'),
    body('email', "Please insert your email").notEmpty(),
    body('name', 'Please insert center name').notEmpty(),
    body('registrationNumber', "Please insert registration number").notEmpty(),
    body('address', "Please insert address").notEmpty()
], registerCenter);

router.post('/profileSubmission',[
    body('identityGuid', 'Invalid'),
    body('email', "Please insert your email").notEmpty(),
    body('name', 'Please insert center name').notEmpty(),
    body('registrationNumber', "Please insert registration number").notEmpty(),
    body('address', "Please insert address").notEmpty(),
    body('role', "Invalid Role").notEmpty()

], profileSubmission);

module.exports = router;