'use client'
import React, { useState } from "react";
import UploadDataFile from "./components/shared/upload_data_file";
import "bootstrap/dist/css/bootstrap.css";
import RuleCreator from "./components/shared/rule_creator";
import * as constants from './components/constants/static';

export default function Page() {

  const obj = {
    selectedCol : [""],
    selectedRule : "areComplete",
    selectedOperator : "None",
    selectedValue : null,
    selectedAssertion : "",
    isValueDisabled: true,
    isAssertion: false,
    isColumnDisabled: false,
    isAssertionMandatory: false, 
    noLimit: -1
  }

  const [listObj, setListObj] = useState([obj])

  const [list, setList] = useState([]);
  const [ruleCount, setRuleCount] = useState(1); 


  let jsonStructure : {check : {[key: string]: any}} = {check: {}};
  let finalJsonStructure : {"checks" : any[]} = {"checks" : []};

  const handleSelectColumns = (selectedList: [{[key: string]: string}], index: any) => {
    const selectedCols = selectedList.map(obj => obj.key);
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedCol = selectedCols;
    setListObj(updatedListObject)
  };

  const handleSelectValue = (selected : any, index: any) => {
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedValue = selected.target.value;
    setListObj(updatedListObject)
  }
  
  const handleSelectRule = (selected : any, index: any) => {
    const updatedListObject = [...listObj]

    updatedListObject[index].selectedRule = selected.target.value;

    const rule = selected.target.value;
    if (constants.list_column_hint.includes(rule)) {
      updatedListObject[index].isAssertion = true
    } else {
      updatedListObject[index].isAssertion = false
    }

    if (constants.mandatory_assert.includes(rule)) {
      updatedListObject[index].isAssertionMandatory = true
    } else {
      updatedListObject[index].isAssertionMandatory = false
    }


    if (rule == "hasSize") {
      updatedListObject[index].isColumnDisabled = true
    } else {
      updatedListObject[index].isColumnDisabled = false
    }

    if (constants.list_column_hint.includes(rule) || constants.list_column_assert_binning_udf_max_bin_hint.includes(rule) || 
    constants.list_column_assert_hint.includes(rule) || constants.list_column_datatype_assert_hint.includes(rule) || 
    constants.list_column_quantile_assert_hint.includes(rule) || constants.list_column_pattern_assert_name_hint.includes(rule) || 
    constants.list_column_allowed_values_assert_hint.includes(rule)
    ) {
      updatedListObject[index].noLimit = 1;
    } 
    else if (constants.list_column_column_assert_hint.includes(rule)) {
      updatedListObject[index].noLimit = 2;
    }
    else {
      updatedListObject[index].noLimit = -1;
    }
    setListObj(updatedListObject)
  };

  const handleSelectOperator = (selected : any, index: any) => {
    const updatedListObject = [...listObj]

    updatedListObject[index].selectedOperator = selected.target.value;

    if (updatedListObject[index].selectedOperator != "None") {      
      updatedListObject[index].isValueDisabled = false;
    }else { 
      updatedListObject[index].isValueDisabled = true;
    }
    setListObj(updatedListObject)
  }


  const addRule = () => {
    setListObj([...listObj, obj])
    setRuleCount(ruleCount + 1);
  };

  const deleteRule = (index: any) => {
    let updatedListObject = [...listObj]
    updatedListObject = updatedListObject.filter((_, i) => i !== index);
    
    setListObj(updatedListObject);
    setRuleCount(ruleCount - 1);
    
  }
  
  function writeRuleToRulesFile(selectedRules: string[]) {
    selectedRules.map((rule) => {
      jsonStructure = {
        check: {
          "rule": rule 
        }
      };
      finalJsonStructure.checks.push(jsonStructure);
    })
  }

  function writeColumnsAndAssertToRulesFile(listObj: any, finalJsonStructure: any) {
    let rule;
    let lambdaExpression;
    // console.log(listObj);
    
    for (let numCheck = 0; numCheck < finalJsonStructure.checks.length; numCheck++) {
      rule = finalJsonStructure.checks[numCheck].check.rule;

      if ((constants.list_columns.includes(rule)) || (constants.list_columns_assert_hint.includes(rule))) {
        finalJsonStructure.checks[numCheck]["check"]["columns"] = JSON.stringify(listObj[numCheck].selectedCol);
      } 
      else if (constants.list_column_column_assert_hint.includes(rule)){
        finalJsonStructure.checks[numCheck]["check"]["columnA"] = listObj[numCheck].selectedCols[0];
        finalJsonStructure.checks[numCheck]["check"]["columnB"] = listObj[numCheck].selectedCols[0];
      } 
      else{
        if (!constants.list_assert_hint.includes(rule)) {
          finalJsonStructure.checks[numCheck]["check"]["column"] = listObj[numCheck].selectedCol[0];
        } 
      }
      if (listObj[numCheck].selectedOperator != "None") {
        lambdaExpression = `lambda x : x ${listObj[numCheck].selectedOperator} ${listObj[numCheck].selectedValue}`;
        finalJsonStructure.checks[numCheck]["check"]["assertion"] = JSON.stringify(lambdaExpression); 
      }
      if (listObj[numCheck].selectedOperator == "None" && !constants.mandatory_assert.includes(rule)) {
        finalJsonStructure.checks[numCheck]["check"]["assertion"] = "None"; 
      }
    }
  }

  function saveRulesToFile() {
    const selectedRules = listObj.map(obj => obj.selectedRule);
    writeRuleToRulesFile(selectedRules);
    writeColumnsAndAssertToRulesFile(listObj, finalJsonStructure);

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
    // console.log(selectedCols);
    
  }
  return (
    <div className="p-5" style={{fontFamily: 'Montserrat'}} >
      <title>Ruleify</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <UploadDataFile onListChange={setList} />
      {Array.from({ length: ruleCount }).map((_, index) => (
        <RuleCreator handleDeletion={() => deleteRule(index)} obj={listObj[index]} componentKey={index}  
        handleRuleSelection={(selected:any) =>handleSelectRule(selected, index)} 
        handleValueSelection={(selected:any) =>handleSelectValue(selected, index)} 
        handleOperatorSelection={(selected:any) =>handleSelectOperator(selected, index)}  key={index} columns={list} 
        handleColSelection={(selectedList:any) => handleSelectColumns(selectedList, index)
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