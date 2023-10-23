import Multiselect from "multiselect-react-dropdown";
import { Montserrat } from "next/font/google";
import React, { useState } from "react";

const ColumnSelector = ({ options, noLimit }: { options: any; noLimit: any }) => {
  // Utilisez l'état pour stocker les options sélectionnées
  const [selectedCols, setSelectedCols] = useState([]);

  // Une fonction pour gérer la mise à jour des options sélectionnées
  const handleSelect = (selectedList: any) => {
    console.log(selectedList);
    setSelectedCols(selectedList);
  };

  return (
    <div >
      Choose column(s)
      <Multiselect
      
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        // onSelect={function noRefCheck() {}}
        options={options.map((item: any) => ({ key: item }))}
        selectedValues={selectedCols} // Utilisez selectedValues pour afficher les options sélectionnées
        onSelect={handleSelect} // Utilisez onSelect pour gérer la sélection
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
