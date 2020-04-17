import { scaleLinear, scalePoint, scaleBand } from 'd3'
import { assertList } from './assersions'

const getScalePoint = (
    fullDomain: string[],
    range: [number, number],
    padding: number = 0
) => {
    assertList(
        [fullDomain !== undefined, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range !== undefined, 'range is a required argument'],
        [Array.isArray(range), 'range must be of type array']
    )
    return scalePoint().domain(fullDomain).range(range).padding(padding)
}

const getLinearScale = (fullDomain: number[], range: [number, number]) => {
    assertList(
        [fullDomain !== undefined, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range !== undefined, 'range is a required argument'],
        [Array.isArray(range), 'range must be of type array']
    )
    return scaleLinear()
        .domain([Math.min(...fullDomain), Math.max(...fullDomain)])
        .range(range)
}

const getBandScale = (
    fullDomain: string[],
    range: [number, number],
    paddingOuter: number = 0
) => {
    assertList(
        [fullDomain !== undefined, 'fullDomain is a required argument'],
        [Array.isArray(fullDomain), 'fullDomain must be of type array'],
        [range !== undefined, 'range is a required argument'],
        [Array.isArray(range), 'range must be of type array']
    )
    return scaleBand()
        .domain(fullDomain)
        .rangeRound(range)
        .paddingOuter(paddingOuter)
}

export { getScalePoint, getLinearScale, getBandScale }
