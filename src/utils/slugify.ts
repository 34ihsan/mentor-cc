export function slugify(text: string): string {
    const trMap: { [key: string]: string } = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };

    return text
        .toString()
        .replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => trMap[char] || char) // Handle Turkish chars correctly
        .toLowerCase()
        .normalize('NFD') // Further normalization for any other diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/\s+/g, '-') // Spaces to -
        .replace(/[^\w-]+/g, '') // Remove non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start
        .replace(/-+$/, ''); // Trim - from end
}
