import React, { useState } from "react";

function AccountSideBar({addDataSetFormSubmit}) {

    const[name, setName] = useState("");

    return (
        <div className="accountSideBar">
            <form className="addDataSetForm" onSubmit={addDataSetFormSubmit}>
                <div className="addDataSetNameInput">
                    <label htmlFor="name">Dataset name</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}></input>

                    {name.length === 0 ?(
                        <p style={{ fontSize: "14px", color: "#0048a7"}}>You must enter a name</p>
                    ) : null}

                </div>
                <button type="submit" className="accountSideBarAddBtn">Add Dataset</button>
            </form>
        </div>
    );
  }
  export default AccountSideBar;