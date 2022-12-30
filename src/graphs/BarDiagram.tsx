import React from 'react'
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend}   from 'recharts';
import { VictoryBar ,VictoryChart,VictoryAxis} from 'victory';

export default function BarDiagram({data ,name} : {data :any,name:string}) {


    if(!data){
        return <></>
    }
  return (
    <div className="card cardV m-5">
      {/* <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          // tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={["2"]}
        />
        <VictoryBar
          data={data}
          x="name"
          y="value"
        />
      </VictoryChart> */}
      
      <center><h5>{name}</h5>
      <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 40 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid  />
      <Bar dataKey="value" barSize={40} fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
    </center>
    </div>
  )
}


