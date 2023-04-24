import React from "react";
import PricingPlan from "./PricingPlan";

const Pricing = () => {
  const plans = [
    {
      title: "Free",
      description: "For teams getting started",
      price: "$1",
      keyFeatures: [
        "Centralized task management",
        "Active task limitations apply",
      ],
      buttonText: "Choose Plan",
      buttonColor: "bg-gray-500",
    },
    {
      title: "Team",
      description: "For growing teams",
      price: "$9.80",
      keyFeatures: ["Effective team management", "2-25 users"],
      buttonText: "Choose Plan",
      buttonColor: "bg-green-500",
      isNew: true,
    },
    {
      title: "Business",
      description: "For all teams across an organization",
      price: "$24.80",
      keyFeatures: [
        "Customized platform for any team size",
        "5-200 users",
      ],
      buttonText: "Choose Plan",
      buttonColor: "bg-green-500",
      isMostPopular: true,
    },
  ];

// Inside your Pricing component
return (
  <div className="container mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-center mb-8">Pricing Plans</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => (
        <PricingPlan key={index} {...plan} />
      ))}
    </div>
  </div>

  );
};

export default Pricing;
