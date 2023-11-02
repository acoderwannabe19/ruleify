export const rules_list = ["areComplete", "areAnyComplete", "hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber",
"containsEmail", "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean", "hasMin",
"hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative", "haveCompleteness", "haveAnyCompleteness", 
"hasUniqueness", "hasUniqueValueRatio", "isUnique", "isComplete", "hasSize", "hasApproxQuantile", "hasCorrelation", 
"hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo", "isContainedIn", 
"hasPattern", "hasDataType", "hasHistogramValues", "hasNumberOfDistinctValues"]


export const mandatory_assert = [
    "hasApproxCountDistinct", "hasApproxQuantile", "hasCompleteness", "hasCorrelation", "hasDistinctness", "hasEntropy",
    "hasHistogramValues", "hasMax", "hasMaxLength", "hasMean", "hasMean", "hasMin", "hasMinLength", "hasMutualInformation", 
    "hasNumberOfDistinctValues", "hasSize", "hasStandardDeviation", "hasSum", "hasUniqueValueRatio", "hasUniqueness",
    "haveCompleteness", "haveAnyCompleteness"
]
  
export const list_columns = ["areComplete", "areAnyComplete"]

export const list_column_assert_hint = [
    "hasApproxCountDistinct", "containsURL", "containsSocialSecurityNumber", "containsEmail",
    "containsCreditCardNumber", "hasCompleteness", "hasEntropy", "hasMax", "hasMaxLength", "hasMean",
    "hasMin", "hasMinLength", "hasStandardDeviation", "hasSum", "isPositive", "isNonNegative"
]

export const list_columns_assert_hint = [
    "haveCompleteness", "haveAnyCompleteness", "hasUniqueness", "hasUniqueValueRatio", "hasDistinctness"
]

export const list_column_hint = ["isUnique", "isComplete"]

export const list_assert_hint = ["hasSize"]

export const list_column_quantile_assert_hint = ["hasApproxQuantile"]

export const list_column_column_assert_hint = [
    "hasCorrelation", "hasMutualInformation", "isGreaterThan", "isGreaterThanOrEqualTo", "isLessThan", "isLessThanOrEqualTo"]

export const list_column_allowed_values_assert_hint = ["isContainedIn"]

export const list_column_pattern_assert_name_hint = ["hasPattern"]

export const list_column_datatype_assert_hint = ["hasDataType"]

export const list_column_assert_binning_udf_max_bin_hint = ["hasHistogramValues", "hasNumberOfDistinctValues"]
