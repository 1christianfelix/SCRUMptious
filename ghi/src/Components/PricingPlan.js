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

  const handleClick = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {isNew && (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mb-2">
          NEW
        </span>
      )}
      <p className="text-gray-500 mb-6">{description}</p>
      <div className="text-4xl font-semibold mb-4">{price}</div>
      <div className="mb-6">
        {keyFeatures.map((feature, index) => (
          <p key={index} className="text-gray-600 mb-2">
            {feature}
          </p>
        ))}
      </div>
      <button
        className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md ${buttonColor}`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
      {isMostPopular && (
        <span className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded-full text-xs">
          MOST POPULAR
        </span>
      )}
    </div>
  );
};

export default PricingPlan;
