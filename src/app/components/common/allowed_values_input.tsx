import ErrorMessage from "./error_message";

export default function AllowedValuesInput(
  {obj,
    handleAllowedValuesInput} : 
  {obj:any,
    handleAllowedValuesInput : any,   
  }) {
      
    return <>
      <div className="row" title="saparate values by semi-columns">
        <label className="text-center" htmlFor="assertion-select">Allowed values:
        </label>
      {obj.allowedValuesErrorMessage.length > 1 && <ErrorMessage message= {obj.allowedValuesErrorMessage}></ErrorMessage>}
        <div className="col">
            <input 
                onChange={handleAllowedValuesInput} 
                type="text"
                className="form-control" >
            </input>
        </div>
    </div>
    </>
    
}