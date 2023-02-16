export interface Category
{
    id?: string;
    title?: string;
    slug?: string;
}

export interface Course
{
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}

// Interface that represents a round game.
export interface Round
{
    _id?: string,
    user?: string,
    date?: string,
    completed?: boolean,
    items?: RoundItem[]
}
// Interface that represents a round item.
export interface RoundItem
{
    word?: string,
    type?: string,
    translation?: string,
    definition?: string,
    time?: number,
    quality?: number
}
