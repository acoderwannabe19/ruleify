'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ColumnSelector from "../common/column_selector";
import AssertionSelector from "../common/assertion_selector";
import RuleSelector from "../common/rule_selector";


export default function RuleCreator(
  {columns, handleColSelection, handleRuleSelection, handleDeletion,
    handleOperatorSelection, handleValueSelection, componentKey, obj}: 
    {columns: any, handleColSelection: any, handleOperatorSelection : any, 
      handleValueSelection : any, handleRuleSelection : any, handleDeletion:any,
      componentKey: any, obj:any}) {


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
      isColumnDisabled={obj.isColumnDisabled} selectedCols={obj.selectedCols} handleSelectedCols={handleColSelection} noLimit={obj.noLimit} options={columns} /> 
      </div>
      <div className="col-12 col-lg-5">
        <label className="text-center" htmlFor="pet-select">Choose an assertion:</label>

        <AssertionSelector  obj={obj} operatorSelection={obj.selectedOperator} 
        valueSelection={obj.selectedValue} handleOperatorSelection={handleOperatorSelection} handleValueSelection={handleValueSelection} 
        isDisabled={obj.isAssertion}/> 
      </div>
      <div className="col-2 col-lg-1 m-auto ">
        <button onClick={handleDeletion}  className="btn btn-outline-danger " style={{}}><i className="bi bi-trash3"></i></button>
      </div>
    </div>
  </div>
}