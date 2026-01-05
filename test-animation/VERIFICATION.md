# Animation Verification Checklist

This document provides a systematic approach to verify all behaviors of the UBlueHero component.

## Test Environment

Run the test app:
```bash
cd test-animation
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 1. Visual Flow Test

### Expected Behavior
Particles should move in a fluid, non-random pattern creating a smooth "river-like" flow across the screen.

### Verification Steps
1. Open the test app
2. Observe particles moving in coordinated patterns (not random chaos)
3. The flow should look organic, like water currents
4. Try changing noise scale to see different flow patterns:
   - **0.0005**: Large, smooth waves
   - **0.0011** (default): Balanced flow
   - **0.005**: More chaotic, detailed patterns

### What to Look For
- Smooth, continuous motion
- Coordinated particle groups
- No sudden random direction changes
- Fluid-like movement patterns

---

## 2. Trail Effect Test

### Expected Behavior
Faint trails should appear behind moving particles, creating a motion blur effect.

### Verification Steps
1. Observe a single particle for 2-3 seconds
2. You should see a trail of decreasing brightness following it
3. The trail length depends on particle speed

### Technical Details
This is achieved with `background(0, 10)` in the draw loop:
- Black background (0)
- Low opacity (10/255 = ~4% opacity)
- Previous frames slowly fade out

### What to Look For
- Ghosting effect behind fast-moving particles
- Gradual fade of previous positions
- Smooth motion blur appearance

---

## 3. Boundary Reset Test

### Expected Behavior
When particles move off-screen, they should instantly teleport to a new random position.

### Verification Steps
1. Watch the edges of the screen
2. When a particle crosses the boundary:
   - It should disappear
   - A new particle should appear at a random location
   - No animation or transition - instant teleport

### What to Look For
- Particles continuously respawn at random positions
- No accumulation at screen edges
- Even distribution of new particles
- Instant teleportation (no sliding back)

### Edge Cases to Check
- Corner areas (particles can exit diagonally)
- Rapid window resize
- Different screen sizes

---

## 4. Reduced Motion Accessibility Test

### Expected Behavior
Animation stops when system reduced motion setting is enabled.

### Verification Steps

#### Option 1: UI Toggle (Test App)
1. Find the "Reduced Motion (Accessibility)" checkbox in the control panel
2. Check the box
3. Animation should stop immediately
4. Uncheck to resume

#### Option 2: System Settings
**macOS:**
1. System Settings → Accessibility → Display
2. Check "Reduce motion"
3. Refresh the page - animation should not play

**Windows:**
1. Settings → Accessibility → Motion
2. Toggle "Show animations in Windows"
3. Refresh the page - animation should not play

**iOS:**
1. Settings → Accessibility → Motion
2. Enable "Reduce Motion"
3. Animation should be disabled

### What to Look For
- Animation completely stops (no movement)
- No CPU usage from animation loop
- Instant response to setting change
- No visual artifacts when resuming

---

## 5. Noise Seed Test

### Expected Behavior
Different seeds produce completely different but reproducible flow patterns.

### Verification Steps
1. Set a specific seed (e.g., "123")
2. Observe the particle flow pattern
3. Reload the page
4. Set the same seed
5. Flow pattern should be identical

### Seed Examples to Try
- **Seed 1**: Tight, coiled patterns
- **Seed 42**: Balanced, flowing patterns
- **Seed 123**: Wide, sweeping curves
- **Seed 999**: Chaotic, fragmented patterns
- **Seed 2024**: Large, smooth waves

### What to Look For
- Identical patterns when using the same seed
- Dramatically different patterns with different seeds
- Smooth transitions between flow directions
- Reproducible results on page reload

### Technical Note
The seed affects the Perlin noise function, creating a unique but deterministic flow field.

---

## 6. Performance Test

### Expected Behavior
Animation should run smoothly (60 FPS) even with high particle counts.

### Verification Steps

#### Method 1: Built-in Stats
1. Enable "Show Performance Stats" in the control panel
2. Observe FPS counter
3. Try different particle counts (100-2000)
4. FPS should remain reasonable

#### Method 2: Browser DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record for 5 seconds
4. Check:
   - Frame rate graph
   - CPU usage
   - Script execution time

#### Method 3: Task Manager
**Chrome:**
1. Shift+Esc or Menu → More Tools → Task Manager
2. Find the browser tab
3. Check CPU usage (should be low when idle)

### Performance Targets
- **60 FPS**: Ideal performance
- **30+ FPS**: Acceptable for animation
- **<30 FPS**: May need optimization

### What to Look For
- Stable frame rate
- Low CPU usage when animation is running
- Performance scales with particle count
- No memory leaks (check over several minutes)

---

## 7. Window Resize Test

### Expected Behavior
Canvas should adapt to window size changes.

### Verification Steps
1. Open browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test different viewport sizes
4. Resize browser window manually

### What to Look For
- Canvas fills the entire container
- No stretching or distortion
- Particles redistribute appropriately
- Smooth transition during resize

---

## 8. Component Cleanup Test

### Expected Behavior
No memory leaks when component unmounts.

### Verification Steps
1. Navigate to a different page (if using routing)
2. Or temporarily remove the component
3. Check browser's Memory tab in DevTools
4. Heap snapshots should not grow

### What to Look For
- No accumulated p5 instances
- Clean garbage collection
- Stable memory usage over time

---

## Quick Test Commands

```bash
# Run tests
cd test-animation
npm run dev

# Check for memory leaks
# 1. Open DevTools → Memory
# 2. Take heap snapshot
# 3. Let animation run for 1 minute
# 4. Take another snapshot
# 5. Compare for retained objects
```

---

## Expected Results Summary

| Test | Expected Result | Status |
|------|-----------------|--------|
| Visual Flow | Smooth, organic patterns | ⬜ |
| Trail Effect | Ghosting behind particles | ⬜ |
| Boundary Reset | Instant teleportation | ⬜ |
| Reduced Motion | Stops with setting enabled | ⬜ |
| Noise Seed | Reproducible unique patterns | ⬜ |
| Performance | 60 FPS with 500 particles | ⬜ |
| Window Resize | Responsive to size changes | ⬜ |
| Cleanup | No memory leaks | ⬜ |

---

## Reporting Issues

If any test fails:
1. Note the browser version and OS
2. Describe the expected vs actual behavior
3. Include screenshots if relevant
4. Report at: https://github.com/your-repo/issues
