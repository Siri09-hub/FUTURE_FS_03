import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
    <div className="mx-auto mt-4 h-1 w-16 rounded bg-gradient-blue" />
  </motion.div>
);

export default SectionHeading;
