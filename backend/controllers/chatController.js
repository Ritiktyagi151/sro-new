const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gpt-oss:20b-cloud";
const OLLAMA_VISION_MODEL = process.env.OLLAMA_VISION_MODEL || "moondream";
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const fs = require("fs");

const systemPrompt = `
You are a customer support assistant for SRO Bearings.

Always reply using the exact same script and style the user just used in their latest message:
- If the user writes in English, reply in English.
- If the user writes in Hindi using Devanagari script, such as "\u0939\u093f\u0902\u0926\u0940 \u092e\u0947\u0902", reply in Hindi using Devanagari script.
- If the user writes in Hinglish, meaning Hindi/English mixed words typed in Roman/English letters, such as "mujhe yeh chahiye" or "kya price hai", reply in Hinglish using Roman/English letters too.
- Do NOT switch to Devanagari script for Hinglish input.
- Match the user's most recent message specifically, not the overall conversation history, in case they switch languages mid-conversation.

Language matching examples:
- User: "mujhe sro ka contact detail chahiye"
  Assistant: "Bilkul, SRO Bearings ke contact details ye hain: phone +91-9873334405, WhatsApp +919873334405, email srobearings@outlook.com aur info@srobearings.com."
- User: "kya price hai spherical roller bearing ka?"
  Assistant: "Price information project data me available nahi hai. Aap bearing number, size, quantity aur delivery location share kar do, team quotation confirm kar degi."
- User: "kuch product list de"
  Assistant: "SRO Bearings ke products me Spherical Roller Bearings, Taper Roller Bearings, Thrust Bearings, Multi Row Bearings, Pillow Block Bearing, Plummer Blocks aur Roller Chains shamil hain."

Use the company information below when answering. This knowledge base is built only from data found inside the current project codebase.

COMPANY INFORMATION:
- Company name: SRO Bearings / SRO Bearing.
- Business focus: SRO Bearings provides high-performance bearing products and industrial bearing support for factories, heavy machinery, manufacturing systems, and demanding industrial applications. The website describes the company as focused on quality, reliability, efficiency, and application support.
- About summary: SRO Bearings understands the critical role bearings play in ensuring seamless operations across industries. The company focuses on reliable bearing products selected for demanding industrial operating conditions, wide product range, and practical guidance for replacement, selection, maintenance, and plant requirements.
- Experience and scale shown in the website content: 40+ years of bearing expertise, 7+ core product families, and a support mindset. The about CMS seed also contains 35+ years legacy, established year 1990, and 2,00,000 sq. ft. area.

CONTACT INFORMATION:
- Primary phone: +91-9873334405
- WhatsApp: +919873334405
- Primary email: srobearings@outlook.com
- Secondary email: info@srobearings.com
- Address: SRO Bearings Marketing office: 91, Mausam Vihar, Near Preeti Vihar Metro Station, Delhi-110051, INDIA.
- Social links found in project content: Facebook and LinkedIn links are present in the footer/contact settings.
- For privacy-related requests, the project directs users to contact the team through the website contact page.

WORKING HOURS AND RESPONSE:
- Business hours shown on the contact page: Monday to Saturday, 10:00 AM - 6:00 PM.
- Response time shown on the contact page: The team usually responds to enquiries within 24 business hours.

PRODUCTS:
1. Spherical Roller Bearings
   - Type/use: Self-aligning bearings for heavy-duty applications with misalignment.
   - Description from seed data: Designed for heavy radial and axial loads in both directions.
   - Key details from local product content: self-aligning capability, high load capacity, robust construction, suitable for heavy radial and axial loads.
   - Specifications found in local product detail content: chrome steel material, pressed steel or brass cage, -30 C to +120 C temperature range, grease or oil lubrication.
   - Typical applications shown locally: mining equipment, paper mills, gearboxes.

2. Taper Roller Bearings
   - Type/use: Bearings for combined axial and radial loads.
   - Description from seed data: Perfect for combined axial and radial loads.
   - Key details from local product content: high radial and axial load capacity, separable design, precision performance, long service life.
   - Specifications found in local product detail content: high-carbon chromium steel material, pressed steel or polymer cage, ABEC-1 to ABEC-7 precision class, open/shielded/sealed options.
   - Typical applications shown locally: automotive wheels, heavy machinery, axles, automotive and industrial gearboxes.

3. Thrust Bearings
   - Type/use: Bearings designed for axial load support.
   - Description from seed data: Handles axial loads in high-speed applications.
   - Key details from local product content: axial load support, high-speed capability, reduced friction and wear, available in various configurations.
   - Specifications found in local product detail content: bearing steel material, axial-only load direction, open or sealed options.
   - Typical applications shown locally: gearboxes, turbines, crane hooks, automotive, aerospace, industrial machinery.

4. Multi Row Bearings
   - Type/use: High-capacity bearings with multiple roller rows for extreme load conditions.
   - Description from seed data: Suitable for large radial loads and high-speed rotation.
   - Key details from local product content: 2, 3, or 4 row configurations, compact design, high radial load capacity, precision alignment, durable under heavy loads.
   - Specifications found in local product detail content: chrome steel material, 2 to 4 rows, steel or brass cage.
   - Typical applications shown locally: rolling mills and large gearboxes.

5. Pillow Block Bearing
   - Type/use: Mounted bearing units with housings for easy installation and maintenance.
   - Description from seed data: Used in mounted bearing units for industrial machines.
   - Key details from local product content: easy mounting and installation, stable support, available in different housing materials, low maintenance, various sealing options.
   - Specifications found in local product detail content: cast iron or pressed steel housing, insert bearing with seals, grease lubrication.
   - Typical applications shown locally: conveyors, fans, agricultural equipment, industrial equipment.

6. Plummer Blocks
   - Type/use: Bearing housings and supports for rotary shafts.
   - Description from seed data: Reliable and efficient housing for rotary shafts.
   - Key details from local product content: heavy-duty housing support, easy shaft alignment, long service life, suitable for harsh environments, split housing design, high load capacity, easy maintenance, sealing options.
   - Specifications found in local product detail content: cast iron or ductile iron material, foot-mounted, multiple sealing options.
   - Typical applications shown locally: large fans, pumps, marine equipment, mining, aggregate, cement industries.

7. Roller Chains
   - Type/use: High-strength power transmission chains for industrial applications.
   - Description from seed data: High-performance transmission chain for power systems.
   - Key details from local product content: high tensile strength, wear resistance, smooth high-speed operation, precision engineered, heat-treated components, precision roller bushings, corrosion-resistant options, multiple pitch sizes.
   - Specifications found in local product detail content: carbon steel or stainless steel material, 6 mm to 76.2 mm pitch range, ANSI/ISO standard.
   - Typical applications shown locally: conveyors, industrial machinery, motorcycles, power transmission systems.

SERVICES:
- Condition Monitoring Solutions: Predictive maintenance technologies to maximize equipment uptime. Includes vibration analysis, thermography, oil analysis, wireless sensor networks, AI-powered analytics, alert thresholds, and CMMS integration.
- Oil Reconditioning: Extends oil life with Double Separation Technology. Removes particulate contamination and dissolved impurities, processes up to 100 liters per minute, removes particles down to 1 micron, reduces water content to under 100 ppm, and maintains additive package.
- Rotating Equipment Performance: Optimizes critical machinery using laser alignment, dynamic balancing, lubrication optimization, vibration analysis, bearing installation training, and root cause failure analysis.
- Application Engineering: Custom solutions for bearing arrangement redesign, lubrication system upgrades, material selection consulting, failure mode analysis, and life cycle cost modeling.
- Asset Management: Data-driven maintenance strategy with criticality analysis, FMEA, maintenance strategy optimization, spare parts rationalization, KPIs, and continuous improvement.
- Remanufacturing: Sustainable component renewal for bearings, bearing housings, gearboxes, hydraulic components, and pump/compressor parts.

INDUSTRIES / MARKETS SERVED:
- Steel Industry: high-temperature resistant bearings for rolling mills and continuous casters.
- Paper Industry: corrosion-resistant bearings for humid paper machine environments.
- Cement Industry: dust-resistant bearings for crushers and kilns.
- Mining and Crushers: ultra-durable bearings for extreme shock loads.
- Markets data also lists automotive and transport, packaging machinery, conveyors and material handling, agriculture equipment, and power generation as served markets.

BLOGS / ARTICLES:
- Blog section exists on the website at /blogs.
- Blog detail pages use /blogs/{slug}.
- Backend blog data is exposed through /api/blogs and /api/blogs/:slug using the Blog model.
- Seed/backup blog posts found in the project:
  1. 5 Essential Bearing Maintenance Tips - /blogs/bearing-maintenance-tips
  2. How to Choose the Right Bearing - /blogs/lubrication-best-practices
  3. Top Installation Tips for Long-Lasting Bearings - /blogs/installation-tips-bearings
  4. A Complete Guide to Bearing Inspection - /blogs/bearing-inspection-guide
  5. Bearing Replacement Checklist You Should Follow - /blogs/bearing-replacement-checklist
  6. How to Optimize Bearing Performance - /blogs/bearing-performance-optimization
  7. Understanding Different Types of Industrial Bearings - /blogs/types-of-industrial-bearings

ENQUIRY GUIDANCE:
- For faster assistance, ask users for bearing type, bearing number, size, quantity, machine application, and delivery location.
- The website contact page says the team helps with product selection, availability, quotation, and dispatch coordination.

POLICY INFORMATION:
- Return/refund/replacement policy: NOT FOUND in the current project codebase. Do not state a return, refund, replacement, or cancellation policy. Say a human support team member will confirm it.
- Delivery/shipping time: NOT FOUND as a fixed timeline in the current project codebase. Do not promise a delivery date. Ask for delivery location and quantity, and say the team will confirm availability, quotation, and dispatch timing.
- Warranty terms: NOT FOUND in the current project codebase. Do not state warranty terms. Say a human support team member will confirm warranty/support details.
- Pricing and stock availability: NOT FOUND as fixed public data. Do not quote prices or confirm stock. Ask for product details and say the team will confirm.

Rules:
- The company information above is always accurate and complete for what it covers.
- If the user asks about anything listed above, such as contact info, phone number, email, address, WhatsApp, products, services, industries, working hours, response time, or enquiry guidance, always answer directly using that exact information.
- If the user asks for blogs, articles, guides, tips, maintenance, installation, inspection, replacement, optimization, or choosing the right bearing, mention the blog section at /blogs and relevant article links when available.
- Never say you do not have information or need to check with a human for something that is listed above.
- Only say you do not have information, or offer to connect the user to a human support team member, for things not covered above or marked as NOT FOUND, such as pricing, stock availability, warranty terms, returns/refunds/replacements, or fixed delivery timelines.
- Treat Hinglish and short informal requests as normal customer support questions. For example, "contact detail de", "kuch contact detail de", "number do", "email batao", and "address kya hai" are requests for the contact information listed above.
- Be helpful, concise, and professional.
- Do not make up prices, availability, policies, warranty terms, or technical specifications.
- If you do not know the answer from the available information, say that you will connect the user to a human support team member.
- Ask for relevant details when needed, such as bearing number, product type, size, quantity, machine application, and delivery location.
`.trim();

const allowedRoles = new Set(["user", "assistant"]);
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_MESSAGE_CHARS = 1200;

const knowledgeReminder = `
Reminder: Use the SRO Bearings company information from the system prompt for this current user message. Match the script and style of the user's latest message only. If the latest message is Roman Hinglish, reply in Roman Hinglish and do not use Devanagari. If the user asks for contact details, products, services, industries, working hours, response time, or enquiry guidance, answer directly from that information even if the wording is informal. Only escalate to human support for items marked NOT FOUND or not covered by the knowledge base.
`.trim();

const productIntentPattern =
  /(product|products|bearing|bearings|roller|rollers|spherical|taper|tapered|thrust|pillow|plummer|chain|chains|image|images|photo|photos|picture|pictures|pic|catalog|catalogue|dikha|dikhao|dekha|dekhna|tasveer|\u092b\u094b\u091f\u094b|\u0907\u092e\u0947\u091c|\u0924\u0938\u094d\u0935\u0940\u0930|\u0926\u093f\u0916\u093e\u0913|\u0926\u093f\u0916\u093e\u0907\u090f|\u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f|\u092c\u0947\u092f\u0930\u093f\u0902\u0917)/i;

const allProductPattern =
  /(all products|product list|products list|show products|show product|show images|show image|show photos|product images|products images|bearing images|catalog|catalogue|saare product|sare product|sab product|products ki list|product ki list|bearings ki list|product dikha|products dikha|images dikha|photo dikha|tasveer dikha|\u0938\u093e\u0930\u0947 \u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f|\u0938\u092d\u0940 \u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f|\u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f \u0932\u093f\u0938\u094d\u091f|\u092c\u0947\u092f\u0930\u093f\u0902\u0917 \u0932\u093f\u0938\u094d\u091f|\u092a\u094d\u0930\u094b\u0921\u0915\u094d\u091f \u0926\u093f\u0916\u093e\u0913|\u092c\u0947\u092f\u0930\u093f\u0902\u0917 \u0926\u093f\u0916\u093e\u0913|\u092b\u094b\u091f\u094b \u0926\u093f\u0916\u093e\u0913|\u0907\u092e\u0947\u091c \u0926\u093f\u0916\u093e\u0913)/i;

const blogIntentPattern =
  /(blog|blogs|article|articles|guide|guides|tips|insight|insights|maintenance|installation|inspection|replacement|checklist|optimize|optimization|choose|select|selection|read|reading|post|posts|knowledge|learning|learn|jankari|jaankari|blog dikha|article dikha|\u092c\u094d\u0932\u0949\u0917|\u0906\u0930\u094d\u091f\u093f\u0915\u0932|\u0932\u0947\u0916|\u0917\u093e\u0907\u0921|\u091f\u093f\u092a\u094d\u0938|\u091c\u093e\u0928\u0915\u093e\u0930\u0940|\u092e\u0947\u0902\u091f\u0947\u0928\u0947\u0902\u0938|\u0907\u0902\u0938\u094d\u091f\u0949\u0932\u0947\u0936\u0928|\u0907\u0902\u0938\u094d\u092a\u0947\u0915\u094d\u0936\u0928)/i;

const allBlogPattern =
  /(all blogs|blog list|blogs list|show blogs|show blog|show articles|articles list|all articles|latest blogs|recent blogs|available blogs|blog dikha|blogs dikha|article dikha|articles dikha|saare blog|sare blog|sab blog|\u0938\u093e\u0930\u0947 \u092c\u094d\u0932\u0949\u0917|\u0938\u092d\u0940 \u092c\u094d\u0932\u0949\u0917|\u092c\u094d\u0932\u0949\u0917 \u0932\u093f\u0938\u094d\u091f|\u0906\u0930\u094d\u091f\u093f\u0915\u0932 \u0932\u093f\u0938\u094d\u091f|\u092c\u094d\u0932\u0949\u0917 \u0926\u093f\u0916\u093e\u0913|\u0906\u0930\u094d\u091f\u093f\u0915\u0932 \u0926\u093f\u0916\u093e\u0913)/i;

const normalizeText = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const productAliases = {
  "spherical-roller-bearings": ["spherical", "spherical roller", "spherical roller bearing", "spherical roller bearings"],
  "taper-roller-bearings": ["taper", "tapered", "taper roller", "taper roller bearing", "taper roller bearings"],
  "thrust-bearings": ["thrust", "thrust bearing", "thrust bearings"],
  "multi-row-bearings": ["multi row", "multirow", "multi row bearing", "multi row bearings"],
  "pillow-block-bearing": ["pillow", "pillow block", "pillow block bearing"],
  "plummer-blocks": ["plummer", "plummer block", "plummer blocks"],
  "roller-chains": ["roller chain", "roller chains", "chain", "chains"],
};

const getProductImageUrl = (image, req) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) {
    const baseUrl = process.env.BACKEND_PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
    return `${baseUrl}${image}`;
  }
  return image;
};

const toProductCard = (product, req) => ({
  name: product.name,
  image: getProductImageUrl(product.image, req),
  slug: product.slug,
  url: `/products/${product.slug}`,
});

const getBlogImageUrl = (image, req) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) {
    const baseUrl = process.env.BACKEND_PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
    return `${baseUrl}${image}`;
  }
  return image;
};

const toBlogCard = (blog, req) => ({
  title: blog.title,
  excerpt: blog.excerpt || "",
  category: blog.category || "Blog",
  readTime: blog.readTime || "",
  image: getBlogImageUrl(blog.image || "", req),
  slug: blog.slug,
  url: `/blogs/${blog.slug}`,
});

const findRelevantProducts = async (userMessage, req) => {
  if (!productIntentPattern.test(userMessage)) {
    return { isProductIntent: false, products: [] };
  }

  const products = await Product.find().sort({ order: 1, createdAt: -1 }).lean();
  const normalizedMessage = normalizeText(userMessage);
  const wantsAllProducts = allProductPattern.test(userMessage);

  if (wantsAllProducts) {
    return {
      isProductIntent: true,
      products: products.slice(0, 8).map((product) => toProductCard(product, req)),
    };
  }

  const matches = products.filter((product) => {
    const normalizedName = normalizeText(product.name);
    const normalizedSlug = normalizeText(product.slug);
    const aliases = productAliases[product.slug] || [];
    const normalizedAliases = aliases.map(normalizeText);

    if (normalizedMessage.includes(normalizedName) || normalizedMessage.includes(normalizedSlug)) {
      return true;
    }

    return normalizedAliases.some((alias) => alias && normalizedMessage.includes(alias));
  });

  return {
    isProductIntent: true,
    products: matches.map((product) => toProductCard(product, req)),
  };
};

const getProductContext = (lookup, blogLookup = { isBlogIntent: false }) => {
  if (!lookup.isProductIntent) return null;

  if (lookup.products.length) {
    const productNames = lookup.products.map((product) => product.name).join(", ");
    return `The backend found real matching products from the Product database for this request: ${productNames}. The frontend will render product cards with real images and links below your text reply. Reply briefly with an introduction to these product(s). Do not say that you cannot show images when products are listed here.`;
  }

  if (blogLookup.isBlogIntent) return null;

  return "The user is asking about a product or product image, but no matching product was found in the Product database. Say honestly that this specific product was not found in the available product list and offer to connect them to a human support team member. Do not invent a product or image.";
};

const findRelevantBlogs = async (userMessage, req) => {
  if (!blogIntentPattern.test(userMessage)) {
    return { isBlogIntent: false, blogs: [] };
  }

  const blogs = await Blog.find().sort({ date: -1, createdAt: -1 }).lean();
  const normalizedMessage = normalizeText(userMessage);
  const wantsAllBlogs = allBlogPattern.test(userMessage);

  if (wantsAllBlogs) {
    return {
      isBlogIntent: true,
      blogs: blogs.slice(0, 8).map((blog) => toBlogCard(blog, req)),
    };
  }

  const matches = blogs.filter((blog) => {
    const searchable = [
      blog.title,
      blog.slug,
      blog.excerpt,
      blog.category,
      blog.content,
    ]
      .map(normalizeText)
      .filter(Boolean);

    return searchable.some((text) => {
      if (!text) return false;
      if (normalizedMessage.includes(text)) return true;
      return text
        .split(" ")
        .some((word) => word.length > 4 && normalizedMessage.includes(word));
    });
  });

  return {
    isBlogIntent: true,
    blogs: matches.slice(0, 4).map((blog) => toBlogCard(blog, req)),
  };
};

const getBlogContext = (lookup) => {
  if (!lookup.isBlogIntent) return null;

  if (lookup.blogs.length) {
    const blogTitles = lookup.blogs
      .map((blog) => `${blog.title} (${blog.url})`)
      .join(", ");
    return `The backend found real matching blog posts from the Blog database for this request: ${blogTitles}. The frontend will render blog cards with links below your text reply. Reply briefly and invite the user to read these articles. Do not say that blog information is unavailable when blogs are listed here.`;
  }

  return "The user is asking about blogs or articles. The website has a blog section at /blogs, but no specific matching blog post was found in the Blog database for this request. Mention the blog section URL and offer to connect the user to a human support team member for more specific guidance.";
};

const normalizeHistory = (history = []) => {
  if (typeof history === "string") {
    try {
      history = JSON.parse(history);
    } catch (error) {
      history = [];
    }
  }

  if (!Array.isArray(history)) return [];

  return history
    .filter((item) => item && allowedRoles.has(item.role) && typeof item.content === "string")
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_HISTORY_MESSAGE_CHARS),
    }))
    .filter((item) => item.content);
};

const getUploadedImageInfo = (req) => {
  if (!req.file) return null;

  const baseUrl =
    process.env.BACKEND_PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
  const url = `${baseUrl}/uploads/${req.file.filename}`;

  return {
    url,
    path: req.file.path,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  };
};

const getImageBase64 = (imageInfo) => {
  if (!imageInfo?.path) return null;

  try {
    return fs.readFileSync(imageInfo.path).toString("base64");
  } catch (error) {
    console.error("Unable to read uploaded chat image:", error);
    return null;
  }
};

const getVisionPrompt = (userMessage, productLookup) => {
  const matchingProducts = productLookup.products
    .map((product) => product.name)
    .join(", ");

  return `
You are SRO Bearings' image-aware support assistant.

Analyze the uploaded image and answer the user's question. Keep the reply concise and match the user's language/script:
- English input: reply in English.
- Hindi Devanagari input: reply in Hindi Devanagari.
- Roman Hinglish input: reply in Roman Hinglish.

SRO Bearings context:
- SRO Bearings provides industrial bearing products and support.
- Product families: Spherical Roller Bearings, Taper Roller Bearings, Thrust Bearings, Multi Row Bearings, Pillow Block Bearing, Plummer Blocks, and Roller Chains.
- The team can help with product selection, availability, quotation, and dispatch coordination.
- If a product/bearing is visible and seems related, mention the closest likely SRO product family, but do not claim certainty from the image alone.
- If it is unrelated or unclear, say what you can see and ask for bearing number, size, quantity, machine application, or delivery location.
- Do not invent prices, stock, warranty, delivery date, or exact model numbers.
${matchingProducts ? `Relevant product matches from the user's text: ${matchingProducts}.` : ""}

User message: ${userMessage || "Please identify or describe this image."}
`.trim();
};

const getImageFallbackReply = (userMessage) => {
  const message = normalizeText(userMessage);
  const looksHinglish =
    /(mujhe|mene|maine|ye|isko|iska|hai|kya|bta|bata|dekh|image|photo|pic|bhej|send)/i.test(
      userMessage
    );

  if (/[\u0900-\u097f]/.test(userMessage)) {
    return "मुझे आपकी image मिल गई है, लेकिन अभी image analysis service respond नहीं कर रही है। मैं इसे हमारी team review के लिए forward कर दूंगा। कृपया product/bearing number, size, quantity या requirement भी share कर दें ताकि team सही details confirm कर सके।";
  }

  if (looksHinglish || !message) {
    return "Mujhe aapki image mil gayi hai, lekin abhi image analysis service respond nahi kar rahi. Main ise team review ke liye forward kar dunga. Aap bearing number, size, quantity ya requirement bhi share kar do, team details confirm kar degi.";
  }

  return "I've received your image, but the image analysis service is not responding right now. I will forward it to our team for review. Please also share the bearing number, size, quantity, or application details so the team can confirm the right information.";
};

const sendChatMessage = async (req, res) => {
  const { message = "", history = [] } = req.body || {};
  const userMessage = typeof message === "string" ? message.trim() : "";
  const uploadedImage = getUploadedImageInfo(req);

  if (!userMessage && !uploadedImage) {
    return res.status(400).json({
      success: false,
      message: "Message or image is required.",
    });
  }

  const ollamaUrl = `${OLLAMA_BASE_URL.replace(/\/$/, "")}/api/chat`;
  let productLookup = { isProductIntent: false, products: [] };
  let blogLookup = { isBlogIntent: false, blogs: [] };

  try {
    [productLookup, blogLookup] = await Promise.all([
      findRelevantProducts(userMessage, req),
      findRelevantBlogs(userMessage, req),
    ]);
  } catch (lookupError) {
    console.error("Chat lookup error:", lookupError);
  }

  if (uploadedImage) {
    console.log("Chat image received:", {
      filename: uploadedImage.filename,
      originalName: uploadedImage.originalName,
      mimetype: uploadedImage.mimetype,
      size: uploadedImage.size,
      url: uploadedImage.url,
      model: OLLAMA_VISION_MODEL,
    });

    const uploadedImageBase64 = getImageBase64(uploadedImage);

    if (!uploadedImageBase64) {
      return res.json({
        success: true,
        reply: getImageFallbackReply(userMessage),
        products: [],
        blogs: [],
        image: uploadedImage,
        model: OLLAMA_VISION_MODEL,
      });
    }

    const visionMessages = [
      { role: "system", content: getVisionPrompt(userMessage, productLookup) },
      ...normalizeHistory(history),
      {
        role: "user",
        content: userMessage || "Please describe this image and tell me if it looks related to SRO Bearings products.",
        images: [uploadedImageBase64],
      },
    ];

    try {
      const response = await fetch(ollamaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_VISION_MODEL,
          messages: visionMessages,
          stream: false,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response received from Ollama vision model.");
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Ollama vision request failed."
        );
      }

      const reply = data.message?.content || data.response || "";

      if (!reply.trim()) {
        throw new Error("Ollama vision model returned an empty reply.");
      }

      return res.json({
        success: true,
        reply: reply.trim(),
        products: productLookup.products,
        blogs: [],
        image: uploadedImage,
        model: OLLAMA_VISION_MODEL,
        modelSupportsVision: true,
      });
    } catch (error) {
      console.error("Chat image analysis error:", error);
      return res.json({
        success: true,
        reply: getImageFallbackReply(userMessage),
        products: [],
        blogs: [],
        image: uploadedImage,
        model: OLLAMA_VISION_MODEL,
        modelSupportsVision: false,
      });
    }
  }

  const productContext = getProductContext(productLookup, blogLookup);
  const blogContext = getBlogContext(blogLookup);
  const userContent = userMessage || "Please review the uploaded image.";
  const messages = [
    { role: "system", content: systemPrompt },
    ...normalizeHistory(history),
    { role: "system", content: knowledgeReminder },
    ...(productContext ? [{ role: "system", content: productContext }] : []),
    ...(blogContext ? [{ role: "system", content: blogContext }] : []),
    {
      role: "user",
      content: userContent,
    },
  ];

  try {
    const response = await fetch(ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error("Invalid response received from Ollama.");
    }

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "Ollama request failed.",
        products: [],
        blogs: [],
      });
    }

    const reply = data.message?.content || data.response || "";

    if (!reply.trim()) {
      return res.status(502).json({
        success: false,
        message: "Ollama returned an empty reply.",
        products: [],
        blogs: [],
      });
    }

    res.json({
      success: true,
      reply: reply.trim(),
      products: productLookup.products,
      blogs: blogLookup.blogs,
      image: null,
      model: OLLAMA_MODEL,
      modelSupportsVision: false,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({
      success: false,
      message:
        "The AI support assistant is unavailable right now. Please try again later.",
      products: [],
      blogs: [],
    });
  }
};

module.exports = {
  sendChatMessage,
};



