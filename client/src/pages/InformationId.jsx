import { useParams, Link } from "react-router-dom";
import infoData from "../services/infoData";

function InformationId() {
  const { id } = useParams();
  const information = infoData[id - 1];

  return (
    <>
      <Link to="/informations">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1>{information.title}</h1>
      <img
        src={information.image}
        alt={information.title}
        className="information-id-image"
      />
      <h2>{information.subTitle}</h2>
      {information.content.map((paragraph) => (
        <p key={paragraph.id}>{paragraph.text}</p>
      ))}
    </>
  );
}

export default InformationId;
