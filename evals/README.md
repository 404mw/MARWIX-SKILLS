# Evals

Test cases for the skills — not shipped in the plugin or the release zips. Each eval is
a sample request plus checkable expectations of what the skill must do with it. Run
them after changing a skill to catch regressions; the skill never reads them.

```
evals/<skill-name>/evals.json          behaviour: prompt → expectations
evals/<skill-name>/trigger-evals.json  triggering: should this request load the skill?
```

The format is the one the `skill-creator` skill uses. To run them in Claude Code with
the plugin loaded locally:

```bash
claude --plugin-dir plugins/mw-image
```

then ask: *"use skill-creator to run the evals in evals/mw-image-prompt against the
mw-image-prompt skill"*. It runs each prompt with and without the skill, grades the
expectations, and reports pass rates; the trigger set measures whether the description
fires on the right requests and stays quiet on the rest.

An expectation should be something a reader can check from the transcript alone — "the
prompt contains no 'no X' phrasing", not "the prompt is good".
