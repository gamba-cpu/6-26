"use client";

import { useState } from "react";
import { Menu, ChevronRight, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { course } from "@/lib/course-data";
import { CurriculumSidebar } from "@/components/learning/curriculum-sidebar";
import { VideoPlayer } from "@/components/learning/video-player";
import { LessonTabs } from "@/components/learning/lesson-tabs";

export default function Page() {
  const [activeLessonId, setActiveLessonId] = useState("l5");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  const selectLesson = (id: string) => {
    setActiveLessonId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#09090b] text-zinc-100">
      {/* Desktop sidebar */}
      <CurriculumSidebar
        activeLessonId={activeLessonId}
        onSelectLesson={selectLesson}
        className="hidden lg:flex"
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 left-0 animate-in slide-in-from-left duration-200">
            <CurriculumSidebar
              activeLessonId={activeLessonId}
              onSelectLesson={selectLesson}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main canvas */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
            <nav className="flex min-w-0 items-center gap-1.5 text-sm">
              <span className="hidden truncate text-zinc-500 sm:inline">
                {course.name}
              </span>
              <ChevronRight className="hidden size-3.5 shrink-0 text-zinc-700 sm:inline" />
              <span className="hidden truncate text-zinc-500 sm:inline">
                {course.module}
              </span>
              <ChevronRight className="hidden size-3.5 shrink-0 text-zinc-700 sm:inline" />
              <span className="truncate font-medium text-zinc-200">
                {course.lesson}
              </span>
            </nav>
          </div>

          <button
            onClick={() => setComplete((c) => !c)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              complete
                ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                : "border-zinc-800 bg-zinc-100 text-zinc-900 hover:bg-white",
            )}
          >
            <Check className="size-4" strokeWidth={3} />
            <span className="hidden sm:inline">
              {complete ? "Completed" : "Mark as Complete"}
            </span>
            <span className="sm:hidden">{complete ? "Done" : "Complete"}</span>
          </button>
        </header>

        {/* Scrollable content */}
        <div className="scrollbar-thin flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
            <div>
              <p className="mb-1 text-xs font-medium tracking-wider text-violet-400 uppercase">
                {course.module} · Lesson 5
              </p>
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-100">
                {course.lesson}
              </h1>
            </div>

            <VideoPlayer title={course.lesson} />

            <LessonTabs />

            {/* Prev / Next */}
            <div className="flex items-center justify-between gap-3 pb-4">
              <button className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Color &amp; Contrast</span>
                <span className="sm:hidden">Previous</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-400">
                <span className="hidden sm:inline">Spacing &amp; Rhythm</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
