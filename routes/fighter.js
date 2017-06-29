/**
 * Created by henryjohnson on 6/23/17.
 */
const express = require('express');
const router = express.Router();
const mma = require('mma');

//Helper for authorization
const authorized = require('./authCheck')

//Picks name off request and turns it into a string (deal with getting rid of the space between first and last name)
router.param('name', function (req, res, next, value) {
    req.params.name = value.toString()
    next()
})

//Calls the mma API to get fighter stats and details, parsing this data and sending it to the front end when it's called for.
router.get('/:name', function (req, res, next) {
    let fighterName = req.params.name
    mma.fighter(fighterName, function (data) {
        let response = JSON.parse(res.json(data))
    });
})

module.exports = router;