export const rules_list = [
    "areAnyComplete", "areComplete", "containsEmail", "containsURL", "hasApproxCountDistinct", 
    "hasCompleteness", "hasCorrelation", "hasDataType", 
    "hasEntropy", "hasMax", "hasMean", "hasMin", 
    "hasMinLength", "hasMutualInformation",  
    , "hasSize", "hasStandardDeviation", "hasSum", 
    "hasUniqueValueRatio", "hasUniqueness", "isContainedIn", "isComplete", 
    "isGreaterThanOrEqualTo", "isGreaterThan", "isLessThan", "isLessThanOrEqualTo", 
    "isNonNegative", "isPositive", "isUnique", "haveAnyCompleteness", 
    "haveCompleteness"
  ];


export const mandatory_assert = [
    "hasApproxCountDistinct", "hasCompleteness", "hasCorrelation", "hasEntropy",
    "hasMax", "hasMaxLength", "hasMean", "hasMean", "hasMin", "hasMinLength", "hasMutualInformation", 
    "hasNumberOfDistinctValues", "hasSize", "hasStandardDeviation", "hasSum", "hasUniqueValueRatio", "hasUniqueness",
    "haveCompleteness", "haveAnyCompleteness"
]
  
export const list_columns = ["areComplete", "areAnyComplete"]

export const list_column_assert_hint = [
    "hasApproxCountDistinct", "containsURL", "containsEmail",
    "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean",
    "hasMin", "hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative"
]

export const list_columns_assert_hint = [
    "haveCompleteness", "haveAnyCompleteness", "hasUniqueness", "hasUniqueValueRatio"
]

export const list_column_hint = ["isUnique", "isComplete"]

export const list_assert_hint = ["hasSize"]

export const list_column_column_assert_hint = [
    "hasCorrelation", "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo"]

export const list_column_allowed_values_assert_hint = ["isContainedIn"]


export const list_column_datatype_assert_hint = ["hasDataType"]


interface FunctionDescriptions {
    [key: string]: string;
  }

  export const function_descriptions: FunctionDescriptions = {
    "areComplete": "Checks if all specified columns are complete.",
    "areAnyComplete": "Checks if at least one of the specified columns is complete.",
    "hasApproxCountDistinct": "Checks if the distinct count of a column is approximately equal to a given value.",
    "containsURL": "Checks if a column contains URLs.",
    "containsEmail": "Checks if a column contains email addresses.",
    "hasCompleteness": "Checks the completeness of a column.",
    "hasEntropy": "Checks the entropy of a column.",
    "hasMax": "Checks if the maximum value of a column is equal to a given value.",
    "hasMaxLength": "Checks if the maximum length of a String column is equal to a given value.",
    "hasMean": "Checks if the mean of a numeric column is equal to a given value.",
    "hasMin": "Checks if the minimum value of a column is equal to a given value.",
    "hasMinLength": "Checks if the minimum length of a String column is equal to a given value.",
    "hasStandardDeviation": "Checks if the standard deviation of a numeric column is equal to a given value.",
    "hasSum": "Checks if the sum of a numeric column is equal to a given value.",
    "isPositive": "Checks if all values in a numeric column are positive (>0).",
    "isNonNegative": "Checks if all values in a numeric column are non-negative(>=0).",
    "haveCompleteness": "Checks the completeness of multiple specified columns.",
    "haveAnyCompleteness": "Checks if at least one of the specified columns is complete for each row.",
    "hasUniqueness": "Checks the uniqueness of a column or a set of columns.",
    "hasUniqueValueRatio": "Checks the uniqueness ratio of a column or a set of columns.",
    "isUnique": "Checks if all values in a column are unique.",
    "isComplete": "Checks if all specified columns in a set are complete.",
    "hasSize": "Checks if the number of elements in a set is equal to a given value.",
    "hasCorrelation": "Checks the correlation between two numeric columns.",
    "hasMutualInformation": "Checks the mutual information between two columns.",
    "isGreaterThan": "Checks if the value of a numeric column is greater than a given value.",
    "isGreaterThanOrEqualTo": "Checks if the value of a numeric column is greater than or equal to a given value.",
    "isLessThan": "Checks if the value of a numeric column is less than a given value.",
    "isLessThanOrEqualTo": "Checks if the value of a numeric column is less than or equal to a given value.",
    "isContainedIn": "Checks if the values of a column are contained in a specified set.",
    "hasDataType": "Checks the data type of a column.",
    
}



