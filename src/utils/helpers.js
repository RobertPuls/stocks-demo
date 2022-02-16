export const roundToCents = (num) => (num ? Math.round((num + Number.EPSILON) * 100) / 100 : null);

export const toDateFormat = (date) => new Date(date * 1000);
