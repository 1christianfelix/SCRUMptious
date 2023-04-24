import React from "react";
import { useNavigate } from "react-router-dom";

const PricingPlan = ({
  title,
  description,
  price,
  keyFeatures,
  buttonText,
  buttonColor,
  isNew,
  isMostPopular,
}) => {
  const navigate = useNavigate();

const handleClick = (price) => {
  navigate("/payment", { state: { selectedPrice: price } });
};

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-3xl price text-center font-bold text-gray-800 mb-4">
          {price}
        </div>
        <ul className="text-gray-600 mb-4">
          {keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="h-6 w-6 mr-2 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={`block w-full ${buttonColor || ""} ${
            price === "$1" ? "bg-gray-500" : "bg-green-500"
          } hover:${
            price === "$1" ? "bg-gray-600" : "bg-green-600"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleClick(price)}
        >
          {buttonText}
        </button>
        <div className="flex justify-center">
          {isNew && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs mt-4">
              MOST POPULAR
            </span>
          )}
          {isMostPopular && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mt-4">
              NEW
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
