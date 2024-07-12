import { Form, useLoaderData, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function ProfilUtilisateurEdit() {
  const user = useLoaderData();
 const authData = Cookies.get("authData");
 let sub = null;

 if (authData) {
   const authDecoded = jwtDecode(authData);
   sub = authDecoded.sub;
 }

 return (
   <section>
     <Link to={`/profil/gestion/${sub}/`}>
       <img
         className="returnPreviousPage"
         src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
         alt="retour"
       />
     </Link>
     <h1> Modifier mon profil </h1>

      <Form method="put">
        <div className="profil-user-container">
          <img src={user.avatar} alt="" className="profil-user-avatar" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar"> Avatar </label>{" "}
          <input
            type="text"
            id="avatar"
            name="avatar"
            defaultValue={user.avatar}
          />
        </div>
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>{" "}
            <input
              type="text"
              id="firstname"
              name="firstname"
              defaultValue={user.firstname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>{" "}
            <input
              type="text"
              id="lastname"
              name="lastname"
              defaultValue={user.lastname}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>{" "}
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Mot de passe</label>{" "}
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={user.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Date de naissance</label>{" "}
          <input
            type="date"
            id="birthday"
            name="birthday"
            defaultValue={user.birthday}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Addresse</label>{" "}
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={user.address}
          />
        </div>
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="zipcode">Code Postal</label>{" "}
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              defaultValue={user.zip_code}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>{" "}
            <input type="text" id="city" name="city" defaultValue={user.city} />
          </div>
        </div>
       <button type="submit">Modifier mes informations</button>
     </Form>
     <Form method="delete">
       <button type="submit" className="btn-secondary">
         Supprimer mon profil
       </button>
     </Form>
   </section>
 );
}

export default ProfilUtilisateurEdit;
