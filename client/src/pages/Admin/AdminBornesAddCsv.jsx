import { useState } from "react";
import axios from "axios";
import { Form, Link } from "react-router-dom";

function AdminBornesAddCsv() {
  const [file, setFile] = useState(null);
  const [statusAlert, setstatusAlert] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setstatusAlert(
          <p className="statusAlertOk">Le fichier est upload. DB update.</p>
        );
      } else {
        setstatusAlert(
          <p className="statusAlertFailed">Erreur lord de l'upload.</p>
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="adminUploadContainer">
      <Link to="/administrateur/bornes">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1>Upload CSV</h1>
      <input
        type="file"
        accept=".csv"
        className="inputUpload"
        onChange={handleFileChange}
        required
      />
      <button type="submit" className="buttonUpload">
        Upload CSV
      </button>
      {statusAlert}
    </Form>
  );
}

export default AdminBornesAddCsv;
