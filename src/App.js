import React from 'react'
import './App.css'

import LollipopChart from './components/LollipopChartD3Abstracted'
// import LollipopChart from './components/LollipopChart'
import BarChart from './components/BarChartD3Abstracted'
// import BarChart from './components/BarChart'
import PieChart from './components/PieChart'

import { skittleData } from './mock-data/skittlesData'

function App() {
    return (
        <div>
            <div>
                <div>Lollipop Chart (single draw)</div>
                <div className="chart-container">
                    <LollipopChart data={skittleData} />
                </div>
            </div>
            <div>
                <div>Bar Chart (redraw on resize)</div>
                <div className="chart-container">
                    <BarChart data={skittleData} />
                </div>
            </div>
            <div>
                <div>Pie Chart (tooltip)</div>
                <div className="chart-container">
                    <PieChart data={skittleData} />
                </div>
            </div>
        </div>
    )
}

export default App
