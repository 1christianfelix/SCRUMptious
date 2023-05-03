import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import NightSky1 from "../images/NightSky1.png";
import NightSky2 from "../images/NightSky2.jpg";
// import signup_signin_bg from "../images/signup-signin-bg.png";
import { Elements } from "@stripe/react-stripe-js";
import { Fireworks } from "@fireworks-js/react";
// npm i --save-dev @types/react-fireworks

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// npm install react-toastify

import "./PaymentForm.css";


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
      <div className="p-6 mx-auto w-full md:w-1/2 lg:w-1/3 h-96 flex flex-col justify-center">
        {!success ? (
          <>
            <h2 className="text-4xl font-bold text-center text-blue-500 mb-4">
              Payment Information
            </h2>
            <p className="text-xl text-center font-bold text-blue-500 mb-4">
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
              <fieldset
                className="FormGroup rounded-lg"
                style={{ backgroundColor: "white" }}
              >
                <div className="FormRow">
                  <CardElement className="w-full" options={CARD_OPTIONS} />
                </div>
              </fieldset>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded">
                Pay
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center h-full">
              <h2
                className="text-2xl font-semibold mb-4 text-white animate-drop-down"
                style={{ position: "relative", zIndex: 2 }}
              >
                Thank you for your payment!
              </h2>
              <p
                className="text-white animate-drop-down"
                style={{ position: "relative", zIndex: 2 }}
              >
                An email of your receipt has been sent.
              </p>
              <Link
                to="/signin"
                className="text-blue-500 font-bold hover:underline animate-drop-down"
                style={{ position: "relative", zIndex: 2 }}
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
      <Fireworks
        options={{ rocketsPoint: { min: 0, max: 100 } }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          backgroundImage: `url(${NightSky1})`,
          backgroundSize: "cover",
          zIndex: -1,
        }}
      />
    </>
  );
}
