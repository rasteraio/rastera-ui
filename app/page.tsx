"use client";

import { useState } from "react";

const examplePrompts = [
  "Map land-use change and flood risk for Arlington County, VA from 2018–2024",
  "Detect shoreline retreat hotspots along the North Carolina coast using 10 m DEMs",
  "Generate a GeoTIFF of wildfire susceptibility for Sonoma County using slope + aspect + fuel",
  "Rank parcels in Gdańsk by exposure to sunny-day flooding at 0.5 m sea-level rise",
];

const metrics = [
  { label: "Raster jobs automated", value: "10,000+" },
  { label: "Time saved per study", value: "→ 90%" },
  { label: "Supported rasters", value: "GeoTIFF, COG, NetCDF" },
  { label: "LLMs orchestrated", value: "4+" },
];

const steps = [
  {
    step: "1",
    title: "Ask a GeoAI question",
    body: "Describe the analysis in plain language – Rastera turns it into reproducible raster workflows.",
  },
  {
    step: "2",
    title: "Ingest rasters & STAC",
    body: "Drop in GeoTIFFs, COGs, or STAC collections. Rastera handles reprojection, tiling, and metadata.",
  },
  {
    step: "3",
    title: "Export maps & reports",
    body: "Get analysis-ready GeoTIFFs, vector layers, and branded PDFs you can send to decision-makers.",
  },
];

const useCases = [
  {
    title: "Cities & Counties",
    body: "Modernize comprehensive plans with parcel-scale climate and land-use intelligence.",
  },
  {
    title: "Climate & Resilience Teams",
    body: "Screen flood, heat, fire, and erosion risk in minutes instead of months.",
  },
  {
    title: "Consultants & PMCs",
    body: "Automate raster analytics and deliver client-ready figures on day one.",
  },
  {
    title: "Infrastructure Developers",
    body: "De-risk siting with fast, repeatable GeoAI scenarios across candidate sites.",
  },
];

export default function RasteraPage() {
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [selectedExample, setSelectedExample] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(
    "Rastera will summarize your analysis pipeline here – think of it as your GeoAI copilot for rasters."
  );

const handleRun = async () => {
  setIsRunning(true);
  setResult("Thinking through your GeoAI pipeline…");

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    // Prefer narrative from backend; fall back to listing pipeline steps
    if (data.narrative) {
      setResult(data.narrative);
    } else if (Array.isArray(data.pipeline)) {
      const stepsText = data.pipeline
        .map((step: any) => `${step.order}. ${step.name} – ${step.description}`)
        .join("\n");
      setResult(stepsText || "Rastera returned a response, but it was empty.");
    } else {
      setResult("Rastera returned a response, but it had no narrative or pipeline.");
    }
  } catch (err) {
    console.error(err);
    setResult(
      "⚠️ Something went wrong talking to the Rastera GeoAI backend. Check the logs or try again."
    );
  } finally {
    setIsRunning(false);
  }
};
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(16,185,129,0.16), transparent 60%), radial-gradient(circle at top right, rgba(56,189,248,0.14), transparent 55%), #020617",
        color: "#e5e7eb",
        padding: "1.5rem",
        boxSizing: "border-box",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        {/* NAVBAR */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 0 1.5rem 0",
            borderBottom: "1px solid rgba(30,64,175,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                height: "2rem",
                width: "2rem",
                borderRadius: "0.9rem",
                backgroundColor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(45,212,191,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              🌍
            </div>
            <span
              style={{
                fontWeight: 600,
                letterSpacing: "-0.03em",
                fontSize: "1.05rem",
              }}
            >
              Rastera
            </span>
          </div>
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.8rem",
              color: "#9ca3af",
            }}
          >
            <span>How it works</span>
            <span>Use cases</span>
            <span>Console</span>
            <span>Pricing</span>
          </nav>
          <div style={{ display: "flex", gap: "0.6rem", fontSize: "0.8rem" }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#e5e7eb",
                cursor: "pointer",
              }}
            >
              Log in
            </button>
            <button
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#22c55e",
                color: "#022c22",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Launch console
            </button>
          </div>
        </header>

        {/* HERO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: "2rem",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {/* Left side */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid rgba(16,185,129,0.55)",
                backgroundColor: "rgba(15,23,42,0.9)",
                fontSize: "0.75rem",
                marginBottom: "0.75rem",
                boxShadow: "0 0 16px rgba(16,185,129,0.25)",
              }}
            >
              <span style={{ marginRight: "0.4rem" }}>✨</span>
              <span>No-code GeoAI for raster analytics</span>
            </div>

            <h1
              style={{
                fontSize: "2.4rem",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
                letterSpacing: "-0.03em",
              }}
            >
              Turn satellite rasters into{" "}
              <span style={{ color: "#6ee7b7" }}>analysis-ready maps</span> —
              just by asking.
            </h1>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#9ca3af",
                maxWidth: "34rem",
                marginBottom: "1.2rem",
              }}
            >
              Rastera orchestrates multiple LLMs with a raster engine so
              planners, consultants, and climate teams can run complex
              Earth-observation workflows in minutes – no Python, no
              ModelBuilder.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <button
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#22c55e",
                  color: "#022c22",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                ▶ Try a sample analysis
              </button>
              <button
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid #374151",
                  backgroundColor: "rgba(15,23,42,0.8)",
                  color: "#e5e7eb",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Book a demo
              </button>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  marginLeft: "0.25rem",
                }}
              >
                LLM-native. GeoTIFF-first. Built for climate-scale questions.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "0.6rem",
                fontSize: "0.75rem",
              }}
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    borderRadius: "0.9rem",
                    border: "1px solid rgba(31,41,55,0.9)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    padding: "0.5rem 0.6rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      color: "#6ee7b7",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.68rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side – console card */}
          <div
            style={{
              borderRadius: "1rem",
              border: "1px solid rgba(31,41,55,0.9)",
              backgroundColor: "rgba(15,23,42,0.95)",
              padding: "1rem",
              boxShadow: "0 18px 60px rgba(15,23,42,0.9)",
              fontSize: "0.8rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.6rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span>🤖</span>
                <span style={{ fontWeight: 600 }}>Rastera Console</span>
              </div>
              <span
                style={{
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(45,212,191,0.7)",
                  backgroundColor: "rgba(16,185,129,0.12)",
                  color: "#6ee7b7",
                }}
              >
                Prototype
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                resize: "vertical",
                borderRadius: "0.6rem",
                border: "1px solid #374151",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                padding: "0.6rem",
                fontSize: "0.8rem",
                boxSizing: "border-box",
                marginBottom: "0.5rem",
              }}
              placeholder="Describe the analysis you want Rastera to run…"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  fontSize: "0.68rem",
                  color: "#9ca3af",
                }}
              >
                {["GeoTIFF", "COG", "STAC", "DEM"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      borderRadius: "999px",
                      border: "1px solid #374151",
                      padding: "0.15rem 0.45rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  type="button"
                  style={{
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    padding: "0.3rem 0.55rem",
                    cursor: "pointer",
                  }}
                  onClick={() => alert("File upload wiring comes later – this is just the UI shell.")}
                >
                  ⬆ Upload
                </button>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={isRunning}
                  style={{
                    borderRadius: "0.5rem",
                    border: "none",
                    backgroundColor: "#22c55e",
                    color: "#022c22",
                    padding: "0.3rem 0.75rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {isRunning ? "Running…" : "Run analysis →"}
                </button>
              </div>
            </div>

            <div
              style={{
                borderRadius: "0.7rem",
                border: "1px solid #1f2937",
                backgroundColor: "#020617",
                padding: "0.55rem",
                fontSize: "0.75rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  marginBottom: "0.2rem",
                }}
              >
                Pipeline preview
              </div>
              <p>{result}</p>
            </div>

            <div
              style={{
                marginTop: "0.6rem",
                display: "grid",
                gap: "0.3rem",
              }}
            >
              {examplePrompts.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSelectedExample(i);
                    setPrompt(ex);
                  }}
                  style={{
                    textAlign: "left",
                    borderRadius: "0.5rem",
                    padding: "0.35rem 0.5rem",
                    fontSize: "0.72rem",
                    border:
                      i === selectedExample
                        ? "1px solid rgba(45,212,191,0.8)"
                        : "1px solid #1f2937",
                    backgroundColor:
                      i === selectedExample ? "#020617" : "rgba(15,23,42,0.9)",
                    color: "#e5e7eb",
                    cursor: "pointer",
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: "3rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1rem",
              alignItems: "flex-end",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}
              >
                How Rastera works
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                  maxWidth: "32rem",
                }}
              >
                Under the hood, Rastera chains multiple LLMs with a raster
                engine, STAC catalogs, and geospatial best practices so you
                don’t have to babysit projections, nodata, or tiling.
              </p>
            </div>
            <p style={{ fontSize: "0.7rem", color: "#6b7280" }}>
              Built for GIS leads, climate analysts, and infrastructure teams
              who are tired of one-off scripts.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: "1rem",
              fontSize: "0.8rem",
            }}
          >
            {steps.map((s) => (
              <div
                key={s.step}
                style={{
                  borderRadius: "1rem",
                  border: "1px solid rgba(31,41,55,0.9)",
                  backgroundColor: "rgba(15,23,42,0.95)",
                  padding: "0.9rem",
                }}
              >
                <div
                  style={{
                    height: "2rem",
                    width: "2rem",
                    borderRadius: "0.8rem",
                    backgroundColor: "#020617",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(45,212,191,0.7)",
                    fontSize: "0.8rem",
                    color: "#6ee7b7",
                  }}
                >
                  {s.step}
                </div>
                <h3
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.8rem",
                    color: "#9ca3af",
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* USE CASES */}
        <section style={{ marginTop: "3rem" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
            }}
          >
            Who Rastera is for
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#9ca3af",
              marginBottom: "1.1rem",
              maxWidth: "32rem",
            }}
          >
            From coastal resilience to nuclear siting, Rastera gives you a
            canvas for serious Earth-data questions – without waiting on a data
            team.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0,1fr))",
              gap: "1rem",
              fontSize: "0.8rem",
            }}
          >
            {useCases.map((u) => (
              <div
                key={u.title}
                style={{
                  borderRadius: "1rem",
                  border: "1px solid rgba(31,41,55,0.9)",
                  backgroundColor: "rgba(15,23,42,0.96)",
                  padding: "0.9rem",
                }}
              >
                <div style={{ fontSize: "1.1rem" }}>📌</div>
                <h3
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {u.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.8rem",
                    color: "#9ca3af",
                  }}
                >
                  {u.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section style={{ marginTop: "3rem", marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
            }}
          >
            Start with pilots, grow to platforms
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#9ca3af",
              marginBottom: "1.1rem",
              maxWidth: "32rem",
            }}
          >
            Use Rastera as a silent engine behind your existing workflows – or
            as the branded GeoAI console your clients log into every day.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: "1rem",
              fontSize: "0.8rem",
            }}
          >
            {/* Pilot */}
            <div
              style={{
                borderRadius: "1rem",
                border: "1px solid rgba(31,41,55,0.9)",
                backgroundColor: "rgba(15,23,42,0.96)",
                padding: "0.9rem",
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: "0.9rem" }}>Pilot</h3>
              <p
                style={{
                  marginTop: "0.4rem",
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                }}
              >
                Perfect for one city, watershed, or asset class. Validate the
                workflows, collect wins, and tune the prompts.
              </p>
              <ul
                style={{ marginTop: "0.4rem", paddingLeft: "1rem", color: "#d1d5db" }}
              >
                <li>Up to 3 projects</li>
                <li>Shared workspace</li>
                <li>Branded reports</li>
              </ul>
              <button
                style={{
                  marginTop: "0.7rem",
                  width: "100%",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.6rem",
                  border: "none",
                  backgroundColor: "#111827",
                  color: "#e5e7eb",
                  cursor: "pointer",
                }}
              >
                Talk about a pilot
              </button>
            </div>

            {/* Growth */}
            <div
              style={{
                borderRadius: "1rem",
                border: "1px solid rgba(45,212,191,0.75)",
                backgroundColor: "rgba(15,23,42,0.98)",
                padding: "0.9rem",
                boxShadow: "0 0 30px rgba(16,185,129,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontWeight: 600, fontSize: "0.9rem" }}>Growth</h3>
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(45,212,191,0.7)",
                    backgroundColor: "rgba(16,185,129,0.12)",
                    color: "#6ee7b7",
                  }}
                >
                  Most popular
                </span>
              </div>
              <p
                style={{
                  marginTop: "0.4rem",
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                }}
              >
                For teams turning Rastera into their default raster stack. Add
                more users, data connections, and production SLAs.
              </p>
              <ul
                style={{ marginTop: "0.4rem", paddingLeft: "1rem", color: "#d1d5db" }}
              >
                <li>Unlimited projects</li>
                <li>Team workspaces & RBAC</li>
                <li>Priority job queue</li>
              </ul>
              <button
                style={{
                  marginTop: "0.7rem",
                  width: "100%",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.6rem",
                  border: "none",
                  backgroundColor: "#22c55e",
                  color: "#022c22",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Book a strategy call
              </button>
            </div>

            {/* Embedded */}
            <div
              style={{
                borderRadius: "1rem",
                border: "1px solid rgba(31,41,55,0.9)",
                backgroundColor: "rgba(15,23,42,0.96)",
                padding: "0.9rem",
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: "0.9rem" }}>Embedded</h3>
              <p
                style={{
                  marginTop: "0.4rem",
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                }}
              >
                White-label Rastera inside your own platform or client portal.
                You own the front-end, we power the GeoAI engine.
              </p>
              <ul
                style={{ marginTop: "0.4rem", paddingLeft: "1rem", color: "#d1d5db" }}
              >
                <li>Custom SLAs</li>
                <li>Private cloud or VPC</li>
                <li>Solution engineering support</li>
              </ul>
              <button
                style={{
                  marginTop: "0.7rem",
                  width: "100%",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.6rem",
                  border: "none",
                  backgroundColor: "#111827",
                  color: "#e5e7eb",
                  cursor: "pointer",
                }}
              >
                Discuss embedded options
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid #1f2937",
            paddingTop: "0.75rem",
            fontSize: "0.7rem",
            color: "#6b7280",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            paddingBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span>🌍</span>
            <span>Rastera • No-code GeoAI for a changing planet.</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <span>Product</span>
            <span>Docs</span>
            <span>Security</span>
            <span>Contact</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
