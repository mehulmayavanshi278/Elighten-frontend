import React, { useEffect, useRef, useState } from 'react';
import apiService from '../../apiService/apiService';
import socket from '../../utility/websocket';


const Logs = () => {

  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView()
    }
  };


  const [logs , setLogs] = useState([]);

  const getAllLogs  =async()=>{
    try{
      const res = await apiService.getLogs();
      if(res.status===200){
        console.log(res.data);
        setLogs(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllLogs();
  },[]);


  useEffect(()=>{
    scrollToBottom();
  },[logs])


  useEffect(()=>{
    if(socket){
      socket.on('new task' , (data)=>{
        console.log(data);
        
        
        setLogs((prevLogs) => [...prevLogs, data]);
      })


      return ()=>{
        socket.off('new task');
      }
    }
  },[socket])

  return (
    <div>
      <div style={styles.logsContainer}>
        {logs?.map((log , index) => (
          <div key={log.id} style={styles.logItem}  ref={index===logs.length-1 ? divRef : null}>
            <span style={styles.timestamp}>{log.createdAt}</span>
            <p style={styles.message}>

              {log.to ?   log.title + " " +  log.to.email : log.user.email + " " + log.title}
            
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


const styles = {
  title: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600',
  },
  logsContainer: {
    padding: '10px 0',
  },
  logItem: {
    backgroundColor: '#fff',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  timestamp: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '6px',
    display: 'block',
  },
  message: {
    fontSize: '14px',
    color: '#333',
  },
};

export default Logs;
