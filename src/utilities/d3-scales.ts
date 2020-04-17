import { scaleLinear, scalePoint, scaleBand } from 'd3'

interface GetScalePoint {
    domain: string[]
    range: [number, number]
    padding?: number
}
const getScalePoint = ({ domain, range, padding = 0 }: GetScalePoint) => {
    return scalePoint().domain(domain).range(range).padding(padding)
}

interface GetLinearScale {
    domain: number[]
    range: [number, number]
}
const getLinearScale = ({ domain, range }: GetLinearScale) => {
    return scaleLinear()
        .domain([Math.min(...domain), Math.max(...domain)])
        .range(range)
}

interface GetBandScale {
    domain: string[]
    range: [number, number]
    paddingOuter?: number
}
const getBandScale = ({ domain, range, paddingOuter = 0 }: GetBandScale) => {
    return scaleBand()
        .domain(domain)
        .rangeRound(range)
        .paddingOuter(paddingOuter)
}

export { getScalePoint, getLinearScale, getBandScale }
