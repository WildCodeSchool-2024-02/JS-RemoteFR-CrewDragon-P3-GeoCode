/* eslint-disable react/self-closing-comp */

function Loading() {
  return (
    <div className="spinner-container">
      <h1>Votre contenu charge...</h1>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
