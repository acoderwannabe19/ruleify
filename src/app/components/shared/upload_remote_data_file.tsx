import React, { useState } from 'react';
import { usePapaParse } from 'react-papaparse';

export default function ReadRemoteFile({ handleURLSelection }: { handleURLSelection: any }) {
  const { readRemoteFile } = usePapaParse();
  const [url, setURL] = useState(''); // State to hold the URL value

  const handleReadRemoteFile = () => {
    readRemoteFile(url, {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
        console.log(results['data'][0]);
        
      },
      download: true
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value); // Update the URL state with the input value
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        onChange={handleInputChange} // Call handleInputChange on input change
        placeholder="Enter URL"
      />
      <button className='btn btn-outline-danger' onClick={handleReadRemoteFile}>
        readRemoteFile
      </button>
    </>
  );
}
