import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#333",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const selectedPrice = location.state?.selectedPrice || "0";
  console.log("Selected:", selectedPrice);
  console.log("Selected Price Type:", typeof selectedPrice);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const priceWithoutCurrencySymbol = selectedPrice
          .replace("$", "")
          .trim();
        console.log(
          "Price without currency symbol:",
          priceWithoutCurrencySymbol
        );
        const selectedPriceNumber = parseFloat(priceWithoutCurrencySymbol);
        const priceInCents = Math.round(selectedPriceNumber * 100);
        const formattedPrice = (priceInCents / 100).toFixed(2);
        console.log("Formatted price:", formattedPrice);
        const response = await axios.post("http://localhost:4000/payment", {
          amount: priceInCents,
          id,
        });
        console.log("Response:", response);
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

return (
  <>
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto w-full md:w-1/2 lg:w-1/3 h-96 flex flex-col justify-center">
      {!success ? (
        <>
          <h2 className="text-4xl font-bold text-center text-blue-500 mb-4">
            Payment Information
          </h2>
          <p className="text-xl text-center text-gray-700 mb-4">
            Total: {selectedPrice}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border-2 border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border-2 border-gray-300 p-2 rounded"
              />
            </div>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement className="w-full" options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="w-full bg-blue-500 text-white p-2 rounded">
              Pay
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Thank you for your payment!
          </h2>
          <p className="text-lg">An email has been sent to.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
    </div>
  </>
);


}
