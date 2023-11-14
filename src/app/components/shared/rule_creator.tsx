'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ColumnSelector from "../common/column_selector";
import AssertionSelector from "../common/assertion_selector";
import RuleSelector from "../common/rule_selector";


export default function RuleCreator(
  {columns, 
    handleColSelection, 
    handleRuleSelection, 
    handleDeletion,
    handleRemovedCols,
    handleOperatorSelection, 
    handleValueSelection, 
    componentKey, 
    obj}: 
    {columns: any, handleColSelection: any, 
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
      <div className="col-12 col-lg-5">
        <AssertionSelector  
          obj={obj} 
          handleOperatorSelection={handleOperatorSelection} 
          handleValueSelection={handleValueSelection} 
          isDisabled={obj.isAssertion}/> 
      </div>
      <div className="col-2 col-lg-1 m-auto ">
        <button onClick={handleDeletion}  className="btn btn-outline-danger " style={{}}><i className="bi bi-trash3"></i></button>
      </div>
    </div>
  </div>
}