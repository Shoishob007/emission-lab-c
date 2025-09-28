import { create } from 'zustand';
import { loadStripe } from '@stripe/stripe-js';

// Initializing Stripe
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const useOffsetPaymentStore = create((set, get) => ({
  stripe: null,
  isLoading: false,
  error: null,
  paymentIntentId: null,
  clientSecret: null,
  paymentStatus: null,
  carbonOffsetPurchaseId: null,
  
  initializeStripe: async () => {
    try {
      const stripe = await getStripe();
      set({ stripe, error: null });
      return stripe;
    } catch (error) {
      set({ error: 'Failed to initialize Stripe' });
      console.error('Stripe initialization error:', error);
      return null;
    }
  },

  // Step 1: Create Carbon Offset Purchase
  // createOffsetPurchase: async (quoteId) => {
  //   set({ isLoading: true, error: null });
    
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/offset/create-purchase`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         carbon_offset_purchase_id: quoteId
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create carbon offset purchase');
  //     }

  //     const data = await response.json();
      
  //     set({ 
  //       carbonOffsetPurchaseId: data.carbon_offset_purchase_id,
  //       error: null 
  //     });

  //     return data;
  //   } catch (error) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to create carbon offset purchase' 
  //     });
  //     throw error;
  //   }
  // },

  // // Step 2: Create Payment Intent
  // createPaymentIntent: async (paymentData) => {
  //   const { carbonOffsetPurchaseId } = get();
    
  //   if (!carbonOffsetPurchaseId) {
  //     throw new Error('Carbon offset purchase must be created first');
  //   }

  //   set({ isLoading: true, error: null });
    
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/stripe/create-payment-intent`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         amount: parseFloat(paymentData.amount),
  //         currency: 'usd',
  //         description: paymentData.description,
  //         payment_type: 'other',
  //         metadata: {
  //           reference: carbonOffsetPurchaseId,
  //           quote_id: paymentData.quote_id,
  //           payer_name: paymentData.payer_name,
  //           payer_email: paymentData.payer_email,
  //           certification_name: paymentData.certification_name,
  //         }
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create payment intent');
  //     }

  //     const data = await response.json();
      
  //     set({ 
  //       clientSecret: data.client_secret,
  //       paymentIntentId: data.payment_intent_id,
  //       isLoading: false,
  //       error: null 
  //     });

  //     return data;
  //   } catch (error) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to create payment intent' 
  //     });
  //     throw error;
  //   }
  // },

  // // Step 3: Process Payment
  // processPayment: async (paymentData, cardElement) => {
  //   const { stripe, clientSecret } = get();
    
  //   if (!stripe || !cardElement) {
  //     throw new Error('Stripe not initialized or card element missing');
  //   }

  //   set({ isLoading: true, error: null, paymentStatus: 'processing' });

  //   try {
  //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: cardElement,
  //         billing_details: {
  //           name: paymentData.payer_name,
  //           email: paymentData.payer_email,
  //         },
  //       },
  //     });

  //     if (error) {
  //       set({ 
  //         isLoading: false, 
  //         error: error.message,
  //         paymentStatus: 'failed' 
  //       });
  //       throw error;
  //     }

  //     if (paymentIntent.status === 'succeeded') {
  //       // Confirm payment on backend
  //       await get().confirmPayment(paymentIntent.id);
        
  //       set({ 
  //         isLoading: false, 
  //         error: null,
  //         paymentStatus: 'succeeded' 
  //       });

  //       return paymentIntent;
  //     }

  //   } catch (error) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Payment failed',
  //       paymentStatus: 'failed' 
  //     });
  //     throw error;
  //   }
  // },

  // // Step 4: Confirm Payment on Backend
  // confirmPayment: async (paymentIntentId) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/stripe/confirm-payment`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         payment_intent_id: paymentIntentId
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to confirm payment on server');
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Payment confirmation error:', error);
  //     throw error;
  //   }
  // },

  // // Complete workflow: Create offset purchase -> Create payment intent -> Process payment
  // processOffsetPayment: async (paymentData, cardElement) => {
  //   try {
  //     // Step 1: Create carbon offset purchase
  //     console.log("Step 1: Creating carbon offset purchase...");
  //     await get().createOffsetPurchase(paymentData.quote_id);
      
  //     // Step 2: Create payment intent
  //     console.log("Step 2: Creating payment intent...");
  //     await get().createPaymentIntent(paymentData);
      
  //     // Step 3: Process payment
  //     console.log("Step 3: Processing payment...");
  //     const result = await get().processPayment(paymentData, cardElement);
      
  //     return result;
  //   } catch (error) {
  //     console.error('Complete payment workflow error:', error);
  //     throw error;
  //   }
  // },

  // Reset payment state
  resetPayment: () => {
    set({
      isLoading: false,
      error: null,
      paymentIntentId: null,
      clientSecret: null,
      paymentStatus: null,
      carbonOffsetPurchaseId: null,
    });
  },

  // Set error
  setError: (error) => {
    set({ error, isLoading: false });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useOffsetPaymentStore;