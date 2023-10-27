'use client'
import React, { useState } from "react";
import UploadDataFile from "./components/upload_data_file";
import "bootstrap/dist/css/bootstrap.css";
import RuleCreator from "./components/rule_creator";

export default function Page() {
  const [list, setList] = useState([]);
  const [ruleCount, setRuleCount] = useState(1); // Initial count of RuleCreators
   // Utilisez l'état pour stocker les options sélectionnées
  
  const [selectedCols, setSelectedCols] = useState<any>([[]]);
  let jsonStructure: { check: { [key: string]: any } } = { check: {} };
  let finalJsonStructure : {"checks" : any[]} = {"checks" : []};
  const [selectedCols, setSelectedCols] = useState<any>([[]]);
  const [selectedOperator, setSelectedOperator] = useState<any>(["None"])
  const [selectedValue, setSelectedValue] = useState<any>([null])
  const [selectedAssertion, setSelectedAssertion] = useState<any>([""])
  const [isValueDisabled, setIsValueDisabled] = useState<any>([true])
  const [selectedRule, setSelectedRule] = useState<any>([])
  const [noLimit, setNoLimit] = useState(-1); // Initialize noLimit with -1
  const [isAssertion, setIsAssertion] = useState([false])
  const [isColumnDisabled, setIsColumnDisabled] = useState<any>([false])


  let jsonStructure = {"check" : {}};
  let finalJsonStructure : {"checks" : any[]} = {"checks" : []};
  
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
  // Une fonction pour gérer la mise à jour des options sélectionnées
  const handleSelectColumns = (selectedList: any, index: any) => {
    const updatedSelectedCols = [...selectedCols];
    updatedSelectedCols[index] = selectedList;
    setSelectedCols(updatedSelectedCols);
  };

  const handleSelectValue = (selected : any, index: any) => {
    const updatedSelectedValue = [...selectedValue];
    updatedSelectedValue[index] = selected.target.value;
    setSelectedValue(updatedSelectedValue);
       
  }
  
  const handleSelectRule = (selected : any, index: any) => {
    const updatedSelectedRule = [...selectedRule];
    updatedSelectedRule[index] = selected.target.value;
    setSelectedRule(updatedSelectedRule);

    const rule = selected.target.value;
    if (list_column_hint.includes(rule)) {
      const updatedIsAssertion = [...isAssertion];
      updatedIsAssertion[index] = false
      setIsAssertion(updatedSelectedRule);
    }
    if (rule == "hasSize") {
      const updatedIsColumnDisabled = [...isColumnDisabled];
      updatedIsColumnDisabled[index] = true
      setIsColumnDisabled(updatedSelectedRule);
    }
    if (list_column_hint.includes(rule) || list_column_assert_binning_udf_max_bin_hint.includes(rule) || 
    list_column_assert_hint.includes(rule) || list_column_datatype_assert_hint.includes(rule) || 
    list_column_quantile_assert_hint.includes(rule) || list_column_pattern_assert_name_hint.includes(rule) || 
    list_column_allowed_values_assert_hint.includes(rule)
    ) {
      setNoLimit(1);
    } 
    else if (list_column_column_assert_hint.includes(rule)) {
      setNoLimit(2);
    }
    else {
      setNoLimit(-1);
    }
  };

  const handleSelectOperator = (selected : any, index: any) => {
    const updatedSelectedOperator = [...selectedOperator];
    updatedSelectedOperator[index] = selected.target.value;
    setSelectedOperator(updatedSelectedOperator);    

    if (updatedSelectedOperator[index] != "None") {      
      const updatedIsValueDisabled = [...isValueDisabled];    
      updatedIsValueDisabled[index] = false;
      setIsValueDisabled(updatedIsValueDisabled);
    }else { 
      const updatedIsValueDisabled = [...isValueDisabled];    
      updatedIsValueDisabled[index] = true;
      setIsValueDisabled(updatedIsValueDisabled);
    }
  }


  const addRule = () => {
    setRuleCount(ruleCount + 1);
    setSelectedCols([...selectedCols, []])    
  };

  const list_columns = ["areComplete", "areAnyComplete"];
  const list_column_hint = ["isUnique", "isComplete"];
  const list_column_column_assert_hint = ["hasCorrelation", "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", 
  "isLessThan", "isLessThanOrEqualTo"];
  const list_assert_hint = ["hasSize"]
  const list_columns_assert_hint = ["haveCompleteness", "haveAnyCompleteness", "hasUniqueness", "hasUniqueValueRatio"];

  function writeRuleToRulesFile(selectedRules: [""]) {
    selectedRules.map((rule) => {
      jsonStructure = {
        check: {
          "rule": rule 
        }
      };
      finalJsonStructure.checks.push(jsonStructure);
    })
  }

  function writeColumnsAndAssertToRulesFile(selectedCols: [[{[key: string]: string}]], finalJsonStructure: {"checks" : [{"check": {[key: string]: any}}]}, selectedOperator: [], values: []) {
    let rule;
    let listValues;
    let lambdaExpression;
    for (let numCheck = 0; numCheck < finalJsonStructure.checks.length; numCheck++) {
      rule = finalJsonStructure.checks[numCheck].check.rule;
      if ((list_columns.includes(rule)) || (list_columns_assert_hint.includes(rule))) {
        listValues = selectedCols[numCheck].map(object => object.key);
        finalJsonStructure.checks[numCheck]["check"]["columns"] = JSON.stringify(listValues);
      } else if (list_column_column_assert_hint.includes(rule)){
        listValues = selectedCols[numCheck].map(object => object.key);
        finalJsonStructure.checks[numCheck]["check"]["columnA"] = listValues[0];
        finalJsonStructure.checks[numCheck]["check"]["columnB"] = listValues[1];
      } else{
           // if the rule function does not have column parameter
        if (!list_assert_hint.includes(rule)) {
          finalJsonStructure.checks[numCheck]["check"]["column"] = selectedCols[numCheck][0].key;
        } 
      }
      if (selectedOperator[numCheck] != "None") {
        lambdaExpression = `lambda x : x ${selectedOperator[numCheck]} ${values[numCheck]}`;
        finalJsonStructure.checks[numCheck]["check"]["assertion"] = JSON.stringify(lambdaExpression); 
      }
    }
  }

  function saveRulesToFile() {
    // writeRuleToRulesFile(selectedRules);
    // writeColumnsAndAssertToRulesFile(selectedCols, finalJsonStructure, selectedOperqtors, values);

    setSelectedCols([...selectedCols, []]) 

    setSelectedOperator([...selectedOperator, "None"]) 
        
    setSelectedValue([...selectedValue, 0]) 

    setSelectedAssertion([...selectedAssertion, ""])

    setIsValueDisabled([...isValueDisabled, true])
    
    setSelectedRule([...selectedRule, ""])

    setIsAssertion([...isAssertion, false])

    setIsColumnDisabled([...isColumnDisabled, false])
    
  
  };

  function saveRulesToFile() {
    let cols = [];
    if(ruleCount == 1){
      if (selectedCols[0].length == 1) {
      jsonStructure = {
          check: {
            "column": selectedCols[0][0]["key"]
          }
        };
        finalJsonStructure.checks.push(jsonStructure);
      }else {
        for (let index = 0; index < selectedCols[0].length; index++) {
          cols.push(selectedCols[0][index]["key"])
        }
        jsonStructure = {
            check: {
              "columns": JSON.stringify(cols)
            }
          };
        finalJsonStructure.checks.push(jsonStructure);
      }
  }else {
    for (let list = 0; list < selectedCols.length; list++) {
    
      if (selectedCols[list].length == 1) {
        jsonStructure = {
            check: {
              "column": selectedCols[list][0]["key"]
            }
          };
          finalJsonStructure.checks.push(jsonStructure);

      }else {
        for (let index = 0; index < selectedCols.length; index++) {
          cols.push(selectedCols[list][index]["key"])
        }
        jsonStructure = {
            check: {
              "columns": JSON.stringify(cols)
            }
          };
          finalJsonStructure.checks.push(jsonStructure);
      }
    }
  }

    const jsonData = JSON.stringify(finalJsonStructure);
  
    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.json';
  
    // Simulate a click to trigger the download
    a.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  }
  
  

  return (
    <div className="p-5" style={{fontFamily: 'Montserrat'}} >
      <title>Ruleify</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <UploadDataFile onListChange={setList} />
      {Array.from({ length: ruleCount }).map((_, index) => (
        <RuleCreator  key={index} columns={list} selectedCols={selectedCols[index]} handleColSelection={(selectedList:any) =>
        <RuleCreator isColumnDisabled={isColumnDisabled[index]} isAssertion={isAssertion[index]} noLimit={noLimit} selectedRule={selectedRule[index]} 
        handleRuleSelection={(selected:any) =>handleSelectRule(selected, index)} isValueDisabled={isValueDisabled[index]} 
        selectedOperator={selectedOperator[index]} selectedValue={selectedValue[index]}  
        handleValueSelection={(selected:any) =>handleSelectValue(selected, index)} 
        handleOperatorSelection={(selected:any) =>handleSelectOperator(selected, index)}  key={index} columns={list} 
        selectedCols={selectedCols[index]} handleColSelection={(selectedList:any) =>
          handleSelectColumns(selectedList, index)
        } />
      ))}
      <div className="flex justify-center">
        <button className="btn btn-outline-success m-3" onClick={addRule}>
          + Add a rule
        </button>
        <button onClick={saveRulesToFile} className="btn btn-outline-success m-3">Save rules file</button>
      </div>
    </div>
    
  );
}