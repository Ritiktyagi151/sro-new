// @ts-nocheck
import Blogs from "@/components/homesections/Blogs";
import HeroVideoSection from "@/components/homesections/herovideosection";
import Homeabout from "@/components/homesections/Homeabout";
import IndustryApplications from "@/components/homesections/ResearchApplications";
import OurClient from "@/components/homesections/OurClient";
import ProductSlider from "@/components/homesections/Productslider";
import ExploreMore from "@/components/homesections/ExploreMoreSection";
import WhoWeAre from "@/components/homesections/WhoWeAre";
import ThisIsUs from "@/components/homesections/ThisIsUs";
import MarketSlider from "@/components/homesections/MarketSlider";
import ServiceWarehouseSection from "@/components/homesections/ServiceWarehouseSection";
import ArmorQualitySection from "@/components/homesections/ArmorQualitySection";
import QuoteFaqSection from "@/components/homesections/QuoteFaqSection";
import TestimonialsSection from "@/components/homesections/TestimonialsSection";

import Head from "next/head";
import Journey from "@/components/homesections/Journey";
import { motion } from "framer-motion";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/cms/about");
    const data = await res.json();
    return {
      props: {
        about: data.about || {},
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching about CMS data on index page:", err);
    return {
      props: {
        about: {},
      },
      revalidate: 60,
    };
  }
}

export default function Home({ about = {} }) {
  const ScrollReveal = ({ children, delay = 0, fadeOnly = false }) => (
    <motion.div
      initial={fadeOnly ? { opacity: 0 } : { opacity: 0, y: 54 }}
      whileInView={fadeOnly ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      <Head>
        <title>Home | SRO bearing</title>
      </Head>
      <HeroVideoSection />
      <ScrollReveal>
        <Homeabout />
      </ScrollReveal>
      <ScrollReveal>
        <ProductSlider />
      </ScrollReveal>
      <ScrollReveal>
        <ArmorQualitySection />
      </ScrollReveal>
      <ScrollReveal>
        <MarketSlider />
      </ScrollReveal>
      <ScrollReveal>
        <ServiceWarehouseSection />
      </ScrollReveal>
      <ScrollReveal>
        <Journey about={about} />
      </ScrollReveal>
      <ScrollReveal fadeOnly>
        <WhoWeAre />
      </ScrollReveal>
      <ScrollReveal>
        <QuoteFaqSection />
      </ScrollReveal>
      <ScrollReveal>
        <ThisIsUs />
      </ScrollReveal>
      <ScrollReveal>
        <IndustryApplications />
      </ScrollReveal>
      {/* <ExploreMore /> */}
      <ScrollReveal>
        <Blogs />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
      {/* <OurClient /> */}
    </>
  );
}
