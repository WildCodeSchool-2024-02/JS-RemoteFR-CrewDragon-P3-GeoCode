import { Form, Link, useLoaderData } from "react-router-dom";

function AdminBornesEdit() {
  const terminal = useLoaderData();

  return (
    <>
      <Link to="/administrateur/bornes">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1> {terminal.name} </h1>

      <Form method="put">
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={terminal.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse :</label>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={terminal.address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cood">Coordonnées :</label>
          <input
            type="text"
            id="cood"
            name="cood"
            defaultValue={terminal.cood}
          />
        </div>
        <div className="form-group">
          <label htmlFor="power">Puissance :</label>
          <input
            type="text"
            id="power"
            name="power"
            defaultValue={terminal.power}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plug_type">Prise :</label>
          <input
            type="text"
            id="plug_type"
            name="plug_type"
            defaultValue={terminal.plug_type}
          />
        </div>
        <div className="form-group">
          <label htmlFor="chain_name">Propriétaire :</label>
          <input
            type="text"
            id="chain_name"
            name="chain_name"
            defaultValue={terminal.chain_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accessibility">Horaire :</label>
          <input
            type="text"
            id="accessibility"
            name="accessibility"
            defaultValue={terminal.accessibility}
          />
        </div>
        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminBornesEdit;
