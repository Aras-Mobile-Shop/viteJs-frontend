import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const API_URL = "https://nodejs-939i.onrender.com/phones";

interface PhoneFormData {
  model: string;
  description: string;
  price: number;
  image: FileList;
}

interface Phone {
  id: string;
  model: string;
  description: string;
  price: number;
  image: string;
}

export function Admin() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PhoneFormData>();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const response = await axios.get(API_URL);
      setPhones(response.data);
    } catch (error) {
      console.error("Error fetching phones:", error);
    }
  };

  const onSubmit = async (data: PhoneFormData) => {
    const formData = new FormData();
    formData.append("model", data.model);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("image", data.image[0]);

    try {
      const response = editingId
        ? await axios.put(`${API_URL}/${editingId}`, formData)
        : await axios.post(API_URL, formData);
      setPhones((prevPhones) =>
        editingId
          ? prevPhones.map((phone) =>
              phone.id === editingId ? response.data : phone
            )
          : [...prevPhones, response.data]
      );

      toast.success(
        editingId ? "Phone updated successfully!" : "Phone added successfully!"
      );
      reset();
      setImagePreview(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving phone:", error);
      toast.error("An error occurred while saving phone data.");
    }
  };

  const handleEdit = (phone: Phone) => {
    setEditingId(phone.id);
    setValue("model", phone.model);
    setValue("description", phone.description);
    setValue("price", phone.price);
    setImagePreview(phone.image);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPhones((prevPhones) => prevPhones.filter((phone) => phone.id !== id));
      toast.success("Phone deleted successfully!");
    } catch (error) {
      console.error("Error deleting phone:", error);
      toast.error("An error occurred while deleting the phone.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />

      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Phone" : "Add New Phone"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              {...register("model", { required: "Model is required" })}
              placeholder="Phone Model"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: !editingId && "Image is required",
              })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-w-full h-auto rounded-md"
              />
            )}
          </div>
          <Button type="submit" className="w-full bg-black text-gray-50">
            {editingId ? "Update Phone" : "Add Phone"}
          </Button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-4">Phone List</h2>
        <ul>
          {phones.map((phone) => (
            <li
              key={phone.id}
              className="flex items-center justify-between mb-4 p-2 border rounded"
            >
              <div>
                <h3 className="font-semibold">{phone.model}</h3>
                <p>{phone.description}</p>
                <p>Price: {phone.price}</p>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => handleEdit(phone)}
                  className="text-blue-500"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(phone.id)}
                  className="text-red-500"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}
