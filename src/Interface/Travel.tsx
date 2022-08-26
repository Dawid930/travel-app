export interface Travel {
    title: string,
    country: string,
    location: string,
    author: string,
    description: string,
    date: string,
    id: number
}

export interface Travels {
    travels: Travel[],
    
}

