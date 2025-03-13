export const hideInTable = {table: {disable: true}}

export const capitalizeFirstLetter = (text: string) => {
    if (text.length < 2) return text;
    return text[0].toUpperCase() + text.slice(1);
}
