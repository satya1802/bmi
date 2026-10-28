// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Trash, ArrowLeft, ArrowRight, AlertCircle } = Icons;

const PRODUCT = "BMI";
const SCREEN = "BMI Calculator";
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const UNITS = [
  { key: "metric", wf: "i-2-0-0", label: "Metric (kg, cm)", short: "METRIC" },
  { key: "imperial", wf: "i-2-0-1", label: "Imperial (lb, ft/in)", short: "IMPERIAL" },
];

const CATEGORIES = [
  { wf: "i-6-0-0", name: "Underweight", range: "below 18.5", paren: "below 18.5" },
  { wf: "i-6-0-1", name: "Normal", range: "18.5 to 24.9", paren: "18.5 – 24.9" },
  { wf: "i-6-0-2", name: "Overweight", range: "25 to 29.9", paren: "25 – 29.9" },
  { wf: "i-6-0-3", name: "Obese", range: "30 and above", paren: "30 and above" },
];

const EMPTY_FIELDS = { cm: "", kg: "", ft: "", inch: "", lb: "" };

const LB_PER_KG = 2.2046226;

function toNum(raw) {
  const t = String(raw).trim();
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

function categoryFor(bmi) {
  if (bmi < 18.5) return CATEGORIES[0];
  if (bmi < 25) return CATEGORIES[1];
  if (bmi < 30) return CATEGORIES[2];
  return CATEGORIES[3];
}

function trimZero(n) {
  return String(Number(n.toFixed(1)));
}

function convertFields(fields, from) {
  if (from === "metric") {
    const cm = toNum(fields.cm);
    const kg = toNum(fields.kg);
    const next = { ...EMPTY_FIELDS };
    if (cm !== null && !Number.isNaN(cm) && cm > 0) {
      const totalIn = cm / 2.54;
      const ft = Math.floor(totalIn / 12);
      next.ft = String(ft);
      next.inch = trimZero(totalIn - ft * 12);
    } else {
      next.ft = fields.cm;
    }
    next.lb = kg !== null && !Number.isNaN(kg) && kg > 0 ? trimZero(kg * LB_PER_KG) : fields.kg;
    return next;
  }
  const ft = toNum(fields.ft);
  const inch = toNum(fields.inch);
  const lb = toNum(fields.lb);
  const next = { ...EMPTY_FIELDS };
  const ftOk = ft !== null && !Number.isNaN(ft) && ft >= 0;
  const inOk = inch === null || (!Number.isNaN(inch) && inch >= 0);
  if (ftOk && inOk) {
    const totalIn = ft * 12 + (inch === null ? 0 : inch);
    next.cm = totalIn > 0 ? String(Math.round(totalIn * 2.54)) : "";
  } else {
    next.cm = fields.ft;
  }
  next.kg = lb !== null && !Number.isNaN(lb) && lb > 0 ? trimZero(lb / LB_PER_KG) : fields.lb;
  return next;
}

export default function Screen() {
  const thick = `3px solid ${brand.primaryColor}`;
  const hairline = `1px solid ${brand.primaryColor}`;
  const [unit, setUnit] = React.useState("metric");
  const [fields, setFields] = React.useState(EMPTY_FIELDS);
  const [cleared, setCleared] = React.useState(false);
  const tabRefs = React.useRef([]);

  const metric = unit === "metric";

  const setField = (name) => (event) => {
    const value = event.target.value;
    setCleared(false);
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const chooseUnit = (nextKey) => {
    if (nextKey === unit) return;
    setFields((prev) => convertFields(prev, unit));
    setUnit(nextKey);
    setCleared(false);
  };

  const onTabKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const current = UNITS.findIndex((u) => u.key === unit);
    const next = (current + (event.key === "ArrowRight" ? 1 : UNITS.length - 1)) % UNITS.length;
    chooseUnit(UNITS[next].key);
    const node = tabRefs.current[next];
    if (node) node.focus();
  };

  // ---- validation -------------------------------------------------------
  let height = { kind: "pending", msg: metric
    ? "Enter your height in centimetres."
    : "Enter your height in feet and inches." };
  let heightM = null;
  let heightIn = null;

  if (metric) {
    const cm = toNum(fields.cm);
    if (cm === null) {
      // pending
    } else if (Number.isNaN(cm)) {
      height = { kind: "error", msg: "Height must be a number — remove any letters or symbols." };
    } else if (cm <= 0) {
      height = { kind: "error", msg: "Enter a height greater than 0 — numbers only." };
    } else if (cm < 50 || cm > 272) {
      height = { kind: "error", msg: "Height must be between 50 and 272 cm for the adult formula." };
    } else {
      height = { kind: "ok", msg: "" };
      heightM = cm / 100;
    }
  } else {
    const ft = toNum(fields.ft);
    const inch = toNum(fields.inch);
    if (ft === null && inch === null) {
      // pending
    } else if (Number.isNaN(ft) || Number.isNaN(inch)) {
      height = { kind: "error", msg: "Height must be a number — remove any letters or symbols." };
    } else if ((ft !== null && ft < 0) || (inch !== null && inch < 0)) {
      height = { kind: "error", msg: "Enter a height greater than 0 — numbers only." };
    } else if (inch !== null && inch >= 12) {
      height = { kind: "error", msg: "Inches must be between 0 and 11 — add whole feet instead." };
    } else {
      const total = (ft === null ? 0 : ft) * 12 + (inch === null ? 0 : inch);
      if (total <= 0) {
        height = { kind: "error", msg: "Enter a height greater than 0 — numbers only." };
      } else if (total < 20 || total > 107) {
        height = { kind: "error", msg: "Height must be between 1 ft 8 in and 8 ft 11 in for the adult formula." };
      } else {
        height = { kind: "ok", msg: "" };
        heightIn = total;
      }
    }
  }

  let weight = { kind: "pending", msg: metric
    ? "Enter your weight in kilograms."
    : "Enter your weight in pounds." };
  let weightKg = null;
  let weightLb = null;
  const rawWeight = metric ? fields.kg : fields.lb;
  const w = toNum(rawWeight);
  if (w === null) {
    // pending
  } else if (Number.isNaN(w)) {
    weight = { kind: "error", msg: "Weight must be a number — remove any letters or symbols." };
  } else if (w <= 0) {
    weight = { kind: "error", msg: "Enter a weight greater than 0 — numbers only." };
  } else if (metric && (w < 10 || w > 500)) {
    weight = { kind: "error", msg: "Weight must be between 10 and 500 kg for the adult formula." };
  } else if (!metric && (w < 22 || w > 1100)) {
    weight = { kind: "error", msg: "Weight must be between 22 and 1100 lb for the adult formula." };
  } else {
    weight = { kind: "ok", msg: "" };
    if (metric) weightKg = w;
    else weightLb = w;
  }

  const hasError = height.kind === "error" || weight.kind === "error";
  const bothOk = height.kind === "ok" && weight.kind === "ok";

  let bmi = null;
  if (bothOk) {
    const raw = metric ? weightKg / (heightM * heightM) : (703 * weightLb) / (heightIn * heightIn);
    bmi = Math.round(raw * 10) / 10;
  }
  const category = bmi === null ? null : categoryFor(bmi);

  const inputSummary = metric
    ? `${fields.cm.trim()} cm and ${fields.kg.trim()} kg`
    : `${String(toNum(fields.ft) === null ? 0 : toNum(fields.ft))} ft ${String(toNum(fields.inch) === null ? 0 : toNum(fields.inch))} in and ${fields.lb.trim()} lb`;

  let statusLine;
  if (bothOk) {
    statusLine = `Calculated from ${inputSummary} — worked out in this browser, nothing sent anywhere.`;
  } else if (hasError) {
    statusLine = "Fix the field marked below — your BMI appears the moment both values are valid.";
  } else {
    statusLine = "Enter a height greater than 0 — numbers only.";
  }

  const anyTyped = Object.keys(fields).some((k) => String(fields[k]).trim() !== "");

  const fieldStyle = {
    border: thick,
    borderRadius: brand.radius,
    backgroundColor: brand.backgroundColor,
    color: brand.primaryColor,
    fontFamily: MONO,
    fontVariantNumeric: "tabular-nums",
    outlineColor: brand.accentColor,
  };
  const fieldClass =
    "mt-2 w-full px-4 py-3 text-2xl font-bold focus:outline focus:outline-[3px] focus:outline-offset-2";
  const labelClass = "text-xs font-bold uppercase tracking-[0.2em]";

  return (
    <div style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`
        @keyframes bmi-stamp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .bmi-stamp { animation: bmi-stamp 220ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .bmi-stamp { animation: none; }
          .bmi-shift { transition: none !important; }
        }
      `}</style>

      {/* b-0-0 page title */}
      <header
        data-wf="b-0-0"
        className="flex flex-wrap items-end justify-between gap-4 pb-4"
        style={{ borderBottom: thick }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
            {PRODUCT} / Calculator
          </p>
          <h1
            className="mt-2 text-6xl font-bold leading-none tracking-tight sm:text-7xl"
            style={{ fontFamily: brand.fontHeading }}
          >
            {SCREEN}
          </h1>
        </div>
        <p
          className="text-[11px] uppercase leading-5 tracking-[0.2em] sm:text-right"
          style={{ fontFamily: MONO, color: brand.neutralColor }}
        >
          No account<br className="hidden sm:block" /> No payment<br className="hidden sm:block" /> No storage
        </p>
      </header>

      {/* b-1-0 intro */}
      <p data-wf="b-1-0" className="mt-6 max-w-[62ch] text-base leading-relaxed">
        Enter your height and weight to see your BMI and its WHO adult category instantly. Nothing is sent to a
        server or saved.
      </p>

      {/* b-2-0 units */}
      <section data-wf="b-2-0" className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
          01 / Units
        </h2>
        <div
          role="tablist"
          aria-label="Units"
          onKeyDown={onTabKeyDown}
          className="mt-3 flex flex-wrap gap-6 py-4"
          style={{ borderTop: thick, borderBottom: thick, fontFamily: MONO }}
        >
          {UNITS.map((u, i) => {
            const active = unit === u.key;
            return (
              <button
                key={u.key}
                data-wf={u.wf}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`unit-tab-${u.key}`}
                aria-selected={active}
                aria-controls="measurements-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => chooseUnit(u.key)}
                className="min-h-[44px] px-1 text-sm font-bold focus:outline focus:outline-[3px] focus:outline-offset-2"
                style={{
                  textDecoration: active ? "underline" : "none",
                  textDecorationThickness: 3,
                  textUnderlineOffset: 6,
                  color: active ? brand.primaryColor : brand.neutralColor,
                  outlineColor: brand.accentColor,
                }}
              >
                [{u.label}]
              </button>
            );
          })}
        </div>
      </section>

      {/* b-3-0 form */}
      <section
        data-wf="b-3-0"
        id="measurements-panel"
        role="tabpanel"
        aria-labelledby={`unit-tab-${unit}`}
        className="mt-8"
      >
        <h2 className="text-3xl font-bold leading-tight" style={{ fontFamily: brand.fontHeading }}>
          Your measurements
        </h2>
        <form
          className="mt-4 grid gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-6"
          onSubmit={(event) => event.preventDefault()}
          style={{
            border: thick,
            borderRadius: brand.radius,
            boxShadow: `6px 6px 0 ${brand.primaryColor}`,
            backgroundColor: brand.backgroundColor,
          }}
        >
          <div>
            {metric ? (
              <>
                <Label htmlFor="height-cm" className={labelClass} style={{ fontFamily: MONO }}>
                  Height (cm)
                </Label>
                <Input
                  data-wf="i-3-0-0"
                  id="height-cm"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="e.g. 175"
                  value={fields.cm}
                  onChange={setField("cm")}
                  aria-invalid={height.kind === "error" ? "true" : undefined}
                  aria-describedby="height-note"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </>
            ) : (
              <>
                <span className={labelClass} style={{ fontFamily: MONO }} id="height-group-label">
                  Height (ft / in)
                </span>
                <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="height-group-label">
                  <div>
                    <Label htmlFor="height-ft" className="sr-only">
                      Height in feet
                    </Label>
                    <Input
                      data-wf="i-3-0-0"
                      id="height-ft"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="e.g. 5"
                      value={fields.ft}
                      onChange={setField("ft")}
                      aria-invalid={height.kind === "error" ? "true" : undefined}
                      aria-describedby="height-note"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                    <span
                      className="mt-1 block text-[11px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: MONO, color: brand.neutralColor }}
                    >
                      Feet
                    </span>
                  </div>
                  <div>
                    <Label htmlFor="height-in" className="sr-only">
                      Height in inches
                    </Label>
                    <Input
                      id="height-in"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="e.g. 9"
                      value={fields.inch}
                      onChange={setField("inch")}
                      aria-invalid={height.kind === "error" ? "true" : undefined}
                      aria-describedby="height-note"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                    <span
                      className="mt-1 block text-[11px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: MONO, color: brand.neutralColor }}
                    >
                      Inches
                    </span>
                  </div>
                </div>
              </>
            )}
            <p
              id="height-note"
              className="mt-2 text-xs leading-relaxed"
              style={{
                fontFamily: MONO,
                color: height.kind === "error" ? brand.accentColor : brand.neutralColor,
              }}
            >
              {height.kind === "error" ? (
                <span className="inline-flex items-start gap-1 font-bold">
                  <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Height: {height.msg}</span>
                </span>
              ) : height.kind === "pending" ? (
                height.msg
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Height accepted
                </span>
              )}
            </p>
          </div>

          <div>
            <Label htmlFor="weight-value" className={labelClass} style={{ fontFamily: MONO }}>
              {metric ? "Weight (kg)" : "Weight (lb)"}
            </Label>
            <Input
              data-wf="i-3-0-1"
              id="weight-value"
              inputMode="decimal"
              autoComplete="off"
              placeholder={metric ? "e.g. 70" : "e.g. 154"}
              value={metric ? fields.kg : fields.lb}
              onChange={setField(metric ? "kg" : "lb")}
              aria-invalid={weight.kind === "error" ? "true" : undefined}
              aria-describedby="weight-note"
              className={fieldClass}
              style={fieldStyle}
            />
            <p
              id="weight-note"
              className="mt-2 text-xs leading-relaxed"
              style={{
                fontFamily: MONO,
                color: weight.kind === "error" ? brand.accentColor : brand.neutralColor,
              }}
            >
              {weight.kind === "error" ? (
                <span className="inline-flex items-start gap-1 font-bold">
                  <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Weight: {weight.msg}</span>
                </span>
              ) : weight.kind === "pending" ? (
                weight.msg
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Weight accepted
                </span>
              )}
            </p>
          </div>
        </form>
      </section>

      {/* b-4-0 status / validation line */}
      <p
        data-wf="b-4-0"
        aria-live="polite"
        className="mt-4 max-w-[62ch] text-sm leading-relaxed"
        style={{
          fontFamily: MONO,
          fontVariantNumeric: "tabular-nums",
          color: hasError ? brand.accentColor : brand.neutralColor,
        }}
      >
        {statusLine}
      </p>

      {/* b-5-0 result */}
      <section data-wf="b-5-0" className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
          02 / Result
        </h2>
        <div
          className="bmi-shift mt-3 p-6 transition-transform sm:p-8"
          style={{
            border: thick,
            borderRadius: brand.radius,
            boxShadow: `6px 6px 0 ${bmi === null ? brand.primaryColor : brand.accentColor}`,
            backgroundColor: brand.backgroundColor,
          }}
        >
          {bmi !== null ? (
            <div key={`${bmi}-${category.name}`} className="bmi-stamp">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: MONO }}
              >
                Your BMI
              </p>
              <p
                className="mt-2 text-7xl font-bold leading-none sm:text-8xl"
                style={{ fontFamily: brand.fontHeading, fontVariantNumeric: "tabular-nums" }}
              >
                {bmi.toFixed(1)}
              </p>
              <div className="mt-5 pt-4" style={{ borderTop: thick }}>
                <p
                  className="text-3xl font-bold leading-tight sm:text-4xl"
                  style={{ fontFamily: brand.fontHeading }}
                >
                  {category.name}
                </p>
                <p
                  className="mt-1 text-sm font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, fontVariantNumeric: "tabular-nums" }}
                >
                  WHO adult range: {category.paren}
                </p>
                <p className="mt-3 text-xs" style={{ fontFamily: MONO, color: brand.neutralColor }}>
                  {metric ? "kg ÷ m²" : "703 × lb ÷ in²"} · {UNITS.find((u) => u.key === unit).short} · updates as you type
                </p>
              </div>
            </div>
          ) : hasError ? (
            <div>
              <p
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: MONO, color: brand.accentColor }}
              >
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                Not calculated
              </p>
              <p
                className="mt-2 text-4xl font-bold leading-tight sm:text-5xl"
                style={{ fontFamily: brand.fontHeading }}
              >
                Check one value and it lands here
              </p>
              <p className="mt-3 max-w-[56ch] text-sm leading-relaxed" style={{ fontFamily: MONO }}>
                {height.kind === "error" ? height.msg : weight.msg} Your typing is kept exactly as you left it.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
                Awaiting measurements
              </p>
              <p
                className="mt-2 text-7xl font-bold leading-none sm:text-8xl"
                style={{ fontFamily: brand.fontHeading, color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}
              >
                --.-
              </p>
              <p
                className="mt-5 max-w-[56ch] pt-4 text-sm leading-relaxed"
                style={{ borderTop: thick, fontFamily: MONO }}
              >
                Fill in both fields above. The figure and its WHO category print here straight away — no submit
                button, no waiting.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* b-6-0 WHO categories */}
      <section data-wf="b-6-0" className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
          03 / WHO adult categories
        </h2>
        <ol className="mt-4 space-y-5">
          {CATEGORIES.map((c, index) => {
            const active = category !== null && category.name === c.name;
            return (
              <li
                key={c.name}
                data-wf={c.wf}
                className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 p-4 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:gap-6 sm:p-5"
                style={{
                  border: thick,
                  borderRadius: brand.radius,
                  boxShadow: `6px 6px 0 ${active ? brand.accentColor : brand.primaryColor}`,
                  backgroundColor: brand.backgroundColor,
                }}
              >
                <span
                  className="text-4xl font-bold sm:text-5xl"
                  style={{ fontFamily: brand.fontHeading, fontVariantNumeric: "tabular-nums" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: brand.fontHeading }}>
                    {c.name}
                  </span>
                  <span
                    className="mt-1 block text-xs uppercase tracking-[0.18em]"
                    style={{ fontFamily: MONO, fontVariantNumeric: "tabular-nums" }}
                  >
                    BMI {c.range}
                  </span>
                </span>
                <span
                  className="col-span-2 text-xs font-bold uppercase tracking-[0.2em] sm:col-span-1 sm:text-right"
                  style={{ fontFamily: MONO, color: active ? brand.accentColor : brand.neutralColor }}
                >
                  {active ? (
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Your range
                    </span>
                  ) : (
                    "—"
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* b-7-0 clear */}
      <div className="mt-10 grid grid-cols-12">
        <div className="col-span-12 sm:col-span-4">
          <button
            data-wf="b-7-0"
            type="button"
            disabled={!anyTyped}
            onClick={() => {
              setFields(EMPTY_FIELDS);
              setCleared(true);
            }}
            className="bmi-shift min-h-[44px] w-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] transition-transform enabled:hover:-translate-x-1 enabled:hover:-translate-y-1 focus:outline focus:outline-[3px] focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: thick,
              borderRadius: brand.radius,
              boxShadow: anyTyped ? `6px 6px 0 ${brand.primaryColor}` : "none",
              backgroundColor: brand.backgroundColor,
              color: brand.primaryColor,
              fontFamily: MONO,
              outlineColor: brand.accentColor,
            }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Trash className="h-4 w-4" aria-hidden="true" />
              Clear values
            </span>
          </button>
          <p
            aria-live="polite"
            className="mt-2 text-xs"
            style={{ fontFamily: MONO, color: brand.neutralColor }}
          >
            {cleared ? "Values cleared — nothing was kept." : anyTyped ? "Wipes both fields." : "Nothing to clear yet."}
          </p>
        </div>
      </div>

      {/* b-8-0 disclaimer */}
      <div className="mt-10" style={{ borderTop: thick }}>
        <p
          data-wf="b-8-0"
          className="max-w-[70ch] pt-5 text-sm leading-relaxed"
          style={{ fontFamily: MONO }}
        >
          <span className="font-bold uppercase tracking-[0.2em]">Disclaimer:</span> This result is informational
          only and is not medical advice. It uses the standard adult BMI formula, with no age, sex or pediatric
          adjustment.
        </p>
      </div>

      {/* b-9-0 privacy */}
      <p
        data-wf="b-9-0"
        className="mt-4 max-w-[70ch] pb-2 text-xs leading-relaxed"
        style={{ fontFamily: MONO, color: brand.neutralColor, borderTop: hairline, paddingTop: 16 }}
      >
        Your height and weight stay in your browser — never sent to a server, and nothing is kept after a reload.
        Free to use: no account, no payment.
      </p>
    </div>
  );
}
