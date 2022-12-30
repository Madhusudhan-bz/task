
import React from 'react';

 const Table2 =({probInfo,probInfoSolved,userH} : {probInfo : any[],probInfoSolved : any[],userH:string})=> {

    console.log(probInfoSolved);
    if(probInfo.length==0){
        return <></>
    }

  return (
    <div className="cardV container">
        
      <table className="table">
            <thead>
            <tr style={{backgroundColor : "greenyellow"}}>
                <th scope="col">Contest of</th>
                <td scope="col">{userH}</td>
                
            </tr>
          </thead>
        
          <tbody>
            <tr>
                <th scope='col'>Tried</th>
                <td scope='col'>{probInfo.length}</td>
            </tr>
            <tr>
                <th scope='col'>Solved</th>
                <td scope='col'>{probInfoSolved.length}</td>
            </tr>
            <tr>
                <th scope='col'>Average Attempts</th>
                <AverageAttempts probInfo={probInfo} />
                
            </tr>
            <tr>
                <th scope='col'>Max Attempts</th>
                {/* <td scope='col'>{<CalculateMax probInfo={probInfo} />}</td>
                 */}
                 <CalculateMax probInfo={probInfo} />
                
            </tr>
            <tr>
                <th scope='col'>Solved with one submission</th>
                <SolvedWithOne probInfoSolved={probInfoSolved} />
                
            </tr>
          </tbody>
        
      </table>
    </div>
  )
}


const CalculateMax = ({probInfo} : {probInfo : any[]})=>{
    let mx : number = 0;
    for(let i of probInfo){
        mx=Math.max(i.value,mx);
    }
    return <td scope='col'>{mx}</td>;
}

const AverageAttempts = ({probInfo} : {probInfo : any[]})=>{
    let s:number = 0;
    for(let i of probInfo){
        s=s+i.value;
    }
    console.log(s/probInfo.length);
    return <></>;
}

const SolvedWithOne = ({probInfoSolved} : {probInfoSolved : any[]})=>{
    let count : number = 0;
    for(let i of probInfoSolved){
        console.log(i);
        if(i.value === 1)
            count+=1;
    }
    return <td scope='col'>{count}</td>
}
export default Table2;