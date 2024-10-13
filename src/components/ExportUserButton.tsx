import React from 'react';
import axios from 'axios';

const ExportUserButton: React.FC = () => {
  // Function to handle the export request
  const handleExport = async () => {
    try {
      // Make the request to the server to fetch the CSV data
      const response = await axios.get('http://localhost:8080/users/export', {
        responseType: 'blob', // To handle the binary data (blob)
      });

      // Create a blob from the response
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a link element for downloading
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'user-list.csv'; // Filename for the CSV
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting user data:', error);
    }
  };

  return (
    <button onClick={handleExport} className="btn btn-primary">
      Export User Data to CSV
    </button>
  );
};

export default ExportUserButton;
