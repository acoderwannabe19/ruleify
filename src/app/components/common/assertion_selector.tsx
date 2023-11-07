import ErrorMessage  from "./errorMessage";

export default function AssertionSelector(
  {isDisabled, 
    obj, 
    handleOperatorSelection, 
    handleValueSelection} : 
  {isDisabled : any, 
    handleOperatorSelection : any, 
    handleValueSelection : any, 
    obj: any
  }) {
      
    return <>
      <div className="row">
      <label className="text-center" htmlFor="assertion-select">Choose an assertion:
      </label>
      {obj.assertionErrorMessage.length > 1 ? <ErrorMessage message= {obj.assertionErrorMessage}></ErrorMessage> : "" }
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