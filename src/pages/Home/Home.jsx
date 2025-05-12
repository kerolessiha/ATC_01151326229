import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import hero from "../../assets/hero.jpg";
import vision from "../../assets/vision.avif";
import { Helmet } from "react-helmet";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const numberVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

const useCountUp = (isVisible, target, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
};

const formatNumber = (number) => {
  if (number >= 1000000) return (number / 1000000).toFixed(1) + "M+";
  if (number >= 1000) return (number / 1000).toFixed(0) + "K+";
  return number;
};

const Home = () => {
  const [numbersInView, setNumbersInView] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const element = document.getElementById("impact-numbers");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        setNumbersInView(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const users = useCountUp(numbersInView, 500000);
  const profits = useCountUp(numbersInView, 12000000);
  const eventsHosted = useCountUp(numbersInView, 2000);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="font-sans overflow-x-hidden bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-6 pb-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          <div className="absolute inset-0 bg-opacity-60 mix-blend-multiply"></div>
          <motion.h1 className="relative text-4xl sm:text-5xl font-extrabold max-w-3xl leading-tight z-10">
            Booking Made Easy. Events Made Memorable.
          </motion.h1>
          <motion.p className="relative mt-4 text-lg sm:text-xl max-w-2xl font-medium z-10">
            Discover and book the best events around you, all in one place.
          </motion.p>
        </motion.section>

        {/* What We Do Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          custom={1}
          className="py-10 max-w-5xl mx-auto px-6 text-center grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <h2 className="col-span-full text-3xl font-bold mb-6">What We Do</h2>
          <p className="col-span-full max-w-3xl mx-auto mb-6 text-lg leading-relaxed text-gray-700">
            We connect event enthusiasts with unforgettable experiences,
            offering seamless booking, trusted reviews, and exclusive access to
            top events nationwide.
          </p>
          <motion.div
            variants={containerVariants}
            custom={2}
            className="bg-white shadow-xl p-8 rounded-3xl relative overflow-hidden text-gray-700 font-semibold flex flex-col items-center"
            style={{
              clipPath:
                "polygon(20% 0%, 100% 0%, 100% 90%, 85% 100%, 0% 100%, 0% 20%)",
            }}
          >
            <i className="fas fa-calendar-check text-5xl text-indigo-500 mb-4"></i>
            Easy Booking
          </motion.div>
          <motion.div
            variants={containerVariants}
            custom={3}
            className="bg-white shadow-xl p-8 rounded-3xl relative overflow-hidden text-gray-700 font-semibold flex flex-col items-center"
            style={{
              clipPath:
                "polygon(0 0, 85% 0, 100% 20%, 100% 100%, 20% 100%, 0 90%)",
            }}
          >
            <i className="fas fa-star text-5xl text-purple-600 mb-4"></i>
            Trusted Reviews
          </motion.div>
          <motion.div
            variants={containerVariants}
            custom={4}
            className="bg-white shadow-xl p-8 rounded-3xl relative overflow-hidden text-gray-700 font-semibold flex flex-col items-center"
            style={{
              clipPath:
                "polygon(10% 0, 100% 0, 100% 85%, 80% 100%, 0 100%, 0 15%)",
            }}
          >
            <i className="fas fa-lock text-5xl text-green-500 mb-4"></i>
            Exclusive Access
          </motion.div>
        </motion.section>

        {/* Our  Numbers Section */}
        <motion.section
          id="impact-numbers"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="bg-gradient-to-r from-green-400 to-indigo-600 text-white py-10 px-6 rounded-t-3xl shadow-2xl max-w-5xl mx-auto -mt-10 relative z-10"
          style={{ clipPath: "ellipse(100% 85% at 50% 15%)" }}
        >
          <div className="flex justify-around flex-wrap gap-y-10 gap-x-10 text-center">
            <motion.div
              variants={numberVariants}
              className="flex-1 min-w-[150px]"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-extrabold mb-1">
                {formatNumber(users)}
              </h3>
              <p className="font-semibold text-lg">Users</p>
            </motion.div>
            <motion.div
              variants={numberVariants}
              className="flex-1 min-w-[150px]"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-extrabold mb-1">
                ${formatNumber(profits)}
              </h3>
              <p className="font-semibold text-lg">Profits</p>
            </motion.div>
            <motion.div
              variants={numberVariants}
              className="flex-1 min-w-[150px]"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-extrabold mb-1">
                {formatNumber(eventsHosted)}
              </h3>
              <p className="font-semibold text-lg">Events Hosted</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Vision Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          custom={3}
          className="py-10 w-full px-0 mt-10"
        >
          <div className="flex flex-col md:flex-row items-center bg-white shadow-none overflow-hidden w-full">
            <div className="md:w-1/2 px-8 py-10">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                To be the leading online platform where event experiences come
                alive, making memorable moments accessible to everyone worldwide
                through innovation, trust, and community.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src={vision}
                alt="Vision"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          className="mt-10 px-10 py-5 bg-indigo-600 text-white text-center rounded-full max-w-xs mx-auto cursor-pointer font-extrabold text-xl select-none shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => (window.location.href = "/events")}
        >
          Explore Events Now
        </motion.section>

        <footer className="mt-16 p-6 text-center text-gray-500 text-sm select-none">
          &copy; {new Date().getFullYear()} Eventsy. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
