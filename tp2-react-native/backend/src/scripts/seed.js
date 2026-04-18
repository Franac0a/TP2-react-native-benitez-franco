// config db
import { sequelize } from "../config/database.js";
import { CharacterModel } from "../models/character.model.js";

// datos
const charactersData = [
  {
    name: "Monkey D. Luffy",
    bounty: "3000000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Capitán que quiere ser el Rey de los Piratas",
    image: "https://upload.wikimedia.org/wikipedia/en/c/cb/Monkey_D_Luffy.png",
  },
  {
    name: "Roronoa Zoro",
    bounty: "1111000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Espadachín de tres espadas",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5c/Roronoa_Zoro.png",
  },
  {
    name: "Nami",
    bounty: "366000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Navegante experta",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Nami.png",
  },
  {
    name: "Usopp",
    bounty: "500000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Francotirador del equipo",
    image: "https://upload.wikimedia.org/wikipedia/en/6/69/Usopp.png",
  },
  {
    name: "Sanji",
    bounty: "1032000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Cocinero que pelea con patadas",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4e/Sanji.png",
  },
  {
    name: "Tony Tony Chopper",
    bounty: "1000",
    race: "Reno",
    crew: "Sombrero de Paja",
    description: "Médico del equipo",
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/17/Tony_Tony_Chopper.png",
  },
  {
    name: "Nico Robin",
    bounty: "930000000",
    race: "Humano",
    crew: "Sombrero de Paja",
    description: "Arqueóloga",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7d/Nico_Robin.png",
  },
  {
    name: "Franky",
    bounty: "394000000",
    race: "Cyborg",
    crew: "Sombrero de Paja",
    description: "Carpintero del barco",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7c/Franky.png",
  },
  {
    name: "Brook",
    bounty: "383000000",
    race: "Esqueleto",
    crew: "Sombrero de Paja",
    description: "Músico",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Brook.png",
  },
  {
    name: "Jinbe",
    bounty: "1100000000",
    race: "Gyojin",
    crew: "Sombrero de Paja",
    description: "Timonel",
    image: "https://upload.wikimedia.org/wikipedia/en/2/2d/Jinbe.png",
  },
];

// función seed
const seed = async () => {
  try {
    console.log("Desactivando FOREIGN_KEY_CHECKS...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    console.log("Recreando tablas...");
    await sequelize.sync({ force: true });

    console.log("Reactivando FOREIGN_KEY_CHECKS...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Insertando personajes...");
    await CharacterModel.bulkCreate(charactersData);

    console.log("---------------------------------");
    console.log("Seed ejecutado correctamente");
    console.log("---------------------------------");
  } catch (error) {
    console.error("Error en seed:", error);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada");
  }
};

seed();
