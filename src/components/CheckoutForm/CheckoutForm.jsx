import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = ({ grandTotal, medicineIds, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch medicines using TanStack Query
  const {
    data: medicines = [],
    isLoading: medicinesLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosSecure.get("/medicines");
      return response?.data;
    },
  });

  const {} = medicines;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // 1. Create Payment Intent
      const { clientSecret } = (
        await axiosSecure.post(
          "/create-payment-intent",
          { amount: grandTotal * 100 } // Convert to cents for Stripe
        )
      ).data;

      // 2. Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        // 3. Save Payment Info to Backend (Order Collection)
        const orderDetails = {
          buyer: user?.email,
          totalAmount: grandTotal,
          paymentStatus: result.paymentIntent.status,
          transactionId: result.paymentIntent.id,
          medicineIds,
          status: false,
        };

        const response = await axiosSecure.post("/orders", orderDetails);
        if (response.data.success) {
          onSuccess(); // Navigate to invoice or success page
        } else {
          toast.error("Failed to save order details.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <CardElement className="border p-2 rounded" />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`px-4 py-2 rounded text-white ${
          isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isProcessing ? "Processing..." : "Pay $ " + grandTotal.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;

