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
        const yScale = getLinearScale([...yScaleFullDomain, 0], yAxisRange)
        const yAxis = axisLeft(yScale).ticks(5)

        const xScaleFullDomain = this.props.data.map((obj) => obj.name)
        const xAxisRange = [
            this.state.margin.left,
            width - this.state.margin.right,
        ]
        const xScale = getScalePoint(xScaleFullDomain, xAxisRange, 0.6)
        const xAxis = axisBottom(xScale)

        const chart = appendGroup(svg)
        const datum = chart.selectAll('circle').data(this.props.data).enter()
        appendCircle(
            datum,
            '5px',
            (d) => xScale(d.name),
            (d) => yScale(d.count),
            (d) => d.name
        )
        appendLine(
            datum,
            (d) => xScale(d.name),
            (d) => yScale(d.count),
            (d) => xScale(d.name),
            yScale(0),
            '5px',
            (d) => d.name
        )

        const xAxisGroup = appendGroup(
            svg,
            `translate(0, ${height - this.state.margin.bottom})`
        )
        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        const yAxisGroup = appendGroup(
            svg,
            `translate(${this.state.margin.left}, 0)`
        )
        yAxisGroup.call(yAxis)

        const yAxisGridlines = appendGroup(
            svg,
            `translate(${this.state.margin.left}, 0)`
        )
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
