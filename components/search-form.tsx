"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Stethoscope, Sparkles } from "lucide-react";

export function SearchForm() {
  const [pincode, setPincode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      // Directs to the hospital/specialist list filtered by pincode from your initial repo logic
      router.push(`/hospitals?pincode=${encodeURIComponent(pincode)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative w-full group">
          {/* MapPin Icon to signal location-based search */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <Input
            type="text"
            // Re-integrated Pincode search for local specialist discovery
            placeholder="Enter Pincode to find local specialists..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full pl-12 pr-36 h-14 text-base bg-background/60 backdrop-blur border-primary/20 rounded-2xl focus-visible:ring-primary/50 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 shadow-inner"
          />
          <Button
            type="submit"
            size="lg"
            className="absolute right-1.5 top-1.5 h-11 rounded-xl gap-2 text-sm sm:text-base font-bold bg-primary text-primary-foreground hover:shadow-lg transition-all px-4 shadow-primary/20"
          >
            <Stethoscope className="w-4 h-4" />
            <span className="hidden sm:inline">Find Care</span>
          </Button>
        </div>

        {/* Clinical labels fulfilling Problem Statement 3 requirements */}
        <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex items-center gap-1.5 bg-accent/50 px-3 py-1 rounded-full border border-primary/10">
            <Sparkles className="w-3 h-3 text-primary" /> AI Symptom Extraction
          </div>
          <div className="flex items-center gap-1.5 bg-accent/50 px-3 py-1 rounded-full border border-primary/10">
            <MapPin className="w-3 h-3 text-primary" /> Local Appointment Booking
          </div>
        </div>
      </div>
    </form>
  );
}