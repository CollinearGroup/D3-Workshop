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
 * @param {object} object - contains the following fields
 * @param {*} object.selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {*} object.transform - (optional) transform string ex. `translate(${this.state.margin.left}, 0)`
 */
export const appendGroup = ({ selection, transform }) => {
    assertList([selection, 'selection is required field'])
    const group = selection.append('g')
    addSVGAttribute(group, 'transform', transform)
    return group
}

/**
 * Appends a Circle SVG to a d3Selection
 * @param {object} object - contains the following fields
 * @param {*} object.selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {string} object.r - (required) length value for the circle radius
 * @param {number} object.cx - (optional, defaults to 0) x coordinate of the center of the circle
 * @param {number} object.cy - (optional, defaults to 0) y coordinate of the center of the circle
 * @param {string} object.fill - (optional, defaults to '#000') fill color
 */
export const appendCircle = ({
    selection,
    r,
    cx = 0,
    cy = 0,
    fill = '#000',
}) => {
    assertList(
        [selection, 'selection is required field'],
        [r !== undefined, 'r is required field']
    )
    const circle = selection.append('circle')
    addSVGAttribute(circle, 'cx', cx)
    addSVGAttribute(circle, 'cy', cy)
    addSVGAttribute(circle, 'r', r)
    addSVGAttribute(circle, 'fill', fill)
    return circle
}

/**
 * Appends a Line SVG to a d3Selection extending from (x1,y1) to (x2, y2)
 * @param {object} object - contains the following fields
 * @param {*} object.selection - (required) D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
 * @param {number} object.x1 - (required) x coordinate of the starting point of the line
 * @param {number} object.y1 - (required) y coordinate of the starting point of the line
 * @param {number} object.x2 - (required) x coordinate of the end point of the line
 * @param {number} object.y2 - (required) y coordinate of the end point of the line
 * @param {string} object.strokeWidth - (optional, defaults to '1px') line width value
 * @param {string} object.stroke - (optional, defaults to '#000') line color
 */
export const appendLine = ({
    selection,
    x1,
    y1,
    x2,
    y2,
    strokeWidth = '1px',
    stroke = '#000',
}) => {
    assertList(
        [selection, 'selection is required field'],
        [x1 !== undefined, 'x1 is required field'],
        [y1 !== undefined, 'y1 is required field'],
        [x2 !== undefined, 'x2 is required field'],
        [y2 !== undefined, 'y2 is required field']
    )
    const line = selection.append('line')
    addSVGAttribute(line, 'x1', x1)
    addSVGAttribute(line, 'y1', y1)
    addSVGAttribute(line, 'x2', x2)
    addSVGAttribute(line, 'y2', y2)
    addSVGAttribute(line, 'stroke-width', strokeWidth)
    addSVGAttribute(line, 'stroke', stroke)
    return line
}
