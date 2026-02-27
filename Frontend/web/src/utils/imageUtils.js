export const getFullImageUrl = (url, placeholder = '/src/assets/placeholder.jpg') => {
    if (!url) return placeholder;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return `/${url}`;
};
