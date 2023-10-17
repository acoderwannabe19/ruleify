'use client'
import React, { useState } from "react";
import UploadDataFile from "./components/upload_data_file";
import "bootstrap/dist/css/bootstrap.css";
import RuleCreator from "./components/rule_creator";

export default function Page() {
  const [list, setList] = useState([]);
  const [ruleCount, setRuleCount] = useState(1); // Initial count of RuleCreators

  const addRule = () => {
    setRuleCount(ruleCount + 1);
  };

  return (
    <div className="p-5">
      <UploadDataFile onListChange={setList} />
      {Array.from({ length: ruleCount }).map((_, index) => (
        <RuleCreator key={index} columns={list} />
      ))}
      <div className="flex justify-center">
        <button className="btn btn-outline-success m-3" onClick={addRule}>
          + Add a rule
        </button>
        <button className="btn btn-outline-success m-3">Save rules file</button>
      </div>
    </div>
  );
}
