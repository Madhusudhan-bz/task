
import React from 'react';



 const Table2 =({probInfo,probInfoSolved,userH} : {probInfo : Map<string,number>,probInfoSolved : Map<string,number>,userH:string})=> {
    
    if(probInfo.size==0){
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
                <td scope='col'>{probInfo.size}</td>
            </tr>
            <tr>
                <th scope='col'>Solved</th>
                <td scope='col'>{probInfoSolved.size}</td>
            </tr>
            <tr>
                <th scope='col'>Average Attempts</th>
                <AverageAttempts probInfo={probInfo} probInfoSolved={probInfoSolved}/>
                
            </tr>
            <tr>
                <th scope='col'>Max Attempts</th>
                {/* <td scope='col'>{<CalculateMax probInfo={probInfo} />}</td>
                 */}
                 <CalculateMax probInfo={probInfo} probInfoSolved={probInfoSolved}/>
                
            </tr>
            <tr>
                <th scope='col'>Solved with one submission</th>
                <SolvedWithOne probInfoSolved={probInfoSolved} probInfo={probInfo}/>
                
            </tr>
            <tr>
                <th scope='col'>Max AC(s)</th>
                <MaxAc probInfoSolved={probInfoSolved} />
                
            </tr>
          </tbody>
        
      </table>
    </div>
  )
}


const CalculateMax = ({probInfo,probInfoSolved} : {probInfo : Map<string,number> , probInfoSolved : Map<string,number>})=>{
    let mx : number = 0;
    for(let [key,value] of probInfo){
        if(probInfoSolved.has(key))
            mx=Math.max(value,mx);
    }
    return <td scope='col'>{mx}</td>;
}

const AverageAttempts = ({probInfo,probInfoSolved} : {probInfo : Map<string,number> ,probInfoSolved : Map<string,number>})=>{
    let s:number = 0;
    for(let [key,value] of probInfo){
        // if(probInfoSolved.has(key))
        s=s+value;
    }
    // console.log(s);
    // console.log(s/probInfo.length);
    let res : any = s/probInfoSolved.size;
    res=res.toPrecision(3);

    return <td>{res}</td>;
}

const SolvedWithOne = ({probInfo,probInfoSolved} : {probInfo : Map<string,number> ,probInfoSolved : Map<string,number>})=>{
    
    let count : number = 0;
    for(let [key,value] of probInfoSolved){
        if(probInfo.get(key) === 1){
            count += 1;
        }
    }
    return <td scope='col'>{count}</td>
}


const MaxAc = ({probInfoSolved} : {probInfoSolved : Map<string,number>}) => {
    let mx : number = 0;
    for(let [key,value] of probInfoSolved){
        mx=Math.max(mx,value);
    }
    return <td scope='col'>{mx}</td>
}
export default Table2;