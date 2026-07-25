// @ts-nocheck
import Head from "next/head";
import AboutHomeSection from "@/components/AboutSection/AboutHomeSection";
import Overviewsection from "@/components/AboutSection/Overviewsection";
import Journeysection from "@/components/AboutSection/Journeysection";
import TimelineSection from "@/components/AboutSection/TimelineSection";
import ValuesMission from "@/components/AboutSection/ValuesMission";
import Sustainability from "@/components/AboutSection/Sustainability";
import Ourpurpose from "@/components/AboutSection/Ourpurpose";
import ExploreMoreSection from "@/components/homesections/ExploreMoreSection";

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
    console.error("Error fetching about CMS data:", err);
    return {
      props: {
        about: {},
      },
      revalidate: 60,
    };
  }
}

export default function About({ about = {} }) {
  return (
    <>
      <Head>
        <title>About | SRO bearing</title>
      </Head>
      <AboutHomeSection about={about} />
      <Overviewsection about={about} />
      <Journeysection about={about} />
      <TimelineSection about={about} />
      {/* <ValuesMission about={about} /> */}
      <Sustainability about={about} />
      <Ourpurpose about={about} />
      <ExploreMoreSection />
    </>
  );
}
