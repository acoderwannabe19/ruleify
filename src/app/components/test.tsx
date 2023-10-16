import Multiselect from "multiselect-react-dropdown";
import React from "react";

const Example = ({options, noLimit}: {options: any, noLimit: any}) => {
  return (
    <div>
      Choose
      <Multiselect
        closeIcon="circle"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={options.map((item: any) => ({ key: item }))}
        placeholder="Custom Placeholder"
        selectionLimit={noLimit}
        showCheckbox
        style={{
          chips: {
            background: "#359c90",
            // 'border-radius': '7px',
          },
          multiselectContainer: {
            color: '#000',
          },
          searchBox: {
            // 'border-radius': '5px',
          },
        }}
      />
    </div>
  );
};

export default Example;
