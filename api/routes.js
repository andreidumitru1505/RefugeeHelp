const router = require('express').Router();
const {body} = require('express-validator');

const { getUsers, getUsersDonations } = require('./controllers/getUsersController');
const {postRequest, getDonationRequests, getTransportRequests, getRequestsByCenter, getCompletedRequestsByCenter} = require('./controllers/requestsController');
const {registerCenter} = require('./controllers/centersController');
const {profileSubmission} = require('./controllers/profileSubmissionController');
const {existingProfileCheck} = require('./controllers/existingProfileCheckController');
const {insertDonation} = require('./controllers/donationsController');

router.get('/getUsers', getUsers);
router.post('/getUserDonations',[
    body('email', "Please enter email").notEmpty()
], getUsersDonations);

router.post('/postRequest',[
    body('centerEmail', 'Invalid'),
    body('description', "Please add description").notEmpty(),
    body('quantity', 'Please add quantity').notEmpty(),
    body('status', 'Invalid'),
    body('type', 'Please select type').notEmpty()
], postRequest);

router.get('/getDonationRequests', getDonationRequests);

router.get('/getTransportRequests', getTransportRequests);

router.post('/getRequestsByCenter',[
    body('email', "Please insert email").notEmpty()
], getRequestsByCenter);

router.post('/getCompletedRequestsByCenter',[
    body('email', "Please insert email").notEmpty()
], getCompletedRequestsByCenter)

router.post('/insertDonation',[
    body('requestId', "Please insert request Id").notEmpty(),
    body('userEmail', "Please insert user email").notEmpty(),
    body('centerId', "Please insert center id").notEmpty(),
    body('description', "Please insert description").notEmpty(),
    body('quantity', "Please insert quantity").notEmpty()
], insertDonation);

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