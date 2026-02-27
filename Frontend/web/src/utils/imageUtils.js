const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const getFullImageUrl = (url, placeholder = '/src/assets/placeholder.jpg') => {
    if (!url) return placeholder;
    if (url.startsWith('http')) return url;

    // If backend URL is an absolute URL (like local dev), prepend it
    if (BACKEND_URL.startsWith('http')) {
        const cleanUrl = url.startsWith('/') ? url : `/${url}`;
        return `${BACKEND_URL}${cleanUrl}`;
    }

    // In production, backend URL is typically a relative path like '/api'
    // and the url from the DB is already a valid relative path (e.g., '/api/uploads/...')
    return url.startsWith('/') ? url : `/${url}`;
};
