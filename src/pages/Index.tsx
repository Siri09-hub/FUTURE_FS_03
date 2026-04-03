import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Wifi, Music } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import heroCafe from "@/assets/hero-cafe.jpg";
import coffeeArt from "@/assets/coffee-art.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import mocktails from "@/assets/mocktails.jpg";
import desserts from "@/assets/desserts.jpg";
import cafeInterior from "@/assets/cafe-interior.jpg";
import foodPizza from "@/assets/food-pizza.jpg";

const highlights = [
  { icon: Star, title: "Premium Quality", desc: "Handcrafted beverages & chef-curated bites" },
  { icon: Clock, title: "Open Till Late", desc: "Serving you from 8 AM to 11 PM daily" },
  { icon: Wifi, title: "Free Wi-Fi", desc: "Stay connected while you unwind" },
  { icon: Music, title: "Great Vibes", desc: "Curated playlists & cozy ambience" },
];

const categories = [
  { img: coffeeArt, title: "Signature Coffee", desc: "Espresso, Cappuccino, Latte & more" },
  { img: mocktails, title: "Mocktails & Juices", desc: "Fresh, fruity & refreshing" },
  { img: foodBurger, title: "Burgers & Sandwiches", desc: "Loaded, juicy & satisfying" },
  { img: foodPizza, title: "Artisan Pizza", desc: "Wood-fired, cheesy perfection" },
  { img: desserts, title: "Desserts", desc: "Cakes, brownies & ice cream" },
];

const gallery = [heroCafe, cafeInterior, coffeeArt, foodBurger, mocktails, foodPizza];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src={heroCafe} alt="BlueWave Café interior" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-body font-semibold tracking-widest uppercase text-sm mb-4"
        >
          Welcome to
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight"
        >
          BlueWave Café<br />& Bistro
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto"
        >
          Where Every Sip Tells a Story — Bhimavaram's Premium Café Experience
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/menu" className="bg-gradient-blue rounded-lg px-8 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105 flex items-center justify-center gap-2">
            Explore Menu <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="rounded-lg border border-border px-8 py-3.5 font-semibold text-foreground transition-colors hover:bg-secondary flex items-center justify-center">
            Visit Us
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Highlights */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <h.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Menu */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Specialties" subtitle="From bold espressos to indulgent desserts — crafted with love in every bite and sip." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-card"
            >
              <img src={cat.img} alt={cat.title} loading="lazy" width={800} height={800} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-hero flex items-end p-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/menu" className="bg-gradient-blue rounded-lg px-8 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 inline-flex items-center gap-2">
            View Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <SectionHeading title="Gallery" subtitle="A glimpse of the BlueWave experience" />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-xl"
            >
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" width={600} height={400} className="h-48 md:h-64 w-full object-cover transition-transform duration-500 hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-blue p-12 md:p-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Taste the Wave?</h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">Visit us today or order via WhatsApp. Your table is waiting.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="rounded-lg bg-background px-8 py-3.5 font-semibold text-foreground transition-transform hover:scale-105">
              Find Us
            </Link>
            <a href="https://wa.me/918885551234" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary-foreground/30 px-8 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              WhatsApp Order
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Index;
