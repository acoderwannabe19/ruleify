export const rules_list = [
    "areAnyComplete", "areComplete", "containsCreditCardNumber", "containsEmail", 
    "containsSocialSecurityNumber", "containsURL", "hasApproxCountDistinct", 
    "hasApproxQuantile", "hasCompleteness", "hasCorrelation", "hasDataType", 
    "hasEntropy", "hasHistogramValues", "hasMax", "hasMean", "hasMin", 
    "hasMinLength", "hasMutualInformation", "hasNumberOfDistinctValues", 
    "hasPattern", "hasSize", "hasStandardDeviation", "hasSum", 
    "hasUniqueValueRatio", "hasUniqueness", "isContainedIn", "isComplete", 
    "isGreaterThanOrEqualTo", "isGreaterThan", "isLessThan", "isLessThanOrEqualTo", 
    "isNonNegative", "isPositive", "isUnique", "haveAnyCompleteness", 
    "haveCompleteness"
  ];


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

interface FunctionDescriptions {
    [key: string]: string;
  }

export const function_descriptions: FunctionDescriptions = {
    "areComplete": "Vérifie si toutes les colonnes spécifiées sont complètes.",
    "areAnyComplete": "Vérifie si au moins une des colonnes spécifiées est complète.",
    "hasApproxCountDistinct": "Vérifie si le nombre distinct d'une colonne est approximativement égal à une valeur donnée.",
    "containsURL": "Vérifie si une colonne contient des URL.",
    "containsSocialSecurityNumber": "Vérifie si une colonne contient des numéros de sécurité sociale.",
    "containsEmail": "Vérifie si une colonne contient des adresses e-mail.",
    "containsCreditCardNumber": "Vérifie si une colonne contient des numéros de carte de crédit.",
    "hasCompleteness": "Vérifie la complétude d'une colonne.",
    "hasEntropy": "Vérifie l'entropie d'une colonne.",
    "hasMax": "Vérifie si la valeur maximale d'une colonne est égale à une valeur donnée.",
    "hasMaxLength": "Vérifie si la longueur maximale d'une colonne de type String est égale à une valeur donnée.",
    "hasMean": "Vérifie si la moyenne d'une colonne numérique est égale à une valeur donnée.",
    "hasMin": "Vérifie si la valeur minimale d'une colonne est égale à une valeur donnée.",
    "hasMinLength": "Vérifie si la longueur minimale d'une colonne de type String est égale à une valeur donnée.",
    "hasStandardDeviation": "Vérifie si l'écart type d'une colonne numérique est égal à une valeur donnée.",
    "hasSum": "Vérifie si la somme d'une colonne numérique est égale à une valeur donnée.",
    "isPositive": "Vérifie si toutes les valeurs d'une colonne numérique sont positives.",
    "isNonNegative": "Vérifie si toutes les valeurs d'une colonne numérique sont non négatives.",
    "haveCompleteness": "Vérifie la complétude de plusieurs colonnes spécifiées.",
    "haveAnyCompleteness": "Vérifie si au moins une des colonnes spécifiées est complète pour chaque ligne.",
    "hasUniqueness": "Vérifie l'unicité d'une colonne ou d'un ensemble de colonnes.",
    "hasUniqueValueRatio": "Vérifie le ratio d'unicité d'une colonne ou d'un ensemble de colonnes.",
    "isUnique": "Vérifie si toutes les valeurs d'une colonne sont uniques.",
    "isComplete": "Vérifie si toutes les colonnes spécifiées dans un ensemble sont complètes.",
    "hasSize": "Vérifie si le nombre d'éléments dans un ensemble est égal à une valeur donnée.",
    "hasApproxQuantile": "Vérifie si le quantile approximatif d'une colonne numérique est égal à une valeur donnée.",
    "hasCorrelation": "Vérifie la corrélation entre deux colonnes numériques.",
    "hasMutualInformation": "Vérifie l'information mutuelle entre deux colonnes.",
    "isGreaterThan": "Vérifie si la valeur d'une colonne numérique est supérieure à une valeur donnée.",
    "isGreaterThanOrEqualTo": "Vérifie si la valeur d'une colonne numérique est supérieure ou égale à une valeur donnée.",
    "isLessThan": "Vérifie si la valeur d'une colonne numérique est inférieure à une valeur donnée.",
    "isLessThanOrEqualTo": "Vérifie si la valeur d'une colonne numérique est inférieure ou égale à une valeur donnée.",
    "isContainedIn": "Vérifie si les valeurs d'une colonne sont contenues dans un ensemble spécifié.",
    "hasPattern": "Vérifie si les valeurs d'une colonne de type String correspondent à un modèle régulier.",
    "hasDataType": "Vérifie le type de données d'une colonne.",
    "hasHistogramValues": "Vérifie si les valeurs d'une colonne numérique correspondent à un histogramme spécifié.",
    "hasNumberOfDistinctValues": "Vérifie si le nombre distinct de valeurs d'une colonne est égal à une valeur donnée."
}


