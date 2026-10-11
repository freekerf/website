---
title: Scripts and AI agents
description: Automate FreeKerf with JavaScript scripts, or let an AI agent work in the app, with your permission.
---

Everything you do in FreeKerf is an *action* (import, move, set a layer, connect,
frame…). Scripts and AI agents use the same actions, with permission levels you
control.

## Scripts

Scripts are short JavaScript programs run inside FreeKerf, for example:

```js
const plate = app.document.addShape({ shape: 'rect', x: 0, y: 0, width: 80, height: 40 }).id;
app.document.array({ ids: [plate], columns: 3, rows: 2 });
```

A script's changes to the document are a single undo step, and are undone if the
script fails. `freekerf run script.js` runs one from a terminal. Custom buttons
imported from LaserGRBL become scripts.

## AI agents (MCP)

FreeKerf can work with AI assistants that speak MCP (Model Context Protocol). It is
**off by default**: turn on **Settings → Automation → AI agents (MCP server)**, then
add `freekerf mcp` to your assistant (`"command": "freekerf", "args": ["mcp"]`). The
assistant then attaches to the running app.

| An agent can… | |
| --- | --- |
| read the app and the document, change the view, edit the document | when MCP is on |
| move the machine (jog, home, frame) | only with **Agents may move the machine**, or with your permission |
| turn the laser on | **never**: no setting or permission allows it |

## Your permission

When a script or an agent asks for more than it may do, a dialog asks you:
**Deny**, **This time**, **Until I close the app** or **Always**. A request with no
answer is denied after two minutes.

The top bar shows the agents connected and the script running, with a button to
cancel it. **Settings → Automation** lists the permissions you gave (revoke them
there) and the recent actions of scripts and agents. Only you can change these
settings: scripts and agents cannot.
