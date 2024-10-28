import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Phone {
  id: string;
  model: string;
  description: string;
  price: number;
}

export function Home() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  useEffect(() => {
    const storedPhones = localStorage.getItem("phones");
    if (storedPhones) {
      setPhones(JSON.parse(storedPhones));
    }
  }, []);

  const openModal = (phone: Phone) => {
    setSelectedPhone(phone);
  };

  const closeModal = () => {
    setSelectedPhone(null);
  };

  return (
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
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold mb-2">
                {selectedPhone.model}
              </h2>
              <p className="text-gray-600 mb-4">{selectedPhone.description}</p>
              <p className="text-lg font-bold">${selectedPhone.price}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
