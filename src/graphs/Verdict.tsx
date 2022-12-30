import React, { useEffect, useRef, useState } from 'react';

import { PieChart, Pie,Tooltip, LabelList, Cell, ResponsiveContainer } from 'recharts';
//{data} : {data : any[]} // {data}:{data : Array<{name : string,value : number}>}
export default function Verdict({data,name,doughnut,userHandle}:{data : any,name:string,doughnut:boolean,userHandle:String}) {
  
    // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"252323"];
    // const [verdictData,setVerdictData] = useState<any>([{name : "WA",value:0},{name : "AC",value :0},{name : "TLE",value :0},{name : "RTE",value :0},{name : "CTE",value :0},{name : "SKIP",value :0}]);
    const [help,setHelp] = useState<boolean>(false);

    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','rgb(176, 8, 254)','rgb(255, 255, 0)'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx , cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    
      if (!data) {
        return <></>
      }
    
      // console.log(data, typeof data);
      // const data02 = [
      //   { name: 'Group A', value: 2400 },
      //   { name: 'Group B', value: 4567 },
      //   { name: 'Group C', value: 1398 },
      //   { name: 'Group D', value: 9800 },
      //   { name: 'Group E', value: 3908 },
      //   { name: 'Group F', value: 4800 },
      // ];

      // console.log(render.current);
  return (
    <div className="card cardV m-3">
    <div className='my-3'>
        <center><h5>{name} of {userHandle}</h5></center>
        <PieChart width={500} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            innerRadius={doughnut?75:0}
            fill="#8884d8"
          >
           {/* <LabelList dataKey="name" position="outside" /> */}
          {data.map((entry:any ,index:any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
          
        </PieChart>
      {/* <p>{
      
      verdictData.map((ele : any)=>{
          console.log(ele);
      })}</p> */}
    </div>
    </div>
  )
}
