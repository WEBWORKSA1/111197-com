/* 111197.com — 11:11 Plan Lab | site script (no dependencies) */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function sstore(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
  var pad=function(n){return (n<10?'0':'')+n};

  /* ---------- Private inbox routing (the address is never written in any page) ---------- */
  var _k=[102,100,104,37,103,98,106,102,108,75,58,106,120,96,121,100,124,105,110,124];
  function inbox(){return String.fromCharCode.apply(null,_k.map(function(c){return c^11})).split('').reverse().join('')}
  function endpoint(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      window.location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(a.getAttribute('data-mail')||'Inquiry from 111197.com');
    });
  });

  /* ---------- Theme ---------- */
  var root=document.documentElement,saved=store('pl-theme');
  if(saved)root.setAttribute('data-theme',saved);
  var tb=$('#themeBtn');
  if(tb)tb.addEventListener('click',function(){var t=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',t);store('pl-theme',t)});

  /* ---------- Nav ---------- */
  var here=location.pathname.replace(/index\.html$/,'');
  $$('#menu a').forEach(function(a){
    var h=a.getAttribute('href').replace(/index\.html$/,'');
    if(h===here||(h==='/guides/'&&here.indexOf('/guides/')===0)){a.classList.add('active');a.setAttribute('aria-current','page')}
  });
  var bg=$('#burger'),menu=$('#menu');
  if(bg&&menu)bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)});

  /* ---------- Reveal ---------- */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1});
    $$('.reveal').forEach(function(el){io.observe(el)});
  }else $$('.reveal').forEach(function(el){el.classList.add('in')});

  /* ---------- Cookie notice ---------- */
  var ck=$('#cookie');
  if(ck&&!store('pl-cookie'))ck.classList.add('show');
  $$('[data-cookie]').forEach(function(b){b.addEventListener('click',function(){store('pl-cookie',b.getAttribute('data-cookie'));ck.classList.remove('show')})});

  $$('.year').forEach(function(el){el.textContent=new Date().getFullYear()});

  /* ---------- Money helpers ---------- */
  var cur=store('pl-cur')||'$';
  function money(n,dec){if(!isFinite(n))return '—';var neg=n<0;n=Math.abs(n);return (neg?'-':'')+cur+n.toLocaleString(undefined,{minimumFractionDigits:dec?2:0,maximumFractionDigits:dec?2:0})}
  function num(id){var el=document.getElementById(id);if(!el)return 0;var v=parseFloat(String(el.value).replace(/[^0-9.\-]/g,''));return isFinite(v)?v:0}
  function bind(ids,fn){ids.forEach(function(id){var el=document.getElementById(id);if(el){el.addEventListener('input',fn);el.addEventListener('change',fn)}});fn()}
  function fv(pmt,rate,months,pv){var i=rate/12;pv=pv||0;if(i===0)return pv+pmt*months;return pv*Math.pow(1+i,months)+pmt*(Math.pow(1+i,months)-1)/i}
  $$('[data-cur]').forEach(function(s){s.value=cur;s.addEventListener('change',function(){cur=s.value;store('pl-cur',cur);$$('input,select').forEach(function(x){x.dispatchEvent(new Event('input'))})})});

  /* ---------- Live 11:11 clock ---------- */
  var clk=$('#liveClock');
  if(clk){
    var sub=$('#clockSub');
    (function tick(){
      var d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds();
      clk.innerHTML=pad(h)+'<span class="c">:</span>'+pad(m)+'<span class="c">:</span>'+pad(s);
      var t=new Date(d);t.setSeconds(0,0);
      var c1=new Date(d);c1.setHours(11,11,0,0);var c2=new Date(d);c2.setHours(23,11,0,0);
      var next=[c1,c2,new Date(c1.getTime()+864e5)].filter(function(x){return x>d})[0];
      if((h===11||h===23)&&m===11){sub.innerHTML='<b style="color:var(--gold)">It’s 11:11 right now.</b> Make the wish — then give it a plan below.'}
      else{var ms=next-d,hh=Math.floor(ms/36e5),mm=Math.floor(ms%36e5/6e4),ss=Math.floor(ms%6e4/1e3);sub.innerHTML='Next 11:11 in <b class="mono">'+pad(hh)+'h '+pad(mm)+'m '+pad(ss)+'s</b>. Don’t wait for it.'}
      setTimeout(tick,1000-(Date.now()%1000));
    })();
  }

  /* ---------- Generic countdowns ---------- */
  function etOffset(y,mo){ // US Eastern: UTC-4 from 2nd Sun Mar to 1st Sun Nov, else UTC-5 (day 11 is unambiguous except Mar/Nov)
    function nthSun(m,n){var d=new Date(Date.UTC(y,m,1));var c=0;while(true){if(d.getUTCDay()===0&&++c===n)return d.getUTCDate();d.setUTCDate(d.getUTCDate()+1)}}
    if(mo>2&&mo<10)return 4;if(mo===2)return 11>=nthSun(2,2)?4:5;if(mo===10)return 11>=nthSun(10,1)?5:4;return 5;
  }
  function nextEleventh(){ // 11:11 a.m. US Eastern on the 11th
    var d=new Date(),y=d.getUTCFullYear(),mo=d.getUTCMonth();
    for(var k=-1;k<3;k++){var yy=y+Math.floor((mo+k)/12),mm=((mo+k)%12+12)%12;var t=new Date(Date.UTC(yy,mm,11,11+etOffset(yy,mm),11,0));if(t>d)return t}
  }
  function nextNov11(){var d=new Date(),t=new Date(d.getFullYear(),10,11,0,0,0);if(t<=d)t=new Date(d.getFullYear()+1,10,11);return t}
  function runCd(el,target){
    (function tick(){var ms=Math.max(0,target-new Date());var d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);el.textContent=d+'d '+pad(h)+'h '+pad(m)+'m '+pad(s)+'s';setTimeout(tick,1000)})();
  }
  var gc=$('#grantCountdown');if(gc){var gt=nextEleventh();runCd(gc,gt);var gd=$('#grantDate');if(gd)gd.textContent=gt.toLocaleString(undefined,{weekday:'short',month:'long',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})}
  var ec=$('#elevenCountdown');if(ec){var et=nextNov11();runCd(ec,et);var ed=$('#elevenDate');if(ed)ed.textContent=et.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}

  /* ---------- Hero wish box → planner ---------- */
  var wb=$('#wishForm');
  if(wb)wb.addEventListener('submit',function(e){
    e.preventDefault();
    var q='?wish='+encodeURIComponent($('#wb-wish').value||'')+'&amount='+encodeURIComponent($('#wb-amt').value||'');
    location.href='/planner.html'+q+'#plan';
  });

  /* ---------- Wish → Plan generator ---------- */
  var pf=$('#planForm');
  if(pf){
    var qs=new URLSearchParams(location.search);
    if(qs.get('wish'))$('#p-wish').value=qs.get('wish');
    if(qs.get('amount'))$('#p-amount').value=qs.get('amount');
    var dd=$('#p-date');if(dd&&!dd.value){var x=new Date();x.setMonth(x.getMonth()+11);x.setDate(11);dd.value=x.toISOString().slice(0,10)}
    pf.addEventListener('submit',function(e){
      e.preventDefault();
      if(!pf.checkValidity()){pf.reportValidity();return}
      var wish=$('#p-wish').value.trim()||'My goal',amt=num('p-amount'),have=num('p-have'),inc=num('p-income'),cat=$('#p-cat').value;
      var due=new Date($('#p-date').value+'T12:00:00'),now=new Date();
      var months=Math.max(1,(due.getFullYear()-now.getFullYear())*12+(due.getMonth()-now.getMonth())+(due.getDate()>=now.getDate()?0:-1));
      var gap=Math.max(0,amt-have),perM=gap/months,perW=perM*12/52,perD=perM*12/365;
      var share=inc>0?perM/inc*100:0;
      var verdict=share===0?'Add your monthly take-home pay to check how realistic this is.':share<=10?'Comfortable — under 10% of take-home pay. Consider finishing early.':share<=20?'Realistic — in the 10–20% savings zone most planners recommend.':share<=35?'Stretch — doable with a spending cut AND an income lever (step 09).':'Aggressive — extend the date, lower the target, or add a serious income lever.';
      function fmt(dt){return dt.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}
      function addM(n){var t=new Date(now);t.setMonth(t.getMonth()+n);return t}
      var nextEl=new Date(now.getFullYear(),now.getMonth()+(now.getDate()>11?1:0),11);
      var cushion=Math.min(1111,Math.max(0,amt*0.1));
      var steps=[
        ['Today','Name the wish','“'+wish+'” — written as one sentence you can read out loud. Category: '+cat+'.'],
        ['Today','Put a number on it','Target: '+money(amt)+'. Already saved: '+money(have)+'. Gap to close: '+money(gap)+'.'],
        ['Today','Set the date','Deadline '+fmt(due)+' — that is '+months+' month'+(months>1?'s':'')+' away.'],
        ['This week','Split it','Save '+money(perM)+' / month = '+money(perW)+' / week = '+money(perD,true)+' / day.'],
        ['This week','Open a separate “wish” account','Name it after your goal. A high-interest savings account keeps it out of daily spending.'],
        [fmt(addM(1)),'Build a starter cushion','Keep '+money(cushion||1111)+' aside first so one surprise bill doesn’t raid the goal.'],
        [fmt(addM(1)),'Clear debt above 11% APR','Card or loan interest above 11% usually beats any savings rate — pay it down in parallel.'],
        ['Next payday','Automate it','Schedule '+money(perM)+' to move on payday, before you can spend it.'],
        [fmt(addM(2)),'Add an income lever','Raise, overtime, freelance or an AI-assisted side hustle. Even '+money(perM*0.25)+'/mo extra cuts the timeline.'],
        [fmt(nextEl),'Run the 11th Review','On the 11th of every month: check progress, adjust the amount, keep going. Milestones: 25% '+fmt(addM(Math.ceil(months*.25)))+' · 50% '+fmt(addM(Math.ceil(months*.5)))+' · 75% '+fmt(addM(Math.ceil(months*.75)))+'.'],
        [fmt(due),'Celebrate & reset','Hit '+money(amt)+'. Celebrate within budget, then pick the next wish.']
      ];
      var ol=$('#planList');
      ol.innerHTML=steps.map(function(s){return '<li><time>'+s[0]+'</time><b>'+s[1]+'</b><br><span>'+s[2]+'</span></li>'}).join('');
      $('#planTitle').textContent=wish;
      $('#planPerM').textContent=money(perM);
      $('#planShare').textContent=share?share.toFixed(1)+'% of take-home':'—';
      $('#planVerdict').textContent=verdict;
      $('#planMonths').textContent=months;
      var out=$('#planOut');out.classList.add('show');
      var txt='PLAN: '+wish+'\nTarget '+money(amt)+' by '+fmt(due)+' | '+money(perM)+'/month\n'+steps.map(function(s,i){return pad(i+1)+'. ['+s[0]+'] '+s[1]+' — '+s[2]}).join('\n');
      var hid=$('#planText');if(hid)hid.value=txt;
      out.scrollIntoView({behavior:'smooth',block:'start'});
      $('#planCopy').onclick=function(){try{navigator.clipboard.writeText(txt);this.textContent='Copied ✓'}catch(err){}};
    });
    if(qs.get('wish')&&qs.get('amount')){/* gentle prefill only */}
  }
  var pp=$('#planPrint');if(pp)pp.addEventListener('click',function(){window.print()});

  /* ---------- Calculators ---------- */
  if($('#t-1111')){
    bind(['e-daily','e-rate','e-years'],function(){
      var d=num('e-daily'),r=num('e-rate')/100,y=Math.max(1,Math.min(60,num('e-years')));
      var m=d*365/12,total=fv(m,r,y*12),put=m*y*12;
      $('#e-total').textContent=money(total);$('#e-put').textContent=money(put);$('#e-growth').textContent=money(total-put);$('#e-month').textContent=money(m,true);
      var ch=$('#e-chart'),cols=Math.min(y,20),stepY=y/cols,html='',mx=total||1;
      for(var k=1;k<=cols;k++){var yy=Math.round(k*stepY),v=fv(m,r,yy*12);html+='<div style="height:'+Math.max(2,v/mx*100)+'%" title="Year '+yy+': '+money(v)+'"><span>'+(cols<=12||k%2===0?yy:'')+'</span></div>'}
      ch.innerHTML=html;
    });
  }
  if($('#t-goal')){
    bind(['g-target','g-have','g-months','g-rate'],function(){
      var t=num('g-target'),h=num('g-have'),n=Math.max(1,num('g-months')),r=num('g-rate')/100,i=r/12;
      var need=t-h*Math.pow(1+i,n);var pmt=i?need*i/(Math.pow(1+i,n)-1):need/n;pmt=Math.max(0,pmt);
      $('#g-pmt').textContent=money(pmt);$('#g-week').textContent=money(pmt*12/52);$('#g-day').textContent=money(pmt*12/365,true);
      $('#g-int').textContent=money(Math.max(0,t-h-pmt*n));
      $('#g-bar').style.width=Math.min(100,t?h/t*100:0)+'%';$('#g-pct').textContent=(t?Math.min(100,h/t*100):0).toFixed(0)+'% already saved';
    });
  }
  if($('#t-debt')){
    bind(['d-bal','d-apr','d-pay','d-extra'],function(){
      function run(bal,apr,pay){var i=apr/100/12,m=0,int=0;if(pay<=bal*i)return {m:Infinity,int:Infinity};while(bal>0.005&&m<1200){var it=bal*i;int+=it;bal=bal+it-pay;m++}return {m:m,int:int}}
      var b=num('d-bal'),a=num('d-apr'),p=num('d-pay'),x=num('d-extra');
      var r1=run(b,a,p),r2=run(b,a,p+x);
      function mm(n){return isFinite(n)?Math.floor(n/12)+'y '+(n%12)+'m':'Never — raise the payment'}
      $('#d-time').textContent=mm(r1.m);$('#d-int').textContent=money(r1.int);
      $('#d-time2').textContent=mm(r2.m);$('#d-int2').textContent=money(r2.int);
      $('#d-save').textContent=isFinite(r1.int)&&isFinite(r2.int)?money(r1.int-r2.int)+' saved · '+(r1.m-r2.m)+' months sooner':'—';
      $('#d-min').textContent=money(b*a/100/12+1)+' / month just to beat interest';
    });
  }
  if($('#t-budget')){
    bind(['b-inc','b-needs','b-wants','b-save'],function(){
      var inc=num('b-inc'),n=num('b-needs'),w=num('b-wants'),s=num('b-save'),sum=n+w+s||100;
      $('#b-n').textContent=money(inc*n/sum);$('#b-w').textContent=money(inc*w/sum);$('#b-s').textContent=money(inc*s/sum);
      $('#b-1111').textContent=inc*s/sum>=338?'Your savings slice covers $11.11/day ('+money(338)+'/mo) ✓':'Savings slice is below '+money(338)+'/mo — the “$11.11 a day” benchmark';
      $('#b-sum').textContent=sum!==100?'Note: your percentages add to '+sum+'% — scaled to 100%.':'';
    });
  }
  if($('#t-efund')){
    bind(['f-rent','f-food','f-trans','f-debt','f-other','f-months'],function(){
      var m=['f-rent','f-food','f-trans','f-debt','f-other'].reduce(function(a,id){return a+num(id)},0),k=Math.max(1,num('f-months'));
      $('#f-total').textContent=money(m*k);$('#f-month').textContent=money(m);$('#f-starter').textContent=money(Math.min(1111,m*k));
      $('#f-11').textContent=money(m*k/11)+' / month for 11 months';
    });
  }
  if($('#t-rent')){
    bind(['r-gross','r-debt'],function(){
      var g=num('r-gross'),d=num('r-debt');
      $('#r-30').textContent=money(g/12*0.30);$('#r-40x').textContent=money(g/40);$('#r-dti').textContent=money(Math.max(0,g/12*0.36-d));
      $('#r-safe').textContent=money(Math.max(0,Math.min(g/12*0.30,g/40,g/12*0.36-d)));
    });
  }
  if($('#t-fire')){
    bind(['x-spend','x-wr','x-have','x-save','x-rate'],function(){
      var sp=num('x-spend'),wr=Math.max(.5,num('x-wr'))/100,h=num('x-have'),sv=num('x-save'),r=num('x-rate')/100;
      var target=sp/wr;$('#x-target').textContent=money(target);
      var m=0,bal=h;while(bal<target&&m<1200){bal=bal*(1+r/12)+sv;m++}
      $('#x-years').textContent=m>=1200?'60+ years':(m/12).toFixed(1)+' years';
      var y=new Date();y.setMonth(y.getMonth()+m);$('#x-when').textContent=m>=1200?'—':y.toLocaleDateString(undefined,{month:'long',year:'numeric'});
    });
  }
  if($('#t-hustle')){
    bind(['h-goal','h-rate','h-tax'],function(){
      var g=num('h-goal'),r=Math.max(1,num('h-rate')),t=num('h-tax')/100;
      var net=r*(1-t),hrs=g/net;$('#h-hours').textContent=hrs.toFixed(1)+' h / month';$('#h-week').textContent=(hrs*12/52).toFixed(1)+' h / week';$('#h-net').textContent=money(net,true)+' / h after set-aside';
    });
  }
  if($('#t-age')){
    var ad=$('#a-date');if(ad&&!ad.value)ad.value='1997-11-11';
    bind(['a-date'],function(){
      var v=$('#a-date').value;if(!v)return;var b=new Date(v+'T00:00:00'),n=new Date();
      var days=Math.floor((n-b)/864e5);var y=n.getFullYear()-b.getFullYear();var nb=new Date(n.getFullYear(),b.getMonth(),b.getDate());if(nb<n){nb.setFullYear(nb.getFullYear()+1)}else{}
      if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))y--;
      var yr=b.getFullYear(),gen=yr>=2013?'Generation Alpha (2013+)':yr>=1997?'Gen Z (1997–2012)':yr>=1981?'Millennial (1981–1996)':yr>=1965?'Gen X (1965–1980)':yr>=1946?'Baby Boomer (1946–1964)':'Silent Generation (before 1946)';
      $('#a-age').textContent=y+' years';$('#a-days').textContent=days.toLocaleString()+' days';
      $('#a-gen').textContent=gen;$('#a-dow').textContent=b.toLocaleDateString(undefined,{weekday:'long'});
      $('#a-next').textContent=Math.ceil((nb-n)/864e5)+' days';
      var d11=11111-days%11111;$('#a-11111').textContent=d11===11111?'Today!':new Date(n.getTime()+d11*864e5).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
      var digits=v.replace(/\D/g,'').split('').map(Number),s=digits.reduce(function(a,c){return a+c},0),path=[s];
      while(s>9&&s!==11&&s!==22&&s!==33){s=String(s).split('').reduce(function(a,c){return a+ +c},0);path.push(s)}
      $('#a-num').textContent=path.join(' → ');
    });
  }

  /* ---------- Donations: preset buttons ---------- */
  $$('[data-amt]').forEach(function(b){b.addEventListener('change',function(){var o=$('#d-other');if(o&&b.value==='Other')o.focus()})});

  /* ---------- Forms (AJAX to private inbox) ---------- */
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',f);
      if(f._honey&&f._honey.value)return;
      if(!f.checkValidity()){f.reportValidity();return}
      var btn=$('button[type=submit]',f),old=btn?btn.textContent:'';
      if(btn){btn.disabled=true;btn.textContent='Sending…'}
      var data={};
      new FormData(f).forEach(function(v,k){if(k!=='_honey')data[k]=data[k]?data[k]+', '+v:v});
      data._subject=(f.getAttribute('data-subject')||'111197.com form')+' — '+(data.name||data.email||'');
      data._template='table';data._captcha='false';data.page=location.pathname;
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {}})})
        .then(function(){
          if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Received — we reply within 24 hours.'}
          f.reset();resetSteps(f);sstore('pl-lead','1');
        })
        .catch(function(){if(msg){msg.className='form-msg err';msg.textContent='Network hiccup — please try again in a minute.'}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=old}});
    });
  });

  /* ---------- Multi-step forms ---------- */
  function resetSteps(f){var st=$$('.step',f);if(!st.length)return;st.forEach(function(s,i){s.classList.toggle('active',i===0)});$$('.steps-ind span',f).forEach(function(s,i){s.classList.toggle('on',i===0)});var c=$('[data-stepno]',f);if(c)c.textContent='1'}
  $$('form.multistep').forEach(function(f){
    var steps=$$('.step',f),ind=$$('.steps-ind span',f),i=0,no=$('[data-stepno]',f);
    function go(n){
      if(n>i){var bad=$$('input,select,textarea',steps[i]).filter(function(x){return !x.checkValidity()});if(bad.length){bad[0].reportValidity();return}}
      i=Math.max(0,Math.min(steps.length-1,n));
      steps.forEach(function(s,k){s.classList.toggle('active',k===i)});
      ind.forEach(function(s,k){s.classList.toggle('on',k<=i)});
      if(no)no.textContent=i+1;
      var first=$('input,select,textarea',steps[i]);if(first&&n!==0)first.focus({preventScroll:true});
    }
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){go(i+1)})});
    $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){go(i-1)})});
    $$('.step .choice input[type=radio]',f).forEach(function(r){r.addEventListener('change',function(){if(r.closest('.step').hasAttribute('data-auto'))setTimeout(function(){go(i+1)},180)})});
  });

  /* ---------- Video facades (load YouTube only on click) ---------- */
  $$('.vid[data-id]').forEach(function(v){
    var id=v.getAttribute('data-id');
    v.style.backgroundImage='url(https://i.ytimg.com/vi/'+id+'/hqdefault.jpg)';
    function play(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="'+(v.getAttribute('data-title')||'Video')+'" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'}
    v.addEventListener('click',play);
    v.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}});
  });

  /* ---------- Guide filter ---------- */
  var gs=$('#guideSearch');
  if(gs)gs.addEventListener('input',function(){var q=gs.value.toLowerCase();$$('[data-guide]').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'})});

  /* ---------- Lead nudge (once per session, never on lead pages) ---------- */
  var nd=$('#nudge');
  if(nd&&!sstore('pl-nudge')&&!sstore('pl-lead')&&!/get-plan|support|contact/.test(location.pathname)){
    var shown=false;
    function show(){if(shown)return;shown=true;nd.hidden=false;sstore('pl-nudge','1')}
    setTimeout(show,45000);
    window.addEventListener('scroll',function(){var h=document.documentElement;if((h.scrollTop+innerHeight)/h.scrollHeight>.6)show()},{passive:true});
    $$('[data-nudge-close]').forEach(function(b){b.addEventListener('click',function(){nd.hidden=true})});
  }
})();
