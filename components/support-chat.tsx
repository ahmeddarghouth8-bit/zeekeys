"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type ChatMessage = { id: string; author: "you" | "support"; text: string; at: number }

export default function SupportChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      author: "support",
      text: "Hi! 👋 This is ZeeKeys support. We’re available 24/7 — how can we help?",
      at: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener("open-chat", onOpen as any)
    return () => window.removeEventListener("open-chat", onOpen as any)
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  function send() {
    const text = input.trim()
    if (!text) return
    const id = Math.random().toString(36).slice(2)
    setMessages((prev) => [...prev, { id, author: "you", text, at: Date.now() }])
    setInput("")
    // Simulate instant confirmation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `ack_${id}`,
          author: "support",
          text: "Thanks! A support specialist will reply here shortly. For urgent matters, email support@zeekeys.com.",
          at: Date.now(),
        },
      ])
    }, 600)
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="ZeeKeys Support Chat"
          className="fixed bottom-20 right-4 z-50 w-[min(92vw,380px)]"
        >
          <Card className="border shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-600 text-white">
              <div className="text-sm font-semibold">Support Chat · 24/7 · Free</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-transparent hover:bg-white/10 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div ref={listRef} className="max-h-80 overflow-auto px-3 py-2 space-y-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`text-sm max-w-[85%] rounded-md px-3 py-2 ${
                    m.author === "you" ? "ml-auto bg-amber-100 text-amber-900" : "mr-auto bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.text}
                  <div className="mt-1 text-[10px] opacity-60">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-2 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") send()
                }}
              />
              <Button onClick={send} className="bg-amber-600 hover:bg-amber-700 text-white" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2"
        aria-label="Open support chat"
        title="Support Chat (24/7 · Free)"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Support 24/7</span>
      </button>
    </>
  )
}
