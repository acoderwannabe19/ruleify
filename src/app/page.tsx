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
  let jsonStructure = {"check" : {}};
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