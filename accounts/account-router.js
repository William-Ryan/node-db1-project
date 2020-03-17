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
        res.status(500).json({ message: "Error adding this Account" })
    })
})

router.put('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0){
            res.status(200).json({ count })
        } else {
            res.status(404).json({ message: "Could not find Account" })
        }
    })
    .catch(() => {
        res.status(500).json({ message: "Error updating Account" })
    })
})

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if (count > 0){
            res.status(200).json({ message: 'Account deleted successfully' })
        } else {
            res.status(404).json({ message: "Account not found" })
        }
    })
    .catch(() => {
        res.status(500).json({ message: "Error deleting Account" })
    })
})

module.exports = router