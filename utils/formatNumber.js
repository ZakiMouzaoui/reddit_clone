export const formatNumberAbbreviated = (number) => {
  if (number === 0) {
    return "0";
  }

  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  // Use logarithm to determine the appropriate symbol index
  const tier = (Math.log10(absoluteNumber) / 3) | 0;

  // Calculate the scaled number
  const scaled = absoluteNumber / Math.pow(10, tier * 3);

  // Format the number with or without decimal places
  const formattedNumber = scaled >= 1 ? scaled.toFixed(1) : scaled.toFixed(0);

  const formattedValue = formattedNumber.replace(/\.0+$/, "");
  const symbol = SI_SYMBOL[tier];

  return isNegative
    ? `-${formattedValue}${symbol}`
    : `${formattedValue}${symbol}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
