const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

router.use(bodyParser.json({ limit: "20mb" }))
router.use(bodyParser.urlencoded({ limit: "20mb" }))

router.get("/test", (req, res, next) => {
  res.send(200)
})
// router.use(authMiddleware, usersRouter);
// router.use(adminAuthMiddleware, adminRouter);

// router.use(errorController.error404);

exports.router = router
