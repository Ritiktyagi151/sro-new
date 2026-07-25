const AboutUs = require("../models/AboutUs");
const ContactInfo = require("../models/ContactInfo");
const Gallery = require("../models/Gallery");
const Service = require("../models/Service");
const Industry = require("../models/Industry");
const PartnerCMS = require("../models/PartnerCMS");

// About Us Section
const getAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = await AboutUs.create({
        greetingsTitle: "Driving a Greener Future",
        greetingsContent: "Our mission is to blend innovation with sustainability...",
      });
    }
    res.json({ success: true, about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = await AboutUs.create(req.body);
    } else {
      about = await AboutUs.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json({ success: true, about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Contact Info Section
const getContactInfo = async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create({
        email: "srobearings@outlook.com",
        phone1: "+91-9873334405",
      });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create(req.body);
    } else {
      contact = await ContactInfo.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Gallery Section
const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGallery = async (req, res) => {
  const { title, description, type } = req.body;
  let src = "";

  if (req.file) {
    src = `/uploads/${req.file.filename}`;
  } else {
    src = req.body.src || "";
  }

  try {
    const item = await Gallery.create({
      title,
      description,
      type: type || "photo",
      src,
      poster: req.body.poster || "",
    });
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Item not found" });
    await item.deleteOne();
    res.json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Services Section
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createService = async (req, res) => {
  const { title, description, fullDescription, benefits, icon, caseStudy } =
    req.body;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let image = "";
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  try {
    const service = await Service.create({
      title,
      slug,
      description,
      fullDescription: Array.isArray(fullDescription)
        ? fullDescription
        : JSON.parse(fullDescription || "[]"),
      benefits: Array.isArray(benefits) ? benefits : JSON.parse(benefits || "[]"),
      icon,
      image,
      caseStudy,
    });
    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });

    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }
    if (updates.title) {
      updates.slug = updates.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (updates.fullDescription && typeof updates.fullDescription === "string") {
      updates.fullDescription = JSON.parse(updates.fullDescription);
    }
    if (updates.benefits && typeof updates.benefits === "string") {
      updates.benefits = JSON.parse(updates.benefits);
    }

    service = await Service.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    await service.deleteOne();
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Industries Section
const getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find().sort({ createdAt: 1 });
    res.json({ success: true, industries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createIndustry = async (req, res) => {
  const { name, icon, description, features } = req.body;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let image = "";
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  try {
    const industry = await Industry.create({
      name,
      slug,
      icon,
      image,
      description,
      features: Array.isArray(features) ? features : JSON.parse(features || "[]"),
    });
    res.status(201).json({ success: true, industry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateIndustry = async (req, res) => {
  try {
    let industry = await Industry.findById(req.params.id);
    if (!industry)
      return res
        .status(404)
        .json({ success: false, message: "Industry not found" });

    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }
    if (updates.name) {
      updates.slug = updates.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (updates.features && typeof updates.features === "string") {
      updates.features = JSON.parse(updates.features);
    }

    industry = await Industry.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json({ success: true, industry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry)
      return res
        .status(404)
        .json({ success: false, message: "Industry not found" });
    await industry.deleteOne();
    res.json({ success: true, message: "Industry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Partner CMS Section
const getPartnerCMS = async (req, res) => {
  try {
    let partner = await PartnerCMS.findOne();
    if (!partner) {
      partner = await PartnerCMS.create({
        badge: "Trusted Partnership",
        title: "Our Client",
        description: "We're proud to work with industry-leading companies who trust us to deliver exceptional results and drive their success forward.",
        happyClientsCount: "12+",
        satisfactionRate: "98%",
        averageRating: "5.0 Average Rating",
        clients: [
          { name: "TechCorp", logo: "TC", color: "from-gray-500 to-gray-600" },
          { name: "GlobalDyne", logo: "GD", color: "from-gray-500 to-gray-600" },
          { name: "Creative Co", logo: "CC", color: "from-gray-400 to-gray-500" },
          { name: "FutureTech", logo: "FT", color: "from-gray-400 to-gray-500" },
          { name: "HealthPlus", logo: "HP", color: "from-gray-600 to-gray-700" },
          { name: "EduPro", logo: "EP", color: "from-gray-600 to-gray-700" },
          { name: "FinanceX", logo: "FX", color: "from-gray-300 to-gray-400" },
          { name: "StartupLab", logo: "SL", color: "from-gray-300 to-gray-400" },
        ]
      });
    }
    res.json({ success: true, partner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePartnerCMS = async (req, res) => {
  try {
    let partner = await PartnerCMS.findOne();
    if (!partner) {
      partner = await PartnerCMS.create(req.body);
    } else {
      partner = await PartnerCMS.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json({ success: true, partner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAboutUs,
  updateAboutUs,
  getContactInfo,
  updateContactInfo,
  getAllGallery,
  createGallery,
  deleteGallery,
  getAllServices,
  createService,
  updateService,
  deleteService,
  getAllIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getPartnerCMS,
  updatePartnerCMS,
};
