"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getLinkAndProfileCount } from "@/app/action";
import { Activity, Link, Palette, UserCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

export default function LinkProfileCounter() {
  const [counts, setCounts] = useState({ links: 0, profiles: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      const result = await getLinkAndProfileCount();
      setCounts(result);
    };

    fetchCounts();
  }, []);

  return (
    <AnimatedSection>
      <section
        id="counter"
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
            <CounterItem
              end={counts.links}
              label="Links Created"
              icon={<Link size={24} />}
              hasAnimated={hasAnimated}
              setHasAnimated={setHasAnimated}
            />
            <CounterItem
              end={counts.profiles}
              label="Users"
              icon={<UserCircle2 size={24} />}
              hasAnimated={hasAnimated}
              setHasAnimated={setHasAnimated}
            />
            <CounterItem
              end={87}
              label="Available Themes"
              icon={<Palette size={24} />}
              hasAnimated={hasAnimated}
              setHasAnimated={setHasAnimated}
            />
            <CounterItem
              end={98}
              label="Uptime"
              suffix="%"
              icon={<Activity size={24} />}
              hasAnimated={hasAnimated}
              setHasAnimated={setHasAnimated}
            />
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
  hasAnimated: boolean;
  setHasAnimated: (value: boolean) => void;
}

const CounterItem: React.FC<CounterItemProps> = ({
  end,
  label,
  suffix = "+",
  icon,
  hasAnimated,
  setHasAnimated,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          <CountUp
            end={end}
            duration={2.5}
            separator=","
            suffix={suffix}
            onEnd={() => setHasAnimated(true)}
            start={hasAnimated ? end : 0}
          >
            {({ countUpRef }) => (
              <div className="flex items-center justify-center">
                {icon}
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </div>
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
};
