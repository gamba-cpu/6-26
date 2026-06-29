"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Maximize, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function VideoPlayer({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      {/* Poster */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lesson-poster.png"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />

      {/* Play overlay */}
      <button
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <span
          className={cn(
            "flex size-16 items-center justify-center rounded-full border border-white/10 bg-[#09090b]/70 text-zinc-100 backdrop-blur-sm transition-all duration-300",
            "group-hover:scale-110 group-hover:border-violet-500/50 group-hover:bg-violet-500 group-hover:text-white",
            playing && "scale-90 opacity-0",
          )}
        >
          <Play className="size-6 translate-x-0.5 fill-current" />
        </span>
      </button>

      {/* Title chip */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-zinc-800 bg-[#09090b]/70 px-3 py-1 backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-violet-500" />
        <span className="text-xs font-medium text-zinc-300">{title}</span>
      </div>

      {/* Controls bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-200 transition-colors hover:bg-white/10"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 translate-x-px fill-current" />
          )}
        </button>

        <div className="flex flex-1 items-center gap-2">
          <span className="text-[11px] tabular-nums text-zinc-400">6:24</span>
          <div className="group/track relative h-1 flex-1 cursor-pointer rounded-full bg-zinc-700/60">
            <div className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-violet-500" />
            <span className="absolute left-[38%] top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 opacity-0 transition-opacity group-hover/track:opacity-100" />
          </div>
          <span className="text-[11px] tabular-nums text-zinc-500">16:48</span>
        </div>

        <div className="flex items-center gap-0.5 text-zinc-400">
          <button className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/10 hover:text-zinc-100" aria-label="Volume">
            <Volume2 className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/10 hover:text-zinc-100" aria-label="Settings">
            <Settings className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/10 hover:text-zinc-100" aria-label="Fullscreen">
            <Maximize className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
