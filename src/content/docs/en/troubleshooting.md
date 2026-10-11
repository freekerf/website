---
title: Troubleshooting
description: Common problems when connecting, framing and burning, and what to try.
---

## The machine does not connect

- Check the port and the **baud rate** in **Settings → Machine** (Grbl 1.1 is
  usually 115200; some boards use 250000).
- Close any other program using the port (LaserGRBL, a serial monitor).
- On Linux, your user must be allowed to use serial ports (often the `dialout`
  group).
- Try **Explore with the simulator** to check the app itself works.

## The state chip says Alarm

The controller stopped the machine, for example after hitting a limit switch or a
STOP. Press **Unlock** in the banner, home the machine if needed, then use
**Recover job…** if a job was interrupted.

## The job is not where I expected

Check the **Job start** and the **anchor** before making the job, then **Frame**
to see the box on the material before burning.

## Corners burn darker

Laser mode is off in the controller (`$32=0`). Turn it on with the console:
`$32=1`.

## Reporting a problem

Open an issue on [GitHub](https://github.com/freekerf/freekerf/issues) with what
you did, what you expected and, if you can, the console rows around the problem.
