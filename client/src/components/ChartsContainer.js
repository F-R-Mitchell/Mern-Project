import { useAppContext } from '../context/appContext'
import React, { useState } from 'react'
import StatsBarChart from './BarChart'
import StatsAreaChart from './AreaChart'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <StatsAreaChart data={data} />
      ) : (
        <StatsBarChart data={data} />
      )}
    </Wrapper>
  )
}
export default ChartsContainer
