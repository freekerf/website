---
title: Designing a job
description: Import a drawing, set the colour layers, draw shapes and text, combine and repeat them.
---

## Import a drawing

Press **Import** in the tool rail (Ctrl+I) and pick an SVG, DXF or image. For a
drawing, choose what to do with its colours:

- **Keep the colours: one layer per colour** (a layer of the same colour is
  reused);
- **Put everything on the current layer**.

A message tells you how many objects and new layers the import made. Elements
that cannot be converted (for example SVG text) are kept and reported.

## Colour is the layer

The **Layers** panel lists one row per colour, in the order they are burned
(fillings first, then lines, then cuts, so a cut never frees a piece before it is
engraved). Each row shows the mode, the number of objects and speed · power ·
passes.

- Click a row to make it the **current layer**: new shapes go there.
- Expand a row to change its **mode** (line, fill, fill and line, cut), **speed**,
  **power** (as a percentage of the machine's maximum) and **passes**.
- Hide a layer with the eye: it is neither shown nor burned.
- Move a layer up or down in the order.

The **palette** at the bottom of the canvas is the quick way: click a colour to
move the selection to that colour's layer (it is created if needed); with nothing
selected, it becomes the layer of new shapes.

## Draw

| Tool | Key | Click | Drag |
| --- | --- | --- | --- |
| Select | V | pick an object (Shift or Ctrl adds or removes) | box selection (left→right: inside; right→left: touching) |
| Rectangle | R | a 40 × 30 mm rectangle | the box you draw |
| Ellipse | E | a 30 mm circle | the box you draw |
| Text | T | "Text", 10 mm high, then type it in the inspector | the height of the box |

Text uses a single-stroke font, ideal for engraving, and stays editable.

## Move, resize, rotate

Drag an object to move it. The handles resize it (corners keep the proportions;
Shift frees them; Alt resizes from the centre) and the round handle rotates it
(Shift: 15° steps). The arrow keys move the selection by 1 mm (Shift 10 mm, Alt
0.1 mm). Each change is one undo step: Ctrl+Z / Ctrl+Shift+Z.

The **Object** panel (inspector) gives exact numbers: position of the centre,
width, height, rotation, the text and its size, and the buttons to align,
duplicate (Ctrl+D) and delete (Del).

## Combine and repeat

With two or more objects selected, the inspector (or the tool rail) can:

- **Weld**: one outline around all of them;
- **Subtract**: the first one minus the others (text becomes a hole);
- **Intersect**: only the area they share.

**Offset outline** adds an outline grown or shrunk by a distance. **Array** makes
a grid of copies (columns, rows, gap).

Curves are turned into short lines (within 0.01 mm) by these operations, and text
stops being editable text.
