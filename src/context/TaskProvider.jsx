import React, { createContext, useEffect, useState, useMemo } from 'react';
import apiService from '../apiService/apiService';

export const taskContext = createContext();

function TaskProvider({children}) {
  const [users, setUsers] = useState([]);

  const getAllUsers = async() => {
    try {
      const res = await apiService.getAllUsers();
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  const memoizedUsers = useMemo(() => users, [users]);

  return (
    <taskContext.Provider value={{ users: memoizedUsers, getAllUsers }}>
      {children}
    </taskContext.Provider>
  );
}

export default TaskProvider;
