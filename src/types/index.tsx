export type PricingPlan = {
    name: string;
    price?: number;
    description?: string;
    button_label?: string;
    benefits?: string[];
    is_highlight?: boolean;
}

export type FAQ = {
    question: string;
    answer: string;
}
