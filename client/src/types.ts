export type AnimalType = {
    _id: string;
    species: string;
    gender?: string;
    color?: string;
    healthStatus: string;
    description: string;
    image?: string;
    location?: {
        latitude?: number;
        longitude?: number;
    };
    owner: {
        _id: string;
        username?: string;
        email?: string;
    };
    createdAt: string;
};