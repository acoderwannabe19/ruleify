import Multiselect from "multiselect-react-dropdown";
import { Montserrat } from "next/font/google";
import React from "react";

const ColumnSelector = ({options, noLimit}: {options: any, noLimit: any}) => {
  return (
    <div >
      Choose a column
      <Multiselect
      
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={options.map((item: any) => ({ key: item }))}
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
            // fontFamily: 'Montserrat'
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
