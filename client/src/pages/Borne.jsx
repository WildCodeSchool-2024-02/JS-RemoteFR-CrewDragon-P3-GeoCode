import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import timeData from "../services/timeData";
import borne from "../assets/images/bornes/borne.svg";

function Borne() {
  const terminal = useLoaderData();

  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(null);
  const [selectedTime, setSelectedTime] = useState(0);

  const slotData = watch("slot");
  const selectedDate = watch("date");

  const handleClick = (id) => {
    setSelectedTime(id);
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data) => {
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`, // change road register
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData}`,
          },
          body: JSON.stringify({
            // Data for user table
            date: data.date,
            slot: slotData,
            terminal_id: terminal.id,
            user_id: sub,
          }),
        }
      );
      if (response.status === 201) {
        navigate(`/profil/gestion/${sub}/reservations/`);
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <>
      <h1>Borne : {terminal.name} </h1>
      <div className="time-label" style={{ justifyContent: "flex-start" }}>
        <img src={borne} alt="" />
        <p>{terminal.address}</p>
      </div>

      {/* eslint-disable react/jsx-props-no-spreading */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="date">Votre date de réservation :</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            onBlur={() => trigger("date")}
          />
          {errors.date && (
            <p role="alert">
              {errors.date.type === "required" &&
                "Vous avez besoin de sélectionner une date 🤭"}
            </p>
          )}
        </div>
        {selectedDate && (
          <details>
            <summary>Réserver un créneau</summary>
            <div className="time-label">
              {timeData.map((time) => (
                <button
                  type="button"
                  key={`Time : ${time.id}`}
                  className="time-label-btn"
                  onClick={() => handleClick(time.id)}
                >
                  <p>{time.time}</p>
                </button>
              ))}
            </div>

            {timeData
              .filter((time) => time.id === selectedTime)
              .map((filteredTime) => (
                <div
                  className="form-group"
                  key={`Time filtered : ${filteredTime.id}`}
                >
                  <label htmlFor="slot"> Choisissez votre créneau</label>
                  <select
                    id="slot"
                    name="slot"
                    defaultValue="-- Votre créneau --"
                    {...register("slot", {
                      required: "Le choix d'un créneau est obligatoire",
                    })}
                    onBlur={() => trigger("slot")}
                  >
                    <option value="">-- Votre créneau --</option>
                    {filteredTime.creneaux.map((creneau) => (
                      <option key={creneau.id} value={creneau.slot}>
                        {creneau.slot}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </details>
        )}
        <button type="submit">Réserver</button>
      </form>

      <h2>Récapitulatif de commande</h2>
    </>
  );
}

export default Borne;
