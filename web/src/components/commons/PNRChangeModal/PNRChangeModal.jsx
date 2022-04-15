import './PNRChangeModal.css';
import React from 'react';
import closeBtn from './close.svg';
import {Button} from "react-bootstrap";
import {useState} from 'react';
import { reqPNRChange } from '../../../Services';
import { toast } from 'react-toastify'
import { ReactComponent as LoadingBtn } from '../../../images/buttonLoading.svg';

const PNRChangeModal = ({oldPNR,close}) => {
  const [newPNR, setNewPNR] = useState('');
  const [comment, setComment] = useState(''); 
  const [loading,setLoading] = useState(false);

  const reqPNR=()=>{
    setLoading(true);
    reqPNRChange({oldPNR,newPNR,comment})
    .then(res => {
      if(res.status===1) {
        close();
        toast.success(res.message);
      }
      else if(res.status===2){
        toast.info(res.message);
      }
      else{
        toast.error(res.message);
      }
      setLoading(false);
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div className='PNRModalMain'>
      <div className='PNRModalWindow'>
        <img className='PNRModalClose' alt="closeBtn" onClick={close} src={closeBtn}/>
        <div className='PNRModalHeader'>Request PNR Change</div>
        <div className='PNRModalBody'>
        <div class="material-textfield">
          <input placeholder=" " type="text" className='PNRModalText' onChange={(e)=>setNewPNR(e.target.value)}/>
          <label className='PNRModallabel'>New PNR</label>
        </div>
        <textarea className='PNRModalTextArea' rows="6" cols="50" placeholder="Message to the owner ..." onChange={(e)=>setComment(e.target.value)}/>
        </div>
        <Button
          variant='danger'
          size='sm'
          onClick={reqPNR}
        >
          {loading?<div style={{width: "100px"}}><LoadingBtn/></div>:"Request Change"}
        </Button>
      </div>
    </div>
  )
}

export default PNRChangeModal