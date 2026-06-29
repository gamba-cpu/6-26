"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  ChevronDown,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { resources, discussions } from "@/lib/course-data"

const tabs = [
  { id: "notes", label: "Lesson Notes" },
  { id: "resources", label: "Resources" },
  { id: "discussion", label: "Q&A" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function LessonTabs() {
  const [active, setActive] = useState<TabId>("notes")

  return (
    <section className="rounded-xl border border-zinc-800 bg-[#09090b]">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-zinc-800 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative px-3 py-3 text-sm font-medium transition-colors",
              active === tab.id
                ? "text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-violet-500" />
            )}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {active === "notes" && <NotesPanel />}
        {active === "resources" && <ResourcesPanel />}
        {active === "discussion" && <DiscussionPanel />}
      </div>
    </section>
  )
}

function NotesPanel() {
  return (
    <article className="max-w-2xl text-sm leading-relaxed text-zinc-400">
      <h3 className="text-lg font-semibold text-zinc-100">Designing with Tokens</h3>
      <p className="mt-3">
        Design tokens are the single source of truth for your visual language.
        Instead of hard-coding values, you reference named variables that map to
        your brand — making themes, dark mode, and rebrands trivial to ship.
      </p>

      <h4 className="mt-6 font-semibold text-zinc-200">Three layers of tokens</h4>
      <ul className="mt-3 flex flex-col gap-2">
        {[
          ["Primitive", "Raw values like violet-500 or 16px."],
          ["Semantic", "Intent-based names like --primary or --border."],
          ["Component", "Scoped overrides like --button-bg."],
        ].map(([term, desc]) => (
          <li key={term} className="flex gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" />
            <span>
              <span className="font-medium text-zinc-200">{term} — </span>
              {desc}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <p className="font-mono text-[13px] text-zinc-400">
          <span className="text-violet-400">--primary</span>
          {": "}
          <span className="text-zinc-300">var(--violet-500)</span>;
        </p>
      </div>

      <blockquote className="mt-6 border-l-2 border-violet-500 pl-4 text-zinc-300 italic">
        {"Tokens turn design decisions into data — and data scales."}
      </blockquote>
    </article>
  )
}

function ResourcesPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {resources.map((r) => (
        <div
          key={r.id}
          className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-700"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-400">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-200">{r.name}</p>
            <p className="text-[11px] text-zinc-500">
              {r.type} · {r.size}
            </p>
          </div>
          <button
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors group-hover:bg-violet-500 group-hover:text-white"
            aria-label={`Download ${r.name}`}
          >
            <Download className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

function DiscussionPanel() {
  const [openId, setOpenId] = useState<string | null>(discussions[0]?.id ?? null)

  return (
    <div className="flex flex-col gap-4">
      {/* Composer */}
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
          You
        </span>
        <input
          placeholder="Ask a question…"
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
        />
        <button className="rounded-md bg-violet-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet-400">
          Post
        </button>
      </div>

      {/* Accordion of questions */}
      <div className="divide-y divide-zinc-800 overflow-hidden rounded-lg border border-zinc-800">
        {discussions.map((d) => {
          const isOpen = openId === d.id
          return (
            <div key={d.id} className="bg-[#09090b]">
              <button
                onClick={() => setOpenId(isOpen ? null : d.id)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-900/50"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-medium text-violet-300">
                  {d.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">{d.author}</span>
                    <span className="text-[11px] text-zinc-600">{d.time}</span>
                  </div>
                  <p className={cn("mt-0.5 text-sm text-zinc-400", !isOpen && "line-clamp-1")}>
                    {d.question}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "mt-1 size-4 shrink-0 text-zinc-600 transition-transform",
                    isOpen && "rotate-180 text-violet-400",
                  )}
                />
              </button>
              {isOpen && (
                <div className="flex items-center gap-2 px-4 pb-3 pl-11 text-[11px] text-zinc-500">
                  <MessageSquare className="size-3" />
                  {d.replies} replies
                  <button className="ml-2 inline-flex items-center gap-0.5 text-violet-400 transition-colors hover:text-violet-300">
                    View thread
                    <ArrowUpRight className="size-3" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
