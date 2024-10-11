const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
router.get('/', (req, res)=>{
    Task.find({}).then(tasks=>{
        console.log(tasks)
        res.json(tasks)
    })
    .catch(error=>console.log(error))
})

router.get('/:id', (req, res)=>{
    Task.findById(req.params.id).then(task=>
        res.json(task)
    )
})


router.post('/', (req, res) => {

    const {
        name,
        description,
        userIDs,
        startDate,
        endDate,
        status,
        incomeExpected,
        expenseExpected,

    } = req.body

    //ERROR HANDLER
    const task = new Task({
        name,
        description,
        userIDs,
        startDate,
        endDate,
        status,
        incomeExpected,
        expenseExpected,

    })

    task.save().then(task=>{
        res.json(task)
    })
})

router.put('/:id', (req, res) => {
    const {
        name,
        startDate,
        endDate,
        incomeSoFar,
        incomeExpected,
        expenseSoFar,
        expenseExpected,
        tasks,
        userIDs,
        materialProcurement
    } = req.body


    //  ERROR HANDLER
    const task = {
        name,
        startDate,
        endDate,
        incomeSoFar,
        incomeExpected,
        expenseSoFar,
        expenseExpected,
        tasks,
        userIDs,
        materialProcurement
    }

    // Takes NORMAL JS Object as argument
    // Returns {new: true} entity, not old version
    Task.findByIdAndUpdate(req.params.id, task, {new: true})
        .then(updatedTask => {
            res.json(updatedTask)
        })



})
router.delete('/:id', (req, res)=>{
    Task.findByIdAndDelete(req.params.id).then(result=>{
        res.status(204).end()
    })

})

module.exports = router