// src/app/components/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    handleUpdate: () => void;
    newOriginalUrl: string;
    setNewOriginalUrl: (url: string) => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    closeModal,
    handleUpdate,
    newOriginalUrl,
    setNewOriginalUrl
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Modificar URL Original</h2>
                <input
                    type="text"
                    value={newOriginalUrl}
                    onChange={(e) => setNewOriginalUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce la nueva URL"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Modal