import React, { Component } from 'react'
import { select, pie, arc } from 'd3'
import { debounce } from 'lodash'

import '../charts.css'

class PieChart extends Component {
    constructor(props) {
        super(props)

        this.canvas = React.createRef()

        this.state = {
            marginRadius: -15,
            boundingRect: {},
            loaded: false,
        }
    }

    componentDidMount() {
        this.debouncedResize = debounce(this.handleCanvasResize, 100)
        window.addEventListener('resize', this.debouncedResize, false)
        this.debouncedResize()
        this.tooltipBoundingRect = document
            .getElementById('pie-chart-tooltip')
            .getBoundingClientRect()
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
        select('#pieChartCanvas').selectAll('svg').remove()
    }

    createChart = () => {
        console.log('Redrawing (Pie Chart)')

        this.cleanOldSvg()

        const width = this.state.boundingRect.width
        const height = this.state.boundingRect.height

        const svg = select('#pieChartCanvas')
            .append('svg')
            .attr('viewBox', [0, 0, width, height])

        const center = { x: width / 2, y: height / 2 }

        const graph = svg
            .append('g')
            .attr('transform', `translate(${center.x},${center.y})`)

        const pieChart = pie()
            .sort(null)
            .value((d) => d.count)

        graph
            .selectAll('path')
            .data(pieChart(this.props.data))
            .enter()
            .append('path')
            .attr('stroke', '#efefef')
            .attr('stroke-width', 2)
            .attr('fill', (d) => d.data.name)
            .attr('opacity', 1)
            .attr('d', (d) => this.getArcPathFxn(this.state.marginRadius)(d))
            .on('mouseenter', this.handleMouseOver)
            .on('mouseout', this.handleMouseOut)
    }

    getArcPathFxn = (radiusAdjustment = 0) => {
        const width = this.state.boundingRect.width
        const height = this.state.boundingRect.height
        const radius = Math.min(height, width) / 2
        return arc()
            .outerRadius(radius + radiusAdjustment)
            .innerRadius(0)
    }

    handleMouseOver = (d, i, m) => {
        const currentSelection = select(m[i])

        const widenedArcPathFxn = this.getArcPathFxn()
        const center = widenedArcPathFxn.centroid(d)
        center[0] += this.state.boundingRect.width / 2
        center[1] += this.state.boundingRect.height / 2

        currentSelection
            .transition()
            .duration(500)
            .attr('opacity', 0.4)
            .attr('d', widenedArcPathFxn(d))

        select('#pie-chart-tooltip-label').text(
            `${d.data.name}: ${d.data.count}`
        )
        select('#pie-chart-tooltip').attr(
            'style',
            `left: ${center[0] - this.tooltipBoundingRect.width / 2}px;
        top: ${center[1] - this.tooltipBoundingRect.height / 2}px;
        opacity:1`
        )
    }

    handleMouseOut = (d, i, m) => {
        const currentSelection = select(m[i])

        currentSelection
            .transition()
            .duration(200)
            .attr('opacity', 1)
            .attr('d', this.getArcPathFxn(this.state.marginRadius)(d))

        const currentTooltipStyleString = select('#pie-chart-tooltip').attr(
            'style'
        )
        select('#pie-chart-tooltip').attr(
            'style',
            currentTooltipStyleString.replace('opacity:1', 'opacity:0')
        )
    }

    render() {
        return (
            <div id="pieChartCanvas" className="canvas" ref={this.canvas}>
                <div
                    id="pie-chart-tooltip"
                    className="flex align-center justify-center pointer-events-none"
                    style={{ opacity: 0 }}
                >
                    <div id="pie-chart-tooltip-label"></div>
                </div>
            </div>
        )
    }
}

export default PieChart
