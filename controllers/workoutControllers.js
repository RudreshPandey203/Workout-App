const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({ createdAt: -1 })

    res.status(200).json(workout)
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "no such workout" })
    }
    res.status(200).json(workout)
}

//create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyfields = []

    if(!title){
        emptyfields.push('title')
    }
    if(!load){
        emptyfields.push('load')
    }
    if(!reps){
        emptyfields.push('reps')
    }
    if(emptyfields.length>0){
        return res.status(404).json({error: 'Please fill in all the fields',emptyfields})
    }
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a workout
const delelteWorkout = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findOneAndDelete({_id : id})

    if (!workout) {
        return res.status(400).json({ error: "no such workout" })
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: "no such workout" })
    }
    res.status(200).json(workout)
}


//exports
module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    delelteWorkout,
    updateWorkout
}