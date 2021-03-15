import React from "react";
import ArrayItem from "./ArrayItem";

function ArrayItemList({elements, contentHeight}) {

    let width = "50px";
    let fontSize = "24px";
    let leftMargin = "10px";

    /*
        sets width, fontSize, and margin values based on elements.length
            which are passed into every ArrayItem
    */
    function manageData(){
        width = "50px"
    }

    manageData()

    const arrayItems = elements.map((element,index) => {
        return <ArrayItem  key={index} element={element} id={index}
            width={width} fontSize={fontSize} leftMargin={leftMargin} contentHeight={contentHeight} />
    })

    return (
        <>
            {arrayItems}
        </>
    );
  }
  
  export default ArrayItemList;