import { getLinearScale, getBandScale, getScalePoint } from '../d3-scales'

describe('Linear Scale', () => {
    it('Should not throw an error when given valid arguments', () => {
        expect(() =>
            getLinearScale({
                domain: [11, 10, 20, 18, 14],
                range: [0, 100],
            })
        ).not.toThrowError()
    })
    it('Should return a function when given valid arguments', () => {
        expect(
            typeof getLinearScale({
                domain: [11, 10, 20, 18, 14],
                range: [0, 100],
            })
        ).toBe('function')
    })
    it('Resulting linear scale should return range min if provided domain min', () => {
        expect(
            getLinearScale({
                domain: [11, 10, 20, 18, 14],
                range: [0, 100],
            })(10)
        ).toBe(0)
    })
    it('Resulting linear scale should return range max if provided domain max', () => {
        expect(
            getLinearScale({
                domain: [11, 10, 20, 18, 14],
                range: [0, 100],
            })(20)
        ).toBe(100)
    })
    it('Resulting linear scale should return range mid if provided domain mid', () => {
        expect(
            getLinearScale({
                domain: [11, 10, 20, 18, 14],
                range: [0, 100],
            })(15)
        ).toBe(50)
    })
})

describe('Band Scale', () => {
    it('Should not throw an error when given valid arguments', () => {
        expect(() =>
            getBandScale({ domain: ['a', 'b', 'c'], range: [0, 100] })
        ).not.toThrowError()
    })
    it('Should return a function when given valid arguments', () => {
        expect(
            typeof getBandScale({ domain: ['a', 'b', 'c'], range: [0, 100] })
        ).toBe('function')
    })
    it('Provided valid inputs, resulting band scale should have a method (bandwidth) that returns an integer within the provided range', () => {
        const rangeMin = 0
        const rangeMax = 100
        const bandwidth = getBandScale({
            domain: ['a', 'b', 'c'],
            range: [rangeMin, rangeMax],
        }).bandwidth()
        expect(bandwidth).toBeGreaterThan(rangeMin)
        expect(bandwidth).toBeLessThan(rangeMax)
    })
    it('Resulting band scale should return a number within the range if provided a valid index of domain', () => {
        const rangeMin = 0
        const rangeMax = 100
        const value = getBandScale({
            domain: ['a', 'b', 'c'],
            range: [rangeMin, rangeMax],
        })('a')
        expect(value).toBeGreaterThanOrEqual(rangeMin)
        expect(value).toBeLessThanOrEqual(rangeMax)
    })
    it('Resulting band scale should return undefined if provided an invalid arg (not contained within domain)', () => {
        const value = getBandScale({
            domain: ['a', 'b', 'c'],
            range: [0, 100],
        })('e')
        expect(value).toBe(undefined)
    })
})

describe('Point Scale', () => {
    it('Should not throw an error when given valid arguments', () => {
        expect(() =>
            getScalePoint({ domain: ['a', 'b', 'c'], range: [0, 100] })
        ).not.toThrowError()
    })
    it('Should return a function when given valid arguments', () => {
        expect(
            typeof getScalePoint({ domain: ['a', 'b', 'c'], range: [0, 100] })
        ).toBe('function')
    })
    it('Resulting point scale should return a number within the range if provided a valid index of domain', () => {
        const rangeMin = 0
        const rangeMax = 100
        const value = getScalePoint({
            domain: ['a', 'b', 'c'],
            range: [rangeMin, rangeMax],
        })('a')
        expect(value).toBeGreaterThanOrEqual(rangeMin)
        expect(value).toBeLessThanOrEqual(rangeMax)
    })
    it('Resulting point scale should return undefined if provided an invalid arg (not contained within domain)', () => {
        const value = getScalePoint({
            domain: ['a', 'b', 'c'],
            range: [0, 100],
        })('e')
        expect(value).toBe(undefined)
    })
})
