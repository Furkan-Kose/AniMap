import Animal from '../models/animal.model.js';
import fs from 'fs-extra';

export const getAnimals = async (req, res) => {
    const animals = await Animal.find();
    res.status(200).json(animals);
}

export const getAnimal = async (req, res) => {
    const animal = await Animal.findOne({ _id: req.params.id });
    res.status(200).json(animal);
}

export const createAnimal = async (req, res) => {
    const newAnimal = new Animal({ ...req.body, image: req.file.path });
    const animal = await newAnimal.save();
    res.status(201).json(animal);
}

export const updateAnimal = async (req, res) => {
    const { id } = req.params;

    const existingAnimal = await Animal.findById(id);
    if (!existingAnimal) {
        return res.status(404).json({ message: 'Hayvan bulunamadı.' });
    }

    const oldImagePath = existingAnimal.image;

    let updateData = { ...req.body };
    if (req.file) {
        fs.unlinkSync(oldImagePath);
        updateData.image = req.file.path;
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedAnimal);
};

export const deleteAnimal = async (req, res) => {
    const animal = await Animal.findByIdAndDelete(req.params.id);

    if (!animal) {
        return res.status(404).json({ message: 'Hayvan bulunamadı.' });
    }

    const imagePath = animal.image;
    await fs.unlink(imagePath);

    await Animal.findByIdAndDelete(req.params.id);

    res.status(204).json(animal);
}