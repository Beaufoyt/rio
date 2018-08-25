export const queryParam = (key, value, first = false) => {
    return `${first ? '?' : '&'}${key}=${value}`;
};
