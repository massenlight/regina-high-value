import { readFile, writeFile, cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, process.env.REGINA_OUTPUT_DIR || '../../04_交付與輸出/regina-atelier');
await mkdir(output, { recursive: true });
await cp(path.join(root, 'dist'), output, { recursive: true });
let html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const title = html.match(/<h1 class="scene-title">.*?<\/h1>/s)[0];
html = html.replace(title, '').replace('<div class="hero-copy">', '<div class="hero-copy">' + title);
// Preserve the original auditorium/speaker composition as an interlude.
const scene = html.match(/<div class="hero-scene">.*?<div class="hero-shade" aria-hidden="true"><\/div>/s)[0];
html = html.replace(scene, '<div class="atelier-halo" aria-hidden="true"></div><div class="atelier-portrait"><div class="portrait-course"><span>REGINA’S MASTERCLASS</span><h2>高價值客戶<br><strong>變現業務力</strong></h2><p>高若家 Regina</p></div><img src="assets/regina-portrait.png" alt="高若家 Regina" width="1440" height="1440" fetchpriority="high"></div>');
html = html.replace('<section class="transformation"', '<div class="atelier-stage" aria-label="講師舞台視覺">' + scene + '</div><section class="transformation"');
html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="atelier.css"><link rel="stylesheet" href="photo-safe.css"><link rel="stylesheet" href="atelier-refinements.css"></head>');
html = html.replace('<body>', '<body class="atelier">');
html = html.replace('<script src="parallax.js" defer></script>', '<script src="atelier.js" defer></script>');
// Restore the original rolling-number choreography with a taller glyph window.
html = html.replace('<script src="results.js" defer></script>', '<script src="atelier-results.js" defer></script>');
html = html.replace(title, '<p class="course-name">高價值客戶 · 變現業務力</p><h1 class="scene-title urgency-title"><span>一年後，還要繼續</span><span>靠降價成交嗎？</span></h1>');
html = html.replace('讓你的專業，<br>成為客戶選擇你的理由。', '別把下一年的努力，<br>再花在同樣的比價與追單。');
html = html.replace('從追著客戶跑，到成為值得信任的高價值業務。<br class="desktop">重新定位自己，用理解與信任，開啟長期成交的可能。', '今天沒說清楚的價值，可能就是明天流失的客戶。<br class="desktop">跟著 Regina，從理解需求、建立信任開始，改變只剩價格能談的局面。');
html = html.replace('明明已經很努力，<br>為什麼還是這麼被動？', '再忙一年，<br>就能擺脫現在的困局嗎？');
html = html.replace('每天都在忙，卻感覺離理想的業務樣貌，還差了一步。', '如果方法沒有改變，忙碌可能只是在重複同一種消耗。');
html = html.replace('<div class="mobile-bar"><div><small>兩天實體課程</small><strong>NT$19,800</strong></div><a class="button primary" href="#enroll">查看課程資訊 ↗</a></div>', '<div class="mobile-bar"><a class="button primary webinar-cta" href="#enroll">報名線上說明會 <span aria-hidden="true">↗</span></a></div>');
html = html.replace('<p>帶領無數業務小白<br>', '<p>帶領業務小白<br>');
html = html.replace('<strong>年收入破 300 萬</strong>', '<strong>年收入破300萬</strong>');
html = html.replace('客戶記住的，<br>除了商品，<br>還有<span>值得信任的你。</span>', '當你還在解釋價格，<br>有人已經讓客戶<br><span>看懂價值。</span>');
html = html.replace('當你理解真正的需求，提出有依據的建議，<br>每一次對話，都能成為建立信任的起點。', '面對同一位客戶，差別可能不在誰更努力，而在誰問出了真正的需求、說清楚了選擇的理由。<br>你的專業，值得被看見，而不只是被拿來比較。');
html = html.replace('讓專業被看見，<br>也讓未來<br><span>多一點選擇。</span>', '別讓下一年的努力，<br>仍然困在<br><span>今年的問題裡。</span>');
html = html.replace('跟著 Regina，用兩天為下一階段的成長打下基礎。<br>從理解客戶、建立信任開始，重新整理你的銷售方式。', '改變不必從推翻自己開始。先重新檢視一次對話、一份提案、一段客戶關係，找到值得調整的地方。<br>用兩天，為接下來的每一步，建立更清楚的方法。');
const enrollmentCard = await readFile(path.join(root, 'webinar-form.html'), 'utf8');
html = html.replace(/<article class="enroll-card">.*?<\/article>/s, enrollmentCard.trim());
html = html.replace('</body>', '<script src="regina-pixel.js" defer></script><script src="webinar-preview.js" defer></script></body>');
// Portrait-first edition: remove the superseded copy panel, including its CTAs/facts.
html = html.replace(/<div class="hero-copy">[\s\S]*?<\/section>/, '</section>');
html = html.replace('class="hero hero-parallax"', 'class="hero hero-parallax portrait-first"');
html = html.replace('<h2>高價值客戶<br><strong>變現業務力</strong></h2>', '<h1>高價值客戶<br><strong>變現業務力</strong></h1>');
html = html.replaceAll('兩天實體課程', '一天實體課程＋完整線上課程');
html = html.replaceAll('用兩天，為接下來的每一步，建立更清楚的方法。', '一天實體課程集中演練，搭配完整線上課程反覆學習，把成交方法帶回每一次客戶對話。');
html = html.replace('再忙一年，<br>就能擺脫現在的困局嗎？', '收入要再往上，<br>先把成交方法做對。');
html = html.replace('如果方法沒有改變，忙碌可能只是在重複同一種消耗。', '從找到對的客戶、說清楚方案價值，到經營再次成交與轉介紹，讓每一份努力更有機會累積成收入。');
html = html.replace('<span>重新定位自己</span>', '<span>找到高價值客戶</span>');
html = html.replace('<span>讓專業被看見</span>', '<span>提高成交品質</span>');
html = html.replace('<span>拿回人生選擇權</span>', '<span>累積收入成長</span>');
html = html.replace(/<span aria-hidden="true">↗<\/span>/g, '').replace(/查看課程(?:\s*↗)?/g, '報名免費講座');
html = html.replaceAll('線上說明會', '免費講座').replaceAll('說明會', '免費講座');
for(const asset of ['regina-pixel.js','webinar-preview.js','atelier-refinements.css']){const digest=createHash('sha256').update(await readFile(path.join(root,asset))).digest('hex').slice(0,12);html=html.replaceAll(asset+'"',asset+'?v='+digest+'"');}
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output,'_headers'),'/*\n  Cache-Control: no-cache\n');
for (const name of ['atelier.css', 'atelier.js', 'atelier-results.js', 'photo-safe.css', 'atelier-refinements.css', 'regina-pixel.js', 'webinar-preview.js']) await cp(path.join(root, name), path.join(output, name));
console.log(output);
