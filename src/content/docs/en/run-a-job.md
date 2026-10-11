---
title: Running a job
description: Place the job, frame it, burn it after the confirmation, pause, stop and recover.
---

## From the design to the machine

In **Produce**, when the document has objects, the machine panel offers to make the
job from the design:

- **Job start**: **Absolute** (the coordinates of the design), **Current
  position** (where the head is now) or **User origin** (the origin you set with
  *Origin here*).
- The **3 × 3 anchor**: which point of the job's box goes to the start point
  (centre, a corner, the middle of a side).
- **Make the job from the design** plans the G-code and loads it; the preview and
  the time estimate appear.

You can also open a G-code file you already have.

## Frame, then start

**Frame** (F7) moves the head around the job's box with the laser off, so you can
check it fits the material.

**Start** (F5) never fires right away: it opens the [fire
confirmation](../safety/#the-fire-confirmation). After the countdown, **Fire
laser** starts the job. The canvas shows the head and what is already burned; the
panel shows the progress and the time left.

## Pause, stop

- **Pause** (F6 or Esc) holds the motion; **Resume** goes on.
- **Stop job** ends the job and turns the laser off.
- **STOP** (the red button, or Shift+Esc) resets the controller at once: the laser
  goes off and every queued line is dropped.

## Recovering a job

After an alarm, a STOP or a lost connection, a banner over the canvas says what
happened and offers **Unlock** (for an alarm) and **Recover job…**. The recovery
dialog proposes where to go on from, with the safest choice marked:

- **From the start**;
- **A few lines before the interruption**: recommended after an alarm or a reset,
  because the controller dropped what it had in its buffer;
- **From the last line sent**: recommended after a lost connection;
- **From line N**.

You can also home the machine first and restore the job's work origin. Going on
fires the laser, so it goes through the confirmation again.
