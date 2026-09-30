# FOCAL-K project page

Anonymous project site for *FOCAL-K: Interaction-Focused Bimanual Diffusion with Object-Centric State and Keyframe Transition Retrieval*.

This is a static GitHub Pages site. Place `index.html`, `style.css`, `main.js`, `.nojekyll`, and `assets/` at the repository root. The page uses the supplied paper figures, PDF, and compressed overview video. It requires no build step.

## Update content

- Edit `index.html` for text and sections. Keep authors anonymous during review.
- Edit the reported task numbers in `main.js` if the manuscript results change.
- The simulation gallery uses 20 animated GIFs in `assets/simulation/`, one for each task and condition, preserved at original speed from the supplied ZIP. The real-world selector uses nine short policy clips in `assets/rollouts/`, extracted from the supplied presentation.
- The centroid animation in `assets/centroid-tracking.mp4` was converted from the supplied presentation GIF for smaller web delivery.
- Replace `assets/FOCAL_K.pdf` and `assets/focal-k-overview.mp4` with revised paper and video files when needed.

The structure takes inspiration from the editorial project-page layout of ExStereo and the navigation and results presentation of DexMulti. All site code here is newly written for FOCAL-K.

## GitHub Pages

In repository Settings → Pages, select **Deploy from a branch**, `main`, `/ (root)`. The site URL is `https://focal-k.github.io/` once GitHub Pages finishes deployment.
