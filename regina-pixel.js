// Regina advertising events only; never include LINE identity or registration tokens.
(() => {
  const id='1214228613893749';
  if(!window.fbq){const q=function(){q.callMethod?q.callMethod.apply(q,arguments):q.queue.push(arguments)};q.push=q;q.loaded=true;q.version='2.0';q.queue=[];window.fbq=q;window._fbq=q;const s=document.createElement('script');s.async=true;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(s);}
  const q=window.fbq;q('set','autoConfig',false,id);q('init',id);q('trackSingle',id,'PageView');
  let submitted=false;
  window.reginaTrackSubmit=()=>{if(submitted)return;submitted=true;try{q('trackSingleCustom',id,'RegistrationSubmit',{content_name:'高若家免費講座'},{eventID:crypto.randomUUID()});}catch{}};
})();
