'use client';

import CardPricing from '@/components/cards/CardPricing';
import { PRICING_PLANS } from '@/constants';
import { PricingPlan } from '@/types';
import { Switch } from '@nextui-org/react';
import { useState } from 'react';

const Pricing = () => {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="py-24 px-4 mx-auto w-full">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Simple, transparent pricing</h2>
                
                {/* Billing period switch */}
                <div className="flex items-center justify-center gap-4">
                    <span className={billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}>Monthly</span>
                    <Switch 
                        isSelected={billingPeriod === 'yearly'}
                        onValueChange={(value) => {
                            setBillingPeriod(value ? 'yearly' : 'monthly')
                        }} 
                        aria-label="Billing period switch"
                        color="default"
                    />
                    <span className={billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}>
                        Yearly <span className="text-green-500 text-sm">
                            <small>(Save 20%)</small>
                        </span>
                    </span>
                </div>
            </div>

            {/* Pricing cards */}
            <div className="grid md:grid-cols-3 gap-5 w-full">
                {PRICING_PLANS.map((plan: PricingPlan) => (
                    <CardPricing key={plan.name} plan={plan} billingPeriod={billingPeriod} />
                ))}
            </div>
        </div>
    );
};


export default Pricing; 