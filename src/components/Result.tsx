
import React from 'react';
import { useState,useEffect ,useRef} from 'react';
import Verdict from '../graphs/Verdict';
import axios from 'axios';

export default function Result(props : any) {
    console.log("hello");
  const [statusData,setStatusData] = useState<Object>({"status":"","result":""});
//   const url1="https://codeforces.com/api/user.status?handle="+props.userHandle;

  let ref=useRef(0);
  useEffect(()=>{
        ref.current+=1;
        // setLoading(true);
        // console.log("clicked");
        axios.get(`https://codeforces.com/api/user.status?handle=${props.userHandle}`).then((response)=>{
            // console.log(response);
            setStatusData(response.data);
            // setFet(true);
        })
        .catch((err:string)=>{
            console.log(err);
    
        })
        .finally(()=>{
            // getAC();
            // setLoading(false);
        })
        return;
  },[statusData])

  return (
    <div>
      <h1>Render is </h1>
    </div>
  )
}
