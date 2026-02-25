const BACKEND_URL = 'http://localhost:8080';

export const getFullImageUrl = (url, placeholder = '/src/assets/placeholder.jpg') => {
    if (!url) return placeholder;
    if (url.startsWith('http')) return url;
    // Ensure we don't have double slashes if url starts with /
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BACKEND_URL}${cleanUrl}`;
};
