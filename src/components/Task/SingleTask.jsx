import React, { useCallback, useContext, useEffect, useState } from 'react';
import apiService from '../../apiService/apiService';
import { taskContext } from '../../context/TaskProvider';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserRole } from '../../utility/role';
export  const statuses = ['Pending', 'In Progress', 'Completed'];
const user = getUserRole();

const SingleTask = React.memo(() => {


const [task , setTask] = useState();
  const [formData, setFormData] = useState({});
  const {users} = useContext(taskContext);
  const [newUserAssaign , setNewUserAssaign] = useState(""); 
  const{id} = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="assaignTo"){
       setNewUserAssaign(e.target.value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try{
    let formvalues = {...formData , assaignTo:formData.assaignTo._id};
    if(newUserAssaign) formvalues['assaignTo'] = newUserAssaign;
     const res = await apiService.updateTask(id , formvalues);
     if(res.status===200){
      toast.success('updated successfully');
     }
   }catch(err){
    console.log(err);
   }


  };

  const getSingleTask = useCallback(async(id)=>{
    try{
         const res = await apiService.getSingleTask(id);
         if(res.status===200){
          console.log(res.data);
          setTask(res.data);
          setFormData(res.data);
         }
    }catch(err){
      console.log(err);
  }
  },[])

  useEffect(()=>{
    const id = window.location.href.split("tasks/")[1];
    if(id){
      getSingleTask(id);
    }

  },[id]);
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Task Details</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.detailRow}>
          <label style={styles.label}>Title:</label>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={user?.role!=="HR" && user?._id.toString()!==task?.assaignTo._id.toString()}
            
          />
        </div>

        <div style={styles.detailRow}>
          <label style={styles.label}>Description:</label>
          <textarea
            style={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={user?.role!=="HR" && user?._id.toString()!==task?.assaignTo._id.toString()}
          />
        </div>

        <div style={styles.detailRow}>
          <label style={styles.label}>Task ID:</label>
          <input
            style={styles.input}
            type="text"
            name="_id"
            value={formData._id}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div style={styles.detailRow}>
          <label style={styles.label}>Created By:</label>
          <input
            style={styles.input}
            type="text"
            name="createdBy"
            value={formData.createdBy?.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div style={styles.detailRow}>
          <label style={styles.label}>Assigned To:</label>
          <select
            style={styles.select}
            name="assaignTo"
            value={formData?.assaignTo?._id}
            onChange={handleInputChange}
             disabled={user?.role!=="HR"}
          >
            {users?.map((user) => (
              <option key={user.id} value={user?._id}>
                {user.email.slice(0,22)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.detailRow}>
          <label style={styles.label}>Status:</label>
          <select
            style={styles.select}
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={user?.role!=="HR" && user?._id.toString()!==task?.assaignTo._id.toString()}
          >
            {statuses.map((statusOption, index) => (
              <option key={index} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>Update</button>
        </div>
      </form>
    </div>
  );
});

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: window.innerWidth>768 ? '600px' : '350px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: '10px',
  },
  textarea: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: '10px',
    minHeight: '100px',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: '10px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default SingleTask;
