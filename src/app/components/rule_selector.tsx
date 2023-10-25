
export default function RuleSelector({ruleSelection, handleRuleSelection} : {ruleSelection : any, handleRuleSelection : any}) {
    const rules_list = ["areComplete", "areAnyComplete", "hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber",
  "containsEmail", "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin",
  "hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative", "haveCompleteness", "haveAnyCompleteness", 
  "hasUniqueness", "hasUniqueValueRatio", "isUnique", "isComplete", "hasSize", "hasApproxQuantile", "hasCorrelation", 
  "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo", "isContainedIn", 
  "hasPattern", "hasDataType", "hasHistogramValues", "hasNumberOfDistinctValues"]

    return <>
        <label>Choose a rule:</label>
        <select className="form-select" value={ruleSelection} onChange={handleRuleSelection} name="" id="">
          {rules_list && rules_list.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}        </select>
    </>
    
}