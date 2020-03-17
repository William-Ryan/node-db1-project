const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(rows => {
        res.status(200).json({ accounts: rows })
    })
    .catch(() => {
        res.status(500).json({ message: "Sorry, Could not retrieve accounts" })
    })
})

module.exports = router