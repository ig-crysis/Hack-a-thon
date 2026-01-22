"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Bot, Mic } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-context";
import { AuthForm } from "@/components/auth-form";
import { supabase } from "@/lib/supabase";
import { DirectChat } from "@/components/direct-chat";
import { toast } from "@/components/ui/use-toast";

type Message = {
  role: "user" | "bot";
  content: string;
  source?: "database" | "gemini" | "escalated" | "staff" | "system";
};

const LoadingSkeleton = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
      <div className="w-4 h-4 bg-muted-foreground/20 rounded animate-pulse" />
    </div>
    <div className="space-y-2.5 flex-1">
      <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-32" />
      <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-64" />
      <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-48" />
    </div>
  </div>
);

export default function Home() {
  const { user, profile, loading } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showDirectChat, setShowDirectChat] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string>("");

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user && profile) {
      setMessages([
        {
          role: "bot",
          content: `Hello ${
            profile.full_name || user.email
          }! I'm your AI assistant. How can I help you today?`,
        },
      ]);
    }
  }, [user, profile]);

  const getInitial = (name: string | undefined) =>
    ((name || "U").charAt(0) || "U").toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.response, source: data.source },
      ]);

      // AI escalation suggestion (optional)
      if (data.source === "gemini") {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Would you like to chat with our support staff?",
            source: "system",
          },
        ]);
        setPendingQuestion(userMessage);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED: works even without AI question
  const startSupportChat = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to chat with support.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: chat, error } = await supabase
        .from("direct_chats")
        .insert({
          user_id: user.id,
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from("chat_messages").insert({
        chat_id: chat.id,
        sender_type: "user",
        sender_id: user.id,
        message:
          pendingQuestion || "User initiated support chat directly.",
      });

      setPendingQuestion("");
      setShowDirectChat(true);

      toast({
        title: "Connected",
        description: "You are now connected to support staff.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Could not start chat.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* ✅ PERMANENT SUPPORT BUTTON */}
      <div className="flex justify-end px-6 py-2">
        <Button variant="outline" onClick={startSupportChat}>
          Chat with Support
        </Button>
      </div>

      <main className="flex-1 container max-w-3xl mx-auto overflow-hidden">
        <ScrollArea className="h-full px-6" ref={scrollAreaRef}>
          <div className="space-y-2 py-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[80%] rounded-2xl px-3 py-2 bg-muted/50">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>

      <form onSubmit={handleSubmit} className="p-2 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {showDirectChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <DirectChat onClose={() => setShowDirectChat(false)} />
        </div>
      )}
    </div>
  );
}
