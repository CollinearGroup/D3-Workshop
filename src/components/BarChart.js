import React, { Component } from 'react'

import { select, axisLeft, axisBottom, scaleLinear, scaleBand } from 'd3'
import { debounce } from 'lodash'

import './charts.css'

class BarChart extends Component {
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
            boundingRect: {},
            loaded: false,
        }
    }

    componentDidMount() {
        this.debouncedResize = debounce(this.handleCanvasResize, 100)
        window.addEventListener('resize', this.debouncedResize, false)
        this.debouncedResize()
    }

    componentDidUpdate() {
        if (this.state.loaded) {
            this.createChart()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedResize, false)
    }

    handleCanvasResize = () => {
        const boundingRect = {
            height: this.canvas.current.clientHeight,
            width: this.canvas.current.clientWidth,
        }
        this.setState({ boundingRect, loaded: true })
    }

    cleanOldSvg = () => {
        select('#barChartCanvas').selectAll('svg').remove()
    }

    createChart = () => {
        console.log('Redrawing (Bar Chart)')

        this.cleanOldSvg()

        const width = this.state.boundingRect.width
        const height = this.state.boundingRect.height

        const svg = select('#barChartCanvas')
            .append('svg')
            .attr('viewBox', [0, 0, width, height])

        const yScaleFullDomain = this.props.data.map((obj) => obj.count)
        const yMax = Math.max(...yScaleFullDomain)

        //using yAxis to determine heights of rects (does not take margin into account)
        const yAxisRange = [
            0,
            height - this.state.margin.top - this.state.margin.bottom,
        ]
        const yScale = scaleLinear().domain([yMax, 0]).range(yAxisRange)
        const yAxis = axisLeft(yScale).ticks(5)

        const xAxisRange = [
            0,
            width - this.state.margin.right - this.state.margin.left,
        ]
        const xScale = scaleBand()
            .domain(this.props.data.map((obj) => obj.name))
            .rangeRound(xAxisRange)
            .paddingOuter(0.6)
        const xAxis = axisBottom(xScale)

        const chart = svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.state.margin.left}, ${this.state.margin.top})`
            )
        const graph = chart.append('g')
        const datum = graph.selectAll('rect').data(this.props.data).enter()

        datum
            .append('rect')
            .attr('x', (d) => xScale(d.name))
            .attr('y', (d) => yScale(d.count))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => yScale(0) - yScale(d.count))
            .attr('fill', (d) => d.name)

        const xAxisGroup = chart
            .append('g')
            .attr('transform', `translate(0, ${yScale(0)})`)

        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        const yAxisGroup = chart.append('g')
        yAxisGroup.call(yAxis)

        const yAxisGridlines = chart.append('g')
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
            <div id="barChartCanvas" className="canvas" ref={this.canvas}></div>
        )
    }
}

export default BarChart
