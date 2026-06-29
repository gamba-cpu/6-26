export type LessonStatus = "completed" | "in-progress" | "locked"

export type Lesson = {
  id: string
  title: string
  duration: string
  status: LessonStatus
}

export type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

export type Resource = {
  id: string
  name: string
  type: string
  size: string
}

export type Discussion = {
  id: string
  author: string
  initials: string
  time: string
  question: string
  replies: number
}

export const course = {
  name: "Design Systems Mastery",
  module: "Foundations",
  lesson: "Designing with Tokens",
}

export const modules: Module[] = [
  {
    id: "m1",
    title: "Getting Started",
    lessons: [
      { id: "l1", title: "Welcome to the Course", duration: "3:12", status: "completed" },
      { id: "l2", title: "Setting Up Your Workspace", duration: "8:40", status: "completed" },
      { id: "l3", title: "The Atomic Mindset", duration: "12:05", status: "completed" },
    ],
  },
  {
    id: "m2",
    title: "Foundations",
    lessons: [
      { id: "l4", title: "Color & Contrast", duration: "14:22", status: "completed" },
      { id: "l5", title: "Designing with Tokens", duration: "16:48", status: "in-progress" },
      { id: "l6", title: "Spacing & Rhythm", duration: "11:30", status: "locked" },
      { id: "l7", title: "Typographic Scale", duration: "13:15", status: "locked" },
    ],
  },
  {
    id: "m3",
    title: "Components",
    lessons: [
      { id: "l8", title: "Anatomy of a Button", duration: "9:54", status: "locked" },
      { id: "l9", title: "Form Patterns", duration: "18:02", status: "locked" },
      { id: "l10", title: "Composing Layouts", duration: "21:40", status: "locked" },
    ],
  },
  {
    id: "m4",
    title: "Shipping",
    lessons: [
      { id: "l11", title: "Documentation", duration: "10:18", status: "locked" },
      { id: "l12", title: "Versioning & Handoff", duration: "15:33", status: "locked" },
    ],
  },
]

export const resources: Resource[] = [
  { id: "r1", name: "Token Reference Sheet", type: "PDF", size: "1.2 MB" },
  { id: "r2", name: "Figma Starter File", type: "FIG", size: "4.8 MB" },
  { id: "r3", name: "globals.css Snippet", type: "CSS", size: "12 KB" },
  { id: "r4", name: "Color Ramp Generator", type: "JSON", size: "34 KB" },
]

export const discussions: Discussion[] = [
  {
    id: "d1",
    author: "Maya Chen",
    initials: "MC",
    time: "2h ago",
    question: "How do you decide between semantic tokens and primitive tokens for a new project?",
    replies: 4,
  },
  {
    id: "d2",
    author: "Devon Park",
    initials: "DP",
    time: "5h ago",
    question: "Is it worth abstracting spacing into tokens for a small side project, or is that overkill?",
    replies: 2,
  },
  {
    id: "d3",
    author: "Riya Anand",
    initials: "RA",
    time: "1d ago",
    question: "Loved the contrast section — any tips for testing tokens against WCAG automatically?",
    replies: 7,
  },
]
