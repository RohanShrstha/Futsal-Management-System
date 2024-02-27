export const FormattedDateTime = () => {
  const getFormattedDateTime = (value) => {
    if (Array.isArray(value)) {
      const newValue = [...value];
      newValue[1] = newValue[1] - 1;
      newValue.pop();
      const newDate = new Date(...newValue);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        newDate
      );
      return formattedDate;
    } else {
      return "Invalid date";
    }
  };
  return { getFormattedDateTime };
};
