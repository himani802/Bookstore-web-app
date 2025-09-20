import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import "./Buybook.css";

export default function BuyBook({ book }) {
    const handlePurchase = async () => {
        if (!book) {
            console.error('Book data not available');
            return;
        }

        const amount = book.amount;
        console.log('Original amount:', amount);

        try {
            const stripe = await loadStripe(process.env.stripe_key);
            
            // Ensure amount is a valid number and convert to cents
            const unitAmount = Math.round(parseFloat(amount) * 100);
            console.log('Unit amount in cents:', unitAmount);

            if (isNaN(unitAmount) || unitAmount <= 0) {
                throw new Error('Invalid price');
            }

            const response = await axios.post('http://localhost:8000/create-checkout-session', {
                lineItems: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: unitAmount,
                            product_data: {
                                name: book.title
                            }
                        },
                        quantity: 1,
                    },
                ],
            });

            const session = response.data;

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error);
                alert('Payment failed. Please try again.');
            }
        } catch (err) {
            console.error('Error details:', err);
            alert('An error occurred during the purchase process.');
        }
    }
    return (
        <button type='button' onClick={handlePurchase}>Buy</button>
    );
}