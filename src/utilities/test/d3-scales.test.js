import { getLinearScale, getBandScale, getScalePoint } from '../d3-scales'
const { AssertionError } = require('assert')

describe('Linear Scale', () => {
    it('Should throw an error if missing domain', () => {
        expect(() => getLinearScale()).toThrowError(AssertionError)
    })
    it('Should throw an error if domain is not an array', () => {
        expect(() => getLinearScale({})).toThrowError(AssertionError)
    })
    it('Should throw an error if missing range', () => {
        expect(() => getLinearScale([])).toThrowError(AssertionError)
    })
    it('Should throw an error if range is not an array', () => {
        expect(() => getLinearScale([], {})).toThrowError(AssertionError)
    })
    it('Should not throw an error when given valid arguments', () => {
        expect(() =>
            getLinearScale([11, 10, 20, 18, 14], [0, 100])
        ).not.toThrowError()
    })
    it('Should return a function when given valid arguments', () => {
        expect(typeof getLinearScale([11, 10, 20, 18, 14], [0, 100])).toBe(
            'function'
        )
    })
    it('Resulting linear scale should return range min if provided domain min', () => {
        expect(getLinearScale([11, 10, 20, 18, 14], [0, 100])(10)).toBe(0)
    })
    it('Resulting linear scale should return range max if provided domain max', () => {
        expect(getLinearScale([11, 10, 20, 18, 14], [0, 100])(20)).toBe(100)
    })
    it('Resulting linear scale should return range mid if provided domain mid', () => {
        expect(getLinearScale([11, 10, 20, 18, 14], [0, 100])(15)).toBe(50)
    })
})

describe('Band Scale', () => {
    it('Should throw an error if missing domain', () => {
        expect(() => getBandScale()).toThrowError(AssertionError)
    })
    it('Should throw an error if domain is not an array', () => {
        expect(() => getBandScale({})).toThrowError(AssertionError)
    })
    it('Should throw an error if missing range', () => {
        expect(() => getBandScale([])).toThrowError(AssertionError)
    })
    it('Should throw an error if range is not an array', () => {
        expect(() => getBandScale([], {})).toThrowError(AssertionError)
    })
    it('Should not throw an error when given valid arguments', () => {
        expect(() => getBandScale(['a', 'b', 'c'], [0, 100])).not.toThrowError()
    })
    it('Should return a function when given valid arguments', () => {
        expect(typeof getBandScale(['a', 'b', 'c'], [0, 100])).toBe('function')
    })
    // it('Resulting band scale should return  if provided domain[0]', () => {
    //     expect(getBandScale(['a', 'b', 'c'], [0, 100])('a')).toBe(1)
    // })
    // it('Resulting band scale should return max if provided domain[domain.length - 1]', () => {
    //     expect(getBandScale(['a', 'b', 'c'], [0, 100])('c')).toBe(99)
    // })
    // it('Resulting band scale should return mid if provided domain median', () => {
    //     expect(getBandScale(['a', 'b', 'c'], [0, 100])('b')).toBe(50)
    // })
})

describe('Point Scale', () => {
    it('Should throw an error if missing domain', () => {
        expect(() => getScalePoint()).toThrowError(AssertionError)
    })
    it('Should throw an error if domain is not an array', () => {
        expect(() => getScalePoint({})).toThrowError(AssertionError)
    })
    it('Should throw an error if missing range', () => {
        expect(() => getScalePoint([])).toThrowError(AssertionError)
    })
    it('Should throw an error if range is not an array', () => {
        expect(() => getScalePoint([], {})).toThrowError(AssertionError)
    })
})