import { Form, useLoaderData } from "react-router-dom";

function AdminBornesEdit() {
  const terminal = useLoaderData();

  return (
    <>
      <h1> {terminal.name} </h1>

      <Form method="put">
        <label htmlFor="name">Nom</label>
        <input type="text" id="name" name="name" defaultValue={terminal.name} />
        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminBornesEdit;
