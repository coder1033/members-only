// npm imports
const express = require("express");

// require controller
const index_controller = require("../controllers/index-controller");

// require routers
const authRouter = require("./auth");
const messagesRouter = require("./messages");

const router = express.Router();

/* GET home page. */
router.get("/", index_controller.index);

router.use("/auth", authRouter);

router.use("/messages", messagesRouter);

router.get("/membership", index_controller.membership_get);

router.post("/membership", index_controller.membership_post);

router.get("/admin", index_controller.admin_get);

router.post("/admin", index_controller.admin_post);

module.exports = router;
