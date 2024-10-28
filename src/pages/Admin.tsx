import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PhoneFormData {
  model: string
  description: string
  price: number
  image: FileList
}

export function Admin() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PhoneFormData>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit = async (data: PhoneFormData) => {
    const file = data.image[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      const newPhone = {
        id: uuidv4(),
        model: data.model,
        description: data.description,
        price: data.price,
        image: reader.result as string
      }

      const existingPhones = JSON.parse(localStorage.getItem('phones') || '[]')
      const updatedPhones = [...existingPhones, newPhone]
      localStorage.setItem('phones', JSON.stringify(updatedPhones))

      toast.success('Phone added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      reset()
      setImagePreview(null)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add New Phone</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            {...register("model", { required: "Model is required" })}
            placeholder="Phone Model"
          />
          {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
            placeholder="Price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={handleImageChange}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 max-w-full h-auto rounded-md" />
          )}
        </div>
        <Button type="submit" className="w-full">Add Phone</Button>
      </form>
      <ToastContainer />
    </div>
  )
}