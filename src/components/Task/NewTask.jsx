import React, { useContext, useState } from "react";
import apiService from "../../apiService/apiService";
import { taskContext } from "../../context/TaskProvider";


const NewTask =  React.memo(({getTasks}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assaignTo: "",
  });


  const {users} = useContext(taskContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await apiService.createTask(formData);
        if(res.data){
          console.log(res.data);
          setFormData({
            title:"",
            description:"",
            assaignTo:""
          })
          getTasks();
        }

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="" onClick={(e)=>e.stopPropagation()}>

   
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Create New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
   
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            style={styles.input}
            required
          />
        </div>

    
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            style={styles.textarea}
            rows="4"
            required
          ></textarea>
        </div>

    
        <div style={styles.formGroup}>
          <label htmlFor="assignTo" style={styles.label}>Assign To</label>
          <select
            name="assaignTo"
            value={formData?.assaignTo}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled>
              Select a person
            </option>
           {
            users?.map((user)=>{
              return <option key={user._id} name='assignTo' value={user._id}>{user.email}</option>
            })
           }
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Create Task
        </button>
      </form>
    </div>
    </div>
  );
});

const styles = {
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    position:'relative',
    zIndex:'1',
    width: window.innerWidth>768 ? '500px':'300px'
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    resize: "none",
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default NewTask;
