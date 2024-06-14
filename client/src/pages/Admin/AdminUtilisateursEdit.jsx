import { Form, useLoaderData } from "react-router-dom";

function AdminUtilisateursEdit() {
  const user = useLoaderData();

  return (
    <>
      <h1> {user.firstname} </h1>
      <Form method="put">
        <label htmlFor="firstname">Prénom</label>{" "}
        <input
          type="text"
          id="firstname"
          name="firstname"
          defaultValue={user.firstname}
        />
        <label htmlFor="lastname">Nom</label>{" "}
        <input
          type="text"
          id="lastname"
          name="lastname"
          defaultValue={user.lastname}
        />
        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminUtilisateursEdit;
