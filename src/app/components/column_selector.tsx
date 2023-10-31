import Multiselect from "multiselect-react-dropdown";
import React from "react";

const ColumnSelector = ({ options, noLimit, selectedCols, handleSelectedCols, isColumnDisabled } : 
  { options: any; noLimit: any; selectedCols: any; handleSelectedCols: any; isColumnDisabled : any }) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  return (                                    
    <div >
      Choose column(s)
      <Multiselect
      disable={isColumnDisabled}
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        // onRemove={(selectedList: any, selectedItem: any) => selectedList.remove(selectedItem)}
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