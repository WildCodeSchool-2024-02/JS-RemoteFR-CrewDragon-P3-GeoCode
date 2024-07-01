import { useState } from "react";
import axios from "axios";

import { Form } from "react-router-dom";

function AdminBornesAddCsv() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/terminals/upload-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("CSV uploaded successfully");
      } else {
        alert("Failed to upload CSV");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
    </Form>
  );
}

export default AdminBornesAddCsv;
