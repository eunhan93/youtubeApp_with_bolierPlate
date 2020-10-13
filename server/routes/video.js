const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post('/uploadfiles', (req, res) => {
    // 서버에 저장
})

module.exports = router;
