// Defines the order subjects appear in when Notes is treated as one long
// course (cross-subject Prev/Next, and the full-course sidebar) rather
// than isolated per-subject silos.
//
// Current reasoning: fundamentals before specialization —
//   1. C Programming     — foundational syntax/memory model everything else assumes
//   2. OOP using C++     — builds directly on C
//   3. Operating Systems — core CS fundamentals, foundational for most exams
//   4. Computer Networks — core CS fundamentals
//   5. Big Data          — more specialized/advanced, assumes the above
//   6. AI & ML           — most specialized, placed last
//
// Adjust freely — this is a judgment call, not derived from anything else.
// A subject with zero real notes (a bare overview stub) is automatically
// skipped everywhere this is used, so it's safe to list subjects here
// before they have content.
export const notesCourseOrder = [
  'c-programming',
  'oops-using-cpp',
  'OS',
  'CN',
  'Big-Data',
  'AI-and-ML',
];
