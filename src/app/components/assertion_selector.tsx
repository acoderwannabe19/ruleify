
export default function AssertionSelector(
  {isDisabled, isValueDisabled, handleOperatorSelection, handleValueSelection, isAssertionMandatory} : 
  {isDisabled : any, operatorSelection : any, handleOperatorSelection : any, handleValueSelection : any, valueSelection : any, 
    isValueDisabled : any, isAssertionMandatory : any}) {
      
    return <>
   <div className="col">
            <select className="form-select"  onChange={handleOperatorSelection} disabled={isDisabled} name="pets" id="pet-select">
              <option disabled={isAssertionMandatory} > None </option>
              <option> &gt; </option>
              <option> &gt;= </option>
              <option> &lt; </option>
              <option> &lt;= </option>
              <option> = </option>

            </select>
          </div>
          <div className="col">
            <input onChange={handleValueSelection} disabled={isDisabled || isValueDisabled}  type="number" className="form-control" ></input>
          </div>
      

    </>
    
}