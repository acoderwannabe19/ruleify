'use client'

import 'bootstrap/dist/css/bootstrap.css'
import ColumnSelector from "../components/column_selector";
import AssertionSelector from "./assertion_selector";

 

export default function RuleCreator(
  {columns, selectedCols, handleColSelection, selectedOperator, selectedValue, selectedRule, handleRuleSelection,
    handleOperatorSelection, handleValueSelection, isValueDisabled, noLimit, isAssertion, isColumnDisabled}: 
    {columns: any, selectedCols: any, handleColSelection: any, selectedOperator : any, handleOperatorSelection : any, 
      selectedValue : any, handleValueSelection : any, isValueDisabled: any, selectedRule: any, handleRuleSelection : any, noLimit : any, 
      isAssertion : any, isColumnDisabled : any}) {

  
  return <div className="m-4">
    <div className="row">
      <div className="col-12 col-lg-4">
        {/* <label>Choose a rule:</label>
        <select className="form-select" value={selectedRule} onChange={handleSelectRule} name="" id="">
          {rules_list && rules_list.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}        </select> */}
            {/* <RuleSelector ruleSelection={selectedRule} handleRuleSelection={handleRuleSelection} /> */}
      </div>
      <div className="col-12 col-lg-4">
      <ColumnSelector isColumnDisabled={isColumnDisabled} selectedCols={selectedCols} handleSelectedCols={handleColSelection} noLimit={noLimit} options={columns} /> 
      </div>
      <div className="col-12 col-lg-4 row">
      <label className="text-center" htmlFor="pet-select">Choose an assertion:</label>
        <AssertionSelector isDisabled={isAssertion}   />
    </div>
    </div>
    </div>
}