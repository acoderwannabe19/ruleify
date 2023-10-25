'use client'
import React, { useState } from "react";
import UploadDataFile from "./components/upload_data_file";
import "bootstrap/dist/css/bootstrap.css";
import RuleCreator from "./components/rule_creator";
import { log } from "console";

export default function Page() {
  const [list, setList] = useState([]);
  const [ruleCount, setRuleCount] = useState(1); // Initial count of RuleCreators
   // Utilisez l'état pour stocker les options sélectionnées
  
  const [selectedCols, setSelectedCols] = useState<any>([[]]);
  const [selectedOperator, setSelectedOperator] = useState<any>(["None"])
  const [selectedValue, setSelectedValue] = useState<any>([0])
  const [selectedAssertion, setSelectedAssertion] = useState<any>([""])
  const [isValueDisabled, setIsValueDisabled] = useState<any>([true])

  let jsonStructure = {"check" : {}};
  let finalJsonStructure : {"checks" : any[]} = {"checks" : []};

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

  const handleSelectOperator = (selected : any, index: any) => {
    const updatedSelectedOperator = [...selectedOperator];
    updatedSelectedOperator[index] = selected.target.value;
    setSelectedOperator(updatedSelectedOperator);    

    if (updatedSelectedOperator[index] != "None") {      
      const updatedIsValueDisabled = [...isValueDisabled];    
      updatedIsValueDisabled[index] = false;
      setIsValueDisabled(updatedIsValueDisabled);
    }
  }


  const addRule = () => {
    setRuleCount(ruleCount + 1);

    setSelectedCols([...selectedCols, []]) 

    setSelectedOperator([...selectedOperator, "None"]) 
    console.log(selectedOperator);
    
    
    setSelectedValue([...selectedValue, 0]) 
    console.log(selectedValue);

    setSelectedAssertion([...selectedAssertion, ""])

    setIsValueDisabled([...isValueDisabled, true])
    
  };

  function writeRule(list:any) {
    
  }

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
    }}
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
        <RuleCreator isValueDisabled={isValueDisabled[index]} selectedOperator={selectedOperator[index]} selectedValue={selectedValue[index]}  handleValueSelection={(selected:any) =>handleSelectValue(selected, index)} handleOperatorSelection={(selected:any) =>handleSelectOperator(selected, index)}  key={index} columns={list} selectedCols={selectedCols[index]} handleColSelection={(selectedList:any) =>
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