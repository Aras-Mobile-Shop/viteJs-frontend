"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface Phone {
  id: string;
  model: string;
  description: string;
  price: number;
  image: string;
}

export function HomepageComponent() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get(
          "https://nodejsdatabases.onrender.com/phones"
        );
        setPhones(response.data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, []);

  const openModal = (phone: Phone) => {
    setSelectedPhone(phone);
  };

  const closeModal = () => {
    setSelectedPhone(null);
  };

  return (
    <>
      <Header />
      <div className=" p-4 bg-tech min-h-screen text-white">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Mobile Shop</h1>
          <div className="grid grid-cols-2 gap-4">
            {phones.map((phone) => (
              <Card
                key={phone.id}
                className="cursor-pointer"
                onClick={() => openModal(phone)}
              >
                <CardContent className="p-4">
                  <img
                    src={phone.image}
                    alt={phone.model}
                    className="w-full h-32 object-cover mb-2 rounded-md"
                  />
                  <h2 className="font-semibold">{phone.model}</h2>
                  <p className="text-sm text-gray-500 mt-1">${phone.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {selectedPhone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                  <Button
                    size="icon"
                    className="absolute top-2 right-2 bg-red-500 text-black"
                    onClick={closeModal}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={selectedPhone.image}
                    alt={selectedPhone.model}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {selectedPhone.model}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedPhone.description}
                  </p>
                  <p className="text-lg font-bold">${selectedPhone.price}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
