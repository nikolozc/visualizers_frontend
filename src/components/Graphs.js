import React, { useEffect, useState } from "react";
import GraphsOptionsBar from "./GraphsOptionsBar";
import ArrayItemList from "./ArrayItemList";
import DataSetElement from "./DataSetElement";
import SortInfo from "./SortInfo";


function Graphs({dataSet, handleNullDataSet}) {

    if(dataSet == null){
        handleNullDataSet();
    }

    const [currentData, setCurrentData] = useState([]);
    const [contentHeight, setContentHeight] = useState(400);
    const [currentAlgo, setCurrentAlgo] = useState("");
    const [currentRunTime, setCurrentRunTime] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(10);


    //FETCH FUNCTIONS
    useEffect(() =>{
        setContentHeight(document.getElementsByClassName("content")[0].clientHeight);
        fetchElements();
      }, [])


    function fetchElements(){
        fetch("http://localhost:3000/sort_data_elements")
        .then(r => r.json())
        .then(elements => {
            setCurrentData(elements.filter(ele => ele.data_set_id === dataSet.id));
        })
    }

    function saveInfo(event){
        event.preventDefault();
        reset();
        let formData={
            data_set_id: dataSet.id,
            run_time: currentRunTime,
            algo_used: currentAlgo
        }
        fetch("http://localhost:3000/data_infos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    }

    //SORTING FUNCTIONS

    function sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
      }
      

    /* 
        accepts 2 arrayElements and returns html elemetns pushed in an array which are used for css calculations in the sorts
        arr indecies 0 - bar1X , 1 - bar1Y, 2 - bar2X, 3 - bar2Y, 4 - width, 5 - leftMargin
    */
    function barOuterHtml(bar1, bar2){
     //get trasform values from bar1 & bar2
        let arr = []
        //bar1
        let bar1Y=bar1.outerHTML;
        let index1 = bar1Y.indexOf("(");
        let index2 = bar1Y.indexOf(")");
        bar1Y = bar1Y.substring(index1,index2);
        index1 = bar1Y.indexOf(",");
        let bar1X = parseInt(bar1Y.substring(1, index1-2))
        bar1Y = bar1Y.substring(index1+2)

        //bar2
        let bar2Y=bar2.outerHTML;
        index1 = bar2Y.indexOf("(");
        index2 = bar2Y.indexOf(")");
        bar2Y = bar2Y.substring(index1,index2);
        index1 = bar2Y.indexOf(",");
        let bar2X = parseInt(bar2Y.substring(1, index1-2))
        bar2Y = bar2Y.substring(index1+2)

    //get width & leftmargin from bars
        let width = bar1.outerHTML;
        index1 = width.indexOf("width")
        width = width.substring(index1)
        index2 = width.indexOf("margin-left")
        let leftMargin = width.substring(index2)
        index1 = width.indexOf("px")
        width = parseInt(width.substring(7,index1))
        index2 = leftMargin.indexOf("px")
        leftMargin = parseInt(leftMargin.substring(13,index2))

        //populate arr 
        arr.push(bar1X);
        arr.push(bar1Y);
        arr.push(bar2X);
        arr.push(bar2Y);
        arr.push(width);
        arr.push(leftMargin);
        return(arr)
    }
    
    async function bubbleSort(){
    //bubbleSort

        let len = currentData.length;
        let start = window.performance.now();
        let sleepTime = 0;
        let swapped = false;
        for (let i = 0; i < len; i++) {
            swapped = false;
            for (let j = 0; j < len-1; j++) {
                let bar1 = document.getElementById(`arrayElement${j}`)
                let bar2 = document.getElementById(`arrayElement${j+1}`)
                //
                let temp = barOuterHtml(bar1, bar2)
                let bar1X = temp[0]
                let bar1Y = temp[1]
                let bar2X = temp[2]
                let bar2Y = temp[3]
                let width = temp[4]
                let leftMargin = temp[5]

                //change background color of both bars
                bar1.style.backgroundColor="#af03ff";
                bar2.style.backgroundColor="#af03ff";
                bar1.style.boxShadow= "5px 0 5px #28003a";
                bar2.style.boxShadow= "5px 0 5px #28003a";

                let tempStart = window.performance.now();
                await sleep(currentSpeed);
                let tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);

                //check if bar1 value is larger than bar2 value
                if (currentData[j].data > currentData[j+1].data) {
                    swapped = true;
                    let tmp = currentData[j];
                    currentData[j] = currentData[j + 1];
                    currentData[j + 1] = tmp;
                    //change background color of both bars
                    bar1.style.backgroundColor= "#d00000";
                    bar2.style.backgroundColor="#d00000";
                    bar1.style.boxShadow= "5px 0 5px #410000";
                    bar2.style.boxShadow= "5px 0 5px #410000";

                    tempStart = window.performance.now();
                    await sleep(currentSpeed);
                    tempEnd = window.performance.now();
                    sleepTime+=(tempEnd-tempStart);

                    //change positions of bar1 with bar2
                    bar1X = bar1X + width + leftMargin
                    bar1X = bar1X.toString() + "px";
                    bar2X = bar2X - width - leftMargin
                    bar2X = bar2X.toString() + "px";
                    bar1.style.transform=`translate(${bar1X}, ${bar1Y})`
                    bar2.style.transform=`translate(${bar2X}, ${bar2Y})`
                    //change both bars id to match their position on the graph
                    let idNumber = parseInt(bar1.id.substring(12)) //12 is the start of numbers in the string "arrayElement###"
                    bar1.id = bar1.id.substring(0, 12) + (idNumber+1)
                    idNumber = parseInt(bar2.id.substring(12))
                    bar2.id = bar2.id.substring(0, 12) + (idNumber-1)
                }
                //change background color of both bars back to default
                bar1.style.backgroundColor="#6f86d6";
                bar2.style.backgroundColor="#6f86d6";
                bar1.style.boxShadow= "5px 0 5px #2b3455";
                bar2.style.boxShadow= "5px 0 5px #2b3455";

                tempStart = window.performance.now();
                await sleep(currentSpeed);
                tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);
            }
            //if bars changed position break
            if(!swapped){
                break;
            }
        }
        let end = window.performance.now();
        setCurrentRunTime(Math.round(end-start-sleepTime));
        setCurrentAlgo("bubble sort");
    }

    async function CombSort(){
    //combSort
        let len = currentData.length;
        let start = window.performance.now();
        let sleepTime = 0;
        let gap = len;
        let swapped = true;
        //start
        while (gap !== 1 || swapped == true){
            gap = parseInt(((gap*10)/13), 10);
            if (gap < 1){
                gap = 1;
            }
            swapped = false;

            for(let i = 0; i < len-gap;i++){
                let bar1 = document.getElementById(`arrayElement${i}`)
                let bar2 = document.getElementById(`arrayElement${i+gap}`)
                
                let temp = barOuterHtml(bar1, bar2)
                let bar1X = temp[0]
                let bar1Y = temp[1]
                let bar2X = temp[2]
                let bar2Y = temp[3]
                let width = temp[4]
                let leftMargin = temp[5]

                //change background color of both bars
                bar1.style.backgroundColor="#af03ff";
                bar2.style.backgroundColor="#af03ff";
                bar1.style.boxShadow= "5px 0 5px #28003a";
                bar2.style.boxShadow= "5px 0 5px #28003a";

                let tempStart = window.performance.now();
                await sleep(currentSpeed);
                let tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);
                if (currentData[i].data > currentData[i+gap].data){
                    swapped = true;
                    // Swap currentData[i] and currentData[i+gap]
                    let temp = currentData[i];
                    currentData[i] = currentData[i+gap];
                    currentData[i+gap] = temp;

                    //change background color of both bars
                    bar1.style.backgroundColor= "#d00000";
                    bar2.style.backgroundColor="#d00000";
                    bar1.style.boxShadow= "5px 0 5px #410000";
                    bar2.style.boxShadow= "5px 0 5px #410000";

                    tempStart = window.performance.now();
                    await sleep(currentSpeed);
                    tempEnd = window.performance.now();
                    sleepTime+=(tempEnd-tempStart);

                    //change positions of bar1 with bar2
                    bar1X = bar1X + (width + leftMargin)*gap
                    bar1X = bar1X.toString() + "px";
                    bar2X = bar2X + (-width - leftMargin)*gap
                    bar2X = bar2X.toString() + "px";
                    bar1.style.transform=`translate(${bar1X}, ${bar1Y})`
                    bar2.style.transform=`translate(${bar2X}, ${bar2Y})`
                    //change both bars id to match their position on the graph
                    let idNumber = parseInt(bar1.id.substring(12)) //12 is the start of numbers in the string "arrayElement###"
                    bar1.id = bar1.id.substring(0, 12) + (idNumber+gap)
                    idNumber = parseInt(bar2.id.substring(12))
                    bar2.id = bar2.id.substring(0, 12) + (idNumber-gap)
                }
                //change background color of both bars back to default
                bar1.style.backgroundColor="#6f86d6";
                bar2.style.backgroundColor="#6f86d6";
                bar1.style.boxShadow= "5px 0 5px #2b3455";
                bar2.style.boxShadow= "5px 0 5px #2b3455";

                tempStart = window.performance.now();
                await sleep(currentSpeed);
                tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);
            }
        }
        //end
        let end = window.performance.now();
        setCurrentRunTime(Math.round(end-start-sleepTime));
        setCurrentAlgo("comb sort");
    }

    async function InsertionSort(){
    //insertionSort
        let len = currentData.length;
        let start = window.performance.now();
        let sleepTime = 0;
        let holder=[] // all the bars that will have to change position +1
        //start
        for (let i = 1; i < len; i++){
            let key = currentData[i];  
            let j = i - 1;

            let bar1 = document.getElementById(`arrayElement${i}`)
            let bar2 = document.getElementById(`arrayElement${j}`)

            let temp = barOuterHtml(bar1, bar2)
            let bar1X = temp[0]
            let bar1Y = temp[1]
            let bar2X = temp[2]
            let bar2Y = temp[3]
            let width = temp[4]
            let leftMargin = temp[5]

            //change background color of both bars
            bar1.style.backgroundColor="#af03ff";
            bar2.style.backgroundColor="#af03ff";
            bar1.style.boxShadow= "5px 0 5px #28003a";
            bar2.style.boxShadow= "5px 0 5px #28003a";

            let tempStart = window.performance.now();
            await sleep(currentSpeed);
            let tempEnd = window.performance.now();
            sleepTime+=(tempEnd-tempStart);
                
            while (j >= 0 && currentData[j].data > key.data) {  
                currentData[j + 1] = currentData[j];  
                j = j - 1;  
                //change background color of both bars
                bar1.style.backgroundColor= "#d00000";
                bar2.style.backgroundColor="#d00000";
                bar1.style.boxShadow= "5px 0 5px #410000";
                bar2.style.boxShadow= "5px 0 5px #410000";

                tempStart = window.performance.now();
                await sleep(currentSpeed);
                tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);

                holder.push(bar2);
                bar2=document.getElementById(`arrayElement${j}`)
            }  
            currentData[j + 1] = key;

            //change background color of both bars back to default
            bar1.style.backgroundColor="#6f86d6";
            bar1.style.boxShadow= "5px 0 5px #2b3455";
            if(holder.length === 0){
                bar2.style.backgroundColor="#6f86d6";
                bar2.style.boxShadow= "5px 0 5px #2b3455";
            }
            else{
                tempStart = window.performance.now();
                //change positions of bar1 with bar2
                bar1X = bar1X + ((-width - leftMargin)*holder.length)
                bar1X = bar1X.toString() + "px";
                bar1.style.transform=`translate(${bar1X}, ${bar1Y})`
                //change both bars id to match their position on the graph
                let idNumber = parseInt(bar1.id.substring(12)) //12 is the start of numbers in the string "arrayElement###"
                bar1.id = bar1.id.substring(0, 12) + (idNumber-holder.length)
                
                for(let i = 0;i < holder.length;i++){
                    bar2 = holder[i]
                    bar2.style.backgroundColor="#6f86d6";
                    bar2.style.boxShadow= "5px 0 5px #2b3455";
                    temp = barOuterHtml(bar1, bar2)
                    bar2X = temp[2]
                    bar2Y = temp[3]
                    bar2X = bar2X + width + leftMargin
                    bar2X = bar2X.toString() + "px";
                    bar2.style.transform=`translate(${bar2X}, ${bar2Y})`
                    idNumber = parseInt(bar2.id.substring(12))
                    bar2.id = bar2.id.substring(0, 12) + (idNumber+1)
                }
                holder = [];
                tempEnd = window.performance.now();
                sleepTime+=(tempEnd-tempStart);
            }

            tempStart = window.performance.now();
            await sleep(currentSpeed);
            tempEnd = window.performance.now();
            sleepTime+=(tempEnd-tempStart);
        }
        //end
        let end = window.performance.now();
        setCurrentRunTime(Math.round(end-start-sleepTime));
        setCurrentAlgo("insertion sort");
    }


    function reset(){
        setCurrentData([]);
        setCurrentAlgo("");
        setCurrentRunTime(0);
        fetchElements();
    }

    function sliderChange(event){
        setCurrentSpeed(event.target.value)
    }

    return (
        <div className="mainGraph">
            <div className="graphsOptionsBar">
                <GraphsOptionsBar bubbleSort={bubbleSort} CombSort={CombSort}
                 InsertionSort={InsertionSort} reset={reset} dataSet={dataSet} sliderChange={sliderChange}/>
            </div>
            <div className="content">
                <ArrayItemList elements={currentData} contentHeight={contentHeight} />
            </div>
            <div className="sortInfo">
                <SortInfo saveInfo={saveInfo} currentAlgo={currentAlgo} currentRunTime={currentRunTime} />
            </div>
        </div>
    );
  }
  
  export default Graphs;