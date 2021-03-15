import React from "react";
import DataSetElement from "./DataSetElement";

function DataSetItemEditor({dataSet, dataSetElements, handleEditCancel, handleEditAdd, handleEditDelete, maxLength}) {

    const dataSetElementsList = dataSetElements.map(element => {
        return <DataSetElement  key={element.id} element={element} id={element.id} />
    })

    const getDeleteButton = () => {
        if(dataSetElements.length === 0){
            return <button className="dataSetItemButton" id="deleteDataButton" onClick={handleEditDelete} style={{opacity: "0.5", pointerEvents: "none"}}>Delete</button>
        }
        else{
            return <button className="dataSetItemButton" id="deleteDataButton" onClick={handleEditDelete}>Delete</button>
        }
    }

    const getAddButton = () => {
        if(dataSetElements.length >= maxLength){
            return <button className="dataSetItemButton" id="addDataButton" onClick={handleEditAdd} style={{opacity: "0.5", pointerEvents: "none"}}>Add</button>
        }
        else{
            return <button className="dataSetItemButton" id="addDataButton" onClick={handleEditAdd}>Add</button>
        }
    }

    const chooseElementSection = () => {
        if(dataSetElements.length === 0){
            return(
                <div className="dataSetItemElements" style={{border:"none", backgroundImage:"none"}}>
                    <p style={{fontWeight: "bolder"}}>Click Edit and add more elements to this data set</p>
                </div>
                )
        }
        else{
            return(
                <div className="dataSetItemElements">
                    {dataSetElementsList}
                </div>
            )
        }
    }

    return (
        <div className="dataSetItem" id={dataSet.id}>
            <div className="dataSetItemHeader">
                <h2>{dataSet.name}</h2>
            </div>
            {chooseElementSection()}
            <div className="dataSetItemButtons">
                {getAddButton()}
                {getDeleteButton()}
                <button className="dataSetItemButton" onClick={handleEditCancel}>Cancel</button>
            </div>
        </div>
    );
  }
  export default DataSetItemEditor;