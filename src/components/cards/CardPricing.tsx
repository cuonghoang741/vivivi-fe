import { PRICING_PLANS } from "@/constants";
import { PricingPlan } from "@/types";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@nextui-org/react";
export default function CardPricing({ plan, billingPeriod }: { plan: PricingPlan, billingPeriod: string }) {
    return (
        <div
        key={plan.name}
        className={`rounded-xl p-4 ${
            plan.is_highlight ? 'border-2 border-app-main shadow-lg bg-app-main/10' : 'border border-gray-200/20'
        }`}
    >
        <h3 className={`text-2xl font-bold mb-2 ${plan.is_highlight ? 'text-app-main' : 'text-white'}`}>{plan.name}</h3>
        <div className={`${plan.is_highlight ? 'text-app-main' : ''}`}>
            <span className="text-4xl font-bold">
                ${billingPeriod === 'yearly' ? (plan.price ? plan.price * 0.8 : 0).toFixed(2) : plan.price}
            </span>
            <span className={`text-gray-500 ${plan.is_highlight ? 'text-app-main' : ''}`}> per month</span>
        </div>
        <p className="text-white mb-4 text-sm">{plan.description}</p>
        <Button
            className={`w-full py-2 px-4 rounded-lg mb-8 ${
                plan.is_highlight
                    ? 'bg-app-main text-white hover:bg-app-main/90'
                    : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
        >
            {plan.button_label}
        </Button>
        <ul className="space-y-3">
            {plan.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-white/60" />
                    <small>{benefit}</small>
                </li>
            ))}
        </ul>
    </div>
    )
}