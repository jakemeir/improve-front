import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/UsersPage.css';


const ExportUserButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipes/export', {
        responseType: 'blob', 
          headers: {
            "Authorization": Cookies.get('token'),
          }});

      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'recipe-list.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting recipe data:', error);
    }
  };

  return (
    <button onClick={handleExport} className="export-button">
      Export to CSV
    </button>
  );
};

export default ExportUserButton;
