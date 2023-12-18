import React from 'react';
import './dialog.css';

const ConfirmationDialog: React.FC<{
    isOpen: boolean;
    title: String,
    cancelText: String,
    onCancel: () => void;
    confirmText: String,
    onConfirm: () => void
}> = ({
    isOpen,
    title,
    cancelText,
    onCancel,
    confirmText,
    onConfirm,
}) => {
        if (!isOpen) {
            return null;
        }
        return (
            <div className='confirmation-dialog-overlay'>
                <div className='confirmation-dialog'>
                    <div className='confirmation-dialog-content'>
                        <p>{title}</p>
                        <div className='confirmation-dialog-buttons'>
                            <button className='button button-error' onClick={() => onCancel()}>{cancelText}</button>
                            <button className='button button-success' onClick={() => onConfirm()}>{confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default ConfirmationDialog;
