import Multiselect from "multiselect-react-dropdown";
import React from "react";
import ErrorMessage  from "./errorMessage";
const ColumnSelector = (
  { options, 
    columnErrorMessage,
    isFormValid,
    noLimit, 
    selectedCols,  
    handleRemovedCols, 
    handleSelectedCols, 
    isColumnDisabled } : 
  { options: any; 
    columnErrorMessage: any;
    isFormValid: any;
    noLimit: any; 
    selectedCols: any; 
    handleSelectedCols: any; 
    isColumnDisabled : any; 
    handleRemovedCols:any}) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  return (                                    
    <div >
      Choose column(s)
      {isFormValid.length >=1 ? <ErrorMessage message= {columnErrorMessage}></ErrorMessage> : "" }
      <Multiselect
        disable={isColumnDisabled}
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={handleRemovedCols}
        onSearch={function noRefCheck() {}}
        options={options.map((item: any) => ({ key: item }))}
        selectedValues={selectedCols}
        onSelect={handleSelectedCols}
        placeholder="Search"
        selectionLimit={noLimit}
        showCheckbox
        style={{
          chips: {
            background: "#359c90",          
            borderRadius: "3px",
          },
          multiselectContainer: {
            color: '#000',
          },
          searchBox: {
            borderRadius: '5px',
          },
        }}
      />
    </div>
  );
};

export default ColumnSelector;