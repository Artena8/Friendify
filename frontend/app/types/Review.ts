export type ReviewCreate = {
    description: string;
    author: string;
    rating: number;
};

export type Review = {
    id: number;
    description: string | null;
    author: string;
    rating: number;
};
