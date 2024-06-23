import { Form, useLoaderData } from "react-router-dom";

function ProfilUtilisateurEdit() {
  const user = useLoaderData();

  return (
    <div className="profil-user-edit-container">
      <h1> Modifier mon profil </h1>

      <Form method="put" className="profil-user-edit-form">
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
        <label htmlFor="email">Email</label>{" "}
        <input type="text" id="email" name="email" defaultValue={user.email} />
        <label htmlFor="email">Mot de passe</label>{" "}
        <input
          type="text"
          id="password"
          name="password"
          defaultValue={user.password}
        />
        <label htmlFor="birthday">Date de naissance</label>{" "}
        <input
          type="date"
          id="birthday"
          name="birthday"
          defaultValue={user.birthday}
        />
        <label htmlFor="address">Addresse</label>{" "}
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={user.address}
        />
        <div className="profil-user-edit-address">
          <div>
            <label htmlFor="zipcode">Code Postal</label>{" "}
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              defaultValue={user.zip_code}
            />
          </div>
          <div>
            <label htmlFor="city">Ville</label>{" "}
            <input type="text" id="city" name="city" defaultValue={user.city} />
          </div>
        </div>
        <button type="submit" className="profil-user-edit-button">
          Modifier mes informations
        </button>
      </Form>
      <Form method="delete">
        <button type="submit" className="profil-user-edit-button">
          Supprimer mon profil
        </button>
      </Form>
    </div>
  );
}

export default ProfilUtilisateurEdit;
