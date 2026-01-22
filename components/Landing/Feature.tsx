import React from "react";
// Import the actual section component to update its internal data if possible, 
// otherwise update the wrapper as shown below.
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

function Feature() {
  return (
    <div className="min-h-screen w-full relative py-20 bg-medical-grid">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Updated Heading to reflect MedSecure branding and Problem Statement 3 focus */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm">
            Clinical Excellence
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Intelligent Telemedicine & <br />
            <span className="text-primary">Decision Support</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our secure platform combines healthcare-grade encryption with 
            real-time AI insights to enhance clinical efficiency[cite: 106, 111].
          </p>
        </div>

        {/* This component likely needs its internal 'features' array updated 
            in its own file (components/ui/feature-section-with-hover-effects.tsx) */}
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export default Feature;