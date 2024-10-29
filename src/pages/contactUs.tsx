import React from "react";
import ContactForm from "@/components/form"; // Adjust path if necessary
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 bg-background">
      {/* Contact Details */}
      <Card className="md:w-1/2 p-6 bg-white shadow-lg space-y-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="flex items-center gap-4">
            <MapPin className="text-primary" />
            <p>123 Mobile St, Tech City, USA</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-primary" />
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-primary" />
            <p>support@mobileshop.com</p>
          </div>
          <p>Open Mon-Fri: 9:00 AM - 5:00 PM</p>
        </CardContent>

        {/* Google Map Embed */}
        <div className="relative w-full h-64 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.413949528192!2d-6.262424123012059!3d53.35704747392233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e7d70631097%3A0x70499972cdc30cc2!2s6%20Gardiner%20Street%20Upper%2C%20Rotunda%2C%20Dublin%201%2C%20D01%20WK79!5e1!3m2!1sen!2sie!4v1730163378524!5m2!1sen!2sie"
            width="600"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Card>

      {/* Contact Form */}
      <div className="md:w-1/2 ">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
