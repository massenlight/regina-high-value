import {readFile,writeFile,cp,mkdir} from 'node:fs/promises';
import path from 'node:path';
const root=import.meta.dirname, dest=path.resolve(root,'../../04_交付與輸出/regina-editorial');
await mkdir(dest,{recursive:true});
await cp(path.resolve(root,'../../04_交付與輸出/regina-atelier'),dest,{recursive:true});
const source=await readFile(path.join(root,'dist/index.html'),'utf8');
let html=await readFile(path.join(dest,'index.html'),'utf8');
function section(id){const re=new RegExp('<section[^>]*id="'+id+'"[^>]*>[\\s\\S]*?</section>');const found=html.match(re);if(!found)throw Error('Missing section '+id);return found[0];}
function change(id,value){html=html.replace(section(id),value);}
const minds=[...source.matchAll(/<div class="heart-detail"[^>]*>[\s\S]*?<p class="heart-detail-kicker">(.*?)<\/p><h4>(.*?)<\/h4><p>(.*?)<\/p>/g)];
const sales=[...source.matchAll(/<p class="step-kicker">STEP \d+ — (.*?)<\/p><h3[^>]*>(.*?)<\/h3><p class="step-description">(.*?)<\/p><p class="step-keywords">(.*?)<\/p>/g)];
if(minds.length!==5||sales.length!==8)throw Error('Course extraction mismatch');
const chapter=(m,i,kind)=>`<details class="lesson" ${i===0?'open':''} id="${kind==='mind'?'mind-chapter-':'sales-step-'}${i+1}"><summary><span class="lesson-index">${String(i+1).padStart(2,'0')}</span><span>${m[1]}<small>${m[2]}</small></span><b aria-hidden="true">＋</b></summary><div class="lesson-body"><p>${m[3]}</p>${m[4]?`<p class="lesson-tags">${m[4]}</p>`:''}</div></details>`;
html=html.replace('class="atelier"','class="atelier editorial"').replace('</head>','<link rel="stylesheet" href="editorial.css"></head>');
html=html.replace('<script src="chapters.js" defer></script>','').replace('<script src="heart.js" defer></script>','').replace('<script src="results.js" defer></script>','');
html=html.replace('<script src="atelier.js" defer></script>','<script src="editorial.js" defer></script>');
html=html.replace('<h1 class="scene-title"><span>高價值客戶</span><span>變現業務力</span></h1>','<h1 class="scene-title"><span>不只被聽見，</span><span>更要被選擇。</span></h1>');
html=html.replace('REGINA’S MASTERCLASS <span>兩天實體課程</span>','高若家 REGINA <span>兩天實體課程</span>');
html=html.replace('<p class="hero-lead">讓你的專業，<br>成為客戶選擇你的理由。</p>','<p class="hero-lead">高價值客戶變現業務力</p>');
html=html.replace(/<p class="intro">.*?<\/p>/,'<p class="intro">把「努力推銷」，轉成「值得信任的專業建議」。<br>從問對問題、說清價值，到經營下一次合作，<br>重新建立一套有方向的銷售方式。</p>');
html=html.replace('探索課程內容 <span','看完整 13 章課綱 <span').replace('了解高價值業務力 <span','這堂課適合我嗎？ <span');
change('approach',`<section class="section wrap" id="approach"><div class="editorial-heading"><p class="eyebrow">01 / A DIFFERENT CONVERSATION</p><h2>你不缺努力。<br>缺的是，讓專業<span>被理解的方法。</span></h2><p>不是再背一套話術，而是重新整理你與客戶之間的每一步。</p></div><div class="editorial-shifts">${[
['總是被拿去比價','先說清楚，你解決什麼問題。','從自己的專業與客戶情境出發，把方案的價值講具體，而不是只剩下折扣。'],
['聊得很多，卻抓不到重點','問出對方真正的考量。','辨認需求、預算與決策角色，讓建議回應客戶在意的事，不再一味介紹商品。'],
['成交一次，又從零開始','把成交，接上長期關係。','整理後續服務與互動節奏，累積信任、轉介紹與再次合作的機會。']
].map((r,i)=>`<article><span class="shift-no">0${i+1}</span><p class="old-habit">${r[0]}</p><h3>${r[1]}</h3><p>${r[2]}</p><a href="#curriculum">對應課程內容 <span aria-hidden="true">↗</span></a></article>`).join('')}</div></section>`);
// Condense repeated explanation into one concrete, clearly labeled practice example.
const methods=html.match(/<section class="section wrap methods">[\s\S]*?<\/section>/)[0];
html=html.replace(methods,`<section class="practice-section"><div class="wrap practice-grid"><div><p class="eyebrow">TRY A DIFFERENT QUESTION</p><h2>先別急著回答「太貴」。<br>先聽懂，客戶在比較什麼。</h2><p>需求洞察，是從確認問題開始，不是從解釋產品開始。</p></div><div class="practice-note"><span>溝通練習示例</span><p class="customer-line">「這個價格，我再考慮一下。」</p><div class="practice-answer"><small>你可以先這樣問</small><blockquote>「想再了解一下，您現在比較在意的是預算，還是不確定這個方案能不能解決您的問題？」</blockquote></div><p class="fine">把價格與疑慮分開，才有機會回應真正的需求。這是課程觀念的應用示例，不是保證成交的話術。</p></div></div></section>`);
let mentor=section('mentor');
mentor=mentor.replace('Philosophy','Meet Regina').replace('高若家 · 教學理念','02 / 關於講師').replace('把走過的路，<br>整理成你能學習的方法。','她教的，是走過低谷後，<br>重新建立選擇的方法。');
const resultStart=mentor.indexOf('<div class="wrap mentor-results"');
mentor=mentor.slice(0,resultStart)+`<div class="wrap editorial-results" id="mentor-results"><div><strong>12 <small>台</small></strong><p>汽車銷售單月最高數量</p></div><div><strong>500 <small>萬＋</small></strong><p>個人年收入突破 500 萬</p></div><div><strong>300 <small>萬＋</small></strong><p>帶領無數業務小白年收入破 300 萬</p></div><p class="fine">以上為講師於課程簡報分享之個人與帶領案例經歷，不代表每位學員的學習或收入成果。</p></div></section>`;
change('mentor',mentor);
change('curriculum',`<section class="editorial-curriculum section" id="curriculum"><div class="wrap"><div class="editorial-heading centered"><p class="eyebrow">03 / THE COMPLETE CURRICULUM</p><h2>先站穩自己，<span>再走進客戶的世界。</span></h2><p>五大心智章節 × 八大成交關鍵。完整課綱，依照你的卡點展開閱讀。</p></div><div class="curriculum-duo"><article class="course-volume"><div class="volume-heading"><p class="eyebrow">VOLUME 01 · 內在</p><h3>建立專業的底氣。</h3><p>五大心智章節，從自我定位到穩定行動。</p><img src="assets/mind-heart-transparent.png" alt="原有內在心智系統示意圖" width="1145" height="1374" loading="lazy"></div>${minds.map((m,i)=>chapter(m,i,'mind')).join('')}</article><article class="course-volume volume-dark" id="sales-steps"><div class="volume-heading"><p class="eyebrow">VOLUME 02 · 外在</p><h3>建立成交的方法。</h3><p>八大高單價成交關鍵步驟，從第一句對話到下一次合作。</p></div>${sales.map((m,i)=>chapter(m,i,'sales')).join('')}</article></div><div class="course-takeaway"><span>02 天實體學習</span><p>不只知道該說什麼，更要理解：<strong>為什麼這樣問、何時這樣說、下一步怎麼做。</strong></p></div></div></section>`);
// Remove the old long, duplicated eight-chapter presentation, but retain the new one.
html=html.replace(/<section class="sales-journey"[\s\S]*?<\/section>/,'');
html=html.replace('05 / MADE FOR YOU','04 / IS THIS FOR YOU').replace('為正在尋找突破口的你。','你正在這個階段嗎？');
html=html.replace('06 / BEYOND THE CLASSROOM','BEYOND THE CLASSROOM');
html=html.replace('讓專業被看見，<br>也讓未來<br><span>多一點選擇。</span>','用兩天，<br>重新整理你的<br><span>下一步。</span>');
html=html.replace('跟著 Regina，用兩天為下一階段的成長打下基礎。<br>從理解客戶、建立信任開始，重新整理你的銷售方式。','給想建立方向的新手，也給希望突破瓶頸的你。<br>從內在定位、需求洞察，到成交後的關係經營，<br>讓每一步，都有方法可以依循。');
html=html.replace('<div class="booking-status">報名資訊即將公布</div>','<div class="booking-status">報名資訊即將公布</div><a class="editorial-contact" href="mailto:service@massenlighten.com">聯絡課程客服 <span aria-hidden="true">↗</span></a>');
html=html.replace('07 / QUESTIONS &amp; ANSWERS','QUESTIONS &amp; ANSWERS');
await writeFile(path.join(dest,'index.html'),html);
for(const file of ['editorial.css','editorial.js'])await cp(path.join(root,file),path.join(dest,file));
console.log(dest);
