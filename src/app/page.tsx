'use client'

import { SetStateAction, useState } from "react";
import UploadDataFile from "./components/upload_data_file";
import 'bootstrap/dist/css/bootstrap.css'
import Example from "./components/test";


export default function Page() {
  const [list, setList] = useState<any[]>([]);

  const [selectedRule, setSelectedRule] = useState('');

  const [noLimit, setNoLimit] = useState(-1); // Initialize noLimit with -1

  // Event handler to update the selected item when the user makes a selection
  const handleSelectChange = (event: { target: { value: any; }; }) => {
    const rule = event.target.value;
    setSelectedRule(rule);
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

  
  const rules_list = ["areComplete", "areAnyComplete", "hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber", 
  "containsEmail", "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin",
  "hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative", "haveCompleteness", "haveAnyCompleteness", 
  "hasUniqueness", "hasUniqueValueRatio", "isUnique", "isComplete", "hasSize", "hasApproxQuantile", "hasCorrelation", 
  "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo", "isContainedIn", 
  "hasPattern", "hasDataType", "hasHistogramValues", "hasNumberOfDistinctValues"]

  const list_columns = ["areComplete", "areAnyComplete"]

  const list_column_assert_hint = ["hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber", "containsEmail",
  "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin", "hasMinLength", 
  "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative"]

  const list_columns_assert_hint = ["haveCompleteness", "haveAnyCompleteness", "hasUniqueness", "hasUniqueValueRatio"]

  const list_column_hint = ["isUnique", "isComplete"]

  const list_assert_hint = ["hasSize"]

  const list_column_quantile_assert_hint = ["hasApproxQuantile"]

  const list_column_column_assert_hint = ["hasCorrelation", "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", 
  "isLessThan", "isLessThanOrEqualTo"]

  const list_column_allowed_values_assert_hint = ["isContainedIn"]

  const list_column_pattern_assert_name_hint = ["hasPattern"]

  const list_column_datatype_assert_hint = ["hasDataType"]

  const list_column_assert_binning_udf_max_bin_hint = ["hasHistogramValues", "hasNumberOfDistinctValues"]


  
  return <div className="m-4">
    <UploadDataFile onListChange={setList} />
    <div className="row">
      <div className="col-12 col-lg-4">
        <label>Choose a rule:</label>
        <select className="form-select" value={selectedRule} onChange={handleSelectChange} name="" id="">
          <option value="">Please choose a rule:</option>
          {rules_list && rules_list.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}        </select>
      </div>
      <div className="col-12 col-lg-4">
          <Example noLimit={noLimit} options={list} />
      </div>
      <div className="col-12 col-lg-4">
        <label htmlFor="pet-select">Choose an assertion:</label>
          <select className="form-select" name="pets" id="pet-select">
            <option value="">--Please choose an assertion--</option>
            <option>  </option>
          </select>
      </div>
    </div>
    <div className="flex justify-center p-5">
      <button className="btn btn-outline-success m-3" > + Add a rule</button>
      <button className="btn btn-outline-success m-3" > Save rules file</button>

      </div>
    </div>
}