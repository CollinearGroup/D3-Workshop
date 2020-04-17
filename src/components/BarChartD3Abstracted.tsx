import React, { Component } from 'react'

import { select, axisLeft, axisBottom } from 'd3'
import { debounce } from 'lodash'

import { getBandScale, getLinearScale } from '../utilities/d3-scales'
import { appendGroup, appendRect } from '../utilities/svg'
import {
    Datum,
    Margin,
    Props,
    RedrawOnResizeState,
} from './chart-types-and-interfaces'

import './charts.css'

class BarChart extends Component<Props, RedrawOnResizeState> {
    canvas: React.RefObject<HTMLDivElement>
    defaultMargin: Margin
    debouncedResize: () => void

    constructor(props: Props) {
        super(props)

        this.canvas = React.createRef()

        this.defaultMargin = {
            top: 20,
            right: 30,
            bottom: 100,
            left: 100,
        }
        this.debouncedResize = debounce(this.handleCanvasResize, 100)

        this.state = {
            margin: this.defaultMargin,
            boundingRect: { width: 0, height: 0 },
            loaded: false,
        }
    }

    componentDidMount() {
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
            height: this.canvas.current ? this.canvas.current.clientHeight : 0,
            width: this.canvas.current ? this.canvas.current.clientWidth : 0,
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
            .attr('viewBox', `0, 0, ${width}, ${height}`)

        const yScaleFullDomain = this.props.data.map((obj) => obj.count)
        const yMax = Math.max(...yScaleFullDomain)

        //using yScale for relative heights (does not take margin into account)
        const yAxisRange: [number, number] = [
            0,
            height - this.state.margin.top - this.state.margin.bottom,
        ]
        const yScale = getLinearScale({
            domain: [0, yMax],
            range: yAxisRange,
            isDomainFlipped: true,
        })
        const yAxis = axisLeft(yScale).ticks(5)

        const xAxisRange: [number, number] = [
            0,
            width - this.state.margin.right - this.state.margin.left,
        ]
        const xScale = getBandScale({
            domain: this.props.data.map((obj) => obj.name),
            range: xAxisRange,
            paddingOuter: 0.6,
        })
        const xAxis = axisBottom(xScale)

        const chart = appendGroup({
            selection: svg,
            transform: `translate(${this.state.margin.left}, ${this.state.margin.top})`,
        })
        const graph = appendGroup({ selection: chart })
        const datum = graph.selectAll('rect').data(this.props.data).enter()

        appendRect({
            selection: datum,
            x: (d: Datum) => xScale(d.name),
            y: (d: Datum) => yScale(d.count),
            width: xScale.bandwidth(),
            height: (d: Datum) => yScale(0) - yScale(d.count),
            fill: (d: Datum) => d.name,
        })

        const xAxisGroup = appendGroup({
            selection: chart,
            transform: `translate(0, ${yScale(0)})`,
        })

        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        const yAxisGroup = appendGroup({ selection: chart })
        yAxisGroup.call(yAxis)

        const yAxisGridlines = appendGroup({ selection: chart })
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
                    .tickFormat(() => '')
            )
    }

    render() {
        return (
            <div id="barChartCanvas" className="canvas" ref={this.canvas}></div>
        )
    }
}

export default BarChart
