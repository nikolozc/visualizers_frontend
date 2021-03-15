import React from "react";
import DataSetItem from "./DataSetItem";
import DataSetItemEditor from "./DataSetItemEditor";

function DataSetList({dataSets, dataSetElements, dataSetInfos, deleteDataSet, editing,
     maxLength, handleEditClick, handleEditCancel, handleEditAdd, handleEditDelete, changeCurrentDataSet, handleRunTimeChart}) {

    function getElements(dataSet){
        let arr = []
        dataSetElements.map(element=>{
            if(element.data_set_id === dataSet.id){
                arr.push(element)
            }
        })
        return arr;
    }

    function getInfos(dataSet){
        let arr = []
        dataSetInfos.map(element=>{
            if(element.data_set_id === dataSet.id){
                arr.push(element)
            }
        })
        return arr;
    }

    const dataSetItems = dataSets.map(element => {
        let dataElements = getElements(element)
        let dataInfos = getInfos(element)
        return <DataSetItem  key={element.id} dataSet={element} dataSetElements={dataElements} deleteDataSet={deleteDataSet}
            handleEditClick={handleEditClick} dataSetInfo={dataInfos} changeCurrentDataSet={changeCurrentDataSet} handleRunTimeChart={handleRunTimeChart}/>
    })

    const getContent = ()=>{
        if(editing === -1){
            return dataSetItems
        }
        else{
            let dataSet = dataSets.find(element => element.id == editing);
            let dataElements = getElements(dataSet)
            return <DataSetItemEditor  key={dataSet.id} dataSet={dataSet} dataSetElements={dataElements}
                handleEditCancel={handleEditCancel} handleEditAdd={handleEditAdd} handleEditDelete={handleEditDelete} maxLength={maxLength} />
        }
    }


    return (
        <div className="dataSetList">
            {getContent()}
        </div>
    );
  }
  
  export default DataSetList;