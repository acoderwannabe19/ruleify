'use client'

import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import ColumnSelector from "../components/column_selector";
import AssertionSelector from "./assertion_selector";

export default function RuleCreator({columns, selectedCols, handleColSelection}: {columns: any, selectedCols: any, handleColSelection: any }) {
  // const [list, setList] = useState<any[]>([]);

  const [selectedRule, setSelectedRule] = useState('');

  const [noLimit, setNoLimit] = useState(-1); // Initialize noLimit with -1

  const [isAssertion, setIsAssertion] = useState(false)
  // Event handler to update the selected item when the user makes a selection
  const handleSelectRule = (event: { target: { value: any; }; }) => {
    const rule = event.target.value;
    setSelectedRule(rule);
    if (list_column_hint.includes(rule)) {
      setIsAssertion(true)     
    }
    // Check if the selected rule is in list_column_hint
    if (list_column_hint.includes(rule) || 
    list_column_assert_binning_udf_max_bin_hint.includes(rule) || 
    list_column_assert_hint.includes(rule) || 
    list_column_datatype_assert_hint.includes(rule) || 
    list_column_quantile_assert_hint.includes(rule) || 
    list_column_pattern_assert_name_hint.includes(rule) || 
    list_column_allowed_values_assert_hint.includes(rule)
    ) {
      setNoLimit(1);
    } else if (list_column_column_assert_hint.includes(rule)) {
      setNoLimit(2);
    }
    else {
      setNoLimit(-1);
    }
  };
import RuleSelector from "./rule_selector";


export default function RuleCreator(
  {columns, selectedCols, handleColSelection, selectedOperator, selectedValue, selectedRule, handleRuleSelection,
    handleOperatorSelection, handleValueSelection, isValueDisabled, noLimit, isAssertion, isColumnDisabled}: 
    {columns: any, selectedCols: any, handleColSelection: any, selectedOperator : any, handleOperatorSelection : any, 
      selectedValue : any, handleValueSelection : any, isValueDisabled: any, selectedRule: any, handleRuleSelection : any, noLimit : any, 
      isAssertion : any, isColumnDisabled : any}) {

  // const [selectedRule, setSelectedRule] = useState('');

  // const [noLimit, setNoLimit] = useState(-1); // Initialize noLimit with -1

  // const [isAssertion, setIsAssertion] = useState(false)

  // // Event handler to update the selected item when the user makes a selection
  // const handleSelectRule = (event: { target: { value: any; }; }) => {
  //   const rule = event.target.value;
  //   setSelectedRule(rule);
  //   if (list_column_hint.includes(rule)) {
  //     setIsAssertion(true)     
  //   }
  //   // Check if the selected rule is in list_column_hint
  //   if (list_column_hint.includes(rule) || 
  //   list_column_assert_binning_udf_max_bin_hint.includes(rule) || 
  //   list_column_assert_hint.includes(rule) || 
  //   list_column_datatype_assert_hint.includes(rule) || 
  //   list_column_quantile_assert_hint.includes(rule) || 
  //   list_column_pattern_assert_name_hint.includes(rule) || 
  //   list_column_allowed_values_assert_hint.includes(rule)
  //   ) {
  //     setNoLimit(1);
  //   } 
  //   else if (list_column_column_assert_hint.includes(rule)) {
  //     setNoLimit(2);
  //   }
  //   else {
  //     setNoLimit(-1);
  //   }
  // };

  
  const rules_list = ["areComplete", "areAnyComplete", "hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber", 
  "containsEmail", "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin",
  "hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative", "haveCompleteness", "haveAnyCompleteness", 
  "hasUniqueness", "hasUniqueValueRatio", "isUnique", "isComplete", "hasSize", "hasApproxQuantile", "hasCorrelation", 
  "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo", "isContainedIn", 
  "hasPattern", "hasDataType", "hasHistogramValues", "hasNumberOfDistinctValues"]

  // const list_columns = ["areComplete", "areAnyComplete"]

  const list_column_assert_hint = ["hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber", "containsEmail",
  "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin", "hasMinLength", 
  "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative"]

  // const list_columns_assert_hint = ["haveCompleteness", "haveAnyCompleteness", "hasUniqueness", "hasUniqueValueRatio"]

  const list_column_hint = ["isUnique", "isComplete"]

  // const list_assert_hint = ["hasSize"]

  const list_column_quantile_assert_hint = ["hasApproxQuantile"]

  const list_column_column_assert_hint = ["hasCorrelation", "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", 
  "isLessThan", "isLessThanOrEqualTo"]

  const list_column_allowed_values_assert_hint = ["isContainedIn"]

  const list_column_pattern_assert_name_hint = ["hasPattern"]

  const list_column_datatype_assert_hint = ["hasDataType"]

  const list_column_assert_binning_udf_max_bin_hint = ["hasHistogramValues", "hasNumberOfDistinctValues"]

  
  return <div className="m-4">
    <div className="row">
      <div className="col-12 col-lg-4">
        <label>Choose a rule:</label>
        {/* <label>Choose a rule:</label>
        <select className="form-select" value={selectedRule} onChange={handleSelectRule} name="" id="">
          {rules_list && rules_list.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}        </select> */}
            <RuleSelector ruleSelection={selectedRule} handleRuleSelection={handleRuleSelection} />
      </div>
      <div className="col-12 col-lg-4">
      <ColumnSelector selectedCols={selectedCols} handleSelectedCols={handleColSelection}  noLimit={noLimit} options={columns} /> 
      <ColumnSelector isColumnDisabled={isColumnDisabled} selectedCols={selectedCols} handleSelectedCols={handleColSelection} noLimit={noLimit} options={columns} /> 
      </div>
      <div className="col-12 col-lg-4 row">
      <label className="text-center" htmlFor="pet-select">Choose an assertion:</label>
        <AssertionSelector isDisabled={isAssertion}   />
        <AssertionSelector isValueDisabled={isValueDisabled} operatorSelection={selectedOperator} 
        valueSelection={selectedValue} handleOperatorSelection={handleOperatorSelection} handleValueSelection={handleValueSelection} 
        isDisabled={isAssertion}   />
    </div>
    </div>
    </div>
}