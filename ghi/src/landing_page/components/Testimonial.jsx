import React from "react";
const Testimonial = () => {
  const testimonials = [
    {
      name: "Rosheen C.",
      statement: "Uhm, what exactly is a mock testimonial?",
      profile:
        "https://ca.slack-edge.com/T04576ARM1D-U04FHH2VBS8-27fa361e0fba-512",
    },
    {
      name: "James R.",
      statement: "Mock testimonial? I'm not sure what that is.",
      profile:
        "https://ca.slack-edge.com/T04576ARM1D-U046BGP2SFJ-f372a54ea31e-512",
    },
    {
      name: "Paul N.",
      statement: "Haha sure. As long as its flattering 👍",
      profile:
        "https://ca.slack-edge.com/T04576ARM1D-U046BGN1LC8-e94e24d6e478-512",
    },
  ];

  return (
    <div className="bg-[#FAF9F6] shadow-inner-top-bottom py-20 relative">
      <div className="absolute left-[50%] -translate-x-[52%] top-10 text-5xl font-bold">
        Testimonials
      </div>
      <div className="flex justify-between pt-10">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="w-1/3 p-4  ">
            <img
              src={testimonial.profile}
              alt={testimonial.name}
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <p className="text-gray-600 text-center text-xl italic">
              {testimonial.statement}
            </p>
            <p className="text-gray-900 font-medium text-center text-lg mt-2">
              -{testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
