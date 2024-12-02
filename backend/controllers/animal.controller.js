import Animal from '../models/animal.model.js';

export const getAnimals = async (req, res) => {
    const animals = await Animal.find();
    res.status(200).json(animals);
}

export const getAnimal = async (req, res) => {
    const animal = await Animal.findOne({ _id: req.params.id });
    res.status(200).json(animal);
}

export const createAnimal = async (req, res) => {
    const newAnimal = new Animal(req.body);
    const animal = await newAnimal.save();
    res.status(201).json(animal);
}

export const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const updatedAnimal = await Animal.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedAnimal);
};

export const deleteAnimal = async (req, res) => {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    res.status(204).json(animal);
}