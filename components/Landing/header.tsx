"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShieldCheck, Menu, MoveRight, X, Video, Activity, Brain } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Updated navigation items to match Telemedicine & AI Decision Support 
  const navigationItems = [
    {
      title: "Consultations",
      description: "Secure patient-doctor virtual interactions",
      items: [
        {
          title: "Join Video Call",
          href: "/soon",
        },
        {
          title: "Appointment Scheduling",
          href: "/soon",
        },
        {
          title: "Consultation History",
          href: "/soon",
        },
        {
          title: "Specialist Directory",
          href: "/soon",
        },
      ],
    },
    {
      title: "AI Support",
      description: "Intelligent analytics and decision support tools",
      items: [
        {
          title: "Symptom Analysis",
          href: "/soon",
        },
        {
          title: "Smart Summaries",
          href: "/soon",
        },
        {
          title: "Specialist Matching",
          href: "/soon",
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-6">
        <nav className="flex h-18 items-center justify-between py-3">
          {/* Rebranded Logo to MedSecure */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-primary">
              MedSecure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-primary transition-all font-semibold">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-4 p-6 md:w-[500px] md:grid-cols-2 bg-popover/90">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className="group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10"
                            >
                              <div className="text-sm font-bold leading-none group-hover:text-primary transition-colors">
                                {subItem.title}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4 border-l pl-8">
              <ThemeToggle />
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-bold" onClick={() => router.push("/auth")}>
                Clinical Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-bold rounded-full shadow-lg" onClick={() => router.push("/auth")}>
                Start Call <Video className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-accent text-primary"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden animate-in slide-in-from-top duration-300">
            <div className="space-y-6 px-4 pb-10 pt-6 bg-background border-t">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-4">
                  <div className="font-bold text-primary flex items-center gap-2">
                    <Activity className="h-4 w-4" /> {item.title}
                  </div>
                  <div className="ml-6 space-y-3">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="space-y-4 border-t pt-8">
                <Button variant="ghost" className="w-full justify-start text-primary font-bold" onClick={() => { router.push("/auth"); setIsOpen(false); }}>
                  Clinical Login
                </Button>
                <Button className="w-full justify-center bg-primary rounded-full font-bold shadow-md" onClick={() => { router.push("/auth"); setIsOpen(false); }}>
                  Start Consultation <Video className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}