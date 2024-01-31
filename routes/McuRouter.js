const router = require('express').Router();

const {
    getAllMcu,
    getOneMcu,
    createOneMcu,
    deleteOneMcu,
    updateOneMcu
} = require('../controllers/McuController');

// localhost:3001/Mcu/allMcu
router.get('/allMcu', getAllMcu);

// localhost:3001/Mcu/oneMcu/:name
router.get('/oneMcu/:name', getOneMcu);

// localhost:3001/Mcu/createOneMcu
router.post('/createOneMcu', createOneMcu);

// localhost:3001/Mcu/deleteOneMcu/:name
router.delete('/deleteOneMcu/:name', deleteOneMcu);

// localhost:3001/Mcu/updateOneMcu/:name
router.put('/updateOneMcu/:name', updateOneMcu);

module.exports = router;