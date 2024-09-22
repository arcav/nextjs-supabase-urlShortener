import React from 'react';

interface FormProps {
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    originalUrl: string;
    setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    error: string;
}

const Form: React.FC<FormProps> = ({ handleSubmit, originalUrl, setOriginalUrl, error }) => {
    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Ingrese la URL original"
                className='p-2 border rounded'
                required
            />
            {error && <p className='text-white'>{error}</p>}
            <button type="submit" className='p-2 bg-blue-500 text-white rounded'>
                Acortar URL
            </button>
        </form>
    );
};

export default Form;
