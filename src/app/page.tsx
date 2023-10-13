'use client'

import { useState } from "react";
import UploadDataFile from "./components/upload_data_file";

export default function Page() {
  const [list, setList] = useState<any[]>([]);

  
  return <div>
    <UploadDataFile onListChange={setList} />
    <label htmlFor="pet-select">Choose column:</label>
      <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        {list && list.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>
}