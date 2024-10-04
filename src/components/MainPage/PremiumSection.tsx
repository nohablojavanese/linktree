"use client";
import { Rocket, Shield, Sparkle } from "lucide-react";
import { GrAnalytics, GrSupport } from "react-icons/gr";
import { UserCog } from "lucide-react";
import { motion } from "framer-motion";

const PremiumSection = () => {
  return (
    <section
      id="premium"
      className="bg-[#f0f0f0] py-12 md:py-16 lg:py-24 dark:bg-[#1a1b1e] dark:text-white"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4 mb-8"
        >
          <div className="flex rounded-xl bg-[#0070f3] px-3 py-1 text-sm dark:bg-[#2c2d30] dark:text-[#b3b3b3]">
            <p>Produk Premium</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#1a1b1e] dark:text-white">
            Tingkatkan Potensi Digital Anda
          </h2>
          <p className="max-w-[600px] text-[#6b7280] dark:text-[#b3b3b3]">
            Temukan bagaimana rangkaian alat dan layanan kami dapat meningkatkan
            kehadiran online Anda dan mendorong pertumbuhan.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                {feature.title}
              </h3>
              <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const premiumFeatures = [
  {
    icon: <Rocket className="text-blue-600 mb-2" size={24} />,
    title: "Penyebaran Cepat",
    description:
      "Luncurkan Link Anda dengan cepat dengan proses penyebaran yang efisien.",
  },
  {
    icon: <GrAnalytics className="text-blue-600 mb-2" size={24} />,
    title: "Kinerja yang Dapat Dianalisa",
    description:
      "Skalakan Link Anda dengan mudah untuk menangani lalu lintas dan permintaan yang meningkat.",
  },
  {
    icon: <Shield className="text-blue-600 mb-2" size={24} />,
    title: "Keamanan yang Kuat",
    description:
      "Lindungi data dan aplikasi Anda dengan langkah-langkah keamanan yang komprehensif.",
  },
  {
    icon: <UserCog className="text-blue-600 mb-2" size={24} />,
    title: "Integrasi yang Mulus",
    description:
      "Integrasikan solusi kami dengan alat dan alur kerja Anda yang ada dengan mudah.",
  },
  {
    icon: <GrSupport className="text-blue-600 mb-2" size={24} />,
    title: "Dukungan Dedikasi",
    description: "Dapatkan panduan dan dukungan pribadi dari tim ahli kami.",
  },
  {
    icon: <Sparkle className="text-blue-600 mb-2" size={24} />,
    title: "Teknologi Mutakhir",
    description:
      "Dengan Fitur Interaktif dan Modern, terdepan dengan solusi inovatif dan siap untuk profil Link anda.",
  },
];

export default PremiumSection;
