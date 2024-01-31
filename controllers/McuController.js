const Mcu = require('../models/McuModel');

async function getAllMcu (req, res) {
    try {
        let results = await Mcu.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'get all Mcu failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getOneMcu (req, res) {
    try {
        let result = await Mcu.findOne({name: req.params.name});

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'get ONE Mcu failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function createOneMcu(req, res){
    try {
        // Accepting the front-end form data from the client to generate the document
        let newMcu = req.body

        // post the new document to the Mcu collection
        await Mcu.create(newMcu);

        res.json({
            message: 'success',
            payload: newMcu
        });
    } catch (error) {
        let errorObj = {
            message: 'create one Mcu failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteOneMcu(req, res) {
    try {
        await Mcu.deleteOne({ name: req.params.name });

        res.json({
            message: 'success',
            payload: req.params.name
        })
    } catch (error) {
        let errorObj = {
            message: 'delete one Mcu failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateOneMcu(req, res){
    try {
        let targetMcu = await Mcu.findOne({ name: req.params.name })

      // let updatedMcu = {
        //     name: req.body.name ? req.body.name : targetMcu.name
        // }

        // Mongo's targetMcu
        // {
        //     _id: "6bankuverg",
        //     name: "Echo",
        //     debutFilm: "Echo",
        //     debutYear: 2024,
        //     __v: 01
        // }

        // req.body:
        // {
        //     name: "daredevil"
        // }

        // ...targetMcu.toObject()
        // {
        //     name: "Echo",
        //     debutFilm: "Echo",
        //     debutYear: 2024,
        // }

        // {
        //     name: "Echo",
        //     name: "daredevil" < --- this is kept
        // }

       //dynamic update, merge existing and new values
        let updatedMcu = {
            ...targetMcu.toObject(),
            ...req.body
        }
   
        await Mcu.updateOne(
            { name: req.params.name },
            { $set: updatedMcu },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: updatedMcu
        });
    } catch (error) {
        let errorObj = {
            message: 'update one Mcu failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

module.exports = {
    getAllMcu,
    getOneMcu,
    createOneMcu, 
    deleteOneMcu,
    updateOneMcu
}