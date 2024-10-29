"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { Phone, Smartphone, Wrench, Mail, Home } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const choices = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Shop", icon: Smartphone, path: "/" },
  { name: "Accessories", icon: Phone, path: "/accessories" },
  { name: "Repair", icon: Wrench, path: "/repair" },
  { name: "Contact Us", icon: Mail, path: "/contactUs" },
];

export default function AnimationPage() {
  const navigate = useNavigate(); 
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoice = (path: string) => {
    setSelectedChoice(path);
    setTimeout(() => {
      navigate(path); 
    }, 1500); // Delay navigation to allow for exit animation
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
          {choices.map((choice) => (
            <motion.div
              key={choice.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="w-full h-full min-h-[120px] text-primary-foreground bg-primary/20 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary/30 hover:border-primary-foreground/30"
                onClick={() => handleChoice(choice.path)}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <choice.icon className="w-8 h-8" />
                  <span className="text-lg font-semibold">{choice.name}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        {selectedChoice && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 2] }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-primary-foreground"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}
