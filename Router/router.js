const express = require('express')
const router = express.Router()
const user = require('../Controller/controller')

router.post('/user',user.createUser)
router.get('/user/:id?',user.getUser)
router.put('/user/:id',user.updateUser)
router.delete('/user/:id',user.deleteUser)

module.exports = router