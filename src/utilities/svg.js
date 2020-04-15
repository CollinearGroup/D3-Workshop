import { assertList } from './assersions'

export const addSVGAttribute = (d3Selection, type, value) => {
    if (value === undefined) {
        return
    }
    d3Selection.attr(type, value)
}

export const appendGroup = (d3Selection, transformString) => {
    assertList([d3Selection, 'd3Selection is required field'])
    const group = d3Selection.append('g')
    addSVGAttribute(group, 'transform', transformString)
    return group
}

export const appendCircle = (d3Selection, r, cx = 0, cy = 0, fill = '#000') => {
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
