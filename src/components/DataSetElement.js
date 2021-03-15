import React from "react";

function DataSetElement({element, id}) {

    return (
        <div className="dataSetElement" id={id}>
            {element.data}
        </div>
    );
  }
  export default DataSetElement;