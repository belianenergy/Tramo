# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---
## [LRN-20260513-001] correction

**Logged**: 2026-05-13T14:04:00+02:00
**Priority**: high
**Status**: pending
**Area**: docs/frontend

### Summary
For Stitch edits, verify the authoritative artifact from metadata/download URL before modifying local HTML by filename.

### Details
The user corrected that the latest approved landing was the Restro Style Stitch artifact (`Landing pública - EnergyOS`, projectId `11820050226044719534`), not the v8 local files nor an assumed local copy. The correct workflow is: read metadata, download/compare `htmlDownloadUrl`, restore from that source, then apply minimal copy-only edits.

### Suggested Action
Before future Stitch copy changes, identify source by project/title/screen metadata and compare remote export to local file. Do not infer “latest” from filename.

### Metadata
- Source: user_feedback
- Related Files: stitch-mvp-restro-style-v1-landing-meta.json, stitch-mvp-restro-style-v1-landing.html
- Tags: stitch, source-of-truth, scope-control

---
