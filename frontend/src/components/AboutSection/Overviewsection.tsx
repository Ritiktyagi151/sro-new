// @ts-nocheck
import { motion } from "framer-motion";
import Image from "next/image";

export default function GreenOverview() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#00974A] sm:text-4xl">
              Driving a Greener Future
            </h2>
            <p className="mt-4 text-lg text-[#00974A]">
              Our mission is to blend innovation with sustainability. By
              integrating eco-conscious strategies into our workflow, we help
              businesses reduce environmental impact while boosting efficiency
              and value.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-6 py-3 bg-[#00974A] text-white font-medium rounded-lg hover:bg-[#00974A] transition shadow-md hover:shadow-lg">
                Discover Our Sustainable Impact
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-xl mt-8 lg:mt-0"
          >
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnhncTdxMnV1c2prZnl6bXpud2dtYW5vMWs5OHV5azBxaWV1NXo2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Kd61lL6mzxZyIy1smx/giphy.gif"
              alt="Green sustainability animation"
              className="object-cover w-full h-auto"
            />
            <motion.div
              className="absolute inset-0 bg-[#00974A] bg-opacity-20 hover:bg-opacity-0 transition"
              whileHover={{ opacity: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
