import React from "react";
import DataSetElement from "./DataSetElement";

function DataSetItem({dataSet, dataSetElements, deleteDataSet, handleEditClick, dataSetInfo, changeCurrentDataSet, handleRunTimeChart}) {

    const dataSetElementsList = dataSetElements.map(element => {
        return <DataSetElement  key={element.id} element={element} id={element.id} />
    })

    // if dataSet has saved info it can not be eddited
    const chooseButton = () => {
        if(dataSetInfo.length === 0){
            return <button className="dataSetItemButton" onClick={handleEditClick}>Edit</button>
        }
        else{
            return <button className="dataSetItemButton" onClick={handleRunTimeChart}>Runtime Chart</button>
        }
    }

    const getVisualizeButton = () => {
        if(dataSetElements.length === 0){
            return <button className="dataSetItemButton" onClick={changeCurrentDataSet} style={{opacity: "0.5", pointerEvents: "none"}}>Visualize</button>
        }
        else{
            return <button className="dataSetItemButton" onClick={changeCurrentDataSet}>Visualize</button>
        }
    }

    const chooseElementSection = () => {
        if(dataSetElements.length === 0){
            return(
                    <p style={{marginBottom: "25px", fontSize: "18px", fontWeight: "bolder"}}>Click Edit and add more elements to this data set</p>
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
                <button className="dataSetItemDeleteBtn" onClick={deleteDataSet}>X</button>
            </div>
            {chooseElementSection()}
            <div className="dataSetItemButtons">
                {chooseButton()}
                {getVisualizeButton()}
            </div>
        </div>
    );
  }
  export default DataSetItem;