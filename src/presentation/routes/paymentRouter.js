import { Router } from 'express';
import paymentManager from '../../domain/managers/paymentManager.js';

const paymentRouter = Router();

paymentRouter.post('/payment-intents', async(req, res) => {
    // primero busca el producto en la db
    // se asegura de que existe
    const paymentInfo = {
        amount: "monto total", // cambiar
        currency: 'usd',
        metadata:{
            // info de la compra pude ser ticket
        }
    };
    const payment = new paymentManager();
    const result = await payment.createPaymentIntent(paymentInfo);
    res.send({ status:'success', payload:result });
});

export default paymentRouter;
