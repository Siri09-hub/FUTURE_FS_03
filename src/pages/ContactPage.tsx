import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you soon. Thank you!" });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Contact Us" subtitle="We'd love to hear from you" />

        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Get In Touch</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Main Road, Near Old Bus Stand, Bhimavaram, Andhra Pradesh 534201" },
                  { icon: Phone, label: "Phone", value: "+91 88855 51234" },
                  { icon: Mail, label: "Email", value: "hello@bluewavecafe.in" },
                  { icon: Clock, label: "Hours", value: "Mon–Sun: 8:00 AM – 11:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card p-8 shadow-card space-y-5"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Send a Message</h3>
            {[
              { name: "name" as const, placeholder: "Your Name", type: "text" },
              { name: "email" as const, placeholder: "Your Email", type: "email" },
              { name: "phone" as const, placeholder: "Your Phone", type: "tel" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                required
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
            <textarea
              required
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button type="submit" className="bg-gradient-blue rounded-lg px-8 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 flex items-center gap-2">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </motion.form>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-card"
        >
          <iframe
            title="BlueWave Café Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30625.30074545455!2d81.50!3d16.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd1e8e4fa7a7%3A0x4b6aaf0a72a39182!2sBhimavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
