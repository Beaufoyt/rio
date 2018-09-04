export const queryBuilder = (queryObject) => {
    let queryString = '';

    Object.keys(queryObject).forEach((item) => {
        const currentValue = queryObject[item];

        if (currentValue !== undefined) {
            queryString += queryString === '' ? '?' : '&';
            queryString += `${item}=${queryObject[item]}`;
        }
    });

    return queryString;
};
