// @ts-nocheck
export const bearingMarkets = [
  {
    name: "Mining & Crushers",
    slug: "mining-crushers",
    image:
      "https://t4.ftcdn.net/jpg/14/41/72/09/240_F_1441720920_mV04OJcA2sFFUKYLNxUJdDdwcznLojrE.jpg",
    description:
      "Heavy-duty bearing solutions for crushers, conveyors, screens, and extraction equipment working under shock load, dust, and vibration.",
    products: [
      "Spherical Roller Bearings",
      "Taper Roller Bearings",
      "Plummer Blocks",
      "Roller Chains",
    ],
    applications: [
      "Jaw and cone crushers",
      "Vibrating screens",
      "Belt conveyors",
      "Bucket elevators",
    ],
  },
  {
    name: "Steel & Metal Processing",
    slug: "steel-metal-processing",
    image:
      "https://t3.ftcdn.net/jpg/09/33/54/80/240_F_933548061_ILWuqxGjT7AscCB6eSthlsqJyHHueNg6.jpg",
    description:
      "Bearings built for high temperature, heavy radial loads, scale contamination, and continuous production lines.",
    products: [
      "Multi Row Bearings",
      "Spherical Roller Bearings",
      "Thrust Bearings",
      "Plummer Blocks",
    ],
    applications: [
      "Rolling mills",
      "Continuous casters",
      "Furnace conveyors",
      "Cooling beds",
    ],
  },
  {
    name: "Cement Industry",
    slug: "cement-industry",
    image:
      "https://t3.ftcdn.net/jpg/06/26/84/26/240_F_626842687_wrWPzxc3VJxt9Y9QODW3PtM3V6uKMN1G.jpg",
    description:
      "Dust-resistant and high-load bearing support for kilns, mills, crushers, and bulk handling systems.",
    products: [
      "Spherical Roller Bearings",
      "Taper Roller Bearings",
      "Pillow Block Bearing",
      "Roller Chains",
    ],
    applications: ["Rotary kilns", "Ball mills", "Crushers", "Packing plants"],
  },
  {
    name: "Paper Industry",
    slug: "paper-industry",
    image:
      "https://t4.ftcdn.net/jpg/08/90/04/79/240_F_890047910_MXbWg61YAaepNgfYH4me1xW9Smazi65R.jpg",
    description:
      "Reliable bearings for humid, high-speed paper machine sections where alignment and sealing matter.",
    products: [
      "Spherical Roller Bearings",
      "Pillow Block Bearing",
      "Plummer Blocks",
      "Thrust Bearings",
    ],
    applications: [
      "Dryer sections",
      "Calendar rolls",
      "Pulp machines",
      "Rewinder units",
    ],
  },
  {
    name: "Packaging Machinery",
    slug: "packaging-machinery",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    description:
      "Smooth-motion bearing products for filling, wrapping, labeling, and high-speed packaging lines.",
    products: [
      "Pillow Block Bearing",
      "Roller Chains",
      "Taper Roller Bearings",
    ],
    applications: [
      "Bottle filling lines",
      "Carton conveyors",
      "Labeling machines",
      "Wrapping units",
    ],
  },
  {
    name: "Conveyors & Material Handling",
    slug: "conveyors-material-handling",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",
    description:
      "Low-maintenance bearings and chains for continuous movement in factories, warehouses, and bulk handling plants.",
    products: [
      "Pillow Block Bearing",
      "Plummer Blocks",
      "Roller Chains",
      "Spherical Roller Bearings",
    ],
    applications: [
      "Belt conveyors",
      "Roller conveyors",
      "Sorting systems",
      "Bucket elevators",
    ],
  },
  {
    name: "Agriculture Equipment",
    slug: "agriculture-equipment",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
    description:
      "Durable bearing support for equipment exposed to soil, moisture, vibration, and seasonal workload spikes.",
    products: [
      "Pillow Block Bearing",
      "Taper Roller Bearings",
      "Roller Chains",
    ],
    applications: ["Harvesters", "Seed drills", "Threshers", "Irrigation drives"],
  },
  {
    name: "Power Generation",
    slug: "power-generation",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    description:
      "Precision bearing solutions for turbines, pumps, fans, and auxiliary rotating equipment.",
    products: [
      "Thrust Bearings",
      "Spherical Roller Bearings",
      "Taper Roller Bearings",
      "Plummer Blocks",
    ],
    applications: ["Turbines", "Cooling fans", "Boiler feed pumps", "Gearboxes"],
  },
  {
    name: "Automotive & Transport",
    slug: "automotive-transport",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    description:
      "Bearing products for wheel assemblies, transmission systems, trailers, and workshop support machinery.",
    products: [
      "Taper Roller Bearings",
      "Thrust Bearings",
      "Roller Chains",
    ],
    applications: ["Wheel hubs", "Axles", "Gearboxes", "Workshop machinery"],
  },
];

export const getMarketImage = (image) => {
  if (!image) return bearingMarkets[0].image;
  if (image.startsWith("http")) return image;
  return `http://localhost:5001${image}`;
};
