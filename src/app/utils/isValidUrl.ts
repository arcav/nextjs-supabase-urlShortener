const isValidUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocolo
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // dominio
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // dirección IP (opcional)
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // puerto y ruta
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // parámetros de consulta (opcional)
        '(\\#[-a-zA-Z\\d_]*)?$', // fragmento (opcional)
        'i',
    );
    return !!urlPattern.test(url);
};

export default isValidUrl