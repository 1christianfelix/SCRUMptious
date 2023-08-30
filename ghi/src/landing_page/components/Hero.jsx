import "jquery.ripples";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../images/Untitled-2.png";
import * as jquery from "jquery";
// import Spline from "@splinetool/react-spline";

const $ = typeof window !== "undefined" ? jquery.default : jquery;

const Hero = () => {
  const fadeInUp = {
    initial: {
      opacity: 0,
      y: -280,
    },
    animate: {
      opacity: 1,
      y: -280,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(true);

  useEffect(() => {
    $("#ripple").ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.03,
    });

    const timer1 = setTimeout(() => {
      setShowFirstText(false);
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowSecondText(true);
    }, 1800);

    return () => {
      // Clean up on unmount
      $("#ripple").ripples("destroy");
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center text-white relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div id="ripple" className="absolute inset-0"></div>
      <AnimatePresence>
        {showFirstText && (
          <motion.h1
            className="text-4xl md:text-6xl font-semibold font-rounded relative z-10"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
            key="firstText"
          >
            Productivity made simple.
          </motion.h1>
        )}
        {showSecondText && (
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-semibold font-rounded z-10 1440:text-8xl absolute top-[15%] left-[50%] -translate-x-[50%]"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              key="secondText"
            >
              <div>Scrumptious</div>
              <div className="">Productivity made simple</div>
            </motion.h1>
            <motion.div
              className="h-[70rem] w-screen scale-[.50] 1440:scale-[.75] 1440:w-[75%] 1440:h-[80%] absolute top-[5%] 1440:top-[25%] left-[50%] -translate-x-[51%] 1440:-translate-x-[53%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 10 }}
            >
{/*               <Spline scene="https://prod.spline.design/VEfgM0qUrBGa9a42/scene.splinecode" /> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
