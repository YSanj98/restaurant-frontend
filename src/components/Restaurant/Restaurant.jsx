import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantForm from "./RestaurantForm";
import RestaurantList from "./RestaurantList";
import { validateInputs } from "../../utils/validateInputs";

const Restaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs(formData, setErrors)) return;

    try {
      const response = isEditing
        ? await axios.put(`${backendUrl}/restaurant/${editingId}`, formData)
        : await axios.post(`${backendUrl}/restaurantRegister`, formData);

      if ([200, 201].includes(response.status)) {
        alert(`Restaurant ${isEditing ? "Updated" : "Created"} Successfully`);
        resetForm();
        fetchRestaurants();
      }
    } catch (err) {
      console.error(err);
      alert(`Restaurant ${isEditing ? "Update" : "Creation"} Failed`);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${backendUrl}/restaurants`);
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/deleteRestaurant/${id}`
      );
      if (response.status === 200) {
        setRestaurants(
          restaurants.filter((restaurant) => restaurant._id !== id)
        );
        alert("Restaurant deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Error deleting restaurant");
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/restaurant/${id}`);
      const { name, address, phoneNumber } = response.data.restaurant;
      setFormData({ name, address, phoneNumber: `0${phoneNumber}` });
      setIsEditing(true);
      setEditingId(id);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", address: "", phoneNumber: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isEditing ? "Edit Restaurant" : "Register Your Restaurant"}
        </h2>
      </div>
      <RestaurantForm
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <div className="bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl lg:max-w-6xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            List of Restaurants
          </h2>
        </div>
        <RestaurantList
          restaurants={restaurants}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Restaurant;
