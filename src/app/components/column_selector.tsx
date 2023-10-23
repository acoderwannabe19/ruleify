import { log } from "console";
import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";

const ColumnSelector = ({ options, noLimit, selectedCols, handler }: { options: any; noLimit: any, selectedCols:any, handler: any }) => {
 

  return (
    <div>
      Choose column(s)
      <Multiselect
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        options={options.map((item: any) => ({ key: item }))}
        selectedValues={selectedCols} // Utilisez selectedValues pour afficher les options sélectionnées
        onSelect={handler} // Utilisez onSelect pour gérer la sélection
        placeholder="Search"
        selectionLimit={noLimit}
        showCheckbox
        style={{
          chips: {
            background: "#359c90",
            borderRadius: "3px",
          },
          multiselectContainer: {
            color: "#000",
            // fontFamily: 'Montserrat'
          },
          searchBox: {
            borderRadius: "5px",
          },
        }}
      />
    </div>
  );
};

export default ColumnSelector;
