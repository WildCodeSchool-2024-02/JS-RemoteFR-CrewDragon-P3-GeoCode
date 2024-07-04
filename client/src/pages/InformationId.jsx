import { useParams } from "react-router-dom";
import infoData from "../services/infoData";

function InformationId() {
  const { id } = useParams();
  const information = infoData[id - 1];

  return (
    <>
      <h1>{information.title}</h1>
      <h2>{information.subTitle}</h2>
      {information.content.map((paragraph) => (
        <p key={paragraph.id}>{paragraph.text}</p>
      ))}
    </>
  );
}

export default InformationId;
