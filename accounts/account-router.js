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

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(acc => {
        if(acc){
            res.status(200).json({ data: acc })
        } else {
            res.status(404).json({ message: "Account not found" })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error when finding account" })
    })
})

router.post('/', (req,res) => {
    db('accounts').insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({ results: ids })
    })
    .catch(err => {
        res.status(500).json({ message: "Error adding this account" })
    })
})

module.exports = router