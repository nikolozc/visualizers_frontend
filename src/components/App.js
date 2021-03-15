import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Account from "./Account";
import Graphs from "./Graphs";
import DataSetElement from "./DataSetElement";
import RunTimeChart from "./RunTimeChart";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [errorsSignUp, setErrorsSignUp] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [dataSetElements, setDataSetElements] = useState([]);
  const [currentDataSet, setCurrentDataSet] = useState(null);
  const history = useHistory();

  //FETCH FUNCTIONS
  useEffect(() =>{
    checkIfLoggedIn()
    fetchDataSets()
    fetchElements()
  }, [])

  function checkIfLoggedIn(){
    const token = localStorage.getItem("token");
    if(token){
      fetch("http://localhost:3000/me",{
        headers:{
          Authorization: `Bearer${token}`,
        },
      })
      .then(r => r.json())
      .then(user => {
        setCurrentUser(user);
      });
    }
  }

  function fetchDataSets(){
    fetch("http://localhost:3000/data_sets")
    .then(r => r.json())
    .then(elements => {
        setDataSets(elements)
        setCurrentDataSet(elements[0]);
    })
}  

  function fetchElements(){
      fetch("http://localhost:3000/sort_data_elements")
      .then(r => r.json())
      .then(elements => {
          setDataSetElements(elements)
      })
  }

  function handleLogin(event){
    event.preventDefault();
    let formData={
      name: event.target.name.value,
      password: event.target.password.value
    }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(r=>r.json())
    .then(data =>{
      if(data.errors){
        setErrors(data.errors);
      }
      else{
        const {user, token} = data;
        localStorage.setItem("token", token);
        setCurrentUser(user);
      }

    })
  }

  function handleSignUp(event){
    event.preventDefault();
    let formData={
      name: event.target.name.value,
      password: event.target.password.value
    }
    //add user using formdata
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(r=>r.json())
    .then(user =>{
      if(user.errors){
        setErrorsSignUp(user.errors);
      }
      else{
        setCurrentUser(user);
      }

    })
  }

  // SET FUNCTIONS

  function handleLogOut(){
    localStorage.removeItem("token");
    setCurrentUser(null);
    history.push("/");
  }

  function handleSetDataSet(data){
    setDataSets(data);
  }

  function handleSetDataSetElements(data){
    setDataSetElements(data);
  }

  function changeCurrentDataSet(event){
    setCurrentDataSet(dataSets.find(element => element.id == event.target.parentElement.parentElement.id));
    history.push("/graphs")
  }

  function handleRunTimeChart(event){
    setCurrentDataSet(dataSets.find(element => element.id == event.target.parentElement.parentElement.id));
    history.push("/runTimeChart")
  }

  // OTHER FUNCTIONS

  function handleNullDataSet(){
    history.push("/")
  }
  
  return (
    <div className="app">
      <Header currentUser={currentUser} handleLogOut={handleLogOut}/>
      <Switch>
        <Route path="/account">
            <Account dataSets={dataSets} dataSetElements={dataSetElements}
              handleSetDataSet={handleSetDataSet} handleSetDataSetElements={handleSetDataSetElements}
              changeCurrentDataSet={changeCurrentDataSet} handleRunTimeChart={handleRunTimeChart}/>
        </Route>
        <Route path="/graphs">
            <Graphs dataSet={currentDataSet} handleNullDataSet={handleNullDataSet} />
        </Route>
        <Route path="/runTimeChart">
          <RunTimeChart dataSet={currentDataSet}/>
        </Route>
        <Route path="/">
          {currentUser ? <h1>Welcome, {currentUser.name}!</h1> : <Main handleLogin={handleLogin} handleSignUp={handleSignUp} 
                                                                      errors={errors} errorsSignUp={errorsSignUp} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
