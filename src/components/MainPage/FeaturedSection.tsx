"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-12 md:py-16 lg:py-24 bg-[#F3F3F1] dark:bg-[#1a1b1e] dark:text-white"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4 mb-8"
        >
          <div className="flex rounded-xl bg-[#0070f3] px-3 py-1 text-sm dark:bg-[#2c2d30]  dark:text-[#b3b3b3]">
            <p>Exclusive Offer</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#0070f3]">
            Unlock Your Digital Potential
          </h2>
          <p className="max-w-[600px] text-[#6b7280] dark:text-[#b3b3b3]">
            Discover our suite of powerful, complimentary tools designed to elevate your online presence and streamline your workflow.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-[#2c2d30] isolate"
            >
              <Image
                src={feature.image}
                width={400}
                height={250}
                alt={feature.title}
                className="aspect-[4/3] object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  {feature.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#0070f3] hover:underline dark:text-[#0070f3] dark:hover:text-[#0061d1]"
                  prefetch={false}
                >
                  Pelajari Lebih
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Template",
    description:
      "Various template options and colors are available for profile links that can be used.",
    image: "https://mobirise.com/bio/assets/images/linkbios-1.jpg",
  },
  {
    title: "Instant Loading",
    description:
      "Don't let your link users wait long just to display your profile link!",
    image:
      "https://uploads-ssl.webflow.com/5fd39cde89a3b6b667f26497/5fd665e7a6df4279cc7c39b8_linkinbio-thumbnail.jpg",
  },
  {
    title: "SEO and Share",
    description:
      "Share your profile link with detailed information that makes it easy for visitors.",
    image:
      "https://embedsocial.com/wp-content/uploads/2022/04/link-in-bio-page-customization.jpg",
  },
];

export default FeaturesSection;
