// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar4";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    slug: "advanced-bearing-materials",
    title: "Advanced Materials Improve Bearing Performance",
    content: `
<h2 class="text-2xl font-bold mb-4">Material Innovation</h2>
<p class="mb-6">Advanced bearing materials and modern heat-treatment technologies are helping industries achieve higher load capacity, longer service life, and improved resistance to wear and corrosion.</p>
<p class="mb-6">For heavy engineering, manufacturing, and high-speed machinery, better material selection can reduce friction losses, improve fatigue resistance, and protect bearings from harsh operating conditions.</p>
`,
    date: "2026-07-15",
    image: "https://t4.ftcdn.net/jpg/05/85/00/55/240_F_585005559_YNUJFQaDLRWN61mGNxWzz9GZypXSrOgz.jpg",
    category: "Innovation",
    readTime: "3 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author0/50/50",
    },
  },
  {
    id: 2,
    slug: "bearing-reliability",
    title: "Bearing Reliability Becomes a Key Focus in Heavy Industries",
    content: `
<h2 class="text-2xl font-bold mb-4">Reliability Focus</h2>
<p class="mb-6">Manufacturers in mining, steel, cement, and power industries are prioritizing high-quality bearing solutions to minimize equipment downtime, improve operational efficiency, and reduce long-term maintenance costs.</p>
<p class="mb-6">The focus is shifting toward correct bearing selection, contamination control, alignment, lubrication discipline, and condition monitoring.</p>
`,
    date: "2026-07-19",
    image: "https://t4.ftcdn.net/jpg/11/10/99/07/240_F_1110990700_5Fq0VFo1CSzfVgIfnaRARdlvy0TF8k3k.jpg",
    category: "Industrial",
    readTime: "3 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author2/50/50",
    },
  },
  {
    id: 3,
    slug: "automation-bearing-growth",
    title: "Automation Drives Growth in Precision Bearing Applications",
    content: `
<h2 class="text-2xl font-bold mb-4">Precision Applications</h2>
<p class="mb-6">The increasing adoption of industrial automation, robotics, and CNC machinery continues to boost the demand for precision bearings that deliver high accuracy, smooth performance, and long operational life.</p>
<p class="mb-6">Precision bearing applications need consistent geometry, controlled internal clearance, low vibration, and reliable lubrication performance.</p>
`,
    date: "2026-07-22",
    image: "https://t3.ftcdn.net/jpg/11/19/94/78/240_F_1119947888_mab34TBVzoVFc56OH96ELZk4MJE1qhis.jpg",
    category: "Automation",
    readTime: "3 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author3/50/50",
    },
  },
  {
    id: 4,
    slug: "energy-efficient-bearings",
    title: "Energy-Efficient Bearings Support Sustainable Manufacturing",
    content: `
<h2 class="text-2xl font-bold mb-4">Sustainable Manufacturing</h2>
<p class="mb-6">Modern bearing technologies are reducing friction, lowering energy consumption, and improving machine efficiency.</p>
<p class="mb-6">Industries are increasingly adopting energy-efficient bearing solutions to support sustainable manufacturing goals and reduce total cost of ownership.</p>
`,
    date: "2026-07-25",
    image: "https://t4.ftcdn.net/jpg/11/86/60/59/240_F_1186605927_xIyNo6Hw4DSSP0myEk7r3oHRc9xyRxl7.jpg",
    category: "Sustainability",
    readTime: "3 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author4/50/50",
    },
  },
  {
    id: 5,
    slug: "predictive-maintenance",
    title: "Predictive Maintenance Reduces Bearing Downtime",
    content: `
<h2 class="text-2xl font-bold mb-4">Maintenance Technology</h2>
<p class="mb-6">Predictive maintenance technologies, including vibration monitoring and condition analysis, are enabling industries to identify bearing wear before failures occur.</p>
<p class="mb-6">This approach helps improve equipment uptime, reduce maintenance expenses, and support planned shutdown decisions.</p>
`,
    date: "2026-07-28",
    image: "https://t3.ftcdn.net/jpg/03/14/76/20/240_F_314762012_Ujc3BNLEdzQ6yfYAiCRbHQaPHxZxu2EF.jpg",
    category: "Technology",
    readTime: "3 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author5/50/50",
    },
  },
  {
    id: 6,
    slug: "global-bearing-demand",
    title: "Global Demand for Industrial Bearings Continues to Rise",
    content: `
<h2 class="text-2xl font-bold mb-4">Market Demand</h2>
<p class="mb-6">Growing investments in infrastructure, renewable energy, automotive production, and industrial automation are driving steady demand for high-performance industrial bearings.</p>
<p class="mb-6">Industry demand continues to favor reliable products, faster availability, and application support that helps customers improve efficiency and machine life.</p>
`,
    date: "2026-07-31",
    image: "https://t3.ftcdn.net/jpg/13/74/03/58/240_F_1374035846_7XnRZfXZnG1BXIq9Wx5nWx20eIvFdLZc.jpg",
    category: "Industry News",
    readTime: "4 min read",
    author: {
      name: "SRO Editorial",
      role: "Industry Desk",
      avatar: "https://picsum.photos/seed/author6/50/50",
    },
  },
];

export default function BlogPost({ post, relatedPosts = [] }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <Link
            href="/blogs"
            className="text-[#00974A] hover:text-[#00974A] inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{post.title} | SRO Bearings</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Video Banner Section */}
      <section className="relative w-full h-[62vh] min-h-[460px] max-h-[800px] overflow-hidden md:h-[70vh]">
        {/* Solid Gray Overlay */}
        <div className="absolute inset-0 bg-gray-100/10 z-10"></div>

        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-400 z-20">
            <div className="animate-pulse text-white"></div>
          </div>
        )}

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          onCanPlayThrough={() => setIsVideoLoading(false)}
          poster={post.image.startsWith("http") ? post.image : `http://localhost:5001${post.image}`}
        >
          <source src={post.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex items-end pb-16 md:items-center md:justify-center md:pb-0 z-30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-[#00974A] rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={post.author && post.author.avatar && post.author.avatar.startsWith("http") ? post.author.avatar : (post.author && post.author.avatar ? `http://localhost:5001${post.author.avatar}` : "https://picsum.photos/seed/author/80/80")}
                    alt={post.author?.name || "Author"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author?.name || "Admin"}</p>
                  <p className="text-white/80 text-sm">{post.author?.role || "Mechanical Analyst"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
          <button
            aria-label="Scroll down"
            className="text-white animate-bounce"
            onClick={() =>
              document
                .querySelector("main")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl">
        <article className="bg-white rounded-xl shadow-lg p-5 sm:p-6 md:p-8 -mt-16 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex min-w-0 items-center space-x-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={post.author && post.author.avatar && post.author.avatar.startsWith("http") ? post.author.avatar : (post.author && post.author.avatar ? `http://localhost:5001${post.author.avatar}` : "https://picsum.photos/seed/author/80/80")}
                  alt={post.author?.name || "Author"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900">
                  {post.author?.name || "Admin"}
                </p>
                <div className="flex flex-wrap gap-x-2 text-sm text-gray-500">
                  <time dateTime={post.date || post.createdAt}>
                    {new Date(post.date || post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-[#00974A] rounded-full hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-400 rounded-full hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none tiptap-editor-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blogs"
              className="inline-flex items-center text-[#00974A] hover:text-[#00974A] font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost._id || relatedPost.slug}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <Link href={`/blogs/${relatedPost.slug}`}>
                    <div className="relative h-48 w-full">
                      <img
                        src={relatedPost.image.startsWith("http") ? relatedPost.image : `http://localhost:5001${relatedPost.image}`}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-[#00974A] bg-[#00974A]/10 rounded-full mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00974A] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <time dateTime={relatedPost.date || relatedPost.createdAt}>
                          {new Date(relatedPost.date || relatedPost.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:5001/api/blogs");
    const data = await res.json();
    const paths = (data.blogs || []).map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("Error in getStaticPaths:", err);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  const localPost = blogPosts.find((post) => post.slug === params.slug);
  const localRelatedPosts = blogPosts
    .filter((post) => post.slug !== params.slug)
    .slice(0, 3);

  try {
    const res = await fetch(`http://localhost:5001/api/blogs/${params.slug}`);
    const data = await res.json();
    if (!data.success) {
      if (localPost) {
        return {
          props: {
            post: localPost,
            relatedPosts: localRelatedPosts,
          },
          revalidate: 60,
        };
      }
      return { notFound: true };
    }

    const allRes = await fetch("http://localhost:5001/api/blogs");
    const allData = await allRes.json();
    const relatedPosts = (allData.blogs || [])
      .filter((p) => p.slug !== params.slug)
      .slice(0, 3);

    return {
      props: {
        post: data.blog,
        relatedPosts,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error in getStaticProps:", err);
    if (localPost) {
      return {
        props: {
          post: localPost,
          relatedPosts: localRelatedPosts,
        },
        revalidate: 60,
      };
    }
    return { notFound: true };
  }
}
