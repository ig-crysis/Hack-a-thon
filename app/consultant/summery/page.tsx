"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Share2, Brain, Activity, User, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConsultationSummary() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-medical-grid py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-xl border shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
              <FileText className="h-8 w-8" /> Clinical Summary
            </h1>
            <p className="text-muted-foreground">Session ID: #MED-992341 | Date: Jan 22, 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
            <Button className="bg-primary gap-2" onClick={() => router.push("/")}>Done</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Report Body */}
          <div className="md:col-span-2 space-y-6">
            
            {/* AI Summary Content (Mandatory Feature) */}
            <Card className="ai-insight-card overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" /> AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">Patient Chief Complaint</h4>
                  <p className="text-sm leading-relaxed italic text-muted-foreground">
                    "Persistent migraine-like headaches for the last 3 days accompanied by mild light sensitivity."
                  </p>
                </div>
                
                <hr className="border-primary/10" />
                
                <div>
                  <h4 className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">NLP Symptom Extraction</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs">Headache (Migraine-type)</Badge>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs">Photophobia (Light sensitivity)</Badge>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 text-xs">Potential Fatigue</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialist Recommendations (Mandatory Component) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Specialist Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="p-4 rounded-lg bg-accent/50 border border-primary/20">
                  <p className="text-sm font-medium mb-2">Based on symptom extraction, we recommend the following follow-up:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                       <Badge className="bg-blue-600">Primary</Badge> <strong>Consultation with Neurologist</strong>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground italic">
                      - Rule out complex migraine vs cluster headache.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Role-Based Info */}
          <div className="space-y-6">
            <Card className="bg-background border-primary/20 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground uppercase font-black tracking-widest">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground leading-none">Practitioner</p>
                    <p className="text-sm font-bold">Dr. Ayush Sharma</p>
                  </div>
                </div>
                <div className="pt-4 border-t space-y-2">
                   <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" /> Encrypted Session Record
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" /> Immutable Audit Log Entry
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}