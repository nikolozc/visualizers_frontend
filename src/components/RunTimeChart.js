import React, { useEffect, useState } from "react";
import Chart from 'chart.js';

function RunTimeChart({dataSet}) {

    const [dataSetInfos, setDataSetInfos] = useState([])
    const [bubbleSort, setBubbleSort] = useState([])
    const [combSort, setCombSort] = useState([])
    const [insertionSort, setInsertionSort] = useState([])
    var ctx = document.getElementById('myChart');

    //FETCH FUNCTIONS
    useEffect(() =>{
        fetchInfos()
      }, [])


    function fetchInfos(){
        fetch("http://localhost:3000/data_infos")
        .then(r => r.json())
        .then(elements => {
            let temp = (elements.filter(ele => ele.data_set_id === dataSet.id))
            setDataSetInfos(temp);
            let data = (temp.filter(ele => ele.algo_used === "bubble sort"))
            setBubbleSort(data.map(ele=>ele.run_time))
            data = (temp.filter(ele => ele.algo_used === "comb sort"))
            setCombSort(data.map(ele=>ele.run_time))
            data = (temp.filter(ele => ele.algo_used === "insertion sort"))
            setInsertionSort(data.map(ele=>ele.run_time))
        })
    }

    if(ctx != null){
        ctx.height=1000;
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets:[
                    {
                        label:"bubble sort",
                        backgroundColor:"rgba(0,0,0,0)",
                        borderColor: "rgba(80, 81, 96, 1)",
                        data:bubbleSort
                    },
                    {
                        label:"comb sort",
                        backgroundColor:"rgba(0,0,0,0)",
                        borderColor: "rgba(174, 189, 56, 1)",
                        data:combSort
                    },
                    {
                        label:"insertion sort",
                        backgroundColor:"rgba(0,0,0,0)",
                        borderColor: "rgba(89, 130, 52, 1)",
                        data:insertionSort
                    }
                ]
            }
        });
    }
    
    return (
        <> 
           <canvas id="myChart" width="500" height="500"></canvas>
        </>
    );
  }
  export default RunTimeChart;