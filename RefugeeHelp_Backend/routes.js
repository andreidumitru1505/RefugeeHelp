const router = require('express').Router();
const {body} = require('express-validator');

const { getUsers } = require('./controllers/getUsersController');
const {postRequest} = require('./controllers/requestsController');
const {registerCenter} = require('./controllers/centersController');
const {profileSubmission} = require('./controllers/profileSubmissionController');
const {existingProfileCheck} = require('./controllers/existingProfileCheckController');

router.get('/getUsers', getUsers);
router.post('/postRequest',[
    body('centerEmail', 'Invalid'),
    body('description', "Please add description").notEmpty(),
    body('quantity', 'Please add quantity').notEmpty(),
    body('status', 'Invalid'),
    body('type', 'Please select type').notEmpty()
], postRequest);

router.post('/registerCenter',[
    body('email', "Please insert your email").notEmpty(),
    body('name', 'Please insert center name').notEmpty(),
    body('registrationNumber', "Please insert registration number").notEmpty(),
    body('address', "Please insert address").notEmpty(),
    body('phoneNumber', "Please insert phone number").notEmpty()
], registerCenter);

router.post('/profileSubmission',[
    body('email', "Please insert your email").notEmpty(),
    body('name', 'Please insert center name').notEmpty(),
    body('registrationNumber', "Please insert registration number").notEmpty(),
    body('address', "Please insert address").notEmpty(),
    body('role', "Invalid Role").notEmpty(),
    body('phoneNumber', "Please insert phone number").notEmpty()
], profileSubmission);

router.post('/existingProfileCheck',[
    body('email', 'Invalid').notEmpty()
], existingProfileCheck);

module.exports = router;