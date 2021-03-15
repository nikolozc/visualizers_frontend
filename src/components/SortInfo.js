import React from "react";

function SortInfo({saveInfo, currentAlgo, currentRunTime}) {

    const saveButton = () => {
        if(currentAlgo == ""){
            return <button className="sortButton" onClick={saveInfo} style={{opacity: "0.5", pointerEvents: "none"}}>Save run time data</button> 
        }
        else{
            return <button className="sortButton" onClick={saveInfo}>Save run time data</button> 
        }
    }

    return (
        <> 
            <p className="sortInfoP">Algo used: {currentAlgo}</p>
            <p className="sortInfoP">Run time: {currentRunTime}ms</p>
            {saveButton()}
        </>
    );
  }
  export default SortInfo;