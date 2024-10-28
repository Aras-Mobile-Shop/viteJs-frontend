import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PhoneFormData {
  model: string;
  description: string;
  price: number;
}

export function Admin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhoneFormData>();

  const onSubmit = (data: PhoneFormData) => {
    const newPhone = {
      id: uuidv4(),
      ...data,
    };

    const existingPhones = JSON.parse(localStorage.getItem("phones") || "[]");
    const updatedPhones = [...existingPhones, newPhone];
    localStorage.setItem("phones", JSON.stringify(updatedPhones));

    toast.success("Phone added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    reset();
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add New Phone</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("model", { required: "Model is required" })}
            placeholder="Phone Model"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>
        <div>
          <Textarea
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
          <Input
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Add Phone
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
