"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2, Loader2, Copy, MessageCircle, ArrowLeft, Bitcoin, Mail } from 'lucide-react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  } | null;
}

interface StripePaymentFormProps {
  onSuccess: () => void;
  onBack: () => void;
  productName: string;
}

function StripePaymentForm({ onSuccess, onBack, productName }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isReady) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || 'Validation failed');
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}?payment_success=true&product=${encodeURIComponent(productName)}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setErrorMessage(error.message || 'Payment failed');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="min-h-[200px] max-h-[320px] overflow-y-auto pr-1">
        <PaymentElement
          onReady={() => setIsReady(true)}
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 rounded-xl uppercase font-bold text-[12px] tracking-wider"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!stripe || !elements || isProcessing || !isReady}
          className="flex-1 h-12 rounded-xl bg-black text-white hover:bg-black/90 uppercase font-bold text-[12px] tracking-wider"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing
            </>
          ) : !isReady ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </form>
  );
}

// Stripe elements wrapper
export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [step, setStep] = useState<'email' | 'selection' | 'stripe' | 'omt' | 'whish' | 'crypto' | 'processing' | 'success'>('email');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingIntent, setIsLoadingIntent] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [copied, setCopied] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setPaymentMethod(null);
      setClientSecret(null);
      setIsLoadingIntent(false);
      setOrderId('');
      setCopied(null);
      setCustomerEmail('');
      setEmailError('');
    }
  }, [isOpen]);

  if (!product) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!customerEmail.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(customerEmail)) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');
    setStep('selection');
    toast.success('Email saved! Choose your payment method.');
  };

  const handleVisaPayment = async () => {
    setPaymentMethod('visa');
    setIsLoadingIntent(true);
    toast.loading('Setting up secure payment...', { id: 'payment-loading' });

    try {
      // Create order in DB first
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: product.price,
          paymentMethod: 'CARD',
          email: customerEmail,
        }),
      });
      const orderData = await orderRes.json();
      setOrderId(orderData.id);

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(product.price * 100),
          productName: product.name,
          customerEmail: customerEmail,
          orderId: orderData.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
      setStep('stripe');
      toast.dismiss('payment-loading');
      toast.success('Ready for card payment');
    } catch (error) {
      console.error('Payment intent error:', error);
      toast.dismiss('payment-loading');
      toast.error('Failed to setup payment. Please try again.');
      setStep('selection');
    } finally {
      setIsLoadingIntent(false);
    }
  };

  const handleOMTPayment = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: product.price,
          paymentMethod: 'OMT',
          email: customerEmail,
        }),
      });
      const data = await res.json();
      setOrderId(data.id);
      setPaymentMethod('omt');
      setStep('omt');
      toast.info('Follow the OMT transfer instructions');
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const handleWhishPayment = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: product.price,
          paymentMethod: 'WHISH',
          email: customerEmail,
        }),
      });
      const data = await res.json();
      setOrderId(data.id);
      setPaymentMethod('whish');
      setStep('whish');
      toast.info('Follow the Whish Money instructions');
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const handleCryptoPayment = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: product.price,
          paymentMethod: 'CRYPTO',
          email: customerEmail,
        }),
      });
      const data = await res.json();
      setOrderId(data.id);
      setPaymentMethod('crypto');
      setStep('crypto');
      toast.info('Send USDT to the provided address');
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const openWhatsApp = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "96170123456";
    const message = encodeURIComponent(`Hi! I just made a payment for ${product.name} ($${product.price}). Order ID: ${orderId}. Email: ${customerEmail}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const reset = () => {
    setStep('email');
    setPaymentMethod(null);
    setClientSecret(null);
    setIsLoadingIntent(false);
    setOrderId('');
    setCopied(null);
    setCustomerEmail('');
    setEmailError('');
    onClose();
  };

  const goBack = () => {
    if (step === 'selection') {
      setStep('email');
    } else {
      setStep('selection');
      setPaymentMethod(null);
      setClientSecret(null);
    }
  };

  // OMT Transfer Details
  const omtNumber = process.env.NEXT_PUBLIC_OMT_NUMBER || "03 123 456";
  const omtName = process.env.NEXT_PUBLIC_OMT_NAME || "BundlyPlus LB";

  // Whish Money Details
  const whishId = process.env.NEXT_PUBLIC_WHISH_ID || "bundlyplus";
  const whishPhone = process.env.NEXT_PUBLIC_WHISH_PHONE || "+961 70 123 456";

  // Crypto Details
  const usdtAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS || "TXkYc8JNPbJ9S4aH5MtPLkDcvhJqR7nK3w";

  return (
    <Dialog open={isOpen} onOpenChange={reset}>
      <DialogContent className="sm:max-w-[480px] bg-white rounded-[32px] border-none shadow-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Email Collection Step */}
        {step === 'email' && (
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Complete Purchase</DialogTitle>
              <DialogDescription>
                Enter your email to receive your {product.name} subscription details.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-2xl mb-8">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold uppercase text-[14px]">{product.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">${product.price}</span>
                  <span className="text-[10px] text-[#666666] uppercase font-bold tracking-wider">{product.category}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#666666]">Order ID</span>
                </div>
                <div className="text-lg font-bold text-black">{orderId}</div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666] px-1 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                      setEmailError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="your@email.com"
                    className={`w-full h-14 pl-12 pr-4 rounded-2xl border ${emailError ? 'border-red-500' : 'border-[#EEEEEE]'} focus:border-primary focus:outline-none transition-colors text-[14px]`}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-[11px] mt-2 px-1">{emailError}</p>
                )}
              </div>

              <Button
                onClick={handleEmailSubmit}
                className="w-full h-14 rounded-2xl bg-black text-white hover:bg-black/90 uppercase font-bold text-[12px] tracking-wider mt-4"
              >
                Continue to Payment
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[#666666] font-medium uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              We&apos;ll send your subscription details to this email
            </div>
          </div>
        )}

        {step === 'selection' && (
          <div className="p-8">
            <button onClick={goBack} className="flex items-center gap-2 text-[12px] font-bold text-[#666666] hover:text-black mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Payment Method</DialogTitle>
              <DialogDescription>
                Choose how you&apos;d like to pay for {product.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-2xl mb-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold uppercase text-[12px]">{product.name}</h4>
                <span className="text-lg font-bold text-primary">${product.price}</span>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-[#666666] uppercase">Order</div>
                <div className="text-[11px] font-bold">{orderId}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
              <p className="text-[11px] text-blue-800 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Sending to: <strong>{customerEmail}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666] px-1">Choose Payment Method</h5>

              <button
                onClick={handleVisaPayment}
                disabled={isLoadingIntent}
                className="w-full group flex items-center justify-between p-4 rounded-2xl border border-[#EEEEEE] hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-white transition-colors">
                    {isLoadingIntent ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CreditCard className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[14px] uppercase">Visa / Mastercard</div>
                    <div className="text-[10px] text-[#666666]">Instant Delivery • International</div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#EEEEEE] group-hover:bg-primary transition-colors" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleOMTPayment}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-[#EEEEEE] hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[12px] uppercase">OMT</div>
                    <div className="text-[9px] text-[#666666]">Lebanon Only</div>
                  </div>
                </button>

                <button
                  onClick={handleWhishPayment}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-[#EEEEEE] hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[12px] uppercase">Whish Money</div>
                    <div className="text-[9px] text-[#666666]">Lebanon Only</div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleCryptoPayment}
                className="w-full group flex items-center justify-between p-4 rounded-2xl border border-[#EEEEEE] hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Bitcoin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[14px] uppercase">Crypto (USDT)</div>
                    <div className="text-[10px] text-[#666666]">TRC20 • Global</div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#EEEEEE] group-hover:bg-primary transition-colors" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[#666666] font-medium uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              End-to-end encrypted transaction
            </div>
          </div>
        )}

        {step === 'stripe' && clientSecret && (
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Card Payment</DialogTitle>
              <DialogDescription>
                Enter your card details securely via Stripe.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-2xl mb-6">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold uppercase text-[12px]">{product.name}</h4>
                <span className="text-lg font-bold text-primary">${product.price}</span>
              </div>
            </div>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#000000',
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <StripePaymentForm
                onSuccess={() => setStep('success')}
                onBack={goBack}
                productName={product.name}
              />
            </Elements>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#666666] font-medium uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Secured by Stripe
            </div>
          </div>
        )}

        {/* OMT Payment Instructions */}
        {step === 'omt' && (
          <div className="p-8">
            <button onClick={goBack} className="flex items-center gap-2 text-[12px] font-bold text-[#666666] hover:text-black mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">OMT Transfer</DialogTitle>
              <DialogDescription>
                Send ${product.price} USD via OMT and confirm on WhatsApp.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#666666]">Your Order ID</span>
                <button
                  onClick={() => copyToClipboard(orderId, 'orderId')}
                  className="flex items-center gap-1 text-[10px] text-primary font-bold"
                >
                  <Copy className="w-3 h-3" />
                  {copied === 'orderId' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-2xl font-bold text-black">{orderId}</div>
            </div>

            <div className="space-y-4 mb-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666]">Transfer Details</h5>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">OMT Number</span>
                  <button
                    onClick={() => copyToClipboard(omtNumber, 'omtNumber')}
                    className="flex items-center gap-1 text-[10px] text-primary font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === 'omtNumber' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-lg font-bold">{omtNumber}</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Recipient Name</span>
                </div>
                <div className="text-lg font-bold">{omtName}</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Amount (USD)</span>
                </div>
                <div className="text-lg font-bold text-primary">${product.price}</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
              <p className="text-[12px] text-yellow-800">
                <strong>Important:</strong> Include your Order ID <strong>{orderId}</strong> in the transfer note/description.
              </p>
            </div>

            <Button
              onClick={openWhatsApp}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white uppercase font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Confirm via WhatsApp
            </Button>

            <p className="text-[10px] text-center text-[#666666] mt-4">
              Your subscription will be activated within 5 minutes after confirmation.
            </p>
          </div>
        )}

        {/* Whish Money Payment Instructions */}
        {step === 'whish' && (
          <div className="p-8">
            <button onClick={goBack} className="flex items-center gap-2 text-[12px] font-bold text-[#666666] hover:text-black mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Whish Money</DialogTitle>
              <DialogDescription>
                Send ${product.price} USD via Whish Money app.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#666666]">Your Order ID</span>
                <button
                  onClick={() => copyToClipboard(orderId, 'orderId')}
                  className="flex items-center gap-1 text-[10px] text-primary font-bold"
                >
                  <Copy className="w-3 h-3" />
                  {copied === 'orderId' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-2xl font-bold text-black">{orderId}</div>
            </div>

            <div className="space-y-4 mb-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666]">Transfer Details</h5>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Whish Username</span>
                  <button
                    onClick={() => copyToClipboard(whishId, 'whishId')}
                    className="flex items-center gap-1 text-[10px] text-primary font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === 'whishId' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-lg font-bold">@{whishId}</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Phone Number</span>
                  <button
                    onClick={() => copyToClipboard(whishPhone, 'whishPhone')}
                    className="flex items-center gap-1 text-[10px] text-primary font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === 'whishPhone' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-lg font-bold">{whishPhone}</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Amount (USD)</span>
                </div>
                <div className="text-lg font-bold text-primary">${product.price}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <p className="text-[12px] text-blue-800">
                <strong>Steps:</strong> Open Whish App → Send Money → Enter @{whishId} → Amount ${product.price} → Add note: <strong>{orderId}</strong>
              </p>
            </div>

            <Button
              onClick={openWhatsApp}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white uppercase font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Confirm via WhatsApp
            </Button>

            <p className="text-[10px] text-center text-[#666666] mt-4">
              Your subscription will be activated within 5 minutes after confirmation.
            </p>
          </div>
        )}

        {/* Crypto Payment Instructions */}
        {step === 'crypto' && (
          <div className="p-8">
            <button onClick={goBack} className="flex items-center gap-2 text-[12px] font-bold text-[#666666] hover:text-black mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">USDT Payment</DialogTitle>
              <DialogDescription>
                Send ${product.price} USDT (TRC20) to the address below.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#666666]">Your Order ID</span>
                <button
                  onClick={() => copyToClipboard(orderId, 'orderId')}
                  className="flex items-center gap-1 text-[10px] text-primary font-bold"
                >
                  <Copy className="w-3 h-3" />
                  {copied === 'orderId' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-2xl font-bold text-black">{orderId}</div>
            </div>

            <div className="space-y-4 mb-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666]">Wallet Address (TRC20)</h5>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">USDT Address</span>
                  <button
                    onClick={() => copyToClipboard(usdtAddress, 'usdtAddress')}
                    className="flex items-center gap-1 text-[10px] text-primary font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === 'usdtAddress' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-[11px] font-mono font-bold break-all">{usdtAddress}</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Network</span>
                </div>
                <div className="text-lg font-bold">TRC20 (TRON)</div>
              </div>

              <div className="bg-[#F8F8F8] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666666]">Amount</span>
                </div>
                <div className="text-lg font-bold text-primary">${product.price} USDT</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <p className="text-[12px] text-orange-800">
                <strong>Important:</strong> Only send USDT on the TRC20 network. Other networks will result in lost funds.
              </p>
            </div>

            <Button
              onClick={openWhatsApp}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white uppercase font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Send TX Hash via WhatsApp
            </Button>

            <p className="text-[10px] text-center text-[#666666] mt-4">
              Your subscription will be activated after 1 network confirmation.
            </p>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 border-4 border-[#F8F8F8] border-t-primary rounded-full animate-spin mb-8" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Processing Order</h3>
            <p className="text-sm text-[#666666]">Connecting to secure {paymentMethod} gateway...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Order Confirmed!</h3>
            <p className="text-sm text-[#666666] mb-2">Order ID: <strong>{orderId}</strong></p>
            <p className="text-sm text-[#666666] mb-8">Your {product.name} details will be sent to <strong>{customerEmail}</strong></p>
            <Button
              onClick={() => {
                toast.success('Thank you for your purchase!');
                reset();
              }}
              className="w-full h-14 rounded-2xl bg-black text-white hover:bg-black/90 uppercase font-bold tracking-wider"
            >
              Back to Marketplace
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
