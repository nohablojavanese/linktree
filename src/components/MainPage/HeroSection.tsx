import { Button } from "@nextui-org/react";
import Image from "next/image";
import { TextGenerateHeadline, TextGenerateChild } from "@/components/MainPage/Headline";
import AnimatedSection from "./AnimatedSection";

const HeroSection = () => {
  return (
    <AnimatedSection>
      <section id="hero" className="bg-[#0070f3] py-16 md:py-24 lg:py-32 text-white">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <TextGenerateHeadline />
            <TextGenerateChild />
            <div className="flex gap-4">
              <Button className="bg-[#0070f3] text-white hover:bg-[#0061d1] dark:bg-[#0070f3] dark:text-white dark:hover:bg-[#0061d1]">
                Buat Sekarang
              </Button>
              <Button variant="solid">Pelajari Lebih</Button>
            </div>
          </div>
          <Image
            src="https://myartistpage.com/wp-content/uploads/2022/03/usecases.png"
            width={1260}
            height={740}
            alt="Hero"
            className="mx-auto rounded-lg overflow-hidden"
          />
        </div>
      </section>
    </AnimatedSection>
  );
};

export default HeroSection;