import React, { Component } from 'react'
import { select, axisLeft, axisBottom } from 'd3'
import './charts.css'

import { getLinearScale, getScalePoint } from '../utilities/d3-scales'
import { appendGroup, appendCircle, appendLine } from '../utilities/svg'

class LollipopChart extends Component {
    constructor(props) {
        super(props)

        this.canvas = React.createRef()

        this.defaultMargin = {
            top: 20,
            right: 30,
            bottom: 100,
            left: 100,
        }

        this.state = {
            margin: this.defaultMargin,
        }
    }

    componentDidMount() {
        this.createChart()
    }

    createChart = () => {
        console.log('Redrawing (Lollipop Chart)')

        const height = this.canvas.current.clientHeight
        const width = this.canvas.current.clientWidth

        const svg = select('#lollipopChart')
            .append('svg')
            .attr('viewBox', [0, 0, width, height])

        const yScaleFullDomain = this.props.data.map((obj) => obj.count)
        //using yScale for exact chart points (taking margin into account)
        const yAxisRange = [
            height - this.state.margin.bottom,
            this.state.margin.top,
        ]
        const yScale = getLinearScale({
            domain: [...yScaleFullDomain, 0],
            range: yAxisRange,
        })
        const yAxis = axisLeft(yScale).ticks(5)

        const xScaleFullDomain = this.props.data.map((obj) => obj.name)
        const xAxisRange = [
            this.state.margin.left,
            width - this.state.margin.right,
        ]
        const xScale = getScalePoint({
            domain: xScaleFullDomain,
            range: xAxisRange,
            padding: 0.6,
        })
        const xAxis = axisBottom(xScale)

        const chart = appendGroup({ selection: svg })
        const datum = chart.selectAll('circle').data(this.props.data).enter()
        appendCircle({
            selection: datum,
            r: '5px',
            cx: (d) => xScale(d.name),
            cy: (d) => yScale(d.count),
            fill: (d) => d.name,
        })
        appendLine({
            selection: datum,
            x1: (d) => xScale(d.name),
            y1: (d) => yScale(d.count),
            x2: (d) => xScale(d.name),
            y2: yScale(0),
            strokeWidth: '5px',
            stroke: (d) => d.name,
        })

        const xAxisGroup = appendGroup({
            selection: svg,
            transform: `translate(0, ${height - this.state.margin.bottom})`,
        })
        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        const yAxisGroup = appendGroup({
            selection: svg,
            transform: `translate(${this.state.margin.left}, 0)`,
        })
        yAxisGroup.call(yAxis)

        const yAxisGridlines = appendGroup({
            selection: svg,
            transform: `translate(${this.state.margin.left}, 0)`,
        })
        yAxisGridlines
            .attr('class', 'grid-lines')
            .call(
                yAxis
                    .tickSize(
                        -(
                            width -
                            this.state.margin.left -
                            this.state.margin.right
                        )
                    )
                    .tickFormat('')
            )
    }

    render() {
        return (
            <div id="lollipopChart" className="canvas" ref={this.canvas}></div>
        )
    }
}

export default LollipopChart
