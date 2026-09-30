const sim = {
  'Task average': [[59.0,19.1],[50.3,3.1],[69.0,24.5]],
  'Beat Block Hammer': [[82.7,20.7],[76.7,8.0],[88.0,36.0]],
  'Place Can Basket': [[74.7,12.0],[76.0,3.3],[88.7,22.0]],
  'Pick Dual Bottles': [[86.7,15.3],[64.0,4.0],[88.7,30.7]],
  'Handover Block': [[64.0,17.3],[76.0,0.0],[92.0,22.0]],
  'Stack Bowls Two': [[90.7,76.0],[85.3,13.3],[92.0,60.7]],
  'Stack Blocks Two': [[45.3,19.3],[24.0,0.0],[45.3,20.0]],
  'Scan Object': [[36.7,5.3],[30.0,1.3],[63.3,6.0]],
  'Hanging Mug': [[34.0,4.0],[17.3,0.7],[47.3,13.3]],
  'Place Bread Skillet': [[40.7,12.0],[36.0,0.0],[48.7,17.3]],
  'Place Dual Shoes': [[34.7,9.3],[17.3,0.0],[36.0,17.3]]
};
const real = {
  'Task average': [[33.3,31.6],[56.7,33.3],[60.0,68.3]],
  'Handover Block': [[20,20],[60,20],[60,70]],
  'Place Can Basket': [[80,75],[60,50],[70,85]],
  'Mug Cheers': [[0,0],[50,10],[50,50]]
};
const methods = ['π₀.₅', 'Bimanual DP3', 'FOCAL-K'];
function setupResults(prefix, data) {
  const select = document.getElementById(`${prefix}-task`);
  const chart = document.getElementById(`${prefix}-bars`);
  const buttons = [...document.querySelectorAll(`[data-${prefix}-condition]`)];
  let condition = 0;
  for (const task of Object.keys(data)) select.add(new Option(task, task));
  function render() {
    chart.replaceChildren();
    data[select.value].forEach((pair, i) => {
      const value = pair[condition];
      const row = document.createElement('div'); row.className = `bar-row ${i === 2 ? 'ours' : ''}`;
      const label = document.createElement('span'); label.className = 'bar-label'; label.textContent = methods[i];
      const track = document.createElement('div'); track.className = 'bar-track';
      const fill = document.createElement('span'); fill.className = 'bar-fill'; fill.style.width = `${value}%`; track.append(fill);
      const number = document.createElement('strong'); number.textContent = `${value.toFixed(1)}%`;
      row.append(label, track, number); chart.append(row);
    });
  }
  select.addEventListener('change', render);
  buttons.forEach(button => button.addEventListener('click', () => {
    condition = button.dataset[`${prefix}Condition`] === 'clean' ? 0 : 1;
    buttons.forEach(b => b.classList.toggle('active', b === button)); render();
  }));
  render();
  return {select, render};
}
const simResults = setupResults('sim', sim); const realResults = setupResults('real', real);
const simulationSlugs = {
  'Beat Block Hammer':'beat_block_hammer', 'Place Can Basket':'place_can_basket',
  'Pick Dual Bottles':'pick_dual_bottles', 'Handover Block':'handover_block',
  'Stack Bowls Two':'stack_bowls_two', 'Stack Blocks Two':'stack_blocks_two',
  'Scan Object':'scan_object', 'Hanging Mug':'hanging_mugs',
  'Place Bread Skillet':'place_bread_skillet', 'Place Dual Shoes':'place_dual_shoes'
};
const simulationPreviews = document.getElementById('sim-previews');
function renderSimulationPreviews() {
  const task = simResults.select.value;
  const slug = simulationSlugs[task];
  simulationPreviews.replaceChildren();
  if (!slug) {
    const note = document.createElement('p'); note.textContent = 'Select an individual task to view its Clean and Randomized animations.';
    simulationPreviews.append(note); return;
  }
  const active = document.querySelector('[data-sim-condition].active')?.dataset.simCondition || 'clean';
  for (const condition of ['clean','randomized']) {
    const figure = document.createElement('figure');
    figure.className = `simulation-preview ${condition === active ? 'active' : ''}`;
    const image = document.createElement('img');
    image.src = `assets/simulation/${slug}_${condition}.gif`;
    image.alt = `${task}, ${condition} simulation rollout`;
    image.loading = 'lazy'; image.width = 320; image.height = 240;
    const caption = document.createElement('figcaption');
    caption.textContent = condition === 'clean' ? 'Clean' : 'Randomized';
    figure.append(image, caption); simulationPreviews.append(figure);
  }
}
simResults.select.addEventListener('change', renderSimulationPreviews);
document.querySelectorAll('[data-sim-condition]').forEach(button => button.addEventListener('click', renderSimulationPreviews));
simResults.select.value = 'Beat Block Hammer'; simResults.render(); renderSimulationPreviews();
const gallerySelect = document.getElementById('gallery-task');
const gallery = document.getElementById('real-gallery');
function renderGallery() {
  for (const video of gallery.querySelectorAll('video')) video.pause();
  gallery.replaceChildren();
  const task = gallerySelect.value;
  [['dp3','Bimanual DP3'], ['focal-k','FOCAL-K'], ['pi05','π₀.₅']].forEach(([slug,label]) => {
    const card = document.createElement('article'); card.className = `gallery-card ${slug === 'focal-k' ? 'featured' : ''}`;
    const title = document.createElement('h4'); title.textContent = label;
    const video = document.createElement('video'); video.controls = true; video.playsInline = true;
    video.preload = 'none'; video.poster = `assets/rollouts/${task}-${slug}.jpg`;
    video.setAttribute('aria-label', `${gallerySelect.selectedOptions[0].textContent} ${label} evaluation clip, 20× speed`);
    const source = document.createElement('source'); source.src = `assets/rollouts/${task}-${slug}.mp4`; source.type = 'video/mp4';
    const player = document.createElement('div'); player.style.position = 'relative';
    const speed = document.createElement('span'); speed.textContent = '20× speed';
    speed.style.cssText = 'position:absolute;top:12px;right:12px;padding:5px 9px;border-radius:6px;background:rgba(0,0,0,.72);color:#fff;font-size:13px;font-weight:700;line-height:1.4;pointer-events:none;z-index:1';
    video.append(source); player.append(video, speed); card.append(title, player); gallery.append(card);
  });
}
const galleryTasks = {'Handover Block':'handover', 'Place Can Basket':'can-basket', 'Mug Cheers':'mug-cheers'};
gallerySelect.addEventListener('change', () => {
  realResults.select.value = gallerySelect.selectedOptions[0].textContent;
  realResults.render();
  renderGallery();
});
realResults.select.addEventListener('change', () => {
  const galleryTask = galleryTasks[realResults.select.value];
  if (galleryTask && gallerySelect.value !== galleryTask) {
    gallerySelect.value = galleryTask;
    renderGallery();
  }
});
realResults.select.value = 'Handover Block'; realResults.render(); renderGallery();
const shell = document.getElementById('overview-video');
shell.querySelector('button').addEventListener('click', () => {
  const video = document.createElement('video');
  video.controls = true; video.autoplay = true; video.playsInline = true;
  video.preload = 'metadata'; video.poster = 'assets/video-poster.jpg';
  video.setAttribute('aria-label', 'FOCAL-K overview video');
  const source = document.createElement('source'); source.src = 'assets/focal-k-overview.mp4'; source.type = 'video/mp4';
  video.append(source); shell.replaceChildren(video); video.play().catch(() => {});
});
