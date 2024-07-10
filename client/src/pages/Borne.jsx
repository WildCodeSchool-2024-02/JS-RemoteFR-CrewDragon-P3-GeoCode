import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import timeData from "../services/timeData";
import borne from "../assets/images/bornes/borne.svg";

function Borne() {
  const terminal = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(null);
  const [selectedTime, setSelectedTime] = useState(0);

  const selectedDate = watch("date");
  console.info(selectedDate);

  const onSubmit = () => {};

  const handleClick = (id) => {
    setSelectedTime(id);
    setIsOpen(!isOpen);
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
                  className="time-label"
                  key={`Time filtered : ${filteredTime.id}`}
                >
                  {filteredTime.creneaux.map((creneau) => (
                    <button
                      type="button"
                      className="btn-secondary"
                      key={`Time filtered :${filteredTime.creneaux.id}`}
                    >
                      {creneau.slot}
                    </button>
                  ))}
                </div>
              ))}
          </details>
        )}
      </form>

      <h2>Récapitulatif de commande</h2>

      <button type="button">Réserver</button>
    </>
  );
}

export default Borne;
