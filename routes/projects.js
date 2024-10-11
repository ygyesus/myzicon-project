const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
router.get('/', (req, res)=>{
    Project.find({}).then(projects=>{
        console.log(projects)
        res.json(projects)
    })
    .catch(error=>console.log(error))
})

router.get('/:id', (req, res)=>{
    Project.findById(req.params.id).then(project=>
        res.json(project)
    )
})


router.post('/', (req, res) => {

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

    //ERROR HANDLER
    const project = new Project({
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
    })

    project.save().then(project=>{
        res.json(project)
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
    const project = {
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
    Project.findByIdAndUpdate(req.params.id, project, {new: true})
        .then(updatedProject => {
            res.json(updatedProject)
        })



})
router.delete('/:id', (req, res)=>{
    Project.findByIdAndDelete(req.params.id).then(result=>{
        res.status(204).end()
    })

})

module.exports = router