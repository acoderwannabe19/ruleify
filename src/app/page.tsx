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
    noLimit: -1,
    isColumnValid: false,
    isAssertionValid: true,
    isRuleValid: false
  }
  const [listObj, setListObj] = useState([obj]);
  const [list, setList] = useState([]);
  const [ruleCount, setRuleCount] = useState(1); 

  let jsonStructure : {check : {[key: string]: any}} = {check: {}};
  let finalJsonStructure : {"checks" : any[]} = {"checks" : []};

  // const isColumnSelectionvalidate = (obj: any) => {
  //   if(!obj.isColumnDisabled) {
  //     if((constants.list_column_column_assert_hint.includes(obj.selectedRule) 
  //     && (obj.selectedCol.length != 2)) || (!constants.list_column_column_assert_hint.includes(obj.selectedRule) 
  //     && (obj.selectedCol[0]).length == 0)) {
  //       console.log("col false");
  //       return false;
  //     }else{
  //       console.log("col col true");  
  //       return true;
  //     }
  //   } else{
  //     console.log("col true");
  //     return true;
  //   }
  // } 

  // const isAssertionvalidate = (obj: any) => {
  //   if(obj.selectedOperator !== "None" && obj.selectedValue == null) {
  //     console.log(obj.selectedOperator);
  //     console.log("assertion false");
  //     return false;
  //   } else {
  //     console.log("assertion true");
  //     return true
  //   };
  // } 

  // const isFormvalidate = () => {
  //   let isFormValid = true;
  //   listObj.forEach(obj => {
  //     if (!isColumnSelectionvalidate(obj) || !isAssertionvalidate(obj)) {
  //       console.log("form false");
  //       isFormValid = false;
  //     }
  //   });

  //   return isFormValid;
  // } 

  const handleSelectColumns = (selectedList: [{[key: string]: string}], index: any) => {
    const selectedCols = selectedList.map(obj => obj.key);
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedCol = selectedCols;

    if (updatedListObject[index].selectedCol.length == 0 && !constants.list_column_column_assert_hint.includes(updatedListObject[index].selectedRule) || 
      (constants.list_column_column_assert_hint.includes(updatedListObject[index].selectedRule) && updatedListObject[index].selectedCol.length != 2) ||
      (!constants.list_column_column_assert_hint.includes(updatedListObject[index].selectedRule) && updatedListObject[index].selectedCol[0].length == 0) 
      ) {
      updatedListObject[index].isColumnValid = false;
    } else {
      updatedListObject[index].isColumnValid = true;
    }
    setListObj(updatedListObject)
  };

  const handleSelectValue = (selected : any, index: any) => {
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedValue = selected.target.value;

    if ((updatedListObject[index].selectedValue === null && updatedListObject[index].selectedOperator != "None") ||
    (updatedListObject[index].selectedValue === "" && updatedListObject[index].selectedOperator != "None")
    ) {
      updatedListObject[index].isAssertionValid = false;
      
    } else {
      updatedListObject[index].isAssertionValid = true;
    }
    setListObj(updatedListObject)

  };
  
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
      updatedListObject[index].isValueDisabled = false
    } else {
      updatedListObject[index].isValueDisabled = true
    }

    if ((updatedListObject[index].selectedValue == null && updatedListObject[index].selectedOperator != "None")
    ) {
      updatedListObject[index].isAssertionValid = false;
      // console.log("ass false");
      
    } else {
      updatedListObject[index].isAssertionValid = true;
      // console.log("ass true");
    }

    setListObj(updatedListObject)    
  };

  const handleRemovedCol = (selected : any, index:any) => {
    const updatedListObject = [...listObj]
    var keyValues = [];

    for (var i = 0; i < selected.length; i++) {
      keyValues.push(selected[i].key);
    }
    updatedListObject[index].selectedCol = keyValues
    setListObj(updatedListObject)
    
  };

  const addRule = () => {
    setListObj([...listObj, obj])
    setRuleCount(ruleCount + 1);
    console.log(listObj[0]);
    
  };

  const deleteRule = (index: any) => {
    let updatedListObject = [...listObj]
    updatedListObject = updatedListObject.filter((_, i) => i !== index);
    
    setListObj(updatedListObject);
    setRuleCount(ruleCount - 1);
    
  };
  
  function writeRuleToRulesFile(selectedRules: string[]) {
    selectedRules.map((rule) => {
      jsonStructure = {
        check: {
          "rule": rule 
        }
      };
      finalJsonStructure.checks.push(jsonStructure);
    })
  };

  function writeColumnsAndAssertToRulesFile(listObj: any, finalJsonStructure: any) {
    let rule;
    let lambdaExpression;
    
    for (let numCheck = 0; numCheck < finalJsonStructure.checks.length; numCheck++) {
      rule = finalJsonStructure.checks[numCheck].check.rule;

      if ((constants.list_columns.includes(rule)) || (constants.list_columns_assert_hint.includes(rule))) {
        finalJsonStructure.checks[numCheck]["check"]["columns"] = JSON.stringify(listObj[numCheck].selectedCol);
      } 
      else if (constants.list_column_column_assert_hint.includes(rule)){
        console.log(listObj[numCheck].selectedCol);
        finalJsonStructure.checks[numCheck]["check"]["columnA"] = listObj[numCheck].selectedCol[0];
        finalJsonStructure.checks[numCheck]["check"]["columnB"] = listObj[numCheck].selectedCol[1];
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
  };

  const isFormValid = () => {
    for (const obj of listObj) {
      if (obj.isAssertionValid == true && obj.isColumnValid == true) {
        obj.isRuleValid = true;
      } else {
        obj.isRuleValid = false;
      }
      if (obj.isRuleValid === false) {
        console.log("nope");
        return false;
      }
    }
    return true;
  }
  

  function saveRulesToFile() {
    // console.log(isFormValid());    
    console.log(listObj[0]);

    if(isFormValid()){
          const selectedRules = listObj.map(obj => obj.selectedRule);
          
          
            writeRuleToRulesFile(selectedRules);
            writeColumnsAndAssertToRulesFile(listObj, finalJsonStructure);

            const jsonData = JSON.stringify(finalJsonStructure, null, "\t");
          
            const blob = new Blob([jsonData], { type: 'application/json' });
          
            const url = URL.createObjectURL(blob);
          
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rules.json';
          
            a.click();
          
            URL.revokeObjectURL(url); 
    } else {
      alert("Please make sure all rules are valid before downloading the file.");
    }
      

  }  

  return (
    <div className="p-5" style={{fontFamily: 'Montserrat'}} >
      <title>Ruleify</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <UploadDataFile onListChange={setList} />
      {Array.from({ length: ruleCount }).map((_, index) => (
        <RuleCreator 
        handleRemovedCols={(selected:any) =>handleRemovedCol(selected, index)} 
        handleDeletion={() => deleteRule(index)} 
        handleRuleSelection={(selected:any) =>handleSelectRule(selected, index)} 
        handleValueSelection={(selected:any) =>handleSelectValue(selected, index)} 
        handleOperatorSelection={(selected:any) =>handleSelectOperator(selected, index)}  
        handleColSelection={(selectedList:any) => handleSelectColumns(selectedList, index)}
        key={index} 
        columns={list} 
        componentKey={index}      
        obj={listObj[index]}  
        />
      ))}
      <div className="flex justify-center">
        <button className="btn btn-outline-success m-3" onClick={addRule}>
          + Add a rule
        </button>
        <button  onClick={saveRulesToFile} className="btn btn-outline-success m-3">Save rules file</button>
      </div>
    </div>
    
  );
      } 
