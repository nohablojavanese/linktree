import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import {
  Bolt,
  Briefcase,
  LogInIcon,
  Rocket,
  Shield,
  Sparkle,
  UserCogIcon,
} from "lucide-react";
import Image from "next/image";
import { GrAnalytics, GrSupport } from "react-icons/gr";
import ProductPriceSection from "@/components/MainPage/Price";
export default function Component() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const section = document.querySelector("#key-features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-[#1a1b1e] dark:text-white">
      <header className="bg-[#0070f3] text-white py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          {/* <MountainIcon /> */}
          <Image src="/favicon.png" alt="logo" width={24} height={24} />
          <span className="text-lg font-semibold">Link.id</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="#productfree"
            // scroll={false}
            className="text-sm font-medium hover:underline underline-offset-4 dark:hover:text-[#0070f3]"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 dark:hover:text-[#0070f3]"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 dark:hover:text-[#0070f3]"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 dark:hover:text-[#0070f3]"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <a href="/login" target="_self">
          <Button color="primary" endContent={<LogInIcon />}>
            Login
          </Button>
        </a>
      </header>
      <main className="flex-1">
        <section className="bg-[#0070f3] py-16 md:py-24 lg:py-32 text-white">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Membuat Link hanya dalam satu menit
              </h1>
              <p className="text-sm md:text-base max-w-[600px]">
                Layanan seperti Link.id memungkinkan pengguna membuat halaman
                profil yang mengumpulkan semua tautan penting dalam satu tempat
                dengan tampilan yang sederhana dan responsif.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#0070f3] text-white hover:bg-[#0061d1] dark:bg-[#0070f3] dark:text-white dark:hover:bg-[#0061d1]">
                  Buat Sekarang
                </Button>
                <Button variant="solid">Pelajari Lebih</Button>
              </div>
            </div>
            <Image
              src="https://myartistpage.com/wp-content/uploads/2022/03/usecases.png"
              width="1260"
              height="740"
              alt="Hero"
              className="mx-auto rounded-lg overflow-hidden"
            />
          </div>
        </section>
        <section
          id="productfree"
          className="py-12 md:py-16 lg:py-24 dark:bg-[#1a1b1e] dark:text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="flex  rounded-xl bg-[#0070f3] px-3 py-1 text-sm dark:bg-[#2c2d30] dark:text-[#b3b3b3]">
                <p>Produk Gratis</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Explore Our Offerings
              </h2>
              <p className="max-w-[600px] text-[#6b7280] dark:text-[#b3b3b3]">
                Temukan fitur dan produk secara gratis untuk mempermudah kinerja
                kamu!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-[#2c2d30]">
                <Image
                  src="https://mobirise.com/bio/assets/images/linkbios-1.jpg"
                  width="400"
                  height="250"
                  alt="Product Category"
                  className="aspect-[4/3] object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    Template
                  </h3>
                  <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                    Tersedia berbagai opsi pilihan template dan warna untuk
                    profil link yang bisa digunakan.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#0070f3] hover:underline dark:text-[#0070f3] dark:hover:text-[#0061d1]"
                    prefetch={false}
                  >
                    Pelajari Lebih
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-[#2c2d30]">
                <Image
                  src="https://uploads-ssl.webflow.com/5fd39cde89a3b6b667f26497/5fd665e7a6df4279cc7c39b8_linkinbio-thumbnail.jpg"
                  width="400"
                  height="250"
                  alt="Product Category"
                  className="aspect-[4/3] object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    Loading Instant
                  </h3>
                  <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                    Jangan sampai pengguna link-mu menunggu lama hanya untuk
                    menampilkan profil link kamu!
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#0070f3] hover:underline dark:text-[#0070f3] dark:hover:text-[#0061d1]"
                    prefetch={false}
                  >
                    Learn More
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-[#2c2d30]">
                <Image
                  src="https://embedsocial.com/wp-content/uploads/2022/04/link-in-bio-page-customization.jpg"
                  width="400"
                  height="250"
                  alt="Product Category"
                  className="aspect-[4/3] object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    SEO dan Share
                  </h3>
                  <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                    Bagikan link profil kamu dengan informasi detail yang
                    memudahkan pengunjung.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#0070f3] hover:underline dark:text-[#0070f3] dark:hover:text-[#0061d1]"
                    prefetch={false}
                  >
                    Learn More
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#f0f0f0] py-12 md:py-16 lg:py-24 dark:bg-[#1a1b1e] dark:text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="flex  rounded-xl bg-[#0070f3] px-3 py-1 text-sm dark:bg-[#2c2d30] dark:text-[#b3b3b3]">
                <p>Produk Premium</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#1a1b1e] dark:text-white">
                Tingkatkan Potensi Digital Anda
              </h2>
              <p className="max-w-[600px] text-[#6b7280] dark:text-[#b3b3b3]">
                Temukan bagaimana rangkaian alat dan layanan kami dapat
                meningkatkan kehadiran online Anda dan mendorong pertumbuhan.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <Rocket className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Penyebaran Cepat
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Luncurkan Link Anda dengan cepat dengan proses penyebaran yang
                  efisien.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <GrAnalytics className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Kinerja yang Dapat Dianalisa
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Skalakan Link Anda dengan mudah untuk menangani lalu lintas
                  dan permintaan yang meningkat.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <Shield className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Keamanan yang Kuat
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Lindungi data dan aplikasi Anda dengan langkah-langkah
                  keamanan yang komprehensif.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <UserCogIcon className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Integrasi yang Mulus
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Integrasikan solusi kami dengan alat dan alur kerja Anda yang
                  ada dengan mudah.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <GrSupport className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Dukungan Dedikasi
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Dapatkan panduan dan dukungan pribadi dari tim ahli kami.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <Sparkle className="text-blue-600 mb-2" size={24} />
                <h3 className="text-xl font-semibold mb-2 text-[#1a1b1e] dark:text-white">
                  Teknologi Mutakhir
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Dengan Fitur Interaktif dan Modern, terdepan dengan solusi
                  inovatif dan siap untuk profil Link anda.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ProductPriceSection />
      </main>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
