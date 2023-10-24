export default function AssertionSelector({isDisabled} : {isDisabled : any}) {
    
    return <>
   <div className="col">
            <select className="form-select" disabled={isDisabled} name="pets" id="pet-select">
              {/* <option value="">--Choose an assertion--</option> */}
              <option> &gt; </option>
              <option> &gt;= </option>
              <option> &lt; </option>
              <option> &lt;= </option>
              <option> = </option>
              <option > None </option>

            </select>
          </div>
          <div className="col">
            <input disabled={isDisabled} type="number" className="form-control" ></input>
          </div>
      

    </>
    
}