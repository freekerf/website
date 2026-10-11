---
title: Coming from LaserGRBL
description: Bring your LaserGRBL connection, settings, custom buttons and laser counters to FreeKerf.
---

FreeKerf can import what you set up in LaserGRBL. **LaserGRBL's files are only
read, never changed**: you can keep using both.

## What is imported

| Item | What it is |
| --- | --- |
| Connection | port, baud rate, firmware, streaming mode, reset on connect |
| Preferences | the other settings: jog, air cooling, job header and footer, passes |
| Custom buttons | each button becomes a small script with its icon; buttons that act on press and release become two scripts |
| Laser counters | the usage time of each laser module |
| User materials | found and reported; they are kept once the material library can store them |

## How

1. Open the welcome (it opens by itself on the first run, or **Settings → Show the
   welcome again**).
2. Choose **Import from LaserGRBL**. FreeKerf looks for LaserGRBL's data folder
   (`%APPDATA%\LaserGRBL` on Windows) and lists what it found, all ticked.
3. Untick what you do not want and press **Import selected**.
4. A summary shows what was imported and anything that needs a look.

From a terminal, `freekerf migrate lasergrbl` shows the same report, and
`freekerf migrate lasergrbl --apply` writes it.

## Differences you will notice

- **Colour is the layer.** Each colour of your drawing is a layer with its own
  mode, speed, power and passes, like LaserGRBL's colour layers.
- **Every laser action is confirmed.** Starting a job, resuming one or sending
  G-code that can fire opens a confirmation with a short countdown. See
  [Laser safety](../safety/).
- **Keyboard:** STOP is Shift+Esc, from anywhere.
