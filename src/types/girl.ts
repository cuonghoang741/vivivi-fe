import { Category } from "./category";

export type Girl = {
    id: string;
    name: string;
    avatar_url: string;
    hot_avatar_url?: string;
    vrm_url?: string;
    age?: number;
    height?: number;
    weight?: number;
    description?: string;
    categories?: Category[];
    is_premium?: boolean;
    created_at?: number;
    like_count?: number;
    player_count?: number;
    background?: string;
}
