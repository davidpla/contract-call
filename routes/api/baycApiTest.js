const express = require('express');
const router = express.Router();
const baycContractService = require('../../services/baycContractService/baycContractService');
const console = require('../../utils/logger');

router.get('/', async (req, res) => {
    console.log('Request for baycApiTest');
     
    try {
        const data = await baycContractService.getBAYCContractData();
        console.log('Smart Contract Data Fetched Successfully:');
        console.log(data ? JSON.stringify(data, null, 2) : 'null\n');

        res.json({
            status: 'success',
            message: 'Data fetched from baycApiTest',
            data: data
        });

    } catch (error) {
        console.error('Error in baycApiTest endpoint:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch data from smart contract',
            error: error.message
        });
    }
});

module.exports = router;