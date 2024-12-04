import React from 'react';
import ModalComponent from '../ui/ModalComponent';
import { Button } from '@nextui-org/react';

interface ValidAgeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ValidAgeModal: React.FC<ValidAgeModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <ModalComponent 
            isOpen={isOpen} 
            handleClose={onClose}
            isDismissable={false}
            hideCloseButton={true}
            size="sm"
        >
            <div className="text-center py-4">
                <h2 className="text-xl font-bold mb-4">Age Verification</h2>
                <p className="mb-6">
                    This website contains content that is not suitable for underage individuals, 
                    make sure you are 18 years old or above. By confirming this, you have 
                    declared that you are eligible to access this site.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button 
                        color="danger" 
                        variant="flat" 
                        onPress={onClose}
                    >
                        No, I am under 18
                    </Button>
                    <Button 
                        color="primary" 
                        onPress={onConfirm}
                    >
                        Yes, I am 18+
                    </Button>
                </div>
            </div>
        </ModalComponent>
    );
};

export default ValidAgeModal;
