import React, { useEffect, useState,useRef } from "react";
import "../styles/Home.css";
import axios from "axios";
import Verdict from "../graphs/Verdict";
import Result from "../components/Result";
import BarDiagram from "../graphs/BarDiagram";
import Table from "../components/Table";
import Table2 from "../components/Table2";

import VerdictBarDiagram from "../graphs/VerdictBarDiagram";

export default function Home() {
  const [userHandle, setUserHandle] = useState<string>("");
  const [userH,setUserH] = useState<string>("");
  // const [statusData,setStatusData] = useState<any>({"status":null,"result":[]});
  const [loading,setLoading] = useState<Boolean>(false);
  const [verdictData,setVerdictData] = useState<any>(); // 
  const [lang,setLang] =  useState<any>();
  const [tags,setTags]=useState<any>();
  const [ratings,setRatings] = useState<any>();
  const [levels,setLevels] = useState<any>();
  const [contestInfo,setContestInfo] = useState<object>();
  const [probInfo,setProbInfo] = useState<any[]>([]);
  const [probInfoSolved,setProbInfoSolved] = useState<any[]>([]);



  const handleOnChange = (event : any)=>{
    setUserHandle(event.target.value);
  }

  // console.log(statusData)

  
 // Fetching the data
  const fetchData=(data : any)=>{
    
    data = data.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); 
    // data.delete({});
    const temp : any=[];

    // temp.shift();
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
      console.log(response.data);
      setUserH(response.data.result[0].author.members[0].handle);
      // console.log(response.data.result[0].author.members[0].handle);
      // setStatusData(response.data.result);
      let tempLang : any= [];
      let tempVerdict : any=[];  //
      let tempTags : any=[];
      let tempRatings : any=[];
      let tempLevels : any=[];
      let tempProbInfo : any = [];
      let tempProbInfoSolved : any = [];


      for(let i of response.data.result){
        tempLang=[...tempLang,i.programmingLanguage]; 
        tempVerdict=[...tempVerdict,i.verdict]; 
        tempTags=[...tempTags,...i.problem.tags];
        tempRatings=[...tempRatings,i.problem.rating];
        tempLevels=[...tempLevels,i.problem.index];
        tempProbInfo = [...tempProbInfo,i.contestId+i.problem.index];
        if(i.verdict === "OK")
        tempProbInfoSolved = [...tempProbInfoSolved,i.contestId+i.problem.index];
      }

     


      tempLang=fetchData(tempLang);
      tempVerdict=fetchData(tempVerdict);
      tempTags=fetchData(tempTags);
      tempRatings=fetchData(tempRatings);
      tempLevels=fetchData(tempLevels);
      tempProbInfo = fetchData(tempProbInfo);
      tempProbInfoSolved = fetchData(tempProbInfoSolved);

      setVerdictData(tempVerdict);
      setLang(tempLang);
      setTags(tempTags);
      setRatings(tempRatings);
      setLevels(tempLevels);
      setProbInfo(tempProbInfo);
      setProbInfoSolved(tempProbInfoSolved);
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
      
      for(let i of res.data.result){
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
        

      }

      
      
      setContestInfo(contest);
      
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  // console.log(probInfo);
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
          
          
           
            <Verdict data={verdictData} name="Verdict" doughnut={false} userHandle={userH} />
             
          
          
          
            <Verdict data={lang} name="Languages" doughnut={false} userHandle={userH}/>
             
          
          
        </div>
        
          
          
          <Verdict data={tags} name="Tags" doughnut={true} userHandle={userH}/>
             
          
          
          
         
            {/* <BarDiagram data={ratings} name={`Problem ratings of ${userH}`}/> */}
             
          
          
         
            {/* <BarDiagram data={levels} name={`Problem levels of ${userHandle}`}/> */}
            
              <VerdictBarDiagram data={ratings} name={`Problem ratings of ${userHandle}`}/>
              <VerdictBarDiagram data={levels} name={`Problem levels of ${userHandle}`}/>
            
             
            <Table data={contestInfo} userHandle={userHandle}/>
            <Table2 probInfo ={probInfo} probInfoSolved={probInfoSolved} userH = {userH} />
    </div>
  );
}


