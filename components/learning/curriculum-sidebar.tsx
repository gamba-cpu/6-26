"use client"

import { Check, Lock, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { course, modules, type LessonStatus } from "@/lib/course-data"

function StatusIndicator({ status }: { status: LessonStatus }) {
  if (status === "completed") {
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
        <Check className="size-3" strokeWidth={3} />
      </span>
    )
  }
  if (status === "in-progress") {
    return (
      <span className="relative flex size-5 shrink-0 items-center justify-center">
        <span className="absolute inline-flex size-5 animate-ping rounded-full bg-violet-500/30" />
        <span className="relative inline-flex size-2.5 rounded-full bg-violet-500 ring-2 ring-violet-500/40" />
      </span>
    )
  }
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-800 text-zinc-600">
      <Lock className="size-2.5" />
    </span>
  )
}

export function CurriculumSidebar({
  activeLessonId,
  onSelectLesson,
  onClose,
  className,
}: {
  activeLessonId: string
  onSelectLesson: (id: string) => void
  onClose?: () => void
  className?: string
}) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completed = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.status === "completed").length,
    0,
  )
  const progress = Math.round((completed / totalLessons) * 100)

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-zinc-800 bg-[#09090b]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-violet-500 text-sm font-bold text-white">
            L
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-zinc-100">Loop</p>
            <p className="text-[11px] text-zinc-500">Micro-Learning</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-300 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="border-b border-zinc-800 px-4 py-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-300">{course.name}</p>
          <span className="text-[11px] tabular-nums text-zinc-500">
            {completed}/{totalLessons}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Curriculum list */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-6">
          {modules.map((module, mi) => (
            <li key={module.id}>
              <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
                {String(mi + 1).padStart(2, "0")} · {module.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId
                  const isLocked = lesson.status === "locked"
                  return (
                    <li key={lesson.id}>
                      <button
                        disabled={isLocked}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={cn(
                          "group flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm transition-colors",
                          isActive
                            ? "bg-violet-500/10 text-zinc-100"
                            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
                          isLocked && "cursor-not-allowed opacity-60 hover:bg-transparent",
                        )}
                      >
                        <StatusIndicator status={lesson.status} />
                        <span
                          className={cn(
                            "flex-1 truncate",
                            isActive && "font-medium",
                          )}
                        >
                          {lesson.title}
                        </span>
                        <span className="text-[11px] tabular-nums text-zinc-600">
                          {lesson.duration}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
