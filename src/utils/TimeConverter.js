import React from "react";

const unixToLocale = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const date = new Date(milliseconds);
  let readableTime = date.toLocaleString();

  return readableTime;
};

export { unixToLocale };
