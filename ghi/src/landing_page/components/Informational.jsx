import React from "react";

const Informational = ({
  imageSrc,
  imageSrc2 = null,
  heading,
  description,
  imageOnLeft,
  skew = false,
}) => {
  return (
    <div className="mx-40 text-lg">
      <div
        className={`flex flex-col md:flex-row items-center ${
          imageOnLeft ? "" : "md:flex-row-reverse"
        } mb-[10rem] 1440:mb-[20rem]`}
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {skew ? (
              <div className="1080:scale-75 1440:scale-100">
                <img
                  src={imageSrc}
                  alt={heading}
                  className={`transform ${
                    imageOnLeft
                      ? "skew-x-[12deg] skew-y-[-2deg] rotate-4 scale-x-[0.85] drop-shadow-image_left"
                      : "skew-x-[-12deg] skew-y-[2deg] rotate-4 scale-x-[0.85] drop-shadow-image_right"
                  }`}
                  style={{ maxWidth: "80%", maxHeight: "400px" }}
                />
                {imageSrc2 !== null && (
                  <img
                    src={imageSrc2}
                    alt={heading}
                    className={`absolute top-[50%] ${
                      imageOnLeft
                        ? "skew-x-[12deg] skew-y-[-2deg] rotate-4 scale-x-[0.85] drop-shadow-image_left left-[35%]"
                        : "skew-x-[-12deg] skew-y-[2deg] rotate-4 scale-x-[0.85] drop-shadow-image_right right-[35%]"
                    }`}
                    style={{ maxWidth: "80%", maxHeight: "400px" }}
                  />
                )}
              </div>
            ) : (
              <>
                <img
                  src={imageSrc}
                  alt={heading}
                  className="drop-shadow-image_right"
                  style={{ maxWidth: "80%", maxHeight: "600px" }}
                />
                {imageSrc2 !== null && (
                  <img
                    src={imageSrc2}
                    alt={heading}
                    className=""
                    style={{ maxWidth: "80%", maxHeight: "300px" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 md:px-0 mx-8">
          <h2 className="text-4xl 1440:text-5xl font-bold mb-2">{heading}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Informational;
