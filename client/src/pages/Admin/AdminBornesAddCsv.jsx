import { Form } from "react-router-dom";

function AdminBornesAddCsv() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <Form method="post">
        <label htmlFor="file">Nouveau fichier</label>
        <input type="file" accept=".csv" id="file" name="file" />
        <button type="submit">IMPORT CSV LOURD</button>
      </Form>
    </div>
  );
}

export default AdminBornesAddCsv;
