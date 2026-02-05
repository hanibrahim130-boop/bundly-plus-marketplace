const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Netflix Premium",
    description: "4K + HDR, 4 Screens, Unlimited Movies & TV shows.",
    price: 4.99,
    category: "Streaming",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=800&auto=format&fit=crop",
    features: ["4K (Ultra HD) + HDR", "4 Screens at once", "Unlimited downloads", "Watch on any device"],
  },
  {
    name: "Spotify Premium",
    description: "Ad-free music, Offline play, Unlimited skips.",
    price: 2.99,
    category: "Music",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cc0d41?q=80&w=800&auto=format&fit=crop",
    features: ["Ad-free music listening", "Download to listen offline", "Unlimited skips", "High quality audio"],
  },
  {
    name: "PlayStation Plus",
    description: "Monthly games, Online multiplayer, Exclusive discounts.",
    price: 5.99,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop",
    features: ["Online multiplayer", "Monthly games", "Exclusive discounts", "Cloud storage"],
  },
  {
    name: "Adobe Creative Cloud",
    description: "20+ apps including Photoshop, Illustrator, and Premiere Pro.",
    price: 12.99,
    category: "Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    features: ["20+ Creative Apps", "100GB Cloud Storage", "Adobe Portfolio", "Adobe Fonts"],
  },
  {
    name: "YouTube Premium",
    description: "Ad-free YouTube, Background play, YouTube Music Premium.",
    price: 3.49,
    category: "Streaming",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    features: ["Ad-free YouTube", "Background play", "Downloads", "YouTube Music Premium"],
  },
  {
    name: "Disney+",
    description: "New releases, Classics, and Originals from Disney, Pixar, Marvel, Star Wars, and Nat Geo.",
    price: 4.49,
    category: "Streaming",
    image: "https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800&auto=format&fit=crop",
    features: ["GroupWatch", "Unlimited downloads", "4K Ultra HD", "Up to 7 profiles"],
  }
];

async function main() {
  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, '-'),
        ...product
      },
    });
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
