import * as React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex content-center justify-center items-center">
      <h1 className="">Page non trouvée</h1>
    </div>
  );
};

export default NotFoundPage;

export const Head = () => <title>Page non trouvée</title>;
