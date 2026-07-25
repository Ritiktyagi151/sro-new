const NavbarSettings = require("../models/NavbarSettings");

const getNavbarSettings = async (req, res) => {
  try {
    let settings = await NavbarSettings.findOne();
    if (!settings) {
      // Create defaults if not found
      settings = await NavbarSettings.create({
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
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNavbarSettings = async (req, res) => {
  const { dropdowns } = req.body;
  try {
    let settings = await NavbarSettings.findOne();
    if (!settings) {
      settings = new NavbarSettings({ dropdowns });
    } else {
      settings.dropdowns = dropdowns;
    }
    await settings.save();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getNavbarSettings, updateNavbarSettings };
