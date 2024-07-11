/* eslint-disable no-nested-ternary */
import { useState } from "react";
import axios from "axios";
import { Form, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminBornesAddCsv() {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [statusAlert, setStatusAlert] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusAlert("loading");

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/terminals/upload-csv`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        setStatusAlert("success");
      } else {
        setStatusAlert("failed");
      }
    } catch (error) {
      console.error("Post Error:", error);
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
      <div className="btnUploadCsvImg">
        <button type="submit" className="buttonUpload">
          Upload
        </button>
        {statusAlert === "loading" ? (
          <img
            className="statusAlertChargementImg statusAlertImg"
            src="https://img.icons8.com/?size=100&id=102555&format=png&color=000000"
            alt="O"
          />
        ) : statusAlert === "success" ? (
          <img
            className="statusAlertImg"
            src="https://img.icons8.com/?size=100&id=21068&format=png&color=000000"
            alt="success"
          />
        ) : statusAlert === "failed" ? (
          <img
            className="statusAlertImg"
            src="https://img.icons8.com/?size=100&id=63688&format=png&color=000000"
            alt="failed"
          />
        ) : null}
      </div>
      {statusAlert === "loading" ? (
        <p className="statusAlertChargement">
          Le fichier est en cour de chargement.
        </p>
      ) : statusAlert === "success" ? (
        <p className="statusAlertOk">
          Fichier chargé avec succès, la base de données est mise à jour.
        </p>
      ) : statusAlert === "failed" ? (
        <p className="statusAlertFailed">Erreur lord de l'upload.</p>
      ) : null}
    </Form>
  );
}

export default AdminBornesAddCsv;
