// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    slug: "advanced-bearing-materials",
    title: "Advanced Materials Improve Bearing Performance",
    excerpt:
      "Advanced bearing materials and modern heat-treatment technologies are helping industries achieve higher load capacity, longer service life, and improved resistance to wear and corrosion.",
    date: "2026-07-15",
    image:
      "https://t4.ftcdn.net/jpg/05/85/00/55/240_F_585005559_YNUJFQaDLRWN61mGNxWzz9GZypXSrOgz.jpg",
    category: "Innovation",
    readTime: "3 min read",
  },
  {
    id: 2,
    slug: "bearing-reliability",
    title: "Bearing Reliability Becomes a Key Focus in Heavy Industries",
    excerpt:
      "Manufacturers in mining, steel, cement, and power industries are prioritizing high-quality bearing solutions to minimize equipment downtime.",
    date: "2026-07-19",
    image:
      "https://t4.ftcdn.net/jpg/11/10/99/07/240_F_1110990700_5Fq0VFo1CSzfVgIfnaRARdlvy0TF8k3k.jpg",
    category: "Industrial",
    readTime: "3 min read",
  },
  {
    id: 3,
    slug: "automation-bearing-growth",
    title: "Automation Drives Growth in Precision Bearing Applications",
    excerpt:
      "Industrial automation, robotics, and CNC machinery continue to boost demand for precision bearings.",
    date: "2026-07-22",
    image:
      "https://t3.ftcdn.net/jpg/11/19/94/78/240_F_1119947888_mab34TBVzoVFc56OH96ELZk4MJE1qhis.jpg",
    category: "Automation",
    readTime: "3 min read",
  },
  {
    id: 4,
    slug: "energy-efficient-bearings",
    title: "Energy-Efficient Bearings Support Sustainable Manufacturing",
    excerpt:
      "Modern bearing technologies are reducing friction, lowering energy consumption, and improving machine efficiency.",
    date: "2026-07-25",
    image:
      "https://t4.ftcdn.net/jpg/11/86/60/59/240_F_1186605927_xIyNo6Hw4DSSP0myEk7r3oHRc9xyRxl7.jpg",
    category: "Sustainability",
    readTime: "3 min read",
  },
  {
    id: 5,
    slug: "predictive-maintenance",
    title: "Predictive Maintenance Reduces Bearing Downtime",
    excerpt:
      "Predictive maintenance technologies are enabling industries to identify bearing wear before failures occur.",
    date: "2026-07-28",
    image:
      "https://t3.ftcdn.net/jpg/03/14/76/20/240_F_314762012_Ujc3BNLEdzQ6yfYAiCRbHQaPHxZxu2EF.jpg",
    category: "Technology",
    readTime: "3 min read",
  },
  {
    id: 6,
    slug: "global-bearing-demand",
    title: "Global Demand for Industrial Bearings Continues to Rise",
    excerpt:
      "Infrastructure, renewable energy, automotive production, and industrial automation are driving demand for high-performance industrial bearings.",
    date: "2026-07-31",
    image:
      "https://t3.ftcdn.net/jpg/13/74/03/58/240_F_1374035846_7XnRZfXZnG1BXIq9Wx5nWx20eIvFdLZc.jpg",
    category: "Industry News",
    readTime: "4 min read",
  },
];

const replacedSeedSlugs = [
  "bearing-maintenance-tips",
  "lubrication-best-practices",
  "installation-tips-bearings",
  "bearing-inspection-guide",
  "bearing-replacement-checklist",
  "bearing-performance-optimization",
  "types-of-industrial-bearings",
];

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/blogs");
    const data = await res.json();
    return {
      props: {
        initialBlogs: data.blogs || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return {
      props: {
        initialBlogs: blogPosts,
      },
      revalidate: 60,
    };
  }
}

export default function BlogPage({ initialBlogs = [] }) {
  const [mounted, setMounted] = useState(false);
  const [blogs] = useState(() => {
    const latestSlugs = new Set(blogPosts.map((post) => post.slug));
    const remainingBlogs = initialBlogs.filter(
      (post) => !latestSlugs.has(post.slug) && !replacedSeedSlugs.includes(post.slug)
    );
    return [...blogPosts, ...remainingBlogs];
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Blog | SRO Bearings</title>
        <meta name="description" content="Latest articles from SRO Bearings" />
      </Head>

      {/* Blog Banner */}
      <div
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-black bg-[url('/srobanners/sro-bearing-mobile.png')] bg-cover bg-center bg-no-repeat md:h-[70vh] md:bg-[url('/srobanners/blog-banner.png')]"
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
              SRO Insights
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-white max-w-2xl mx-auto">
              Expert knowledge for bearing professionals
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post._id || post.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : `http://localhost:5001${post.image}`
                  }
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap justify-between gap-2 items-center mb-2">
                  <span className="text-xs font-semibold text-[#00974A] uppercase">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:text-[#00974A] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <time className="text-sm sm:text-lg text-gray-500">
                    {new Date(post.date || post.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-sm sm:text-lg font-medium text-[#00974A] hover:text-[#00974A] flex items-center"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
