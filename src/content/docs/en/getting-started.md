---
title: Getting started
description: First run, the welcome, connecting to your machine or to the built-in simulator.
---

## Installing

Download the installer for your system from the
[download page](https://freekerf.github.io/website/download/): Windows (.exe or
.msi), macOS (.dmg) or Linux (AppImage, .deb or Flatpak). These are development
releases. The macOS app is not signed yet: the first time, macOS refuses to open
it; choose *Done*, then **System Settings → Privacy & Security → Open Anyway**,
and confirm with an administrator password.

To run the latest development version instead, build it from source by following
the [developer guide](https://github.com/freekerf/freekerf/blob/main/AGENTS.md).

## The welcome

The first time you open FreeKerf, the welcome offers three ways in:

- **Set up my machine**: opens the settings at the machine page (port, baud
  rate, firmware).
- **Import from LaserGRBL**: shown when a LaserGRBL installation is found; see
  [Coming from LaserGRBL](../migrate-from-lasergrbl/).
- **Explore with the simulator**: connects to a simulated Grbl machine built into
  the app, so you can try everything without a laser.

The welcome only opens by itself once. You can open it again from **Settings →
Show the welcome again**.

## Connecting

1. Go to **Produce**.
2. In the machine panel, pick the serial port (or **FreeKerf emulator (no machine)**) and press
   **Connect**.
3. FreeKerf reads the firmware and its settings (`$$`, `$I`). The state chip at
   the top turns **Ready**.

The state chip always shows what the machine is doing: Disconnected, Ready,
Running, Paused, Alarm, Homing, Moving, Framing.

## Moving the head

The jog pad moves the head one step per press (choose the step: 0.1, 1, 10 or 50 mm).
With continuous jog turned on in the settings, the head moves while you hold the
button and stops as soon as you let go. **Home**, **Unlock** and **Origin here**
are next to the jog pad.

## Keyboard

| Keys | Does |
| --- | --- |
| Shift+Esc | **STOP**, from anywhere, even while typing |
| F5 | Start (opens the fire confirmation) |
| F6 | Pause / resume |
| F7 | Frame |
| Esc | Pause a running job; otherwise close the dialog on top |
| Ctrl+1 / Ctrl+2 | Design / Produce |
