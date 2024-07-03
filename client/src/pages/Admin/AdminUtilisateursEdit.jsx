import { Form, Link, useLoaderData } from "react-router-dom";

function AdminUtilisateursEdit() {
  const user = useLoaderData();

  return (
    <>
      <Link to="/administrateur/utilisateurs">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
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
