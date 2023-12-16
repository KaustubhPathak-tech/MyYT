import React from "react";
import Button from "./Button";
const ButtonList = () => {
  const names = [
    "All",
    "Music",
    "Dance",
    "Computer Programming",
    "Valentines",
    "Cricket",
    "Love Songs",
    "Thoughts",
    "Satsang",
    "Mashup 2023",
    "Valentine",
  ];
  return (
    <div className="flex ">
      {names.map((name) => (
        <Button key={name} name={name} />
      ))}
    </div>
  );
};
export default ButtonList;
