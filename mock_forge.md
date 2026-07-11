# 🗺️ MockForge Project Architecture Manual (v1)
*Comprehensive System Mapping & Technical Interview Reference Blueprint*

---

## 🧠 1. The System Mental Model

If you understand a **URL Shortener**, you already understand 90% of **MockForge**. Let’s trace the exact conceptual transition:

* **URL Shortener Flow:** User hits custom path (e.g., `/xyz`) ──> Server looks up code in DB ──> Redirects browser to destination URL.
* **MockForge Flow:** User hits custom path (e.g., `/api/v1/users`) ──> Server looks up path in state ──> Returns custom mock JSON payload.

In a URL shortener, the server intercepts an incoming request, looks at the unique path variable, fetches the matching destination, and passes it back to the browser client. MockForge does the exact same thing, but instead of sending back a redirect command, it sends back raw simulated endpoint metrics, custom formatted headers, and mock structural data.

---

## 📂 2. Granular Project File Tree

Here is how our custom UI structural layer is wired inside Next.js:

```text
my-mockforge-app/
├── app/
│   └── dashboard/
│       ├── layout.tsx     <-- The Frame Canvas (Sidebar, Header, Main Shell, Base Colors)
│       └── page.tsx       <-- The Workspace Engine (Metrics Cards, Active Table, Live Logs, Modal Form)
├── public/                <-- Asset Storage (Custom vector icons, SVGs, or branding logos)
└── package.json           <-- Dependency Tracker (Next.js, Tailwind CSS)

Core Responsibilities:
layout.tsx: Governs global app state frameworks. It sets the baseline layout wrapper, background surfaces, sidebar navigation, profile tier tags, and sticky top headers.

page.tsx: Handles localized, reactive interface components. It controls form interactions, dynamically maps arrays into tabular trees, triggers background interval hooks, and updates standard client interfaces.
```

---

## 🎛️ 3. Immutable State Flow Pipeline
In React, mutating state directly is strictly forbidden because it breaks the reactive render loop. Here is the exact architectural pipeline of our endpoint table update:

User clicks "Deploy Router"

handleCreateMock Intercepts Form Submissions

Packages input fields into a new newEndpoint object

Triggers setEndpoints(prev => [newEndpoint, ...prev])

...prev takes a shallow copy of the existing array in memory.

newEndpoint is dropped cleanly in front of the copied elements.

React detects a brand new reference pointer and forces a crisp UI re-render.

By executing an immutable prepending operation, we guarantee that our data grid table pulls the fresh record onto the top row instantly without requiring a full browser tab reload.

## 🎨 4. Premium Light-Theme Design System Chart
You designed a custom luxury palette optimized for high-end workspace tools. Here is the definitive specification tracker:

Main Canvas Base (#F7F7F5): bg-[#F7F7F5] ── Eliminates blue-light glare and reduces chronic eye strain.

Sidebar Canvas (#EFEFEF): bg-[#EFEFEF] ── Establishes absolute layout boundaries using flat structural contrast.

Primary Text Core (#2D3142): text-[#2D3142] ── Muted charcoal tone that provides top-tier legibility without layout harshness.

Secondary Metadata (#767B91): text-[#767B91] ── Cool grey variant utilized exclusively for minor timestamp text lines.

Core Interactive Color (#9B729F): bg-[#9B729F] ── Desaturated purple accent code for active state toggles and primary buttons.

## ⚡ Custom HTTP Method Badge Factories
GET Badge: bg-[#4a7c59]/15 text-[#4a7c59] border border-[#4a7c59]/20 (Muted Deep Forest Green)

POST Badge: bg-[#b58a63]/15 text-[#b58a63] border border-[#b58a63]/20 (Sophisticated Ochre Tan)

DELETE Badge: bg-[#9a5a60]/15 text-[#9a5a60] border border-[#9a5a60]/20 (Dusty Elegant Crimson)

## 📟 5. Asynchronous Live Logging Engine
To simulate active engine packets dropping into our terminal log interface, we built an async lifecycle window inside a useEffect hook:
useEffect(() => {
  const interval = setInterval(() => {
    // 1. Compute dynamic random routes, HTTP methods, and statuses from pools
    // 2. Format a native HH:MM:SS timestamp object
    // 3. Assemble the newLog structural tracking packet
    
    setLogs(prev => [newLog, ...prev.slice(0, 4)]);
  }, 4000);

  return () => clearInterval(interval); // <-- Crucial Garbage Clean
}, []);

Why .slice(0, 4) is Critical:
Without slicing, the log array would grow in computer memory infinitely as long as the user leaves the tab open. By applying .slice(0, 4) before spreading the old state, we maintain a hard 4-row interface buffer window. Old packets drop out of the array dynamically, allowing native garbage disposal routines to clean them out automatically.

## 🗣️ 6. Technical Interview Scripting Blueprints
When an interviewer asks you to explain this system architecture, here are your word-for-word pitch scripts:

Pitching the Front-End Architecture:
"For MockForge's workspace dashboard, I stepped away from standard generic high-contrast dark templates and engineered a sophisticated, high-fidelity light theme leveraging a custom muted jewel-tone design system. The system layout relies on strict Next.js structural architecture, splitting global framing context in layout.tsx from localized client components in page.tsx. All state transitions—such as turning virtual endpoints on or off—are handled via strict React immutability rules using array mapping spreads to maintain predictable, lightweight re-rendering pipelines."

Pitching the Real-Time Request Stream Panel:
"To mimic live backend traffic processing pipelines without loading down the application with heavy initial server architectures, I set up a decoupled asynchronous runtime process using a React useEffect interval hook. The simulator runs on a 4-second execution cycle, picking randomly from status-code and method matrices to construct active request logs. To shield the application from performance degradation or structural overflow errors during prolonged monitoring cycles, I introduced layout restrictions using native array boundary slices, keeping the background render tree consistently optimized."