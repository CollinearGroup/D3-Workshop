interface AppendSVGElement {
    selection: d3.Selection<any, any, any, any> //D3 selection, generally from d3.select(<selector>) or d3Selection.append(<svg-type>)
    fill?: string | undefined | Function // fill color of svg
    strokeWidth?: string // line width value
    stroke?: string | Function // border and/or line color of svg
}

export const addSVGAttribute = (
    d3Selection: d3.Selection<any, any, any, any>,
    type: string,
    value: any
) => {
    d3Selection.attr(type, value)
}

interface AppendGroup extends AppendSVGElement {
    transform?: string //transform string ex. `translate(${this.state.margin.left}, 0)`
}
export const appendGroup = ({ selection, transform }: AppendGroup) => {
    const group = selection.append('g')
    addSVGAttribute(group, 'transform', transform)
    return group
}

interface AppendCircle extends AppendSVGElement {
    r: string
    cx?: number | undefined | Function // x coordinate of the center of the circle
    cy?: number | undefined | Function // y coordinate of the center of the circle
}
export const appendCircle = ({
    selection,
    r,
    cx = 0,
    cy = 0,
    fill = '#000',
}: AppendCircle) => {
    const circle = selection.append('circle')
    addSVGAttribute(circle, 'cx', cx)
    addSVGAttribute(circle, 'cy', cy)
    addSVGAttribute(circle, 'r', r)
    addSVGAttribute(circle, 'fill', fill)
    return circle
}

interface AppendLine extends AppendSVGElement {
    x1: number | undefined | Function //x coordinate of the starting point of the line
    y1: number | undefined | Function //y coordinate of the starting point of the line
    x2: number | undefined | Function //x coordinate of the end point of the line
    y2: number | undefined | Function //y coordinate of the end point of the line
}
export const appendLine = ({
    selection,
    x1,
    y1,
    x2,
    y2,
    strokeWidth = '1px',
    stroke = '#000',
}: AppendLine) => {
    const line = selection.append('line')
    addSVGAttribute(line, 'x1', x1)
    addSVGAttribute(line, 'y1', y1)
    addSVGAttribute(line, 'x2', x2)
    addSVGAttribute(line, 'y2', y2)
    addSVGAttribute(line, 'stroke-width', strokeWidth)
    addSVGAttribute(line, 'stroke', stroke)
    return line
}
