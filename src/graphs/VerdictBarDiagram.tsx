import React from 'react'
import { VictoryChart,VictoryAxis,VictoryBar,VictoryTheme } from 'victory';

export default function VerdictBarDiagram({data,name} : {data : any[],name : string}) {

  if(!data){
    return <></>;
  }
  
  return (
    <div className='card cardV m-5'>
      <center><h5>{name}</h5></center>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material} height={200}>
            <VictoryAxis label={"name"} style={{tickLabels: {fontSize: 5, padding: 5},axisLabel: {fontSize: 5, padding: 20},}} />
            <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 5, padding: 5}}}/>

            <VictoryBar animate barWidth={20} style={{data : {fill:"rgb(212, 0, 255)"}}} data={data} x="name" y="value"/>
      </VictoryChart>
    </div>
  )
}
