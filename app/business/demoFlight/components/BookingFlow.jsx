"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Check, Plane, Users, CreditCard, FileCheck } from "lucide-react";
import { TicketConfirmation } from "./TicketConfirmation";
import { PassengerDetails } from "./PassengerDetails";
import { AdditionalServices } from "./AdditionalServices";
import { ReviewPayment } from "./ReviewPayment";

const BOOKING_STEPS = [
  { 
    id: "confirm", 
    title: "Confirm Tickets", 
    icon: FileCheck,
    component: TicketConfirmation 
  },
  { 
    id: "passengers", 
    title: "Passenger Details", 
    icon: Users,
    component: PassengerDetails 
  },
  { 
    id: "services", 
    title: "Additional Services", 
    icon: Plane,
    component: AdditionalServices 
  },
  { 
    id: "payment", 
    title: "Review & Payment", 
    icon: CreditCard,
    component: ReviewPayment 
  },
];

export function BookingFlow({ isOpen, onClose, bookingData, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingState, setBookingState] = useState(bookingData);
  const [stepData, setStepData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setBookingState(bookingData);
      setStepData(null);
    }
  }, [isOpen, bookingData]);

  useEffect(() => {
    if (stepData) {
      const updatedBookingState = { ...bookingState, ...stepData };
      setBookingState(updatedBookingState);
      
      if (currentStep < BOOKING_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        onComplete(updatedBookingState);
      }
      
      setStepData(null);
    }
  }, [stepData, currentStep, bookingState, onComplete]);

  const handleStepComplete = (data) => {
    console.log('Step completed with data:', data);
    setStepData(data);
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = BOOKING_STEPS[currentStep];
  const CurrentStepComponent = step ? step.component : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-auto p-0 bg-gray-50">
        <div className="flex flex-col h-full">
          {/* Enhanced Progress Header */}
          <div className="bg-white border-b shadow-sm">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Enhanced Progress Steps */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                {BOOKING_STEPS.map((stepItem, index) => {
                  const Icon = stepItem.icon;
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;
                  const isUpcoming = index > currentStep;
                  
                  return (
                    <div key={stepItem.id} className="flex items-center flex-1">
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                            isCompleted
                              ? "bg-green-600 text-white shadow-lg"
                              : isCurrent
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-3">
                          <div
                            className={`text-sm font-semibold ${
                              isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {stepItem.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            Step {index + 1} of {BOOKING_STEPS.length}
                          </div>
                        </div>
                      </div>
                      {index < BOOKING_STEPS.length - 1 && (
                        <div
                          className={`flex-1 mx-4 h-0.5 transition-all duration-300 ${
                            isCompleted ? "bg-green-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {CurrentStepComponent ? (
              <CurrentStepComponent
                bookingData={bookingState}
                onComplete={handleStepComplete}
                onBack={handleStepBack}
                canGoBack={currentStep > 0}
              />
            ) : (
              <div className="p-8 text-center text-lg text-gray-700">
                🎉 Booking Completed!  
                <div className="mt-4">
                  <Button onClick={onClose} className="bg-blue-600 text-white">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}