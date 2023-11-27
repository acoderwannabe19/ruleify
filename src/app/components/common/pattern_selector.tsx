import ErrorMessage from "./error_message";

export default function PatternSelector(
  {obj,
    handlePatternSelection} : 
  {obj:any,
    handlePatternSelection : any,   
  }) {
      
    return <>
      <div className="row" title="saparate values by semi-columns">
        <label className="text-center" htmlFor="assertion-select">Pattern:
        </label>
      {obj.patternErrorMessage.length > 1 && <ErrorMessage message= {obj.patternErrorMessage}></ErrorMessage>}
        <div className="col">
            <input title="Pattern"
                onChange={handlePatternSelection} 
                type="text"
                className="form-control" >
            </input>
        </div>
    </div>
    </>
    
}