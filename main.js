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
  'Task average': [[56.7,33.3],[33.3,31.6],[60.0,68.3]],
  'Handover Block': [[60,20],[20,20],[60,70]],
  'Place Can Basket': [[60,50],[80,75],[70,85]],
  'Mug Cheers': [[50,10],[0,0],[50,50]]
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
}
setupResults('sim', sim); setupResults('real', real);
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
    video.setAttribute('aria-label', `${gallerySelect.selectedOptions[0].textContent} ${label} evaluation clip`);
    const source = document.createElement('source'); source.src = `assets/rollouts/${task}-${slug}.mp4`; source.type = 'video/mp4';
    video.append(source); card.append(title, video); gallery.append(card);
  });
}
gallerySelect.addEventListener('change', renderGallery); renderGallery();
const shell = document.getElementById('overview-video');
shell.querySelector('button').addEventListener('click', () => {
  const video = document.createElement('video');
  video.controls = true; video.autoplay = true; video.playsInline = true;
  video.preload = 'metadata'; video.poster = 'assets/video-poster.jpg';
  video.setAttribute('aria-label', 'FOCAL-K overview video');
  const source = document.createElement('source'); source.src = 'assets/focal-k-overview.mp4'; source.type = 'video/mp4';
  video.append(source); shell.replaceChildren(video); video.play().catch(() => {});
});
