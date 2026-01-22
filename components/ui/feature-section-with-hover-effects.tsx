import { cn } from "@/lib/utils";
import {
  IconVideo,
  IconBrain,
  IconShieldLock,
  IconFileAnalytics,
  IconLock,
  IconUsers,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Secure Tele-Consultation",
      description:
        "End-to-end encrypted session handling for protected text, audio, and video interactions between patients and doctors.",
      icon: <IconVideo className="w-8 h-8" />,
      color: "from-teal-500/20 to-teal-500/0",
    },
    {
      title: "NLP Symptom Extraction",
      description:
        "Intelligent AI engine that automatically extracts clinically relevant symptoms from patient inputs in real-time.",
      icon: <IconBrain className="w-8 h-8" />,
      color: "from-emerald-500/20 to-emerald-500/0",
    },
    {
      title: "Intelligent Decision Support",
      description:
        "Machine learning-driven recommendation engine suggesting medical specialists or follow-up actions based on clinical data.",
      icon: <IconFileAnalytics className="w-8 h-8" />,
      color: "from-blue-500/20 to-blue-500/0",
    },
    {
      title: "Automated Clinical Summaries",
      description:
        "Generates clinically relevant consultation summaries automatically post-session to streamline documentation.",
      icon: <IconShieldLock className="w-8 h-8" />,
      color: "from-teal-600/20 to-teal-600/0",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Strict isolation of sensitive patient data and ML insights governed by healthcare-grade role-based security policies.",
      icon: <IconUsers className="w-8 h-8" />,
      color: "from-cyan-500/20 to-cyan-500/0",
    },
    {
      title: "Protected Data Governance",
      description:
        "Zero-trust architecture ensuring that all AI-generated outputs and consultation records remain tamper-resistant.",
      icon: <IconLock className="w-8 h-8" />,
      color: "from-emerald-600/20 to-emerald-600/0",
    },
  ];

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: string;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative rounded-2xl p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "bg-background/50 backdrop-blur-sm",
        "border border-border/50",
        "sm:p-8"
      )}
    >
      {/* Gradient Background Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover/feature:opacity-100",
          "transition-opacity duration-300 rounded-2xl bg-gradient-to-b",
          color
        )}
      />

      {/* Icon Container */}
      <div className="relative mb-4 sm:mb-6">
        <div
          className={cn(
            "inline-flex items-center justify-center",
            "p-3 rounded-xl bg-background/80",
            "ring-1 ring-border/50 shadow-sm",
            "transition-transform duration-300",
            "group-hover/feature:scale-110"
          )}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="text-lg font-semibold leading-tight tracking-tight sm:text-xl text-foreground group-hover/feature:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
          {description}
        </p>
      </div>

      {/* Hover Indicator - Updated to Teal Gradient to match MedSecure */}
      <div
        className={cn(
          "absolute left-0 top-8 h-12 w-1",
          "opacity-0 group-hover/feature:opacity-100",
          "transition-all duration-300",
          "bg-gradient-to-b from-teal-500 to-emerald-600",
          "rounded-r-full"
        )}
      />
    </div>
  );
};