export const validateInputs = (formData, setErrors) => {
  const newErrors = {};
  const regex = {
    name: /^[a-zA-Z\s]{3,20}$/,
    address: /^[a-zA-Z0-9\s,.'-]{3,20}$/,
    phoneNumber: /^[0-9]{10}$/,
  };

  Object.keys(regex).forEach((field) => {
    if (!regex[field].test(formData[field])) {
      newErrors[field] = `Invalid ${field}.`;
    }
  });

  setErrors(newErrors);
  return !Object.keys(newErrors).length;
};
