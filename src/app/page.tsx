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
  const [selectedCols, setSelectedCols] = useState<any[]>([]);
  let jsonStructure: any;

  // Une fonction pour gérer la mise à jour des options sélectionnées
  const handleSelectColumns = (selectedList: any) => {
    setSelectedCols(selectedList);
  };

  const addRule = () => {
    setRuleCount(ruleCount + 1);
  };

  function saveRulesToFile() {

    if (selectedCols.length == 1) {
      jsonStructure = {
        checks: [{
          check: {column: selectedCols[0].key}
        }]
     };
    } else {
      const cols = [];
      for (let index = 0; index < selectedCols.length; index++) {
        cols.push(selectedCols[index].key)        
      }
      jsonStructure = {
        checks: [{
          check: {columns: JSON.stringify(cols)}
        }]
     };
    }

    const jsonData = JSON.stringify(jsonStructure);
  
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
        <RuleCreator key={index} columns={list} selectedCols={selectedCols} handleColSelection={handleSelectColumns} />
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
