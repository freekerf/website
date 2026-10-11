---
title: Engraving images
description: Import a photo, choose how it is engraved and preview the result before burning.
---

1. **Import** the image (PNG, JPEG, BMP, GIF). It goes on a layer of its own.
2. Select it and choose **Image engraving…** in the inspector.
3. Pick the method and adjust; the preview on the right shows the dots or grey
   levels the laser will burn, at the real resolution.
4. Press **Apply** (one undo step). Nothing changes before that.

## Methods

| Method | Use it for |
| --- | --- |
| Grey levels | photos on materials that darken gradually: power follows the grey |
| Dithering | photos on materials that only take on/off marks; nine algorithms (Floyd–Steinberg, Atkinson, Jarvis, Stucki, Sierra…) |
| As it is | images already prepared for engraving, one pixel per dot |
| Trace outlines | logos and line art: the outlines become vectors |

## Settings

- **Resolution** in lines per mm (more lines: finer and slower).
- **Brightness** and **contrast**; **threshold** for pure black and white.
- **Direction** of the lines: horizontal, vertical or diagonal.
- **Speed** and **minimum / maximum power**.

These are the settings of LaserGRBL's raster dialog: the G-code is the same.
