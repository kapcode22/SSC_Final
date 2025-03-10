import React from "react";
import Typewriter from "typewriter-effect";

const Type = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: [text],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
};

export default Type;
