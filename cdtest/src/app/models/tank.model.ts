export default class Tank {
    id?: string;
    tankName?: string;
    speciesName?: string;
    bounds: {
        DO?: {
            isOutOfBounds?: boolean;
            max?: number;
            min?: number;
        }
        EC?: {
            isOutOfBounds?: boolean;
            max?: number;
            min?: number;
        }
        PH?: {
            isOutOfBounds?: boolean;
            max?: number;
            min?: number;
        }
        RTD?: {
            isOutOfBounds?: boolean;
            max?: number;
            min?: number;
        }
    }
    sensor?: {
        DO?: number;
        EC?: number;
        PH?: number;
        RTD: number;
    }
}
