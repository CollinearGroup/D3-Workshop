import { scaleLinear, scalePoint, scaleBand } from 'd3'
import { assertList } from './assersions'

const getScalePoint = (fullDomain, range, padding = 0) => {
    assertList(
        [fullDomain, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range, 'range is a required argument'],
        [Array.isArray(fullDomain), 'range must be of type array']
    )
    return scalePoint().domain(fullDomain).range(range).padding(padding)
}

const getLinearScale = (fullDomain, range) => {
    assertList(
        [fullDomain, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range, 'range is a required argument'],
        [Array.isArray(fullDomain), 'range must be of type array']
    )
    return scaleLinear()
        .domain([Math.min(...fullDomain), Math.max(...fullDomain)])
        .range(range)
}

const getBandScale = (fullDomain, range, paddingOuter = 0) => {
    assertList(
        [fullDomain, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range, 'range is a required argument'],
        [Array.isArray(fullDomain), 'range must be of type array']
    )
    return scaleBand()
        .domain(fullDomain)
        .rangeRound(range)
        .paddingOuter(paddingOuter)
}

export { getScalePoint, getLinearScale, getBandScale }
