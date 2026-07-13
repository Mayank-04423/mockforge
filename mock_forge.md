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



##  🔬 Deep-Dive Architectural Addendum: Mockforge Routing Engine
#### 1. The Serverless Routing Mechanics ([[...slug]])
Traditional backend routing frameworks (like Express or Spring Boot) maintain an in-memory routing tree compiled at boot time. In a native Next.js serverless architecture, this is replaced by a filesystem-based dynamic catch-all wrapper.

Incoming Request URL: /api/test/serve/v1/products/43063
                       │       │     └───────────────┘
                       │       │             │
        Next.js Base Folder  Static Path   Captured into: req.params.slug
                                           ['v1', 'products', '43063']
By nesting the API handler inside app/api/test/serve/[[...slug]]/route.ts, Next.js passes the trailing segments as an array of strings via the request parameters.

The Sanitization Pipeline
When url.pathname is read, it returns the complete absolute path string: /api/test/serve/v1/products/43063.
To isolate the endpoint blueprint configured by the user, we perform a deterministic string replacement:

TypeScript
let fullPath = url.pathname.replace('/api/test/serve', ''); 
This transforms the incoming URL into a standardized routing key: /v1/products/43063. We enforce prefix consistency with a safety checker:

TypeScript
if (!fullPath.startsWith('/')) { fullPath = '/' + fullPath; }
This guarantees that even if subfolder replacement leaves a raw token, the database query string remains formatted identically to our schema rules.

#### 2. The Tokenized O(N × M) Parameter Matching Algorithm
The primary challenge of a dynamic mock engine is that you cannot use standard unique database indexed lookups for dynamic URLs. If the database holds a path like /v1/users/:id, and the client requests /v1/users/43005, a standard SQL query (WHERE path = '/v1/users/43005') will return null.

To solve this, we implemented a custom segment tokenization engine.

Configured Blueprint:  [ '/' ] ──> [ 'v1' ] ──> [ 'products' ] ──> [ ':id' ]      (Stored Template)
                                      │              │               │
Incoming Request:      [ '/' ] ──> [ 'v1' ] ──> [ 'products' ] ──> [ '43063' ]    (Runtime Path)
                                      │              │               │
Evaluation Result:                 MATCH          MATCH          VARIABLE MATCH
                                                                 { id: '43063' }
Step-by-Step Algorithmic Breakdown
Filtering by HTTP Method Context:
To avoid running expensive string operations across the entire database table, we minimize our dataset by pulling only the routes that match the current HTTP verb:

TypeScript
const configuredEndpoints = await prisma.endpoint.findMany({ where: { method } });
Semantic Segment Array Chunking:
We break down the request path into an array of isolated text strings by stripping out the slashes:

TypeScript
const incomingSegments = fullPath.split('/').filter(seg => seg.length > 0);
Example: /v1/products/43063 becomes ['v1', 'products', '43063'] (Length = 3).

Structural O(1) Length Short-Circuit Evaluation:
Before running deep comparisons, we compare the length of the array chunks:

TypeScript
if (storedSegments.length !== incomingSegments.length) continue;
If a database rule has 2 segments (/v1/products) and the request has 3 segments (/v1/products/43063), the engine immediately skips it. This prevents unnecessary string parsing operations.

Dynamic Wildcard Variable Signature Extraction:
For rows passing the length filter, we loop through the segments sequentially:

TypeScript
if (storedSegments[i].startsWith(':')) {
  const paramName = storedSegments[i].slice(1); // Strips the ':' to get 'id'
  tempParams[paramName] = incomingSegments[i];   // Maps 'id' -> '43063'
}
If a segment starts with a colon (:), the engine registers it as a variable placeholder, captures the runtime value from the incoming request array at index i, and stores it in our metadata layout.

Static Segment Enforcements:
If a segment does not start with a colon, it must match the incoming path string precisely:

TypeScript
else if (storedSegments[i] !== incomingSegments[i]) { isMatch = false; break; }
If any static segment fails to match (e.g., comparing products against users), the loop breaks immediately and moves to evaluate the next potential row database candidate.

#### 3. The Front-end State Machine and Immutable Array Dispatch
On the frontend UI dashboard layer, when a developer updates their endpoints list view component, we avoid mutating standard component state arrays directly. Direct array mutation (state.push(item)) causes shallow pointer references to miss re-render schedules in React.

Instead, we use an Immutable State Update functional array pipeline:

TypeScript
setEndpoints(prev => [result.data, ...prev]);
How it executes under the hood:
Destructuring and Allocation: The updater intercepts the previous memory array pointer (prev).

Spread Operator Execution: The ...prev syntax copies all existing elements out into a brand new memory collection pointer reference.

Array Prepending Element Placement: The new item (result.data) is set at index 0.

Re-render Scheduler: Because the array pointer address changes, React instantly registers the delta change and appends the new API route badge cleanly at the top of the user dashboard view without requiring a manual page refresh.

#### 4. Relational Schema Data Layer (Prisma & PostgreSQL)
In our PostgreSQL model layer, we defined a clear one-to-many relationship mapping (Project 1 ── 0..* Endpoint) with an underlying explicit cascading wipe rule:

Code snippet
model Endpoint {
  id           String   @id @default(uuid())
  path         String   
  method       String   
  responseBody String   
  statusCode   Int      @default(200)
  projectId    String
  project      Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
onDelete: Cascade Enforcement: If a user deletes a master Project workspace container inside the dashboard, PostgreSQL triggers an internal foreign-key cascade constraint routine, automatically purging all nested mock Endpoint row entries from the disk to eliminate database record leakage.

### 🎯 How to Frame this in a Technical Interview
When an interviewer asks you to describe a complex feature you built for your project, copy this narrative structure:

The Problem: "I needed to build an API mock server engine capable of dynamically intercepting developer requests on the fly. The primary engineering challenge was that standard SQL lookups fail when URLs include dynamic route variables like /users/:id because the database cannot match a runtime integer against a string wildcard blueprint."

The Solution: "I built a customized full-stack runtime proxy engine using Next.js App Router dynamic path catch-alls ([[...slug]]) and a Prisma backend linked to PostgreSQL. I designed a tokenization routing algorithm that splits incoming request strings and database blueprints into semantic segment chunks. The engine performs an initial structural length short-circuit check to protect database performance, loops token-by-token to parse out dynamic colon variable prefixes, and passes the extracted parameters down to the response via metadata response headers (X-Mockforge-Params)."

The Result: "The engine achieves dynamic routing parsing execution latency of under 40 milliseconds locally on my Linux workstation, providing clean, immutable state panel updates on the frontend dashboard using React functional arrays."