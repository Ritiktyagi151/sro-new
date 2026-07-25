const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const connectDB = require("../config/db");

// Models
const Role = require("../models/Role");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Gallery = require("../models/Gallery");
const AboutUs = require("../models/AboutUs");
const Service = require("../models/Service");
const Industry = require("../models/Industry");
const ContactInfo = require("../models/ContactInfo");
const NavbarSettings = require("../models/NavbarSettings");

const seedData = async () => {
  try {
    // Connect to DB
    await connectDB();

    console.log("Clearing existing database collections...");
    await Role.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Blog.deleteMany();
    await Gallery.deleteMany();
    await AboutUs.deleteMany();
    await Service.deleteMany();
    await Industry.deleteMany();
    await ContactInfo.deleteMany();
    await NavbarSettings.deleteMany();

    console.log("Creating default roles...");
    const superAdminRole = await Role.create({
      name: "Super Admin",
      permissions: {
        blogs: { read: true, write: true, delete: true },
        products: { read: true, write: true, delete: true },
        enquiries: { read: true, write: true, delete: true },
        navbar: { read: true, write: true, delete: true },
        settings: { read: true, write: true, delete: true },
      },
    });

    await Role.create({
      name: "Editor",
      permissions: {
        blogs: { read: true, write: true, delete: false },
        products: { read: true, write: true, delete: false },
        enquiries: { read: true, write: false, delete: false },
        navbar: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
      },
    });

    console.log("Creating default Super Admin user...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    await User.create({
      username: "admin",
      email: "admin@srobearings.com",
      password: hashedPassword,
      role: superAdminRole._id,
      profilePic: "https://picsum.photos/seed/admin/150/150",
    });

    // Load backup data
    const backupPath = path.join(__dirname, "website_data_backup.json");
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found at ${backupPath}`);
    }
    const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));

    console.log("Seeding Categories & Products...");
    // Create categories based on types of bearings
    const cat1 = await Category.create({
      name: "Industrial Bearings",
      slug: "industrial-bearings",
      description: "Bearings designed for heavy machinery and manufacturing systems.",
      bannerHeight: "450px",
      desktopBanner: "https://images.unsplash.com/photo-1503507739298-dce173d09653?w=1600&auto=format&fit=crop&q=80",
      mobileBanner: "",
    });
    const cat2 = await Category.create({
      name: "Mounted Units & Housings",
      slug: "mounted-units-housings",
      description: "Reliable housings and supports for shaft rotational components.",
      bannerHeight: "450px",
      desktopBanner: "https://media.istockphoto.com/id/960982298/photo/support-bearing-assembly.jpg?s=612x612&w=0&k=20&c=Oy75zBQpWgk36rP70r9Hv1TdB9Wrjv74noM_fwpT49o=",
      mobileBanner: "",
    });

    // Map hardcoded products to categories
    for (const prod of data.products) {
      let categoryId = null;
      if (prod.slug.includes("bearing") || prod.slug.includes("chain")) {
        categoryId = cat1._id;
      } else {
        categoryId = cat2._id;
      }
      await Product.create({
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        image: prod.image,
        category: categoryId,
        order: 0,
      });
    }

    console.log("Seeding Blogs...");
    for (const blog of data.blogs) {
      await Blog.create({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image,
        category: blog.category,
        readTime: blog.readTime,
        date: new Date(blog.date),
        metaTitle: blog.title,
        metaDescription: blog.excerpt,
        author: {
          name: "Emily Carter",
          role: "Mechanical Analyst",
          avatar: "https://picsum.photos/seed/author7/50/50",
        },
      });
    }

    console.log("Seeding Services...");
    for (const service of data.services) {
      service.slug = service.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      await Service.create(service);
    }

    console.log("Seeding Industries...");
    for (const industry of data.industries) {
      industry.slug = industry.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      await Industry.create(industry);
    }

    console.log("Seeding Gallery...");
    for (const photo of data.gallery.photos) {
      await Gallery.create({
        title: photo.title,
        description: photo.description,
        type: "photo",
        src: photo.img,
      });
    }
    for (const video of data.gallery.videos) {
      await Gallery.create({
        title: video.title,
        description: video.description,
        type: "video",
        src: video.src,
        poster: video.poster,
      });
    }

    console.log("Seeding Contact Info...");
    await ContactInfo.create({
      phone1: data.contact.phone,
      phone2: "",
      email: data.contact.email,
      email2: data.contact.email2,
      whatsapp: "+919873334405",
      address: data.contact.address,
      facebook: "https://facebook.com/srobearing",
      linkedin: "https://linkedin.com/company/srobearing",
      youtube: "",
    });

    console.log("Seeding About Us...");
    await AboutUs.create({
      greetingsTitle: "Driving a Greener Future",
      greetingsContent: "Our mission is to blend innovation with sustainability...",
      chairmanMessage: {
        name: "Mr. Satpal Sharma",
        role: "Chairman",
        quote: "To Evolve is to Last Forever",
        avatar: "https://picsum.photos/seed/chairman/150/150",
      },
      mdMessage: {
        name: "MR. Sunny Sharma",
        role: "Managing Director",
        quote: "We make some of the world's most innovative products to reduce friction.",
        avatar: "https://picsum.photos/seed/md/150/150",
      },
      establishedYear: "1990",
      sqFtArea: "2,00,000 Sq. Ft.",
      legacyYearsCount: "35+ Yrs",
      timelineMilestones: [
        {
          year: "1990",
          title: "Company Foundation",
          description: "SRO Bearings was established with a focus on manufacturing high-precision miniature ball bearings."
        },
        {
          year: "2002",
          title: "Industrial Expansion",
          description: "Expanded our catalog to heavy-duty roller bearings and spherical joints for mining and power generation."
        },
        {
          year: "2010",
          title: "State-of-the-Art Technology Centre",
          description: "Inaugurated our R&D hub in Chennai to specialize in low-friction, high-temperature metallurgy."
        },
        {
          year: "2018",
          title: "Global Distribution Network",
          description: "Established strategic supply chain alliances across 130 countries and signed 17,000+ distributors."
        },
        {
          year: "2025",
          title: "Green Future Initiative",
          description: "Initiated key zero-waste and green-lubrication manufacturing standards targetting 2030 neutrality goals."
        }
      ],
      stats: data.about.stats.map((s) => ({
        number: s.number,
        label: s.label,
        prefix: s.prefix || "",
      })),
    });

    console.log("Seeding Navbar Settings...");
    await NavbarSettings.create({
      dropdowns: [
        {
          id: "by-industry",
          title: "By Industry",
          displayMode: "category",
          enabled: true,
          order: 1,
          items: [],
        },
        {
          id: "by-material",
          title: "By Material",
          displayMode: "product",
          enabled: true,
          order: 2,
          items: [],
        },
      ],
    });

    console.log("Database Seeding Completed Successfully! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
