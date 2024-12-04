import React from 'react';
import ModalComponent from '../ui/ModalComponent';
import { PricingPlan } from '@/types';
import { Button } from '@nextui-org/react';

interface UpgradePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan?: PricingPlan;
    billingPeriod: 'monthly' | 'yearly';
}

const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
    isOpen,
    onClose,
    selectedPlan,
    billingPeriod
}) => {
    const handleUpgrade = async () => {
        // TODO: Implement upgrade logic
        console.log('Upgrading to plan:', selectedPlan?.name);
    };

    return (
        <ModalComponent
            isOpen={isOpen}
            handleClose={onClose}
            size="md"
        >
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Upgrade to {selectedPlan?.name}
                </h2>
                
                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        You&apos;re about to upgrade to the {selectedPlan?.name} plan with {billingPeriod} billing.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold">Plan Details:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2">
                            {selectedPlan?.benefits?.map((feature, index) => (
                                <li key={index} className="text-gray-600">{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="light"
                        onPress={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleUpgrade}
                    >
                        Confirm Upgrade
                    </Button>
                </div>
            </div>
        </ModalComponent>
    );
};

export default UpgradePlanModal;
