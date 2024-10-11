const express = require('express')
const router = express.Router()
const User = require('../models/User')
router.get('/', (req, res)=>{
    User.find({}).then(users=>{
        console.log(users)
        res.json(users)
    })
    .catch(error=>console.log(error))
})

router.get('/:id', (req, res)=>{
    User.findById(req.params.id).then(user=>
        res.json(user)
    )
})


router.post('/', (req, res) => {

    const {firstName, lastName, role, employmentPeriods} = req.body

    if (!firstName || !lastName || !role){
        return res.status(400).json({
            error: "At least one field is missing"
        })
    }
    const user = new User({
        firstName, lastName, role, employmentPeriods
    })

    user.save().then(user=>{
        res.json(user)
    })
})

router.put('/:id', (req, res) => {
    const {firstName, lastName, role, employmentPeriods} = req.body
    const id = req.params.id
    if (!firstName || !lastName || !role){
        return res.status(400).json({
            error: "At least one field is missing"
        })
    }

    const user = {firstName, lastName, role, employmentPeriods}

    // Takes NORMAL JS Object as argument
    // Returns {new: true} entity, not old version
    User.findByIdAndUpdate(req.params.id, user, {new: true})
        .then(updatedUser => {
            res.json(updatedUser)
        })



})
router.delete('/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id).then(result=>{
        res.status(204).end()
    })

})

module.exports = router