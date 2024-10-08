"use client";
import { Button } from "../shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import {
  TextGenerateHeadline,
  TextGenerateChild,
} from "@/components/MainPage/Headline";
import AnimatedSection from "./AnimatedSection";

const HeroSection = () => {
  return (
    <AnimatedSection>
      <section
        id="hero"
        className="bg-[#0070f3] py-16 md:py-24 lg:py-32 text-white"
      >
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <TextGenerateHeadline />
            <TextGenerateChild />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" passHref>
                <Button
                  className="bg-white hover:bg-gray-200 text-[#0070f3] rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out"
                  size="lg"
                >
                  Create Now
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0070f3] rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                  >
                    See Examples
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>Aksi Cepat</DialogTitle>
                    <DialogDescription>
                      Ini adalah modal untuk aksi cepat. Anda dapat menambahkan
                      konten yang relevan di sini.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Lanjutkan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
