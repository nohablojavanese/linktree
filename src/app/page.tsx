import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
export default function Component() {
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
            href="#"
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
        <section className="py-12 md:py-16 lg:py-24 dark:bg-[#1a1b1e] dark:text-white">
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
                <img
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
              <div className="inline-block rounded-lg bg-[#f0f0f0] px-3 py-1 text-sm dark:bg-[#2c2d30] dark:text-[#b3b3b3]">
                Key Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Unlock Your Digital Potential
              </h2>
              <p className="max-w-[600px] text-[#6b7280] dark:text-[#b3b3b3]">
                Discover how our comprehensive suite of tools and services can
                elevate your online presence and drive growth.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <RocketIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Rapid Deployment
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Get your projects up and running quickly with our streamlined
                  deployment process.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <BoltIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Scalable Performance
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Effortlessly scale your applications to handle growing traffic
                  and demands.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <ShieldIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Robust Security
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Protect your data and applications with our comprehensive
                  security measures.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <CogIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Seamless Integration
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Easily integrate our solutions with your existing tools and
                  workflows.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <BriefcaseIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Dedicated Support
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Receive personalized guidance and support from our expert
                  team.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-[#2c2d30]">
                <SparkleIcon />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Cutting-Edge Technology
                </h3>
                <p className="text-[#6b7280] dark:text-[#b3b3b3]">
                  Stay ahead of the curve with our innovative and future-proof
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
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

function BoltIcon() {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function BriefcaseIcon() {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CogIcon() {
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
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg
      // {...props}
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function RocketIcon() {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ShieldIcon() {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function SparkleIcon() {
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
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
