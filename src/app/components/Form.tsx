import React from 'react';

interface FormProps {
    handleSubmit: (e: React.FormEvent) => void;
    originalUrl: string;
    setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    error: string;
}

const Form: React.FC<FormProps> = ({
    handleSubmit,
    originalUrl,
    setOriginalUrl,
    error,
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col place-items-center space-y-4 p-2'>
            <input
                type='text'
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                        'Por favor, ingrese una URL válida.',
                    )
                }
                onInput={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity('')
                }
                placeholder='Ingrese la URL original'
                className='w-full p-2 border rounded lg:w-1/2 flex justify-center'
                required
            />
            {error && <p className='text-black'>{error}</p>}
            <button
                type='submit'
                className='p-2 bg-blue-500 text-white rounded'>
                Acortar URL
            </button>
        </form>
    );
};

export default Form;
