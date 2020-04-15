const assert = require('assert')

export const assertList = (...assertions) =>
    assertions.forEach(([assertion, errMessage]) =>
        assert(assertion, errMessage)
    )
