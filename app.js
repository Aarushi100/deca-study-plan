/* =========================================================================
   app.js — builds the plan and runs the page.
   Reads its content from data.js. No build step, no dependencies.
   ========================================================================= */

const $ = id => document.getElementById(id);
const DAY = 86400000;
const MAX_WEEKS = 16;   // plans longer than this start MAX_WEEKS out

/* ---------- 1. fill the form ------------------------------------------- */

function fillForm() {
  const rp = $("roleplay");
  let group = null;
  ROLEPLAYS.forEach(e => {
    if (e.group !== group) {
      group = e.group;
      const g = document.createElement("optgroup");
      g.label = group;
      rp.appendChild(g);
    }
    rp.lastElementChild.appendChild(new Option(`${e.name} (${e.code})`, e.code));
  });

  const ex = $("exam");
  Object.keys(EXAMS).forEach(k => ex.appendChild(new Option(EXAMS[k].name, k)));

  const pr = $("prepared");
  let fam = null;
  PREPARED.forEach(e => {
    if (e.family !== fam) {
      fam = e.family;
      const g = document.createElement("optgroup");
      g.label = fam;
      pr.appendChild(g);
    }
    pr.lastElementChild.appendChild(new Option(`${e.name} (${e.code})`, e.code));
  });

  // default to eight weeks out, a realistic prep window
  $("compDate").value = iso(new Date(Date.now() + 56 * DAY));
  $("compDate").min = iso(new Date());
}

$("roleplay").addEventListener("change", e => {
  const ev = ROLEPLAYS.find(r => r.code === e.target.value);
  if (ev) {
    $("exam").value = ev.exam;
    $("roleplayHint").textContent =
      `${ev.format} · ${ev.pis} performance indicators · ${EXAMS[ev.exam].name}`;
  } else {
    $("roleplayHint").textContent = "Your cluster exam is set by this choice.";
  }
});

/* ---------- 2. small helpers ------------------------------------------- */

function iso(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDate(v) {
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function fmt(d) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function zip(a, b) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

/* ---------- 3. task queues ---------------------------------------------
   Queues are ordered by priority: whatever a student runs out of time for
   should be the last thing in the queue, not the middle of it.          */

function examQueue(examKey, level) {
  if (!examKey) return [];
  const areas = [...EXAMS[examKey].areas].sort((a, b) => b.weight - a.weight);

  const read = level === "state" ? [] : areas.map(a => EXAM_ACTIONS[0](a.name));
  const drill = areas.map(a => EXAM_ACTIONS[1](a.name));
  const cards = areas.filter(a => a.weight >= 2).map(a => EXAM_ACTIONS[2](a.name));
  const retest = areas.filter(a => a.weight >= 2).map(a => EXAM_ACTIONS[3](a.name));

  // read an area, then immediately practise it, heaviest areas first
  const q = zip(read, drill).concat(zip(cards, retest));
  if (level === "new") q.unshift("Skim the whole exam outline once so you know what's on it");
  return q;
}

function roleplayQueue(ev, level) {
  if (!ev) return [];
  const team = ev.pis >= 7;
  const f = ev.focus;
  const q = [];

  q.push(`Read two released ${ev.code} role-plays end to end and mark how the judge scores them`);
  if (level === "new") q.push("Learn a four-step answer frame: greet, answer, justify, close");
  q.push(`Memorise your format: ${ev.format.toLowerCase()}, ${ev.pis} performance indicators`);
  if (team) q.push("Agree with your partner on who opens, who closes and how you hand off");

  // drill each focus area, then write frames for each, then record each
  q.push(...zip(f.map(a => ROLEPLAY_ACTIONS[0](a)), f.map(a => ROLEPLAY_ACTIONS[1](a))));
  q.push("Build a 30-second opener you can use in any role-play");
  q.push("Practise a full role-play under time, prep included");
  q.push(...f.map(a => ROLEPLAY_ACTIONS[2](a)));
  q.push("Run a role-play in front of a teacher or officer and take their notes");
  q.push("Rewatch one of your recordings and fix the single worst habit");
  q.push("Practise a role-play on an industry you know nothing about");
  q.push(team
    ? "Run a timed case with your partner, then swap roles and run it again"
    : "Run two role-plays back to back with no break");
  q.push("Practise the three questions judges ask most: why, what else, and what would you do differently");
  return q;
}

function writtenQueue(ev, weeks) {
  // each item carries the week it unlocks; overflow spills to later weeks
  if (!ev) return [];
  const q = [];
  const drafting = Math.max(1, Math.round(weeks * 0.6));
  const at = f => Math.min(weeks - 1, Math.max(0, Math.round(f)));

  q.push({ w: 0, t: `Confirm your association's ${ev.code} submission deadline and put it in your phone` });
  q.push({ w: 0, t: `Read the ${ev.code} rubric and the penalty point checklist before you write anything` });

  ev.sections.forEach((s, i) => {
    q.push({ w: at((i / ev.sections.length) * drafting), t: `Draft the ${s}` });
  });

  q.push({ w: at(drafting), t: "Read the whole paper out loud and cut anything that isn't evidence" });
  q.push({ w: at(drafting), t: `Check page count, margins and title page against the ${ev.pages}-page limit` });
  q.push({ w: at(drafting + 1), t: "Score your own paper against the rubric, row by row, and fix the lowest rows" });
  q.push({ w: at(drafting + 1), t: "Run the penalty point checklist and fix every flag" });
  q.push({ w: at(drafting + 1), t: "Have someone outside DECA read it for clarity" });
  q.push({ w: at(weeks - 3), t: "Build your presentation from the paper, not from scratch" });
  q.push({ w: at(weeks - 2), t: "Rehearse the presentation to time and cut it to fit" });
  q.push({ w: at(weeks - 2), t: "Rehearse in front of one person who will interrupt you with questions" });
  return q;
}

/* ---------- 4. assemble the weekly plan --------------------------------- */

function buildPlan(cfg) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const comp = parseDate(cfg.date);
  const daysOut = Math.round((comp - today) / DAY);
  let weeks = Math.max(1, Math.ceil(daysOut / 7));
  const truncated = weeks > MAX_WEEKS;
  if (truncated) weeks = MAX_WEEKS;

  const rp = ROLEPLAYS.find(r => r.code === cfg.roleplay) || null;
  const pe = PREPARED.find(p => p.code === cfg.prepared) || null;

  const examQ = examQueue(cfg.exam, cfg.level);
  const rpQ = roleplayQueue(rp, cfg.level);
  const writQ = writtenQueue(pe, weeks);

  const perWeek = Number(cfg.days);
  // the paper only takes as many slots per week as it needs to finish on time
  const soloWritten = !cfg.exam && !rp;
  const writCap = writQ.length
    ? Math.min(soloWritten ? perWeek : Math.max(1, perWeek - 1),
               Math.ceil(writQ.length / Math.max(1, weeks - 1)))
    : 0;

  const out = [];
  let ei = 0, ri = 0, wi = 0;
  let examSlots = 0, rpDebt = 0;

  for (let w = 0; w < weeks; w++) {
    const start = addDays(comp, -((weeks - w) * 7) + 1);
    const end = addDays(start, 6);
    const progress = weeks === 1 ? 1 : w / (weeks - 1);
    const isFinal = w === weeks - 1;
    const tasks = [];

    // written first: it has a real deadline, the exam doesn't
    let taken = 0;
    while (wi < writQ.length && writQ[wi].w <= w && (taken < writCap || isFinal)) {
      tasks.push({ track: "written", text: writQ[wi++].t });
      taken++;
    }

    if (isFinal) {
      while (wi < writQ.length) tasks.push({ track: "written", text: writQ[wi++].t });
      if (cfg.exam) {
        if (weeks <= 2) {
          const top = [...EXAMS[cfg.exam].areas].sort((a, b) => b.weight - a.weight).slice(0, 3);
          tasks.push({ track: "exam", text: `No time for everything — study only ${top.map(a => a.name).join(", ")}` });
        }
        tasks.push({ track: "exam", text: "Take one full practice exam under time, then review only what you missed" });
        tasks.push({ track: "exam", text: "Reread your notes on the three areas you score lowest in" });
      }
      if (rp) {
        tasks.push({ track: "roleplay", text: "Do one relaxed practice role-play, then stop drilling" });
        tasks.push({ track: "roleplay", text: "Reread your opener until it's automatic" });
      }
      tasks.push({ track: "logistics", text: "Pack the night before: business attire, pens, ID, event materials, water" });
      tasks.push({ track: "logistics", text: "Sleep. Cramming the night before costs more than it gains." });
    } else {
      const open = Math.max(1, perWeek - tasks.length);
      // role-play share ramps up as the competition gets closer
      const rpShare = !rp ? 0 : !cfg.exam ? 1 : 0.4 + 0.3 * progress;

      for (let i = 0; i < open; i++) {
        rpDebt += rpShare;
        const wantRp = rpDebt >= 1 && rpQ[ri];
        if (wantRp) { tasks.push({ track: "roleplay", text: rpQ[ri++] }); rpDebt -= 1; }
        else if (examQ[ei]) { tasks.push({ track: "exam", text: examQ[ei++] }); examSlots++; }
        else if (rpQ[ri]) { tasks.push({ track: "roleplay", text: rpQ[ri++] }); rpDebt = Math.max(0, rpDebt - 1); }
      }
      // if the week still has room, pull the paper forward — writing early never hurts
      while (tasks.length < perWeek && wi < writQ.length) {
        tasks.push({ track: "written", text: writQ[wi++].t });
      }
      // a timed full exam halfway through and again the week before
      if (cfg.exam && weeks >= 4 && (w === Math.floor(weeks * 0.5) || w === weeks - 2)) {
        tasks.push({ track: "exam", text: "Take a full 100-question practice exam under time and log your score" });
      }
    }

    out.push({
      n: w + 1, start, end, isFinal,
      phase: isFinal ? "Final week"
           : weeks < 4 ? "Sprint"
           : progress < 0.4 ? "Learn"
           : progress < 0.75 ? "Drill" : "Sharpen",
      tasks
    });
  }

  // how far into the exam material this schedule actually gets
  let coverage = null;
  if (cfg.exam) {
    const areas = EXAMS[cfg.exam].areas.length;
    const reached = Math.min(areas, Math.ceil(examSlots / 2));
    if (reached < areas && reached >= 1 && weeks >= 3) coverage = { reached, areas };
  }

  // is this schedule asking for more than the student has time for?
  const demand = examQ.length + rpQ.length + writQ.length;
  const capacity = (weeks - 1) * perWeek;
  const overloaded = capacity > 0 && demand > capacity * 1.6
    ? Math.min(6, perWeek + Math.ceil((demand - capacity) / Math.max(1, weeks)))
    : null;

  return { weeks: out, comp, rp, pe, exam: cfg.exam ? EXAMS[cfg.exam] : null,
           truncated, coverage, overloaded, days: perWeek };
}

/* ---------- 5. render ---------------------------------------------------- */

let PLAN = null, KEY = "", DONE = {};

function loadDone() {
  try { DONE = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { DONE = {}; }
}

function saveDone() {
  try { localStorage.setItem(KEY, JSON.stringify(DONE)); } catch (e) { /* private browsing */ }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function cell(kicker, title, body, list) {
  const d = document.createElement("div");
  d.className = "brief-cell";
  d.innerHTML = `<p class="kicker">${kicker}</p><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p>` +
    (list.length ? `<ul>${list.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>` : "");
  return d;
}

function render(plan, cfg) {
  PLAN = plan;
  KEY = `deca-plan:${cfg.roleplay}|${cfg.exam}|${cfg.prepared}|${cfg.date}|${cfg.days}|${cfg.level}`;
  loadDone();

  const bits = [];
  if (plan.rp) bits.push(plan.rp.name);
  if (plan.exam) bits.push(plan.exam.name);
  if (plan.pe) bits.push(plan.pe.name);

  const compLong = plan.comp.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  $("planTitle").textContent = `${plan.weeks.length} week${plan.weeks.length > 1 ? "s" : ""} to go`;
  $("planSub").textContent = (bits.length ? bits.join(" · ") + ". " : "") +
    `Competition on ${compLong}. ${plan.days} study days a week.`;

  $("strip").innerHTML = plan.weeks
    .map((w, i) => `<i class="${i === plan.weeks.length - 1 ? "last" : ""}"></i>`).join("");

  const brief = $("brief");
  brief.innerHTML = "";

  if (plan.exam) {
    const top = [...plan.exam.areas].sort((a, b) => b.weight - a.weight).slice(0, 5);
    brief.appendChild(cell("Cluster exam", plan.exam.name,
      `${plan.exam.areas.length} instructional areas. Your time goes to the heaviest ones first:`,
      top.map(a => a.name)));
  }
  if (plan.rp) {
    brief.appendChild(cell("Role-play", plan.rp.name,
      `${plan.rp.format}. ${plan.rp.pis} performance indicators, usually pulled from:`,
      plan.rp.focus));
  }
  if (plan.pe) {
    brief.appendChild(cell("Written event", plan.pe.name,
      `${plan.pe.pages}-page limit. Each section gets its own drafting week:`,
      plan.pe.sections));
  }
  if (!brief.children.length) {
    brief.appendChild(cell("Nothing selected", "Pick at least one event",
      "Go back and choose a role-play, an exam or a written event.", []));
  }

  const host = $("weeks");
  host.innerHTML = "";
  plan.weeks.forEach(w => {
    const el = document.createElement("section");
    el.className = "week" + (w.isFinal ? " final" : "") + (w.n === 1 ? " is-now" : "");

    const rail = document.createElement("div");
    rail.className = "week-rail";
    rail.innerHTML = `<h3>Week ${w.n}</h3><p class="dates">${fmt(w.start)} – ${fmt(w.end)}</p><span class="phase">${w.phase}</span>`;
    el.appendChild(rail);

    const ul = document.createElement("ul");
    ul.className = "tasks";
    w.tasks.forEach((t, i) => {
      const id = `w${w.n}t${i}`;
      const li = document.createElement("li");
      li.className = "task" + (DONE[id] ? " done" : "");

      const btn = document.createElement("button");
      btn.className = "check";
      btn.type = "button";
      btn.setAttribute("aria-pressed", DONE[id] ? "true" : "false");
      btn.setAttribute("aria-label", "Mark done: " + t.text);
      btn.addEventListener("click", () => {
        DONE[id] = !DONE[id];
        btn.setAttribute("aria-pressed", DONE[id] ? "true" : "false");
        li.classList.toggle("done", !!DONE[id]);
        saveDone();
        updateProgress();
      });

      const span = document.createElement("span");
      span.className = "task-text";
      const label = { roleplay: "Role-play", written: "Written", logistics: "Day of", exam: "Exam" }[t.track];
      span.innerHTML = `<span class="tag ${t.track}">${label}</span>${escapeHtml(t.text)}`;

      li.append(btn, span);
      ul.appendChild(li);
    });
    el.appendChild(ul);
    host.appendChild(el);
  });

  const dday = document.createElement("p");
  dday.className = "dday";
  dday.textContent = `${compLong} — competition day.`;
  host.appendChild(dday);

  if (plan.overloaded) {
    host.appendChild(note(`Three tracks at ${plan.days} days a week is tight. Around ${plan.overloaded} days a week would let you finish the material instead of sampling it — or drop a study day and accept that the deepest exam areas won't get a second pass.`));
  }
  if (plan.coverage) {
    host.appendChild(note(`At ${plan.days} days a week you'll get through the ${plan.coverage.reached} heaviest instructional areas of ${plan.coverage.areas}. Add a study day to reach the rest.`));
  }
  if (plan.truncated) {
    host.appendChild(note(`You have more than ${MAX_WEEKS} weeks. This plan covers the last ${MAX_WEEKS}. Until then, read one instructional area a week and you'll start week 1 ahead.`));
  }

  updateProgress();
  $("setup").hidden = true;
  $("plan").hidden = false;
  window.scrollTo(0, 0);
}

function note(text) {
  const p = document.createElement("p");
  p.className = "kicker";
  p.textContent = text;
  return p;
}

function updateProgress() {
  const total = PLAN.weeks.reduce((n, w) => n + w.tasks.length, 0);
  const done = Object.values(DONE).filter(Boolean).length;
  $("progressFill").style.width = total ? `${(done / total) * 100}%` : "0";
  $("progressText").textContent = `${done} of ${total} done`;
  PLAN.weeks.forEach((w, i) => {
    const block = $("strip").children[i];
    if (!block) return;
    const all = w.tasks.length > 0 && w.tasks.every((t, j) => DONE[`w${w.n}t${j}`]);
    block.classList.toggle("filled", all);
  });
}

/* ---------- 6. calendar export ------------------------------------------ */

function toIcs() {
  const pad = n => String(n).padStart(2, "0");
  const stamp = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const esc = s => String(s).replace(/([,;\\])/g, "\\$1");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DECA Study Plan Builder//EN"];

  PLAN.weeks.forEach(w => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:week${w.n}-${stamp(w.start)}@deca-study-plan`,
      `DTSTART;VALUE=DATE:${stamp(w.start)}`,
      `DTEND;VALUE=DATE:${stamp(addDays(w.end, 1))}`,
      `SUMMARY:DECA week ${w.n} — ${esc(w.phase)}`,
      `DESCRIPTION:${w.tasks.map(t => esc(t.text)).join("\\n")}`,
      "END:VEVENT"
    );
  });
  lines.push(
    "BEGIN:VEVENT",
    `UID:comp-${stamp(PLAN.comp)}@deca-study-plan`,
    `DTSTART;VALUE=DATE:${stamp(PLAN.comp)}`,
    `DTEND;VALUE=DATE:${stamp(addDays(PLAN.comp, 1))}`,
    "SUMMARY:DECA competition",
    "END:VEVENT",
    "END:VCALENDAR"
  );

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "deca-study-plan.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ---------- 7. wire it up ------------------------------------------------ */

function showError(msg) {
  const err = $("formError");
  err.textContent = msg;
  err.hidden = false;
}

$("planForm").addEventListener("submit", e => {
  e.preventDefault();
  const cfg = {
    roleplay: $("roleplay").value,
    exam: $("exam").value,
    prepared: $("prepared").value,
    date: $("compDate").value,
    days: $("daysPerWeek").value,
    level: $("level").value
  };

  if (!cfg.date) return showError("Add your competition date so the plan has an end point.");
  if (parseDate(cfg.date) <= new Date(new Date().setHours(0, 0, 0, 0)))
    return showError("Pick a competition date in the future.");
  if (!cfg.roleplay && !cfg.exam && !cfg.prepared)
    return showError("Choose at least one event — a role-play, an exam or a written event.");

  $("formError").hidden = true;
  render(buildPlan(cfg), cfg);
});

$("editBtn").addEventListener("click", () => {
  $("plan").hidden = true;
  $("setup").hidden = false;
  window.scrollTo(0, 0);
});

$("printBtn").addEventListener("click", () => window.print());
$("icsBtn").addEventListener("click", toIcs);

fillForm();
