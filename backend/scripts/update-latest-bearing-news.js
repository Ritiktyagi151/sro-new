const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("../models/Blog");

const oldSeedSlugs = [
  "bearing-maintenance-tips",
  "lubrication-best-practices",
  "installation-tips-bearings",
  "bearing-inspection-guide",
  "bearing-replacement-checklist",
  "bearing-performance-optimization",
  "types-of-industrial-bearings",
];

const latestNews = [
  {
    slug: "rbc-bearings-q1-fy2027-webcast-july-31",
    title: "RBC Bearings hosts Q1 FY2027 earnings webcast today",
    excerpt:
      "RBC Bearings scheduled its first quarter fiscal 2027 results webcast for July 31, with updates for industrial, aerospace, and defense bearing markets.",
    date: new Date("2026-07-31"),
    image:
      "https://images.unsplash.com/photo-1503507739298-dce173d09653?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhcmluZyUyMG1haW50ZW5hbmNlJTIwdGlwc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Bearing Market",
    readTime: "3 min read",
    canonicalUrl:
      "https://investor.rbcbearings.com/news-releases/news-release-details/rbc-bearings-webcast-first-quarter-fiscal-year-2027-earnings",
    content:
      "RBC Bearings Incorporated announced that it would release first quarter fiscal 2027 financial results before the market opens on Friday, July 31, 2026, followed by an 11:00 a.m. ET conference call. The update is relevant for customers tracking highly engineered precision bearings, components, and essential systems across industrial, aerospace, and defense applications.",
  },
  {
    slug: "skf-q2-2026-industrial-bearing-margin-improvement",
    title: "SKF Q2 2026 shows margin improvement in industrial segments",
    excerpt:
      "SKF reported Q2 net sales of MSEK 23,195 and 1.4% organic growth, supported by stronger performance across industrial bearing segments.",
    date: new Date("2026-07-17"),
    image:
      "https://images.unsplash.com/photo-1709294324061-fc40251bb002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHVicmljYXRpb24lMjBiZXN0JTIwcHJhY3RpY2VzfGVufDB8fDB8fHww",
    category: "Results",
    readTime: "4 min read",
    canonicalUrl:
      "https://www.prnewswire.com/news-releases/skf-q2-2026-continued-margin-improvement-302828335.html",
    content:
      "SKF reported second quarter 2026 net sales of MSEK 23,195, organic growth of 1.4%, adjusted operating profit of MSEK 3,223, and an adjusted operating margin of 13.9%. The company said organic sales growth in industrial segments helped offset weaker automotive demand, making the update useful for industrial buyers monitoring bearing supply and reliability trends.",
  },
  {
    slug: "timken-q2-2026-results-august-4",
    title: "Timken sets August 4 date for Q2 2026 results",
    excerpt:
      "Timken, a leader in advanced motion technology and engineered bearings, will release second-quarter results before the NYSE opens on August 4.",
    date: new Date("2026-07-21"),
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGluc3RhbGxhdGlvbiUyMHRpcHMlMjBiZWFyaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Financial Update",
    readTime: "3 min read",
    canonicalUrl:
      "https://news.timken.com/2026-07-21-Timken-to-Announce-Second-Quarter-2026-Financial-Results-on-August-4",
    content:
      "The Timken Company announced on July 21, 2026 that it will publish second quarter 2026 financial results on Tuesday, August 4, before the New York Stock Exchange opens. Timken serves strategic end markets including aerospace and defense, power and electrification, automation, and industrial solutions.",
  },
  {
    slug: "duursma-to-join-dexis-industrial-distribution-network",
    title: "Duursma to join DEXIS industrial distribution network",
    excerpt:
      "BearingNews reports Dutch industrial distributor Duursma will become part of DEXIS, strengthening industrial supply coverage in Europe.",
    date: new Date("2026-07-27"),
    image:
      "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhcmluZyUyMGluc3BlY3Rpb24lMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Distribution",
    readTime: "3 min read",
    canonicalUrl: "https://www.bearing-news.com/",
    content:
      "BearingNews reported on July 27, 2026 that Dutch industrial distributor Duursma is set to join DEXIS, the industrial division of Descours & Cabaud. Distribution moves like this matter to maintenance and procurement teams because availability, local support, and supply continuity directly affect bearing replacement planning.",
  },
  {
    slug: "fersa-brasil-curitiba-bearing-facility",
    title: "Fersa Brasil inaugurates 4,400 m2 facility in Curitiba",
    excerpt:
      "The new facility marks a Latin American growth milestone for Fersa, supporting bearing production, service, and regional customer reach.",
    date: new Date("2026-07-21"),
    image:
      "https://images.unsplash.com/photo-1567093322503-341d262ad8f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXJpbmclMjByZXBsYWNlbWVudCUyMGNoZWNrbGlzdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Expansion",
    readTime: "3 min read",
    canonicalUrl: "https://www.bearing-news.com/",
    content:
      "BearingNews listed Fersa Brasil's inauguration of a 4,400 m2 facility in Curitiba as a July 2026 industry update. For bearing customers in agriculture, truck, trailer, and industrial segments, regional capacity expansion can improve response time, application support, and availability.",
  },
  {
    slug: "silicon-nitride-ball-technology-high-performance-bearings",
    title: "Silicon nitride ball technology highlighted for high-performance bearings",
    excerpt:
      "ICT's online training spotlighted silicon nitride ball technology, a key material route for high-speed and high-performance bearing applications.",
    date: new Date("2026-07-21"),
    image:
      "https://images.unsplash.com/photo-1715079005638-c37bfd236c1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlYXJpbmclMjBwZXJmb3JtYW5jZSUyMG9wdGltaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Technology",
    readTime: "4 min read",
    canonicalUrl: "https://www.bearing-news.com/news/",
    content:
      "A July 2026 BearingNews update highlighted ICT online training around silicon nitride ball technology for high-performance bearings. Ceramic rolling elements are widely used where lower density, electrical insulation, high-speed capability, and improved wear behavior can help demanding bearing applications.",
  },
  {
    slug: "rodriguez-expands-rtb-bearing-range-cobot-automation",
    title: "Rodriguez expands RTB bearing range for cobot automation",
    excerpt:
      "BearingNews highlighted Rodriguez's RTB bearing range expansion, connecting precision bearing design with flexible collaborative robot applications.",
    date: new Date("2026-07-21"),
    image:
      "https://images.unsplash.com/photo-1658248165127-f880b5a74e98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHlwZXMlMjBvZiUyMGluZHVzdHJpYWwlMjBiZWFyaW5ncyUyMnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Automation",
    readTime: "3 min read",
    canonicalUrl: "https://www.bearing-news.com/",
    content:
      "BearingNews highlighted a July 2026 Rodriguez update on expanding its RTB bearing range for new cobot applications. Precision bearing ranges for automation are becoming more important as collaborative robots demand compact assemblies, smooth motion, repeatability, and long service life.",
  },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const deleted = await Blog.deleteMany({ slug: { $in: oldSeedSlugs } });

  for (const news of latestNews) {
    await Blog.findOneAndUpdate(
      { slug: news.slug },
      {
        ...news,
        metaTitle: news.title,
        metaDescription: news.excerpt,
        author: {
          name: "SRO Editorial",
          role: "Industry Desk",
          avatar: "https://picsum.photos/seed/author7/50/50",
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Removed ${deleted.deletedCount} old seed posts.`);
  console.log(`Upserted ${latestNews.length} latest bearing news posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
