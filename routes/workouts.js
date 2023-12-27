const express = require('express')
const Workout = require('../models/workoutModel')
const { createWorkout, getWorkouts, getWorkout, delelteWorkout, updateWorkout } = require('../controllers/workoutControllers')

const router = express.Router()

router.get('/',getWorkouts)

router.get('/:id',getWorkout)

router.post('/', createWorkout)

router.delete('/:id',delelteWorkout)

router.patch('/:id',updateWorkout)

module.exports = router



