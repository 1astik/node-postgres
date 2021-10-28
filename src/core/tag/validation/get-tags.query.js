/**
 * @typedef GetTagsQuery
 * @type {Object}
 * @property {Number} [limit]
 * @property {Number} [page]
 * @property {String} [sortByName]
 * @property {String} [sortByOrder]
 */


module.exports = {
    type: 'object',
    properties: {
        limit: {
            type: 'number',
            minimum: 1,
            maximum: 1000,
            errorMessage: {
                minimum: 'The number of tags displayed must be a positive integer.',
                maximum: 'The maximum number of tags displayed is limited to 1000.',
                type: 'The number of tags must be a positive integer in the decimal system.'
            }
        },
        page: {
            type: 'number',
            minimum: 1,
            maximum: 100000000,
            errorMessage: {
                minimum: 'The page number must be a positive integer.',
                maximum: 'The page number cannot exceed 100000000',
                type: 'The number of pages must be a positive integer in the decimal system.'
            }
        },
        sortByName: {
            type: 'string',
            maxLength: 40,
            errorMessage: {
                maxLength: 'The sortByName cannot be longer than 40 characters',
            }
        },
        sortByOrder: {
            type: 'number',
            maximum: 1000,
            errorMessage: {
                maximum: 'The sortByOrder cannot exceed 1000',
            }
        }
    }
}