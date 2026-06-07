import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as bcrypt from "bcryptjs";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  options: "-c search_path=campers"
});
const adapter = new PrismaPg(pool, { schema: "campers" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciant la càrrega de dades de prova (seed)...");

  // Netejar taules existents
  await prisma.comment.deleteMany({});
  await prisma.contactRequest.deleteMany({});
  await prisma.camperModel.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Taules netejades.");

  // Crear usuaris amb rols xifrant les contrasenyes
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("password123", salt);

  const admin = await prisma.user.create({
    data: {
      name: "Admin Campers",
      email: "admin@campers.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const editor = await prisma.user.create({
    data: {
      name: "Editor Campers",
      email: "editor@campers.com",
      password: hashedPassword,
      role: "EDITOR",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Joan Turista",
      email: "user@campers.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  console.log("Usuaris creats:");
  console.log(`- ADMIN: ${admin.email} (password123)`);
  console.log(`- EDITOR: ${editor.email} (password123)`);
  console.log(`- USER: ${user.email} (password123)`);

  // Crear campers de prova
  const camper1 = await prisma.camperModel.create({
    data: {
      name: "Volkswagen Grand California",
      description: "La camper gran definitiva de Volkswagen. Amb llit posterior ampli, bany complet integrat amb dutxa interior, cuina de gas, pica, nevera i aigua calenta. Ideal per a viatges en família amb el màxim confort de conducció.",
      pricePerDay: 120.0,
      passengers: 4,
      beds: 4,
      engine: "2.0 TDI 177 CV",
      transmission: "Automàtic",
      imageUrl: "/images/grand-california.jpg",
    },
  });

  const camper2 = await prisma.camperModel.create({
    data: {
      name: "Mercedes-Benz Marco Polo",
      description: "L'elegància i disseny compacte de la mà de Mercedes-Benz. Sostre elevable de dues places, seients posteriors convertibles en llit doble, cuina completa i acabats premium de iot. Perfecta per a escapades àgils i luxoses.",
      pricePerDay: 140.0,
      passengers: 4,
      beds: 4,
      engine: "2.0d 163 CV",
      transmission: "Automàtic",
      imageUrl: "/images/marco-polo.jpg",
    },
  });

  const camper3 = await prisma.camperModel.create({
    data: {
      name: "Knaus Boxstar 600",
      description: "Màxima versatilitat alemanya en 6 metres de llargada. Llits bessons a la part posterior convertibles en un de gegant, gran espai de magatzem inferior, dutxa convertible molt àmplia i un aïllament tèrmic excel·lent de gamma alta per a l'hivern.",
      pricePerDay: 105.0,
      passengers: 4,
      beds: 3,
      engine: "Fiat Ducato 2.2 Multijet 140 CV",
      transmission: "Manual",
      imageUrl: "/images/boxstar.jpg",
    },
  });

  console.log("Models de campers creats.");

  // Afegir alguns comentaris de prova
  await prisma.comment.create({
    data: {
      content: "Vam llogar la Grand California per fer la ruta dels Alps i va ser una experiència increïble. Tenir un bany propi dins la furgoneta et dona una llibertat absoluta. Molt recomanable!",
      userId: user.id,
      camperModelId: camper1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "La Marco Polo es condueix com un turisme de luxe. Molt àgil a la carretera i els acabats interiors són una meravella. L'únic inconvenient és que no té bany tancat, però per a viatges curts és ideal.",
      userId: user.id,
      camperModelId: camper2.id,
    },
  });

  // Afegir una sol·licitud de contacte de prova
  await prisma.contactRequest.create({
    data: {
      name: "Maria Puig",
      email: "maria.puig@gmail.com",
      message: "Hola! Voldria saber si teniu disponibilitat de la Volkswagen Grand California per a les dates del 15 al 25 d'agost de 2026. Moltes gràcies!",
      status: "PENDING",
    },
  });

  console.log("Dades de prova (seed) completades correctament.");
}

main()
  .catch((e) => {
    console.error("Error al carregar el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
