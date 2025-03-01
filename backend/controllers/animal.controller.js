import Animal from '../models/animal.model.js';
import { v2 as cloudinary } from "cloudinary";


export const getAnimals = async (req, res) => {
    const animals = await Animal.find().populate('owner');
    res.status(200).json(animals);
}

export const getAnimal = async (req, res) => {
    const animal = await Animal.findOne({ _id: req.params.id }).populate('owner');
    res.status(200).json(animal);
}

export const createAnimal = async (req, res) => {
    const { species, description, gender, color, healthStatus, location } = req.body;

    let latitude, longitude;
    if (location) {
        const parsedLocation = JSON.parse(location);
        latitude = parsedLocation.latitude;
        longitude = parsedLocation.longitude;
    }

    if (!req.user) {
        return res.status(401).json({ message: 'Yetkilendirme gerekli' });
    }

    const imageUrl = req.file ? req.file.path : null;

    const newAnimal = new Animal({
        species,
        description,
        gender,
        color,
        healthStatus,
        location: { latitude, longitude },
        image: imageUrl,
        owner: req.user._id,
    });

    const animal = await newAnimal.save();
    res.status(201).json(animal);
};

export const updateAnimal = async (req, res) => {
    const { id } = req.params;

    const existingAnimal = await Animal.findById(id);
    if (!existingAnimal) {
        return res.status(404).json({ message: 'Hayvan bulunamadı.' });
    }

    let updateData = { ...req.body };

    if (req.body.location) {
        try {
            const parsedLocation = JSON.parse(req.body.location);
            updateData.location = { 
                latitude: parsedLocation.latitude, 
                longitude: parsedLocation.longitude 
            };
        } catch (error) {
            return res.status(400).json({ message: 'Geçersiz konum verisi.' });
        }
    }

    if (req.file) {
        if (existingAnimal.image) {
            const publicId = "animals/" 
            + existingAnimal.image.split("/").pop().split(".").slice(0, 2).join("."); 
            await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: "image", type: "upload" });
        }
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

    if (animal.image) {
        const publicId = "animals/" + animal.image.split("/").pop().split(".").slice(0, 2).join("."); 

        try {
            await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: "image", type: "upload" });
        } catch (error) {
            return res.status(500).json({ message: 'Resim silinirken bir hata oluştu.' });
        }
    }

    res.status(204).json(animal);
};
