// Same project backend as staff operations; LINE verifies identity before confirming a seat.
(() => {
  const form = document.querySelector('#webinar-form');
  if (!form) return;
  const api = 'https://massenlighten-platform.massenlighten-company.workers.dev/api/recruitment?teacher=regina';
  const container = document.querySelector('#webinar-sessions');
  const status = document.querySelector('#webinar-availability');
  const submit = form.querySelector('button[type="submit"]');
  let busy = false;
  async function request(body) {
    const response = await fetch(api, body ? { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:AbortSignal.timeout(20000) } : {signal:AbortSignal.timeout(15000)});
    const data = await response.json();
    if (!response.ok) throw Error(data.error || '暫時無法連線，請稍後再試。');
    return data;
  }
  request().then(data => {
    if (!data.liffId || !Array.isArray(data.sessions) || !data.sessions.length) { status.textContent='場次即將公布，目前尚未開放報名。'; return; }
    for (const session of data.sessions) {
      const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');
      input.type='radio';input.name='sessionId';input.value=session.id;input.required=true;
      text.textContent=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',month:'long',day:'numeric',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(session.startsAt));
      label.className='webinar-session';label.append(input,text);container.append(label);
    }
    status.textContent='選擇場次後，前往 LINE 完成報名。';submit.disabled=false;
  }).catch(() => {status.textContent='暫時無法載入場次，請重新整理後再試。';});
  form.addEventListener('submit',async event => {
    event.preventDefault();if(busy||!form.reportValidity())return;busy=true;submit.disabled=true;
    status.textContent='正在保留你選擇的場次，準備前往 LINE…';
    try {
      const query=new URLSearchParams(location.search),formData=new FormData(form);
      const data=await request({action:'pre-register',sessionId:formData.get('sessionId'),consent:true,sourceSlug:'regina-atelier',utmSource:query.get('utm_source')||'',utmMedium:query.get('utm_medium')||'',utmCampaign:query.get('utm_campaign')||'',utmContent:query.get('utm_content')||'',utmTerm:query.get('utm_term')||'',fbclid:query.get('fbclid')||''});
      const target=new URL(data.lineUrl);if(target.origin!=='https://liff.line.me')throw Error('報名入口尚未就緒，請稍後再試。');
      location.assign(target.href);
    } catch(error) {status.textContent=error.message||'暫時無法報名，請稍後再試。';busy=false;submit.disabled=false;}
  });
})();
