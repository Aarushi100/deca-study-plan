# DECA Study Plan Builder

A member picks their role-play event, cluster exam and prepared event, adds
their competition date and how many days a week they can study. The site works
backward from the date and returns a week-by-week plan with checkboxes,
a progress bar, a calendar export and a print view.

No frameworks, no build step, no server. Four files.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page structure |
| `styles.css` | All styling |
| `data.js` | **Events, instructional areas, written-event sections.** Edit this. |
| `app.js` | Form handling, plan generation, rendering, calendar export |

## Put it online

1. Make a new repository on GitHub — public, no README.
2. Upload all four files to the root of the repository (drag and drop into
   **Add file → Upload files**, then commit).
3. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to
   *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. Wait a minute, then open `https://<your-username>.github.io/<repo-name>/`.

Every change has to be committed and pushed before it goes live.

## Editing the content

Everything a member sees comes out of `data.js`.

**Change what's on an exam.** Each exam has an `areas` list. `weight` is how
much of the exam that area is worth — `3` is heaviest, `1` is lightest. The
planner spends study sessions in weight order, so an area you bump to `3`
moves to the front of the plan.

**Add a role-play event.** Add an object to `ROLEPLAYS`:

```js
{ code: "XYZ", name: "Some New Series", exam: "mkt", group: "Individual Series",
  format: "2 role-plays, 10 min prep each", pis: 5,
  focus: ["Promotion", "Selling", "Customer Relations", "Operations"] }
```

`exam` has to match a key in `EXAMS`. `focus` drives the performance indicator
drills. Set `pis` to 7 or more and the plan adds partner-specific tasks.

**Add a written event.** Add to `PREPARED` and point `sections` at one of the
section lists, or write a new one. Section order is drafting order.

**Change the wording of study tasks.** `EXAM_ACTIONS` and `ROLEPLAY_ACTIONS` at
the bottom of `data.js` are the phrasing pools. Each is a function that takes an
instructional area name and returns a sentence.

## How the plan is built

- Written work is placed first each week, because it has a real submission
  deadline. It's capped so a paper can never swallow the whole week.
- The remaining sessions split between exam and role-play, with role-play's
  share rising as the competition gets closer.
- Exam sessions run in weight order and pair each area with practice questions
  right after reading it.
- The last week schedules no new material: one timed practice exam, one relaxed
  role-play, packing, sleep.
- If the material needs more sessions than the schedule holds, the plan says so
  and suggests a day count rather than quietly dropping content.

Progress is saved in the browser with `localStorage`, keyed to the exact event
and date combination, so it survives a refresh but doesn't follow the member to
another device.

## Before a season

Event names, page limits, rubrics and exam blueprints change. Check `data.js`
against the current DECA Guide each year.
