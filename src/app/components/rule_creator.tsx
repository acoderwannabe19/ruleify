'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ColumnSelector from "../components/column_selector";
import AssertionSelector from "./assertion_selector";
import RuleSelector from "./rule_selector";


export default function RuleCreator(
  {columns, selectedCols, handleColSelection, selectedOperator, selectedValue, selectedRule, handleRuleSelection,
    handleOperatorSelection, handleValueSelection, isValueDisabled, noLimit, isAssertion, isColumnDisabled, isAssertionMandatory, componentKey}: 
    {columns: any, selectedCols: any, handleColSelection: any, selectedOperator : any, handleOperatorSelection : any, 
      selectedValue : any, handleValueSelection : any, isValueDisabled: any, selectedRule: any, handleRuleSelection : any, noLimit : any, 
      isAssertion : any, isColumnDisabled : any, isAssertionMandatory : any, componentKey: any}) {
        function handleDeleteComponent(element: any) {
          element = document.getElementById(componentKey);
          element.remove();
        }

  return <div id={componentKey} className="m-4">
    <div className="row">
      <div className="col-12 col-lg-3">
            <RuleSelector ruleSelection={selectedRule} handleRuleSelection={handleRuleSelection} />
      </div>
      <div className="col-12 col-lg-3">
      <ColumnSelector isColumnDisabled={isColumnDisabled} selectedCols={selectedCols} handleSelectedCols={handleColSelection} noLimit={noLimit} options={columns} /> 
      </div>
      <div className="col-12 col-lg-5 row">
        <label className="text-center" htmlFor="pet-select">Choose an assertion:</label>

        <AssertionSelector isAssertionMandatory={isAssertionMandatory} isValueDisabled={isValueDisabled} operatorSelection={selectedOperator} 
        valueSelection={selectedValue} handleOperatorSelection={handleOperatorSelection} handleValueSelection={handleValueSelection} 
        isDisabled={isAssertion}   /> 
      </div>
      <div className="col-2 col-lg-1 row  mx-auto position-relative">
        {/* <label className="text-center" htmlFor="pet-select"></label> */}
        <button onClick={handleDeleteComponent} className="btn btn-outline-danger h-fit bottom-0  position-absolute"><i className="bi bi-trash3"></i></button>
      </div>
    </div>
  </div>
}