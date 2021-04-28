const express = require("express")
const router = express.Router()
const quest = require('../contollers/questController')

const auth = require('../middleware/auth')

// all the route here starts with /question
// main page or landing page
router.get('/',quest.getAllQues)
router.post('/',quest.createQues)
router.patch('/:id',quest.updateQues)
router.delete('/:id',quest.deleteQues)


module.exports = router