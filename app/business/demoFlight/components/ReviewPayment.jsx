"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Plane, 
  CreditCard, 
  Building, 
  Smartphone, 
  Lock, 
  Shield,
  Leaf,
  ArrowRight,
  Wallet
} from "lucide-react";

// Helper to get count regardless if passengers is array or number
function getPassengerCount(passengers) {
  return Array.isArray(passengers) ? passengers.length : passengers || 1;
}

export function ReviewPayment({ bookingData, onComplete, onBack, canGoBack }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    billingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterSubscribe, setNewsletterSubscribe] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use robust passenger count everywhere
  const passengerCount = getPassengerCount(bookingData.passengers);

  // Calculate flight price robustly
  const flightPrice =
    bookingData.totalFlightPrice ||
    (
      (bookingData.outbound?.price || 0) +
      (bookingData.inbound?.price || 0)
    ) * passengerCount;

  const servicesTotal = bookingData.servicesTotal || 0;
  const fareLockPrice = bookingData.fareLockPrice || 0;
  const totalPrice = flightPrice + servicesTotal + fareLockPrice;

  const handleComplete = async () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onComplete({
        paymentMethod,
        cardDetails,
        finalPrice: totalPrice,
        termsAccepted,
        newsletterSubscribe
      });
    }, 2000);
  };

  const { outbound, inbound, searchParams, carbonOffset } = bookingData;

  // Payment method options
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      color: 'blue',
      description: 'Secure payment with instant confirmation'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      color: 'blue',
      description: 'Direct transfer from your bank account'
    },
    {
      id: 'digital',
      name: 'Digital Wallet',
      icon: Smartphone,
      color: 'blue',
      description: 'Pay with Apple Pay, Google Pay, or PayPal'
    },
    {
      id: 'bnpl',
      name: 'Buy Now, Pay Later',
      icon: Wallet,
      color: 'blue',
      description: 'Split your payment into installments'
    }
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Review & Payment</h3>
              <p className="text-gray-600 text-lg">
                Review your booking details and complete your payment
              </p>
            </div>

            {/* Payment Methods */}
            <Card>
              <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-6">
                <h4 className="text-xl font-semibold">Choose Payment Method</h4>
              </div>
              <div className="p-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`flex items-center space-x-4 p-4 border-2 rounded-lg transition-all duration-300 cursor-pointer ${
                          paymentMethod === method.id
                            ? `border-${method.color}-500 bg-${method.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className={`p-2 rounded-full bg-${method.color}-100`}>
                          <Icon className={`h-5 w-5 text-${method.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-semibold text-gray-900 cursor-pointer">
                            {method.name}
                          </Label>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        {method.id === 'card' && (
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              V
                            </div>
                            <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              M
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>

                {/* Card Details Form */}
                {paymentMethod === "card" && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold mb-4 text-gray-900">Card Information</h5>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Card Number</Label>
                        <Input 
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          className="mt-1"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Expiry Date</Label>
                          <Input 
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            className="mt-1"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">CVV</Label>
                          <Input 
                            placeholder="123"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            className="mt-1"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                        <Input 
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      {/* Billing Address */}
                      <div className="pt-4 border-t">
                        <h6 className="font-medium mb-3 text-gray-900">Billing Address</h6>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Street Address</Label>
                            <Input
                              placeholder="123 Main Street"
                              value={cardDetails.billingAddress.street}
                              onChange={(e) => setCardDetails(prev => ({ 
                                ...prev, 
                                billingAddress: { ...prev.billingAddress, street: e.target.value }
                              }))}
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">City</Label>
                              <Input
                                placeholder="New York"
                                value={cardDetails.billingAddress.city}
                                onChange={(e) => setCardDetails(prev => ({ 
                                  ...prev, 
                                  billingAddress: { ...prev.billingAddress, city: e.target.value }
                                }))}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700">ZIP Code</Label>
                              <Input
                                placeholder="10001"
                                value={cardDetails.billingAddress.zipCode}
                                onChange={(e) => setCardDetails(prev => ({ 
                                  ...prev, 
                                  billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                                }))}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Payment Method Messages */}
                {paymentMethod === "bank" && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      After clicking &quot;Complete Payment&quot;, you will be redirected to your bank&apos;s secure portal to complete the transfer.
                    </p>
                  </div>
                )}

                {paymentMethod === "digital" && (
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-700">
                      You will be redirected to your selected digital wallet provider to complete the payment.
                    </p>
                  </div>
                )}

                {paymentMethod === "bnpl" && (
                  <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700">
                      Split your payment into 4 interest-free installments. First payment due today: ${(totalPrice / 4).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Terms and Conditions */}
            <Card className="shadow-lg">
              <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">Terms & Conditions</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={setTermsAccepted}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed text-gray-700">
                      I accept the{" "}
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-medium">
                        Terms and Conditions
                      </Button>
                      ,{" "}
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-medium">
                        Privacy Policy
                      </Button>
                      , and{" "}
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-medium">
                        Cancellation Policy
                      </Button>
                      . I understand that my booking is subject to the airline&apos;s terms and conditions.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="newsletter"
                      checked={newsletterSubscribe}
                      onCheckedChange={setNewsletterSubscribe}
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-700">
                      Subscribe to our newsletter for exclusive deals and travel tips
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div className="text-sm text-blue-700">
                    <span className="font-medium">Secure Payment:</span> Your payment information is protected with 256-bit SSL encryption and is PCI DSS compliant.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary - Right Column (Sticky) */}
          <div className="relative h-fit hidden lg:block">
            <div className="sticky top-6 flex flex-col gap-6">
              <Card className="shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-6">
                  <h4 className="text-xl font-semibold">Booking Summary</h4>
                </div>
                <div className="p-6 space-y-6">
                  {/* Outbound Flight */}
                  {outbound && outbound.flight && (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-600 rounded-full">
                          <Plane className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {searchParams?.origin} → {searchParams?.destination}
                          </div>
                          <div className="text-sm text-gray-600">
                            {outbound.flight?.departure?.time} - {outbound.flight?.arrival?.time} • 
                            {outbound.flight?.airline} • {outbound.class?.toUpperCase?.()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${outbound.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>
                  )}

                  {/* Return Flight */}
                  {inbound && inbound.flight && (
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-600 rounded-full">
                          <Plane className="h-5 w-5 text-white rotate-180" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {searchParams?.destination} → {searchParams?.origin}
                          </div>
                          <div className="text-sm text-gray-600">
                            {inbound.flight?.departure?.time} - {inbound.flight?.arrival?.time} • 
                            {inbound.flight?.airline} • {inbound.class?.toUpperCase?.()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${inbound.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Flight tickets ({passengerCount} passenger{passengerCount > 1 ? 's' : ''})
                      </span>
                      <span className="font-semibold">${flightPrice.toFixed(2)}</span>
                    </div>
                    {fareLockPrice > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Fare Lock Service</span>
                        <span className="font-semibold">${fareLockPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {servicesTotal > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Additional Services</span>
                        <span className="font-semibold">${servicesTotal.toFixed(2)}</span>
                      </div>
                    )}
                    {carbonOffset?.enabled && (
                      <div className="flex items-center justify-between text-green-600">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          <span>Carbon Offset ({carbonOffset.totalEmission} kg CO₂e)</span>
                        </div>
                        <span className="font-semibold">${carbonOffset.totalPrice.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Customer Support */}
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Need Help?</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      Our 24/7 customer support team is here to assist you
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Live Chat
                      </Button>
                      <div className="text-sm text-gray-600">
                        Call: +1-800-FLIGHTS
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg p-6 mt-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">Secure Payment</span>
              </div>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Modify Booking
              </Button>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Final amount</div>
              </div>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold disabled:opacity-70"
                onClick={handleComplete}
                disabled={!termsAccepted || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Complete Payment
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}