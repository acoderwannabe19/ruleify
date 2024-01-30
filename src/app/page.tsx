'use client'
import React, { useState } from "react";
import UploadDataFile from "./components/shared/upload_data_file";
import UploadRemoteDataFile from "./components/shared/upload_remote_data_file";
import "bootstrap/dist/css/bootstrap.css";
import RuleCreator from "./components/shared/rule_creator";
import * as constants from './components/constants/static';
import { Client } from 'ssh2';

export default function Page() {

  const obj = {
    selectedCol : [""],
    selectedRule : "areAnyComplete",
    selectedOperator : "None",
    selectedValue : null,
    selectedAssertion : "",
    columnErrorMessage: "",
    assertionErrorMessage: "",
    allowedValuesErrorMessage: "",
    // patternErrorMessage: "",
    allowedValues: Array.from(""),
    pattern: "",
    datatype: "Numeric",
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

  const isColumnSelectionValid = (obj: any) => {
    if(!obj.isColumnDisabled) {
      if((constants.list_column_column_assert_hint.includes(obj.selectedRule) && (obj.selectedCol.length != 2)) || 
      (!constants.list_column_column_assert_hint.includes(obj.selectedRule) && (obj.selectedCol.length) == 0)||
      (!constants.list_column_column_assert_hint.includes(obj.selectedRule) && (obj.selectedCol[0].length) == 0)) {
        return false;
      }else{
        return true;
      }
    } else{
      return true;
    }
  } 

  const isAssertionValid = (obj: any) => {
    if((obj.selectedOperator !== "None" && obj.selectedValue == null) || (obj.selectedOperator !== "None" && obj.selectedValue == '')) {
      return false;
    } else {
      return true
    };
  } 
  const isAllowedValuesValid = (obj: any) => {
    if(constants.list_column_allowed_values_assert_hint.includes(obj.selectedRule) && 
    (obj.allowedValues.length === 0 || obj.allowedValues[0]===0)) {
      return false;
    } else {
      return true;
    };
  }  

  const isPatternValid = (obj: any) => {
    if(obj.pattern == '') {
      return false;
    } else {
      return true;
    };
  }

  const isFormValid = () => {
    let isFormValid = true;
    let updatedListObject= [...listObj];
    for (let i = 0; i < updatedListObject.length; i++) {
      if (!isColumnSelectionValid(updatedListObject[i])) {
        constants.list_column_column_assert_hint.includes(updatedListObject[i].selectedRule) ? 
        updatedListObject[i].columnErrorMessage = "*Please choose two columns!": 
        updatedListObject[i].columnErrorMessage = "*Please choose column (s)!";
        isFormValid = false;
      } else if (!isAssertionValid(updatedListObject[i])) {
        updatedListObject[i].assertionErrorMessage = "*Please choose an operator and a value!";
        isFormValid = false;
      } else if (!isAllowedValuesValid(updatedListObject[i])) {
        updatedListObject[i].allowedValuesErrorMessage = "*Please enter and separate values by semi-colon!";
        isFormValid = false;
      } 
      // else if (!isPatternValid(updatedListObject[i])) {
      //   updatedListObject[i].patternErrorMessage = "*Please enter a valid pattern!";
      //   isFormValid = false;
      // }
      setListObj(updatedListObject)
    }
    return isFormValid;
  } 

  const handleSelectColumns = (selectedList: [{[key: string]: string}], index: any) => {
    const selectedCols = selectedList.map(obj => obj.key);
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedCol = selectedCols;
    updatedListObject[index].columnErrorMessage = "";
    setListObj(updatedListObject)
  };

  const handleSelectValue = (selected : any, index: any) => {
    const updatedListObject = [...listObj]
    updatedListObject[index].selectedValue = selected.target.value;
    updatedListObject[index].assertionErrorMessage = "";
    setListObj(updatedListObject)
  };
  
  const handleAllowedValuesInput = (selected : any, index: any) => {
    let updatedListObject = [...listObj];
    selected = selected.target.value;
    if(!selected.includes(' ') && !selected.includes(',') && !selected.includes('_') &&
    !selected.includes(':') && !selected.includes('/') && !selected.includes("\\")) {
      updatedListObject[index].allowedValues = selected.split(";");
    }else {
      updatedListObject[index].allowedValues = Array.from('');
    }
    updatedListObject[index].allowedValuesErrorMessage = "";
    setListObj(updatedListObject);
  };

  const handleDatatypeSelection = (selected : any, index: any) => {
    const updatedListObject = [...listObj]
    updatedListObject[index].datatype = selected.target.value;
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
      updatedListObject[index].isValueDisabled = false
    } else {
      updatedListObject[index].isAssertionMandatory = false
      updatedListObject[index].isValueDisabled = true
    }

    if (rule == "hasSize") {
      updatedListObject[index].isColumnDisabled = true
    } else {
      updatedListObject[index].isColumnDisabled = false
    }

    if (constants.list_column_hint.includes(rule) || constants.list_column_assert_binning_udf_max_bin_hint.includes(rule) || 
    constants.list_column_assert_hint.includes(rule) || constants.list_column_datatype_assert_hint.includes(rule) || 
    constants.list_column_quantile_assert_hint.includes(rule) || 
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
    updatedListObject[index].assertionErrorMessage = "";

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


  const handleSelectPattern = (selected : any, index:any) => {
    let updatedListObject = [...listObj];
    selected = selected.target.value;
    updatedListObject[index].pattern = selected
    setListObj(updatedListObject)


  }

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
        finalJsonStructure.checks[numCheck]["check"]["columnA"] = listObj[numCheck].selectedCol[0];
        finalJsonStructure.checks[numCheck]["check"]["columnB"] = listObj[numCheck].selectedCol[1];
      } 
      else{
        if (!constants.list_assert_hint.includes(rule)) {
          finalJsonStructure.checks[numCheck]["check"]["column"] = listObj[numCheck].selectedCol[0];
        } 
      }
      if (constants.list_column_allowed_values_assert_hint.includes(rule)) {
        finalJsonStructure.checks[numCheck]["check"]["allowed_values"] = JSON.stringify(listObj[numCheck].allowedValues)
      }
      // if (rule == "hasPattern") {
      //   finalJsonStructure.checks[numCheck]["check"]["pattern"] = "r" + JSON.stringify(listObj[numCheck].pattern)
      // }
      if (constants.list_column_datatype_assert_hint.includes(rule)) {
        finalJsonStructure.checks[numCheck]["check"]["datatype"] = listObj[numCheck].datatype
        
      }
      if (listObj[numCheck].selectedOperator != "None") {
        lambdaExpression = `lambda x : x ${listObj[numCheck].selectedOperator} ${listObj[numCheck].selectedValue}`;
        finalJsonStructure.checks[numCheck]["check"]["assertion"] = lambdaExpression; 
      }
      if (listObj[numCheck].selectedOperator == "None" && !constants.mandatory_assert.includes(rule)) {
        finalJsonStructure.checks[numCheck]["check"]["assertion"] = "None"; 
      }
      if (constants.list_column_hint.includes(rule) || constants.list_columns.includes(rule)) {
        delete finalJsonStructure.checks[numCheck]["check"].assertion
      }
    }
  };  

  function saveRulesToFile() {
    // console.log(isFormValid());    
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
      } 
  }

  // sshService.js
// const Client = require('ssh2').Client;

// async function connectToSSHServer() {
//   return new Promise((resolve, reject) => {
//     const conn = new Client();
    
//     conn.on('ready', () => {
//       console.log('SSH connection established');
//       resolve(conn);
//     });
    
//     conn.on('error', (err: any) => {
//       console.error('Error connecting via SSH:', err);
//       reject(err);
//     });
    
//     conn.connect({
//         host: 'ar1.vpnjantit.com',
//         port: 22,
//         username: 'awa-vpnjantit.com',
//         password: 'awa', // or use privateKey instead for key-based authentication
//       // Add more options if needed (privateKey, passphrase, etc.)
//     });
//   });
// }


// async function connectToSSHServer() {
//   const conn = new Client();

//   try {
//     await new Promise<void>((resolve, reject) => {
//       conn.on('ready', () => {
//         console.log('SSH connection established');
//         resolve();
//       });

//       conn.on('error', (err: any) => {
//         console.error('Error:', err);
//         reject(err);
//       });

//       conn.connect({
//         host: 'ar1.vpnjantit.com',
//         port: 22,
//         username: 'awa-vpnjantit.com',
//         password: 'awa', // or use privateKey instead for key-based authentication
//       });
//     });

//     // If the connection is successful, log 'ok'
//     console.log('Connection is ok!');
//   } catch (error) {
//     // If there's an error in connecting, log 'nooooo'
//     console.error('Connection failed:', error);
//     console.log('Noooo');
//   } finally {
//     conn.end(); // Close the connection
//   }
// }

// // Call the function to connect
// connectToSSHServer();


  


  return (
    <div className="p-5" style={{fontFamily: 'Montserrat'}} >
      <title>Ruleify</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <UploadDataFile onListChange={setList} />
      {/* <UploadRemoteDataFile handleURLSelection={setList} /> */}
      {Array.from({ length: ruleCount }).map((_, index) => (
        <RuleCreator 
        handleAllowedValuesInput={(selected:any) => handleAllowedValuesInput(selected, index)}
        handleDatatypeSelection={(selected:any) => handleDatatypeSelection(selected, index)}
        handleRemovedCols={(selected:any) =>handleRemovedCol(selected, index)} 
        handleDeletion={() => deleteRule(index)} 
        handleRuleSelection={(selected:any) =>handleSelectRule(selected, index)} 
        handleValueSelection={(selected:any) =>handleSelectValue(selected, index)} 
        handleOperatorSelection={(selected:any) =>handleSelectOperator(selected, index)}  
        handleColSelection={(selectedList:any) => handleSelectColumns(selectedList, index)}
        // handlePatternSelection={(selectedList:any) => handleSelectPattern(selectedList, index)}
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
        <button  onClick={saveRulesToFile} className="btn btn-outline-success m-3">Save locally</button>
        {/* <button  onClick={connectToSSHServer} className="btn btn-outline-success m-3">Save to remote server</button> */}
        {/* <SaveToRemoteServer /> */}
      </div>
    </div>
    
    ) } 
