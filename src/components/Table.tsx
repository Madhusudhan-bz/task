
import React from "react";

export default function Table({data,userHandle} : {data : any,userHandle:string}) {

    if(!data){
        return <></>
    }
    // console.log(data);
  return (
    <div className="cardV container">
        
      <table className="table">
            <thead>
            <tr style={{backgroundColor : "greenyellow"}}>
                <th scope="col">Contest of</th>
                <td scope="col">{userHandle}</td>
                
            </tr>
          </thead>
        
            <tbody>
            <tr>
                <th scope="row">Number of contests</th>
                <td>{data.number_of_contests}</td>
                
            </tr>
            <tr>
                <th scope="row">Best rank</th>
                <td>{data.bestRank}</td>
                
            </tr>
            <tr>
                <th scope="row">Worst rank</th>
                <td>{data.worstRank}</td>
                
            </tr>
            <tr>
                <th scope="row">Max up</th>
                <td>{data.maxUp}</td>
                
            </tr>
            <tr>
                <th scope="row">Max down</th>
                <td>{data.maxDown}</td>
                
            </tr>
            
            
          </tbody>
        
      </table>
    </div>
  );
}


