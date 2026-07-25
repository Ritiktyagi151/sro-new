// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    slug: "bearing-maintenance-tips",
    title: "5 Essential Bearing Maintenance Tips",
    excerpt:
      "Learn how to properly maintain your bearings to extend their lifespan.",
    date: "2023-10-15",
    image:
      "https://images.unsplash.com/photo-1503507739298-dce173d09653?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhcmluZyUyMG1haW50ZW5hbmNlJTIwdGlwc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Maintenance",
    readTime: "4 min read",
  },
  {
    id: 2,
    slug: "lubrication-best-practices",
    title: "How to Choose the Right Bearing",
    excerpt:
      "Guide to selecting bearings based on load and speed requirements.",
    date: "2023-09-28",
    image:
      "https://images.unsplash.com/photo-1709294324061-fc40251bb002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHVicmljYXRpb24lMjBiZXN0JTIwcHJhY3RpY2VzfGVufDB8fDB8fHww",
    category: "Guide",
    readTime: "6 min read",
  },
  {
    id: 3,
    slug: "installation-tips-bearings",
    title: "Top Installation Tips for Long-Lasting Bearings",
    excerpt:
      "Discover the best practices for installing bearings to maximize their performance.",
    date: "2023-12-05",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGluc3RhbGxhdGlvbiUyMHRpcHMlMjBiZWFyaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Installation",
    readTime: "5 min read",
  },
  {
    id: 4,
    slug: "bearing-inspection-guide",
    title: "A Complete Guide to Bearing Inspection",
    excerpt:
      "Step-by-step guide for inspecting bearings for wear, damage, and performance.",
    date: "2024-01-12",
    image:
      "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhcmluZyUyMGluc3BlY3Rpb24lMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Inspection",
    readTime: "4 min read",
  },
  {
    id: 5,
    slug: "bearing-replacement-checklist",
    title: "Bearing Replacement Checklist You Should Follow",
    excerpt:
      "Key signs and checklist to help you know when it's time to replace a bearing.",
    date: "2024-02-25",
    image:
      "https://images.unsplash.com/photo-1567093322503-341d262ad8f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXJpbmclMjByZXBsYWNlbWVudCUyMGNoZWNrbGlzdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Maintenance",
    readTime: "4 min read",
  },
  {
    id: 6,
    slug: "bearing-performance-optimization",
    title: "How to Optimize Bearing Performance",
    excerpt:
      "Tips and techniques to enhance bearing efficiency and extend operational life.",
    date: "2024-03-15",
    image:
      "https://images.unsplash.com/photo-1715079005638-c37bfd236c1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlYXJpbmclMjBwZXJmb3JtYW5jZSUyMG9wdGltaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Performance",
    readTime: "5 min read",
  },
  {
    id: 7,
    slug: "types-of-industrial-bearings",
    title: "Understanding Different Types of Industrial Bearings",
    excerpt:
      "Overview of various industrial bearing types and their key applications.",
    date: "2024-04-10",
    image:
      "https://images.unsplash.com/photo-1658248165127-f880b5a74e98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHlwZXMlMjBvZiUyMGluZHVzdHJpYWwlMjBiZWFyaW5ncyUyMnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Technical Insights",
    readTime: "5 min read",
  },
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
        initialBlogs: [],
      },
      revalidate: 60,
    };
  }
}

export default function BlogPage({ initialBlogs = [] }) {
  const [mounted, setMounted] = useState(false);
  const [blogs] = useState(initialBlogs);

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

      {/* Video Banner */}
      <div className="relative h-[60vh] min-h-[420px] md:h-[70vh] w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          poster="https://media.istockphoto.com/id/687071416/photo/gears-on-dark.jpg?s=612x612&w=0&k=20&c=eYmN-qOeKAxHxASEbut7V5pFzVycrp_sT3MPAc4TK3s="
        >
          <source
            src="https://videocdn.cdnpk.net/videos/f7fb57fd-c837-57ed-8a7e-06e902a30f08/horizontal/previews/clear/small.mp4?token=exp=1752735106~hmac=6dee04e92efc9fee1854ccd73e30c95c23490827031aed2bb4f574b486aef8de"
            type="video/mp4"
          />
        </video>
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
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : `http://localhost:5001${post.image}`
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
