const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionContoller = require('./controllers/SessionContoller');
const SpotController = require('./controllers/SpotController');

const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingControlle');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionContoller.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes; 