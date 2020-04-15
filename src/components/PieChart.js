import React, { Component } from 'react'
import { select, pie, arc } from 'd3'
import { debounce } from 'lodash'

class PieChart extends Component {
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

        const chartHeight =
            height - this.state.margin.top - this.state.margin.bottom
        const chartWidth =
            width - this.state.margin.left - this.state.margin.right
        const radius = Math.min(chartHeight, chartWidth) / 2
        const center = { x: chartWidth / 2, y: chartHeight / 2 }
        const arcPath = arc().outerRadius(radius).innerRadius(0)

        const chart = svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.state.margin.left}, ${this.state.margin.top})`
            )

        const graph = chart
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
            .attr('class', 'arc')
            .attr('stroke', '#efefef')
            .attr('stroke-width', 2)
            .attr('fill', (d) => d.data.name)
            .attr('opacity', 1)
            .attr('d', (d) => arcPath(d))
            .on('mouseenter', this.handleMouseOver)
            .on('mouseout', this.handleMouseOut)
    }

    handleMouseOver = (d, i, m) => {
        const currentSelection = select(m[i])

        currentSelection.transition().duration(500).attr('opacity', 0.2)
    }

    handleMouseOut = (d, i, m) => {
        const currentSelection = select(m[i])

        currentSelection.transition().duration(200).attr('opacity', 1)
    }

    render() {
        return (
            <div id="pieChartCanvas" className="canvas" ref={this.canvas}></div>
        )
    }
}

export default PieChart
