import React, { useEffect, useState,useRef } from "react";
import "../styles/Home.css";
import axios from "axios";
import Verdict from "../graphs/Verdict";
import Result from "../components/Result";
import BarDiagram from "../graphs/BarDiagram";
import Table from "../components/Table";
// import ""

export default function Home() {
  const [userHandle, setUserHandle] = useState<string>("");
  // const [statusData,setStatusData] = useState<any>({"status":null,"result":[]});
  const [loading,setLoading] = useState<Boolean>(false);
  const [verdictData,setVerdictData] = useState<any>(); // 
  const [lang,setLang] =  useState<any>();
  const [tags,setTags]=useState<any>();
  const [ratings,setRatings] = useState<any>();
  const [levels,setLevels] = useState<any>();
  const [contestInfo,setContestInfo] = useState<object>();

  const handleOnChange = (event : any)=>{
    setUserHandle(event.target.value);
  }

  // console.log(statusData)

  
 // Fetching the data
  const fetchData=(data : any)=>{
    data.shift();
    // console.log(data);
    data = data.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); 
    data.delete({});
    const temp=[{}];

    temp.shift();
    for(let [key,value] of data){
      // console.log(key,value);
      
      temp.push({name:key,value:value})
    }
    // console.log(data);
    // temp.unshift(); 

    return temp;
  }


  const handleOnClick = async (event : any)=>{
    setLoading(true);
    // console.log("clicked");
    axios.get(`https://codeforces.com/api/user.status?handle=${userHandle}`).then((response)=>{
      // console.log(response);
      // setStatusData(response.data.result);
      let tempLang = [{}];
      let tempVerdict=[{}];  //
      let tempTags=[{}];
      let tempRatings=[{}];
      let tempLevels=[{}];

      for(let i of response.data.result){
        tempLang=[...tempLang,i.programmingLanguage]; 
        tempVerdict=[...tempVerdict,i.verdict]; 
        tempTags=[...tempTags,...i.problem.tags];
        tempRatings=[...tempRatings,i.problem.rating];
        tempLevels=[...tempLevels,i.problem.index];
      }

      // console.log(tempVerdict);
      tempLevels.sort();
      // tempRatings.sort();


      tempLang=fetchData(tempLang);
      tempVerdict=fetchData(tempVerdict);
      tempTags=fetchData(tempTags);
      tempRatings=fetchData(tempRatings);
      tempLevels=fetchData(tempLevels);

      setVerdictData(tempVerdict);
      setLang(tempLang);
      setTags(tempTags);
      setRatings(tempRatings);
      setLevels(tempLevels);
      // console.log(tempTags);
      // setLang(tp);
    })
    .catch((err:string)=>{
        console.log(err);

    })
    .finally(()=>{
        // getAC();
        setLoading(false);
    })

    setLoading(true);
    axios.get(`https://codeforces.com/api/user.rating?handle=${userHandle}`).then((res)=>{
      let contest={"number_of_contests":0,"bestRank":100000,"worstRank":0,"maxUp":0,"maxDown":10000}; 
      contest.number_of_contests=res.data.result.length;
      // let mi=10000000,mx=0;
      // let tp = new Array<number>();
      for(let i of res.data.result){
        // console.log(i);
        // tp=[...tp,i.rank];
        if(i.rank<contest['bestRank']){
          contest['bestRank']=i.rank
        }
        if(i.rank>contest['worstRank']){
          contest['worstRank']=i.rank
        }

        if((i.newRating-i.oldRating)> contest['maxUp']){
          contest['maxUp']=(i.newRating-i.oldRating);
        }

        if((i.newRating-i.oldRating) < contest['maxDown']){
          contest['maxDown']=(i.newRating-i.oldRating);
        }
        // mi=Math.min(i.rank,mi);
        // console.log(i.rank,mi,mx);
        // mx=Math.min(Number(i.rank),mx);
        // console.log(mi,mx);

      }
      // console.log(tp);
      
      
      setContestInfo(contest);
      // contest.bestRank = 
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  // console.log(contestInfo);
  // console.log(tags);
  return (

    <div>
      
      <div
        className="d-flex justify-content-center"
        // style={{ boxShadow: "px 10px 5px black" }}
        >
        <div className="handle d-flex justify-content-center cardV">
            {/* <div className="myform"> */}
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control mx-5 my-4"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleOnChange}
                />
            {/* </div> */}
            </div> 
            <div>
                <button type="button" className="btn btn-primary my-4 p-1" onClick={handleOnClick}>Submit</button>
            </div>
        </div>
        
        
        </div>
        <div className="d-flex jusitify-content-center container">
          
          
           
            <Verdict data={verdictData} name="Verdict" doughnut={false} userHandle={userHandle} />
             
          
          
          
            <Verdict data={lang} name="Languages" doughnut={false} userHandle={userHandle}/>
             
          
          
        </div>
        
          
          
          <Verdict data={tags} name="Tags" doughnut={true} userHandle={userHandle}/>
             
          
          
          
         
            <BarDiagram data={ratings} name={`Problem ratings of ${userHandle}`}/>
             
          
          
         
            <BarDiagram data={levels} name={`Problem levels of ${userHandle}`}/>
             
            <Table data={contestInfo} userHandle={userHandle}/>
    </div>
  );
}


