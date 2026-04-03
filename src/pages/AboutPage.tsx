import { motion } from "framer-motion";
import { Heart, Coffee, Users, Award } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import cafeInterior from "@/assets/cafe-interior.jpg";
import coffeeArt from "@/assets/coffee-art.jpg";

const stats = [
  { icon: Coffee, value: "5000+", label: "Cups Served Monthly" },
  { icon: Users, value: "2000+", label: "Happy Customers" },
  { icon: Award, value: "3+", label: "Years of Excellence" },
  { icon: Heart, value: "100%", label: "Made with Love" },
];

const AboutPage = () => (
  <div className="min-h-screen pt-24 pb-20">
    <div className="container mx-auto px-6">
      <SectionHeading title="Our Story" subtitle="From a dream to Bhimavaram's most loved café" />

      <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src={cafeInterior} alt="BlueWave café interior" loading="lazy" width={1200} height={800} className="rounded-xl shadow-card w-full h-80 object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground">Born from Passion</h3>
          <p className="text-muted-foreground leading-relaxed">
            BlueWave Café & Bistro started with a simple idea — to bring world-class café culture to the heart of Bhimavaram. What began as a small dream in 2022 has grown into the town's favourite destination for premium coffee, delicious food, and unforgettable moments.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We source the finest coffee beans, use fresh local ingredients, and pour our heart into every cup and plate. Whether you're catching up with friends, working on your next big idea, or simply unwinding after a long day — BlueWave is your place.
          </p>
        </motion.div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4 md:order-1"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground">Why BlueWave?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              Premium, freshly brewed coffee every single time
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              A chef-curated menu with something for everyone
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              Cozy, Instagram-worthy interiors with free Wi-Fi
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              Friendly staff who treat every guest like family
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              The perfect spot for dates, meetups, or solo time
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:order-2"
        >
          <img src={coffeeArt} alt="Latte art" loading="lazy" width={800} height={800} className="rounded-xl shadow-card w-full h-80 object-cover" />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="rounded-2xl bg-secondary p-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="font-heading text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
