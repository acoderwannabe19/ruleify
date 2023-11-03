
export default function AssertionSelector(
  {isDisabled, 
    obj, 
    handleOperatorSelection, 
    handleValueSelection} : 
  {isDisabled : any, 
    operatorSelection : any, 
    handleOperatorSelection : any, 
    handleValueSelection : any, 
    valueSelection : any, 
    obj: any
  }) {
      
    return <>
      <div className="row">
      <label className="text-center" htmlFor="assertion-select">Choose an assertion:</label>
        <div className="col">
                  <select className="form-select"  
                    onChange={handleOperatorSelection} 
                    disabled={isDisabled} 
                    name="pets" 
                    id="pet-select"
                  >
                    <option 
                      disabled={obj.isAssertionMandatory} > None </option>
                    <option> &gt; </option>
                    <option> &gt;= </option>
                    <option> &lt; </option>
                    <option> &lt;= </option>
                    <option> = </option>
                  </select>
                </div>
                <div className="col">
                  <input 
                    onChange={handleValueSelection} 
                    disabled={isDisabled || obj.isValueDisabled}  
                    type="number"
                   className="form-control" ></input>
                </div>
      </div>
    </>
    
}