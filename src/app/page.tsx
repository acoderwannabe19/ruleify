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

  // Une fonction pour gérer la mise à jour des options sélectionnées
  const handleSelectColumns = (selectedList: any, index: any) => {
    const updatedSelectedCols = [...selectedCols];
    updatedSelectedCols[index] = selectedList;
    setSelectedCols(updatedSelectedCols);
  };

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