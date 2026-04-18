import { CharacterModel } from "../models/character.model.js";

// Traer de la API
export const importCharacter = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.api-onepiece.com/v2/characters/en",
    );
    const data = await response.json();

    let totalImported = 0;

    for (const character of data) {
      await CharacterModel.create({
        name: character.name,
        bounty: character.bounty || "Desconocido",
        race: character.race || "Desconocido",
        description: character.description || "",
        image: character.image || "",
        crew: character.crew || "Sin tripulación",
      });

      totalImported++;
    }

    res
      .status(201)
      .json({ message: "Personajes importados", total: totalImported });
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};

// Create
export const createCharacter = async (req, res) => {
  const { name, bounty, race, description, crew, image } = req.body;

  try {
    const newCharacter = await CharacterModel.create({
      name,
      bounty,
      race,
      description,
      crew,
      image,
    });
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};

// All
export const getAllCharacters = async (req, res) => {
  try {
    const characters = await CharacterModel.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};

// id
export const getCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await CharacterModel.findByPk(id);
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};

// Update
export const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const { name, bounty, race, description, crew, image } = req.body;

  try {
    const character = await CharacterModel.findByPk(id);
    if (!character) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    await character.update({
      name,
      bounty,
      race,
      description,
      crew,
      image,
    });

    res.status(200).json({ message: "Personaje actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};

// Delete
export const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    const character = await CharacterModel.findByPk(id);
    if (!character) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    await character.destroy();
    res.status(200).json({ message: "Personaje eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del Servidor" });
  }
};
