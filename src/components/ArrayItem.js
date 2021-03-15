import React from "react";

function ArrayItem({element, id, width, fontSize, leftMargin, contentHeight}) {

    let topPad = element.data*4;
    let yTranslate = contentHeight-(topPad + (parseInt(fontSize) * 1.5)) //*1.5 is for lineheight
    let elementId = `arrayElement${id}`
    return (
    <div className="arrayElement" id={elementId} style={{paddingTop: `${topPad}px`,
        width:`${width}`,fontSize:`${fontSize}`, marginLeft:`${leftMargin}`, transform:`translate(0, ${yTranslate}px)`}}>
            {element.data}
    </div>
    );
  }
  export default ArrayItem;