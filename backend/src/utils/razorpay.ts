import Razorpay from 'razorpay';
import crypto from 'crypto';

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
});

export const verifyPaymentSignature = (order_id: string, payment_id: string, signature: string) => {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret';
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(order_id + '|' + payment_id)
    .digest('hex');
  return generated_signature === signature;
};
