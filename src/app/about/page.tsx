export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        ABOUT
      </h1>

      <div className="space-y-6 text-sm leading-relaxed">
        <p>
          VOLT IS A BRUTALIST BLOG BUILT ON RAISFAST &mdash; A RUST-POWERED
          HIGH-PERFORMANCE BACKEND-AS-A-SERVICE AND HEADLESS CMS. SINGLE BINARY.
          ZERO DEPENDENCIES. ZERO GC.
        </p>
        <p>
          THIS PLATFORM COMBINES RAW PERFORMANCE WITH A NO-NONSENSE DESIGN
          PHILOSOPHY. MONO FONTS. THICK BORDERS. NO BORDER RADIUS. FORM FOLLOWS
          FUNCTION.
        </p>
        <p>
          BUILT FOR DEVELOPERS WHO SHIP FAST AND REFUSE TO COMPROMISE. POWERED
          BY SQLITE, POSTGRESQL, AND MYSQL WITH PLUGIN ENGINES FOR JS, RHAI,
          LUA, AND WASM.
        </p>

        <hr className="border-t-3 border-foreground" />

        <div className="border-3 border-foreground p-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4">
            STACK
          </h2>
          <ul className="space-y-2 text-sm">
            <li>&gt; RUST / AXUM / SQLX</li>
            <li>&gt; NEXT.JS / REACT / TAILWINDCSS</li>
            <li>&gt; MONO FONT. ALL CAPS. NO CURVES.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
