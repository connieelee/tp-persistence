var express = require('express');
var router = express.Router();
var db = require('../../models/_db');
var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');



// get a list of all the days
router.get('/', function(req, res, next) {
	Day.findAll()
	.then(function(days) {
		res.send(days);
	})
	.catch(next);
})

// get one specific day
router.get('/:dayId', function(req, res, next) {
	Day.findOne({
		where: {number: req.params.dayId}
	})
	.then(function(day) {
		res.send(day);
	})
	.catch(next);

})

// delete one specific day
router.delete('/:dayId', function(req, res, next) {
	Day.destroy({
		where: {number: req.params.dayId}
	})
	.catch(next);
	res.send()
})

//create a new day.
router.post('/:dayId', function(req, res, next) {
	Day.create({
		number: req.params.dayId
	})
	.then(function(newDay) {
		return newDay;
	})
	.catch(next);
	res.send()
})

//add and remove attraction from day
router.post('/:dayId/:type/:attractionId', function(req, res, next) {
	var dayNum = +req.params.dayId;
	switch(req.params.type) {
		case 'hotel':
			Day.findOne({
				where: {number: dayNum}
			})
			.then(function(day) {
				return day.update({
					hotelId: req.params.attractionId
				})
			})
			.catch(next);
			break;

		case 'restaurant':
			Day.findOne({
				where: {number: dayNum}
			})
			.then(function(day) {
				return day.addRestaurant(req.params.attractionId);
			})
			.catch(next);
			break;

		case 'activity':
			Day.findOne({
				where: {number:dayNum}
			})
			.then(function(day) {
				return day.addActivity(req.params.attractionId);
			})
			.catch(next);
			break;

		default: throw Error;
	}
	res.send()
});

router.delete('/:dayId/:type/:attractionId', function(req, res, next) {
	var dayNum = +req.params.dayId;
	switch(req.params.type) {
		case 'hotel':
			Day.findOne({
				where: {number: dayNum}
			})
			.then(function(day) {
				console.log('DAY', day)
				return day.update({hotelId: null});
			})
			.catch(next);
			break;

		case 'restaurant':
			Day.findOne({
				where: {number: dayNum}
			})
			.then(function(day) {
				return day.removeRestaurant(req.params.attractionId);
			})
			.catch(next);
			break;

		case 'activity':
			Day.findOne({
				where: {number:dayNum}
			})
			.then(function(day) {
				return day.removeActivity(req.params.attractionId);
			})
			.catch(next);
			break;

		default: throw Error;
	}
	res.send()

})

module.exports = router;
