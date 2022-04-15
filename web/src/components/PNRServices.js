import React from 'react';
import { getPNRChangeReq } from '../Services';
import PNRChangeBox from './commons/PNRChangeBox/PNRChangeBox.jsx';
import {useState,useEffect} from 'react';

const PNRServices = () => {

  const [userId,setUserId] = useState('');
  const [reqData,setReqData] = useState([]);

  useEffect(()=>{
    var user=localStorage.getItem("user");
    if(user){
      user=JSON.parse(user);
      setUserId(user._id);
    }
  },[reqData]);

  useEffect(()=>{
      getPNRChangeReq({userId})
      .then(res => {
        res && setReqData(res);
      })
      .catch(err => {
          console.log(err)
      })
  },[userId]);

  useEffect(()=>{
    console.log(reqData);
},[reqData]);

  const  deleteReq = (pos) =>{
    console.log("before",reqData);
    setReqData(prev=>{
      prev.splice (pos, pos+1)
      return [...prev];
    });
    
    console.log("after",reqData);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '30px'}}>
      <h1 style={{fontSize: '38px', fontWeight: '300', marginBottom: '30px'}}>PNR Change Requests</h1>
      {
        reqData.map((data, i) => {
          return <PNRChangeBox key={i} data={data} deleteReq={deleteReq} pos={i}/>
        })
      }
    </div>
  )
}

export default PNRServices
