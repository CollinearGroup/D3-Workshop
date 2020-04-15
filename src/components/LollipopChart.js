import React, { Component } from 'react'

import { select, axisLeft, axisBottom, scaleLinear, scalePoint } from 'd3'

import './charts.css'

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
            loaded: false,
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

        //using yAxis for exact chart points (taking margin into account)
        const yAxisRange = [
            height - this.state.margin.bottom,
            this.state.margin.top,
        ]
        const yScale = scaleLinear()
            .domain([0, Math.max(...yScaleFullDomain)])
            .range(yAxisRange)

        const yAxis = axisLeft(yScale).ticks(5)

        const xAxisRange = [
            this.state.margin.left,
            width - this.state.margin.right,
        ]
        const xScale = scalePoint()
            .domain(this.props.data.map((obj) => obj.name))
            .range(xAxisRange)
            .padding(0.6)

        const xAxis = axisBottom(xScale)

        const chart = svg.append('g')
        const graph = chart.append('g')
        const datum = graph.selectAll('circle').data(this.props.data).enter()

        datum
            .append('circle')
            .attr('cx', (d) => xScale(d.name))
            .attr('cy', (d) => yScale(d.count))
            .attr('r', '5px')
            .attr('fill', (d) => d.name)

        datum
            .append('line')
            .attr('x1', (d) => xScale(d.name))
            .attr('x2', (d) => xScale(d.name))
            .attr('y1', (d) => yScale(d.count))
            .attr('y2', (d) => yScale(0))
            .attr('stroke-width', '5px')
            .attr('stroke', (d) => d.name)

        const xAxisGroup = svg
            .append('g')
            .attr(
                'transform',
                `translate(0, ${height - this.state.margin.bottom})`
            )

        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        const yAxisGroup = svg
            .append('g')
            .attr('transform', `translate(${this.state.margin.left}, 0)`)
        yAxisGroup.call(yAxis)

        const yAxisGridlines = svg
            .append('g')
            .attr('transform', `translate(${this.state.margin.left}, 0)`)
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
