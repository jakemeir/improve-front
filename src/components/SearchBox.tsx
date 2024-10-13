// General: The component creates a search box
//
// output: The component sends a get request to the server with the content of the search
//--------------------------------------------------------------------------------------- 
// Programer: yaaqov burshtein.
// Date: 8/10/2024.
//---------------------------------------------------------------------------------------

import React, { useState } from 'react'
import axios from 'axios';
import '../style/SearchBox.css'


  
  const SearchBox: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
    };

    const handleSearch  = async () => {
      if (searchTerm.trim()) {
        try {
            const response = await axios.get(`https://localhost:3000/search?q=${searchTerm}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        } else {
            console.log('Please enter a search term');
        }
    };
  return (
    <div className='search-modal'>

      <div className="input-container">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleInputChange} className="search-input"/>
        <button onClick={handleSearch} className="search-button"> search </button>
      </div>
    </div>
    
  )
}

export default SearchBox