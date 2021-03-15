import React from "react";

function GraphsOptionsBar({bubbleSort, CombSort, InsertionSort, reset, dataSet, sliderChange}) {
    

    return (
        <>
            <h3 style={{marginRight:"200px"}}>data set being sorted: {dataSet.name}</h3>
            <div className="graphSpeedSlider">
                <p style={{fontWeight:"bold"}}>Animation speed</p>
                <input type="range" min="5" max="1000" id="graphSlider" onChange={sliderChange} style={{width:"130px"}}></input>
                <div style={{display:"flex"}}>
                    <p style={{marginRight:"30px"}}>5ms</p>
                    <p style={{marginLeft:"30px"}}>1000ms</p>
                </div>
            </div>

            <button className="sortButton" onClick={bubbleSort}>Bubble Sort</button> 
            <button className="sortButton" onClick={CombSort}>Comb Sort</button> 
            <button className="sortButton" onClick={InsertionSort}>Insertion Sort</button> 
            <button className="sortButton" onClick={reset}>Reset Graph</button> 
        </>
    );
  }

  export default GraphsOptionsBar;