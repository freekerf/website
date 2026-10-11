---
title: Laser safety
description: How FreeKerf keeps the laser under your control, and what you must do yourself.
---

A laser can blind, burn and start fires. FreeKerf helps, but the safety of the
room is yours: **wear safety glasses made for your laser's wavelength, run the
exhaust, keep a fire extinguisher nearby and never leave a running job alone.**

## STOP

The red **STOP** button is always on screen, in every mode and layout, and
**Shift+Esc** works from anywhere, even while typing or with a dialog open. STOP
resets the controller: the laser turns off and the queued lines are dropped. It
also cancels any running script first.

## The fire confirmation

Anything that can turn the laser on (starting or resuming a job, a custom button,
G-code typed in the console that may fire) opens **Ready to burn?** first:

- a summary of the job;
- a checklist: safety glasses, exhaust and air assist, material held down and
  focus set, extinguisher nearby;
- **Fire laser**, disabled during a short countdown (3 s by default, 1 to 10 s in
  **Settings → Safety**).

Only a person at the window can confirm. Scripts and AI agents can ask, never
confirm; agents cannot fire the laser at all.

## Machine settings

FreeKerf reads the controller's settings when it connects. If laser mode (`$32`)
is off, corners may burn more: turn it on for diode and CO₂ lasers driven by Grbl.
