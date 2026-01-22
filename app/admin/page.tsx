"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Brain, ShieldCheck, Activity, User, LogOut, Video } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getEmbedding } from "@/lib/embeddings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Message = {
  id: number;
  chat_id: number;
  sender_type: "user" | "admin";
  sender_id: string;
  message: string;
  created_at: string;
};

type Chat = {
  id: number;
  user_id: string;
  status: string;
  created_at: string;
  last_message?: string;
  extracted_symptoms?: string[]; // New: NLP Requirement
};

export default function DoctorPortal() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
    } else {
      alert("Access Denied: Invalid Clinical Credentials");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    setSelectedChat(null);
  };

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin");
    if (adminLoggedIn === "true") setIsAdmin(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat) return;

    setIsLoading(true);
    const message = input.trim();
    setInput("");

    try {
      const { error: chatError } = await supabase.from("chat_messages").insert({
        chat_id: selectedChat.id,
        sender_type: "admin",
        sender_id: "00000000-0000-0000-0000-000000000000",
        message: message,
      });

      if (chatError) throw chatError;

      const { data: originalMessage } = await supabase
        .from("chat_messages")
        .select("message")
        .eq("chat_id", selectedChat.id)
        .eq("sender_type", "user")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (originalMessage) {
        const embedding = await getEmbedding(originalMessage.message);
        await supabase.from("conversations").insert({
          question: originalMessage.message,
          answer: message,
          embedding: embedding,
        });
      }

      await supabase
        .from("direct_chats")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedChat.id);
    } catch (error) {
      console.error("Error sending clinical response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from("direct_chats")
        .select(`id, user_id, status, created_at, chat_messages (message, created_at)`)
        .in("status", ["active", "pending"])
        .order("updated_at", { ascending: false });

      if (data) {
        setChats(data.map((chat) => ({
          id: chat.id,
          user_id: chat.user_id,
          status: chat.status,
          created_at: chat.created_at,
          last_message: chat.chat_messages?.[0]?.message || "No history",
          extracted_symptoms: ["Headache", "Nausea"], // Mock NLP results for demo
        })));
      }
    };
    fetchChats();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    if (!selectedChat) return;
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", selectedChat.id)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-medical-grid p-6">
        <Card className="w-full max-w-md shadow-2xl border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Doctor Portal Login</CardTitle>
            <p className="text-sm text-muted-foreground">Secure access for healthcare practitioners only</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <Input placeholder="Doctor ID" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input type="password" placeholder="Passphrase" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" className="w-full bg-primary font-bold">Authorize Access</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background p-4 flex flex-col gap-4">
      {/* Top Professional Header */}
      <header className="flex justify-between items-center bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg"><Activity className="h-5 w-5 text-primary" /></div>
          <div>
            <h2 className="text-lg font-bold leading-none">Clinical Command Center</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Live Telemedicine Room</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">
            <ShieldCheck className="h-3 w-3 mr-1" /> Secure Session
          </Badge>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-rose-600">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-xl border shadow-lg overflow-hidden">
        {/* Left: Patient Queue */}
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="h-full bg-muted/30 flex flex-col">
            <div className="p-4 border-b font-bold flex items-center justify-between">
              <span>Active Consultations</span>
              <Badge>{chats.length}</Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all border",
                      selectedChat?.id === chat.id 
                        ? "bg-primary text-primary-foreground border-primary shadow-md" 
                        : "bg-background hover:bg-accent border-transparent"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 opacity-70" />
                        <span className="font-bold text-sm">Patient #{chat.id}</span>
                      </div>
                      <span className="text-[9px] opacity-60 uppercase">{new Date(chat.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className={cn("text-xs line-clamp-1 mb-2 opacity-80 italic")}>"{chat.last_message}"</p>
                    {/* Feature: Side-bar NLP Indicators */}
                    <div className="flex gap-1 flex-wrap">
                      {chat.extracted_symptoms?.map(s => (
                        <span key={s} className="text-[8px] px-1.5 py-0.5 rounded bg-black/10 border border-white/10 uppercase font-black">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Consultation & Intelligence */}
        <ResizablePanel defaultSize={70}>
          {selectedChat ? (
            <div className="h-full flex flex-col bg-background">
              {/* Chat Session Header */}
              <div className="p-4 border-b flex justify-between items-center bg-accent/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">P{selectedChat.id}</div>
                  <div>
                    <h3 className="text-sm font-bold">Consultation Session</h3>
                    <p className="text-[10px] text-muted-foreground italic">Patient ID: {selectedChat.user_id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button size="sm" variant="outline" className="gap-2"><Video className="h-4 w-4" /> Start Call</Button>
                   <Button size="sm" className="bg-primary gap-2" onClick={() => router.push("/consultation/summary")}>
                     <Brain className="h-4 w-4" /> Finalize Summary
                   </Button>
                </div>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex flex-col", message.sender_type === "admin" ? "items-end" : "items-start")}>
                      <div className={cn(
                        "max-w-[70%] rounded-2xl p-4 text-sm shadow-sm",
                        message.sender_type === "admin" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none border"
                      )}>
                        {message.message}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-1 px-2">{new Date(message.created_at).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Clinical Input Field */}
              <div className="p-4 border-t bg-card">
                <form onSubmit={handleSubmit} className="flex gap-2 bg-background p-1.5 rounded-full border border-primary/20">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Provide medical guidance..."
                    className="flex-1 border-none focus-visible:ring-0 bg-transparent"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading} size="icon" className="rounded-full w-10 h-10 shadow-lg">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="p-6 bg-muted rounded-full animate-pulse"><Brain className="h-12 w-12 text-primary/30" /></div>
              <div className="max-w-xs">
                <h3 className="text-xl font-bold">Awaiting Consultation</h3>
                <p className="text-sm text-muted-foreground mt-2">Select a patient from the queue to initialize the secure telemedicine session.</p>
              </div>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}