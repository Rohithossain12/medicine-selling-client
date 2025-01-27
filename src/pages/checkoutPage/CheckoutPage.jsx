import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  //  total amount is passed via state
  const grandTotal = state?.grandTotal || 0;
  const medicineItems = state?.medicineItems || [];
  return (
    <div className="p-8">
      <Helmet>
        <title>PharmaWorld | Checkout</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <p className="text-xl">Total Amount: ${grandTotal.toFixed(2)}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          grandTotal={grandTotal}
          medicineItems={medicineItems}
          onSuccess={(_id) => {
            navigate("/invoice", {
              state: { _id, grandTotal },
            });
          }}
        />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
