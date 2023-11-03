import * as constants from '../constants/static';

export default function RuleSelector(
  {ruleSelection, 
    handleRuleSelection} : 
  {ruleSelection : any, 
    handleRuleSelection : any}
  ) {
    
    return <>
        <label>Choose a rule:</label>
        <select className="form-select" 
          value={ruleSelection} 
          onChange={handleRuleSelection} 
          name="" 
          id=""
        >
          {constants.rules_list && constants.rules_list.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}        
        </select>
    </>
    
}