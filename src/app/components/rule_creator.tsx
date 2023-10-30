'use client'

import 'bootstrap/dist/css/bootstrap.css'
import ColumnSelector from "../components/column_selector";
import AssertionSelector from "./assertion_selector";
import RuleSelector from "./rule_selector";


export default function RuleCreator(
  {columns, selectedCols, handleColSelection, selectedOperator, selectedValue, selectedRule, handleRuleSelection,
    handleOperatorSelection, handleValueSelection, isValueDisabled, noLimit, isAssertion, isColumnDisabled, isAssertionMandatory}: 
    {columns: any, selectedCols: any, handleColSelection: any, selectedOperator : any, handleOperatorSelection : any, 
      selectedValue : any, handleValueSelection : any, isValueDisabled: any, selectedRule: any, handleRuleSelection : any, noLimit : any, 
      isAssertion : any, isColumnDisabled : any, isAssertionMandatory : any}) {
  
  return <div className="m-4">
    <div className="row">
      <div className="col-12 col-lg-4">
            <RuleSelector ruleSelection={selectedRule} handleRuleSelection={handleRuleSelection} />
      </div>
      <div className="col-12 col-lg-4">
      <ColumnSelector isColumnDisabled={isColumnDisabled} selectedCols={selectedCols} handleSelectedCols={handleColSelection} noLimit={noLimit} options={columns} /> 
      </div>
      <div className="col-12 col-lg-4 row">
      <label className="text-center" htmlFor="pet-select">Choose an assertion:</label>

        <AssertionSelector isAssertionMandatory={isAssertionMandatory} isValueDisabled={isValueDisabled} operatorSelection={selectedOperator} 
        valueSelection={selectedValue} handleOperatorSelection={handleOperatorSelection} handleValueSelection={handleValueSelection} 
        isDisabled={isAssertion}   />
          
    </div>
    </div>
    </div>
}