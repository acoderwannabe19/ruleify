
export default function DataTypeSelector(
  { 
    handleDatatypeSelection, 
    } : 
  { 
    handleDatatypeSelection : any
  }) {
      
    return <>
      <div className="row">
      <label className="text-center" htmlFor="assertion-select">Datatype:
      </label>
        <div className="col">
                  <select className="form-select"  
                    onChange={handleDatatypeSelection} 
                    name="pets" 
                    id="pet-select"
                  >
                    <option>Numeric</option>
                    <option>Fractional</option>
                    <option>Integral</option>
                    <option>String</option>
                    <option>Boolean</option>
                    <option>Null</option>
                  </select>
                </div>
      </div>
    </>
    
}