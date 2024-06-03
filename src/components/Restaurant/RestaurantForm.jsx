const RestaurantForm = ({
  isEditing,
  formData,
  setFormData,
  handleSubmit,
  errors,
}) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {["name", "address", "phoneNumber"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {`Restaurant ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantForm;
