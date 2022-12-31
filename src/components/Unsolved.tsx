import React from 'react'

export default function Unsolved({probInfo,probInfoSolved} : {probInfo : Map<string,number> , probInfoSolved : Map<string,number>}) {
    
    
  return (
    <div className='container cardV mx-10 my-3' >
        <h5>Unsolved</h5>
        <br>
        </br>
        
      <Calculate probInfo={probInfo} probInfoSolved={probInfoSolved} />
    </div>
  )
}


const Calculate = ({probInfo,probInfoSolved} : {probInfo : Map<string,number>,probInfoSolved : Map<string,number>})=>{
    let temp : string[] = [];
    for(let [key,value] of probInfo){
        if(!probInfoSolved.has(key))
            temp.push(key+" ");

    }
    return <div >{temp.toString()}</div>
}



