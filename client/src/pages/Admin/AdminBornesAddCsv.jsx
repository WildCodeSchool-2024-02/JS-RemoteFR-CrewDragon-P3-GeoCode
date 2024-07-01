// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
// import axios from "axios";

function AdminBornesAddCsv() {
  //   const [file, setFile] = useState();
  //   const [uploadedFile, setUploadedFile] = useState();
  //   const [error, setError] = useState();

  //   function handleChange(event) {
  //     setFile(event.target.files[0]);
  //   }

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     const url = "http://localhost:3310/api/csv_terminals";
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("fileName", file.name);
  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     };
  //     axios
  //       .post(url, formData, config)
  //       .then((response) => {
  //         console.info(response.data);
  //         setUploadedFile(response.data.file);
  //       })
  //       // eslint-disable-next-line no-shadow
  //       .catch((error) => {
  //         console.error("Error uploading file: ", error);
  //         setError(error);
  //       });
  //   }

  //   return (
  //     <div className="App">
  //       <form onSubmit={handleSubmit}>
  //         <h1>React File Upload</h1>
  //         <input type="file" onChange={handleChange} required />
  //         <button type="submit">Upload</button>
  //       </form>
  //       {uploadedFile && <img src={uploadedFile} alt="Uploaded content" />}
  //       {error && <p>Error uploading file: {error.message}</p>}
  //     </div>
  //   );
  // }
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3310/api/terminals", formData)
      .then(() => {})
      .catch((er) => console.info(er));
  };

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={upload}>
        Upload
      </button>
    </>
  );
  // return (
  //   <div style={{ textAlign: "center" }}>
  //     <h1>REACTJS CSV IMPORT EXAMPLE </h1>
  //     <Form method="post">
  //       <label htmlFor="file">Nouveau fichier</label>
  //       <input type="file" accept=".csv" id="file" name="file" required />
  //       <button type="submit">IMPORT CSV LOURD</button>
  //     </Form>
  //   </div>
  // );
}

export default AdminBornesAddCsv;
