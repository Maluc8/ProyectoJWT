import Stripe from 'stripe';
import config from '../../config/index.js';

class PaymentManager {
    constructor(){
        this.stripe = new Stripe(config.stripeSecretKey);
    }

    async createPaymentIntent(payload){
        const paymentIntent = await this.stripe.paymentIntents.create(payload);
        return paymentIntent;
    }
}

export default PaymentManager;
