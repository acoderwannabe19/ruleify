'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ColumnSelector from "../common/column_selector";
import AssertionSelector from "../common/assertion_selector";
import RuleSelector from "../common/rule_selector";
import AllowedValuesInput from "../common/allowed_values_input"
import DataTypeSelector from "../common/datatype_selector"
import PatternSelector from '../common/pattern_selector';


export default function RuleCreator(
  {columns, 
    handleAllowedValuesInput,
    handleDatatypeSelection,
    handleColSelection, 
    handleRuleSelection, 
    handleDeletion,
    handleRemovedCols,
    handleOperatorSelection, 
    handleValueSelection, 
    handlePatternSelection,
    componentKey, 
    obj}: 
    {columns: any, handleColSelection: any, 
      handleAllowedValuesInput: any,
      handlePatternSelection: any,
      handleDatatypeSelection: any,
      handleOperatorSelection : any, 
      handleValueSelection : any, 
      handleRuleSelection : any, 
      handleDeletion:any,
      componentKey: any, 
      obj:any, 
      handleRemovedCols:any}) {

  return <div id={componentKey} className="m-4">
    <div className="row " >
      <div className="col-12 col-lg-3">
            <RuleSelector 
              ruleSelection={obj.selectedRule} 
              handleRuleSelection={handleRuleSelection} 
            />
      </div>
      <div className="col-12 col-lg-3">
      <ColumnSelector 
        isFormValid={obj.columnErrorMessage}
        handleRemovedCols={handleRemovedCols}
        columnErrorMessage={obj.columnErrorMessage}
        isColumnDisabled={obj.isColumnDisabled} 
        selectedCols={obj.selectedCols} 
        handleSelectedCols={handleColSelection} 
        noLimit={obj.noLimit} 
        options={columns} 
      /> 
      </div>
      <div className={obj.selectedRule === 'isContainedIn' || obj.selectedRule === 'hasPattern' || obj.selectedRule === 'hasDataType'? 'col-12 col-lg-3' : 'col-12 col-lg-5'}>
        <AssertionSelector  
          obj={obj} 
          handleOperatorSelection={handleOperatorSelection} 
          handleValueSelection={handleValueSelection} 
          isDisabled={obj.isAssertion}/> 
      </div>
        {obj.selectedRule=='isContainedIn' && <div className='col-12 col-lg-2'> <AllowedValuesInput
          obj={obj}
          handleAllowedValuesInput={handleAllowedValuesInput} 
          /></div>}
        {obj.selectedRule=='hasDataType' && <div className='col-12 col-lg-2'><DataTypeSelector  
          handleDatatypeSelection={handleDatatypeSelection} 
          /></div>}
           {obj.selectedRule=='hasPattern' && <div className='col-12 col-lg-2'><PatternSelector
           obj={obj}
          handlePatternSelection={handlePatternSelection} 
          /></div>}
      <div className="col-2 col-lg-1 mx-auto mt-4 ">
        <button onClick={handleDeletion}  className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
      </div>
    </div>
  </div>
}