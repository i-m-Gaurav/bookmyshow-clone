import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    
        try {
            const body = await req.json();
            const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

            const generatedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
                .update(`${razorpayOrderId}|${razorpayPaymentId}`)
                .digest('hex');

            if (generatedSignature === razorpaySignature) {
               
                return NextResponse.json({ success: true }, { status: 200 });
            } else {
                return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
            
            }
        } catch (error) {
            console.error("Error",error);
            return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
        }
}