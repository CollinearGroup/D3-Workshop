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
    isDomainFlipped?: boolean
}
const getLinearScale = ({
    domain,
    range,
    isDomainFlipped = false,
}: GetLinearScale) => {
    const scaleDomain = isDomainFlipped
        ? [Math.max(...domain), Math.min(...domain)]
        : [Math.min(...domain), Math.max(...domain)]
    return scaleLinear().domain(scaleDomain).range(range)
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
