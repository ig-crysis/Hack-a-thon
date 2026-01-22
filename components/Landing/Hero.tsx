"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Video, Brain, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "../search-form";

export default function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

  const titles = useMemo(
    () => [
      "AI diagnosis",
      "secure video",
      "smart insights",
      "clinical support",
      "private care",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleAIChatClick = () => {
  router.push("/auth");
};



  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <Button variant="secondary" size="sm" className="gap-2 rounded-full border border-rose-100 bg-rose-50/50 text-rose-700 pointer-events-none">
              Secure Consultations <ShieldCheck className="w-4 h-4 text-rose-500" />
            </Button>
          </motion.div>

          {/* Main Heading Container */}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular flex flex-col items-center">
              <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent pb-2">
                Telemedicine powered by
              </span>
              
              {/* Fixed Height Animated Container to prevent overlapping */}
              <span className="relative h-[80px] md:h-[110px] w-full flex justify-center overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold whitespace-nowrap"
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -50 : 50,
                            opacity: 0,
                          }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtext with improved spacing */}
            <p className="text-sm md:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mx-auto dark:text-gray-400 mt-4">
              <span className="font-bold text-black italic dark:text-white">MedSecure</span> is a next-generation telemedicine platform. We combine encrypted video consultations with intelligent decision support.
            </p>

            {/* SEARCH BAR SECTION */}
            <div className="w-full max-w-xl mx-auto mt-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
               <SearchForm />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
               <Button size="lg" className="rounded-full gap-4 bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/20 px-8">
                Start Consultation <Video className="w-4 h-4" />
              </Button>
              <Button
  size="lg"
  variant="outline"
  onClick={handleAIChatClick}
  className="
    rounded-full gap-4 px-8
    border-rose-500 text-rose-500
    hover:bg-rose-500
    hover:text-black
    hover:border-rose-500
    hover:shadow-[0_0_20px_rgba(244,63,94,0.6)]
    transition-all
  "
>
  AI Chat <Brain className="w-4 h-4" />
</Button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}