const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

// create router
router.get("/", (req, res) => {
    burger.all(data => {
        const hbarsObj = {
            burger: data
        };
        console.log(hbarsObj);
        res.render("index", hbarsObj);
    });
});

router.post("/api/burger", (req, res) => {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burger/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;

    burger.update({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export router

module.exports = router;