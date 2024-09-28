"use client";
import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { CounterData } from "@/lib/supabase/sign";
import { Activity, Link, Palette, UserCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion, useInView } from "framer-motion";

export default function LinkProfileCounter() {
  const [counts, setCounts] = useState({ links: 0, profiles: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const result = await CounterData();
        setCounts(result);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
        setIsLoaded(true); // Set isLoaded to true even on error to show static numbers
      }
    };

    fetchCounts();
  }, []);

  const counterItems = [
    { end: counts.links, label: "Links Created", icon: <Link size={24} />, isLoaded },
    { end: counts.profiles, label: "Users", icon: <UserCircle2 size={24} />, isLoaded },
    { end: 87, label: "Available Themes", icon: <Palette size={24} />, isLoaded: true },
    { end: 98, label: "Uptime", suffix: "%", icon: <Activity size={24} />, isLoaded: true },
  ];

  return (
    <AnimatedSection>
      <section
        id="stats"
        className="py-20 bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Powering the Web for Millions
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is trusted by users of all sizes to create, manage,
              and share the Link-in-Bio experiences.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {counterItems.map((item, index) => (
              <CounterItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

interface CounterItemProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  isLoaded: boolean;
}

const CounterItem: React.FC<CounterItemProps> = ({
  end,
  label,
  suffix = "+",
  icon,
  isLoaded,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {isLoaded ? (
            <CountUp
              end={end}
              duration={2.5}
              separator=","
              suffix={suffix}
              start={0}
              useEasing={true}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            >
              {({ countUpRef }) => (
                <div className="flex items-center justify-center">
                  {icon}
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          ) : (
            <div className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {end}
            </div>
          )}
        </div>
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
};
