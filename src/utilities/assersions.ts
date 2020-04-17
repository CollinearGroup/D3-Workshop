import assert from 'assert'

export const assertList = (...assertions: [boolean, string][]) =>
    assertions.forEach(([assertion, errMessage]) =>
        assert(assertion, errMessage)
    )
