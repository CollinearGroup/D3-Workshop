import { assertList } from './assersions'

/**
 * Adds SVG Attribute to d3Selection
 * @param {*} d3Selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {string} type - (required) Attribute type
 * @param {*} value - (required) Attribute value
 */
export const addSVGAttribute = (d3Selection, type, value) => {
    d3Selection.attr(type, value)
}

/**
 * Appends an SVG Group to a d3Selection, meant to make transforming easier
 * @param {*} d3Selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {*} transformString - (optional) transform string ex. `translate(${this.state.margin.left}, 0)`
 */
export const appendGroup = (d3Selection, transformString) => {
    assertList([d3Selection, 'd3Selection is required field'])
    const group = d3Selection.append('g')
    addSVGAttribute(group, 'transform', transformString)
    return group
}

/**
 * Appends a Circle SVG to a d3Selection
 * @param {*} d3Selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {string} r - (required) length value for the circle radius
 * @param {number} cx - (optional, defaults to 0) x coordinate of the center of the circle
 * @param {number} cy - (optional, defaults to 0) y coordinate of the center of the circle
 * @param {string} fill - (optional, defaults to '#000') fill color
 */
export const appendCircle = ({
    d3Selection,
    r,
    cx = 0,
    cy = 0,
    fill = '#000',
}) => {
    assertList(
        [d3Selection, 'd3Selection is required field'],
        [r !== undefined, 'r is required field']
    )
    const circle = d3Selection.append('circle')
    addSVGAttribute(circle, 'cx', cx)
    addSVGAttribute(circle, 'cy', cy)
    addSVGAttribute(circle, 'r', r)
    addSVGAttribute(circle, 'fill', fill)
    return circle
}

/**
 * Appends a Line SVG to a d3Selection extending from (x1,y1) to (x2, y2)
 * @param {*} d3Selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {number} x1 - (required) x coordinate of the starting point of the line
 * @param {number} y1 - (required) y coordinate of the starting point of the line
 * @param {number} x2 - (required) x coordinate of the end point of the line
 * @param {number} y2 - (required) y coordinate of the end point of the line
 * @param {string} strokeWidth - (optional, defaults to '1px') line width value
 * @param {string} stroke - (optional, defaults to '#000') line color
 */
export const appendLine = (
    d3Selection,
    x1,
    y1,
    x2,
    y2,
    strokeWidth = '1px',
    stroke = '#000'
) => {
    assertList(
        [d3Selection, 'd3Selection is required field'],
        [x1 !== undefined, 'x1 is required field'],
        [y1 !== undefined, 'y1 is required field'],
        [x2 !== undefined, 'x2 is required field'],
        [y2 !== undefined, 'y2 is required field']
    )
    const line = d3Selection.append('line')
    addSVGAttribute(line, 'x1', x1)
    addSVGAttribute(line, 'y1', y1)
    addSVGAttribute(line, 'x2', x2)
    addSVGAttribute(line, 'y2', y2)
    addSVGAttribute(line, 'stroke-width', strokeWidth)
    addSVGAttribute(line, 'stroke', stroke)
    return line
}
