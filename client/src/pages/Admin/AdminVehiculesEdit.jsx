import { Form, useLoaderData } from "react-router-dom";

function AdminVehiculesEdit() {
  const vehicule = useLoaderData();

  return (
    <>
      <h1> {vehicule.name} </h1>
      <Form method="put">
        <label htmlFor="name">Nom</label>{" "}
        <input type="text" id="name" name="name" defaultValue={vehicule.name} />
        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminVehiculesEdit;
