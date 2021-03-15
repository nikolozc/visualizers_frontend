import React, { useEffect, useState } from "react";
import DataSetList from "./DataSetList"
import AccountSiderBar from "./AccountSiderBar"


function Account({dataSets, dataSetElements, handleSetDataSet, handleSetDataSetElements, changeCurrentDataSet, handleRunTimeChart}) {
    const [dataSetInfos, setDataSetInfos] = useState([])
    const [editing, setEditing] = useState(-1) // -1 = false / any positive number will be index of the dataSetItem thats being edited
    const maxLength = 19; //max amount of dataSetElements in one dataSet

    //FETCH FUNCTIONS
    useEffect(() =>{
        fetchInfos()
      }, [])


    function fetchInfos(){
        fetch("http://localhost:3000/data_infos")
        .then(r => r.json())
        .then(elements => {
            setDataSetInfos(elements)
        })
    }

    function deleteDataSet(event){
        event.preventDefault();
        let id = parseInt(event.target.parentElement.parentElement.id)
        const updatedDataSets = dataSets.filter(d => d.id !== id);
        handleSetDataSet(updatedDataSets);
        fetch(`http://localhost:3000/data_sets/${id}` ,{
            method: "DELETE",
        })
    }

    //DATA FUNCTIONS

    function addDataSetFormSubmit(event){
        event.preventDefault();
        let formData={
            name: event.target.name.value
        }
        //add the new dataset
        fetch("http://localhost:3000/data_sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(r=>r.json())
        .then(dataSet=>{
            let updatedData = dataSets.map(d=>{
                return d;
            })
            updatedData.push(dataSet);
            handleSetDataSet(updatedData);
            setEditing(-1)
        })
    }

    function handleEditClick(event){
        setEditing(event.target.parentElement.parentElement.id)
    }

    function handleEditCancel(){
        setEditing(-1)
    }


    function handleEditAdd(event){
        event.preventDefault();
        let elementCount = event.target.parentElement.parentElement.querySelector(".dataSetItemElements").childElementCount
        //toggle deleteBtn if elementCount is about to be more than 0
        if(elementCount === 0) {
            toggleDelete(event.target.parentElement.querySelector("#deleteDataButton"));
        }
        //toggle addBtn if elementCount is about to be max
        if(elementCount >= maxLength-1){
            toggleAdd(event.target);
        }

        const formData={
            data_set_id: event.target.parentElement.parentElement.id,
            data: `${Math.floor((Math.random() * Math.floor(96))+5)}`
        }
        fetch("http://localhost:3000/sort_data_elements", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then(r=>r.json())
        .then(element=>{
            let updatedData = dataSetElements.map(d=>{
                return d;
            })
            updatedData.push(element);
            handleSetDataSetElements(updatedData);
        })
    }

    function handleEditDelete(event){
        event.preventDefault();
        let dataSetItemElements = event.target.parentElement.parentElement.querySelector(".dataSetItemElements")
        let elementCount = dataSetItemElements.childElementCount
        //toggle deleteBtn if elementCount is about to be more than 0
        if(elementCount <= 1) {
            toggleDelete(event.target);
        }
        //toggle addBtn if elementCount is about to be max
        if(elementCount === maxLength){
            toggleAdd(event.target.parentElement.querySelector("#addDataButton"));
        }
        let id = dataSetItemElements.lastElementChild.id
        const updatedData = dataSetElements.filter(d => d.id != id);
        handleSetDataSetElements(updatedData);
        fetch(`http://localhost:3000/sort_data_elements/${id}` ,{
            method: "DELETE",
        })
    }

    function toggleDelete(btn){
        if(btn.style.pointerEvents === "none"){
            btn.style.opacity = 1;
            btn.style.pointerEvents = "auto";
        }
        else{
            btn.style.opacity = 0.5;
            btn.style.pointerEvents = "none";
        }

    }

    function toggleAdd(btn){
        if(btn.style.pointerEvents === "none"){
            btn.style.opacity = 1;
            btn.style.pointerEvents = "auto";
        }
        else{
            btn.style.opacity = 0.5;
            btn.style.pointerEvents = "none";
        }
    }
  
    return (
        <div className="mainAccount">
            <AccountSiderBar addDataSetFormSubmit={addDataSetFormSubmit}/>
            <DataSetList dataSets={dataSets} dataSetElements={dataSetElements} dataSetInfos={dataSetInfos}
                deleteDataSet={deleteDataSet} editing={editing} maxLength={maxLength}
                handleEditClick={handleEditClick} handleEditCancel={handleEditCancel} 
                handleEditAdd={handleEditAdd} handleEditDelete={handleEditDelete} 
                changeCurrentDataSet={changeCurrentDataSet} handleRunTimeChart={handleRunTimeChart}/>
        </div>
    );
    }

export default Account;
