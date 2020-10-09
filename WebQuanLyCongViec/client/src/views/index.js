import React, { Component ,useState,useEffect,useRef} from 'react';

import Login from './Login'
import Main from './Main'
import LoadDing from '../assets/css/Loading/Load'

function _index() {
  const [check, setcheck] = useLocalStorage('login', false);
  const [_user,setUser] = useLocalStorage('user', 'Mặc định');
  const [CheckLogin,SetCheckLogin] =useState(false)
  const [user,SetUser] = useState([])
  const typingTimeoutRef = useRef(null)
  const [Loader,ShowLoader,HideLoader] = LoadDing()
  const onCheckLogin =  (e)=>{
    ShowLoader()
    if(typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current) 
    }
    typingTimeoutRef.current = setTimeout(()=>
    {
    setcheck(e)
    SetCheckLogin(check)
    HideLoader()
  },500)

  }
  const _onExit =  (e)=>{
    ShowLoader()
    if(typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current) 
    }
    typingTimeoutRef.current = setTimeout(()=>
      {
    setcheck(e)
    SetCheckLogin(check)
    HideLoader()
  },500)
  }
  const TenNguoiDung = (e)=>{
    console.log(e)
    setUser(e)
  }
  useEffect(()=>{
  },[])
  
  if(check)
  {
    return (
    <div>
      
      <Main onExit={_onExit} user={user}></Main>
      {Loader}
    </div>
    )
  }
  else{
    return (
      <div>
          
          <Login _onCheckLogin={onCheckLogin} TenNguoiDung={TenNguoiDung}></Login>
          {/* {Loader} */}
      </div>
    )
  }
}
// Hook
// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default _index
