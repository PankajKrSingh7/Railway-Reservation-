import React from 'react'
import { Button } from 'react-bootstrap'
import './PNRChangeBox.css';
import {useState} from 'react';
import { actionPNRChangeReq } from '../../../Services';
import { toast } from 'react-toastify';
import { ReactComponent as LoadingBtn } from '../../../images/buttonLoading.svg';


const PNRCard = (props) => {
  const {pnr, user, toCard} = props;
  return (
    <div className={`PNRChangePane ${toCard ? 'right' : ''}`}>
        <div className='header'>{toCard ? 'to' : 'from'}</div>
        <div className='content'>
          <div className='primary'>
            <span className='name'>{user.name}</span>
            <span className='pnr'>#{pnr}</span>
          </div>
          <div className='train'>
            <div className='from'>
              <p className='location'><span>From:</span> {user.from}</p>
              <p className='time'>@ {user.time}</p>
            </div>
            <div className='to'><span>To:</span> {user.to}</div>
            <div className='detail'>
              <p className='name'><span>Train:</span> {user.train}</p>
              <p className='class'>{user.trainClass}</p>
            </div>
          </div>
          <div className='footer'>
            <div className='date'>{user.date}</div>
            <div className='price'>
              <span>x{user.qty}</span>
              <span>₹{user.total}</span>
            </div>
          </div>
        </div>
      </div>
  );
}

const MessageBox = (props) => {
  return (
    <div className={`PNRChangePane`}>
        <div className='header'>Message</div>
        <div className='content'>
          {props.comment}
        </div>
    </div>
  );
}

const PNRChangeBox = (props) => {
  const {oldUser, newUser, from: fromPNR, to: toPNR,_id: id,comment} = props.data;
  const [loading,setLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const handleAccept =()=>{
    setLoading(true);
    actionPNRChangeReq({id,accept:true})
    .then(res => {
      if(res.status===1) {
        props.deleteReq(props.pos);
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
  const handleReject =()=>{
    setLoading(true);
    actionPNRChangeReq({id,accept:false})
    .then(res => {
      if(res.status===1) {
        props.deleteReq(props.pos);
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
    <div className='PNRChangeBox' >
      <div className='PNRContent'>
      {openMessage?<MessageBox comment={comment}/>:<PNRCard pnr={fromPNR} user={oldUser} />}
        <PNRCard pnr={toPNR} user={newUser} toCard />
      </div>
      <div className='PNRControls'>
        <p className='openMessage' onMouseEnter={() => setOpenMessage(true)} onMouseLeave={() => setOpenMessage(false)}>{openMessage?"Close message":"Open message"}</p>
        <Button variant="primary" type="submit" size="sm" onClick={handleAccept}>{loading?<LoadingBtn/>:"Accept"}</Button>
        <Button variant="secondary" type="submit" size="sm" onClick={handleReject}>{loading?<LoadingBtn/>:"Reject"}</Button>
      </div>
    </div>
  )
}

export default PNRChangeBox