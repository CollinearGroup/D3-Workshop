import React from 'react'
import './App.css'

import BarChart from './components/BarChart'
import BarChart2 from './components/BarChart2'

import { skittleData } from './mock-data/barChart'

function App() {
    return (
        <div>
            <div>
                <div>Bar Chart (single draw)</div>
                <div className="chart-container">
                    <BarChart data={skittleData} />
                </div>
            </div>
            <div>
                <div>Bar Chart 2 (redraw on resize)</div>
                <div className="chart-container">
                    <BarChart2 data={skittleData} />
                </div>
            </div>
        </div>
    )
}

export default App
