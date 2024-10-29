"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md text-stone-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/home" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl ">Aras-Mobiles</span>
          </Link>
          <nav className="hidden md:flex space-x-4 text-yellow-400">
            <Link to="/" className="hover:underline">
              Shop
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden bg-primary text-primary-foreground py-2"
          >
            <nav className="flex flex-col items-center space-y-2">
              <Link to="/" className="hover:underline" onClick={toggleMenu}>
                Shop
              </Link>
              <Link
                to="/about"
                className="hover:underline"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:underline"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
}
