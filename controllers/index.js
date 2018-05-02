var router = require('express').Router()

router.use('/', require("./static"))
router.use('/administration', require("./administration"))


module.exports = router
