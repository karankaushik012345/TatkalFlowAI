import { Request, Response } from 'express';
import { razorpayInstance, verifyPaymentSignature } from '../utils/razorpay';
import Subscription from '../models/Subscription';
import User from '../models/User';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { planId, amount } = req.body;
    // Create an order via Razorpay SDK
    const options = {
      amount: amount * 100, // in smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);
    
    res.status(200).json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid signature' });
      return;
    }

    // Save to database
    const subscription = await Subscription.create({
      user: req.user?._id,
      planName: planId,
      status: 'active',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 month validity
    });

    // Update user profile
    await User.findByIdAndUpdate(req.user?._id, { isPremium: true });

    res.status(200).json({ success: true, subscription });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
