(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",l="week",o="month",c="quarter",u="year",d="date",p="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+_(s,2,"0")+":"+_(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,o),r=n-i<0,a=t.clone().add(s+(r?-1:1),o);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:u,w:l,d:a,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g=function(e){return e instanceof D},$=function e(t,n,s){var i;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(i=r),n&&(b[r]=n,i=r);var a=t.split("-");if(!i&&a.length>1)return e(a[0])}else{var l=t.name;b[l]=t,i=l}return!s&&i&&(y=i),i||!s&&y},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},T=m;T.l=$,T.i=g,T.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function h(e){this.$L=$(e.locale,null,!0),this.parse(e)}var _=h.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(v);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return T},_.isValid=function(){return!(this.$d.toString()===p)},_.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return M(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<M(e)},_.$g=function(e,t,n){return T.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,c=!!T.u(t)||t,p=T.p(e),v=function(e,t){var s=T.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(a)},f=function(e,t){return T.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?v(1,0):v(31,11);case o:return c?v(1,_):v(0,_+1);case l:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return v(c?m-g:m+(6-g),_);case a:case d:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case i:return f(y+"Seconds",2);case s:return f(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var l,c=T.p(e),p="set"+(this.$u?"UTC":""),v=(l={},l[a]=p+"Date",l[d]=p+"Date",l[o]=p+"Month",l[u]=p+"FullYear",l[r]=p+"Hours",l[i]=p+"Minutes",l[s]=p+"Seconds",l[n]=p+"Milliseconds",l)[c],f=c===a?this.$D+(t-this.$W):t;if(c===o||c===u){var h=this.clone().set(d,1);h.$d[v](f),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else v&&this.$d[v](f);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[T.p(e)]()},_.add=function(n,c){var d,p=this;n=Number(n);var v=T.p(c),f=function(e){var t=M(p);return T.w(t.date(t.date()+Math.round(e*n)),p)};if(v===o)return this.set(o,this.$M+n);if(v===u)return this.set(u,this.$y+n);if(v===a)return f(1);if(v===l)return f(7);var h=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[v]||1,_=this.$d.getTime()+n*h;return T.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=T.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,c=n.months,u=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},d=function(e){return T.s(r%12||12,e,"0")},v=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:T.s(l+1,2,"0"),MMM:u(n.monthsShort,l,c,3),MMMM:u(c,l),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,o,2),ddd:u(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:T.s(r,2,"0"),h:d(1),hh:d(2),a:v(r,a,!0),A:v(r,a,!1),m:String(a),mm:T.s(a,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:i};return s.replace(f,(function(e,t){return t||h[e]||i.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,d,p){var v,f=T.p(d),h=M(n),_=(h.utcOffset()-this.utcOffset())*e,m=this-h,y=T.m(this,h);return y=(v={},v[u]=y/12,v[o]=y,v[c]=y/3,v[l]=(m-_)/6048e5,v[a]=(m-_)/864e5,v[r]=m/t,v[i]=m/e,v[s]=m/1e3,v)[f]||m,p?y:T.a(y)},_.daysInMonth=function(){return this.endOf(o).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=$(e,t,!0);return s&&(n.$L=s),n},_.clone=function(){return T.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},h}(),S=D.prototype;return M.prototype=S,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",o],["$y",u],["$D",d]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=31536e6,o=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:l,months:o,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(e){return e instanceof y},p=function(e,t,n){return new y(e,n,t.$l)},v=function(e){return t.p(e)+"s"},f=function(e){return e<0},h=function(e){return f(e)?Math.ceil(e):Math.floor(e)},_=function(e){return Math.abs(e)},m=function(e,t){return e?f(e)?{negative:!0,format:""+_(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function f(e,t,n){var s=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return p(e*u[v(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){s.$d[v(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var i=e.match(c);if(i){var r=i.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var _=f.prototype;return _.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*u[n]}),0)},_.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=h(e/l),e%=l,this.$d.months=h(e/o),e%=o,this.$d.days=h(e/r),e%=r,this.$d.hours=h(e/i),e%=i,this.$d.minutes=h(e/s),e%=s,this.$d.seconds=h(e/n),e%=n,this.$d.milliseconds=e},_.toISOString=function(){var e=m(this.$d.years,"Y"),t=m(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=m(n,"D"),i=m(this.$d.hours,"H"),r=m(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var l=m(a,"S"),o=e.negative||t.negative||s.negative||i.negative||r.negative||l.negative,c=i.format||r.format||l.format?"T":"",u=(o?"-":"")+"P"+e.format+t.format+s.format+c+i.format+r.format+l.format;return"P"===u||"-P"===u?"P0D":u},_.toJSON=function(){return this.toISOString()},_.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(e,t){return t||String(s[e])}))},_.as=function(e){return this.$ms/u[v(e)]},_.get=function(e){var t=this.$ms,n=v(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?h(t/u[n]):this.$d[n],0===t?0:t},_.add=function(e,t,n){var s;return s=t?e*u[v(t)]:d(e)?e.$ms:p(e,this).$ms,p(this.$ms+s*(n?-1:1),this)},_.subtract=function(e,t){return this.add(e,t,!0)},_.locale=function(e){var t=this.clone();return t.$l=e,t},_.clone=function(){return p(this.$ms,this)},_.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},_.milliseconds=function(){return this.get("milliseconds")},_.asMilliseconds=function(){return this.as("milliseconds")},_.seconds=function(){return this.get("seconds")},_.asSeconds=function(){return this.as("seconds")},_.minutes=function(){return this.get("minutes")},_.asMinutes=function(){return this.as("minutes")},_.hours=function(){return this.get("hours")},_.asHours=function(){return this.as("hours")},_.days=function(){return this.get("days")},_.asDays=function(){return this.as("days")},_.weeks=function(){return this.get("weeks")},_.asWeeks=function(){return this.as("weeks")},_.months=function(){return this.get("months")},_.asMonths=function(){return this.as("months")},_.years=function(){return this.get("years")},_.asYears=function(){return this.as("years")},f}();return function(n,s,i){e=i,t=i().$utils(),i.duration=function(e,t){var n=i.locale();return p(e,{$l:n},t)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(e,t){return d(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},s.prototype.subtract=function(e,t){return d(e)&&(e=e.asMilliseconds()),a.bind(this)(e,t)}}}()}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e="beforeend";function t(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function s(t,n,s=e){n.insertAdjacentElement(s,t.getElement())}class i{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var r=n(484),a=n.n(r),l=n(646),o=n.n(l);function c(e,t){return e?a()(e).format(t):""}a().extend(o());const u="HH:mm",d="YY-MM-DD",p="DD/MM/YY";class v{constructor({point:e}){this.point=e}getTemplate(){return function(e){const{type:t,basePrice:n,dateFrom:s,dateTo:i,isFavorite:r}=e,l=c(s,"MMM DD"),o=c(s,d),p=c(i,d),v=c(s,u),f=c(i,u),h=function(e,t){const n=a()(e),s=a()(t),i=a().duration(s.diff(n)),{days:r,hours:l,minutes:o}=i.$d;switch(!0){case r>0:return i.format("DD[D] HH[H] mm[M]");case l>0:return i.format("HH[H] mm[M]");case o<60:return i.format("mm[M]")}}(s,i);return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="${o}">${l}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${t}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${t} Amsterdam</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${o}T${v}">${v}</time>\n                    —\n                    <time class="event__end-time" datetime="${p}T${f}">${f}</time>\n                  </p>\n                  <p class="event__duration">${h}</p>\n                </div>\n                <p class="event__price">\n                  €&nbsp;<span class="event__price-value">${n}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                  <li class="event__offer">\n                    <span class="event__offer-title">Order Uber</span>\n                    +€&nbsp;\n                    <span class="event__offer-price">20</span>\n                  </li>\n                </ul>\n                <button class="event__favorite-btn ${r?"event__favorite-btn--active":""}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const f={type:"",offers:[1,3],basePrice:"",dateFrom:null,dateTo:"2023-07-12T05:00:13.375Z",isFavorite:!1,destination:2};class h{constructor({point:e=f}){this.point=e}getTemplate(){return function(e){const{type:t,basePrice:n,dateFrom:s,dateTo:i}=e,r=c(s,p),a=c(i,p),l=c(s,u),o=c(i,u);return console.log(s),console.log(t),`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${t}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n\n                        <div class="event__type-item">\n                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">\n                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n                        </div>\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${t}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      <option value="Amsterdam"></option>\n                      <option value="Geneva"></option>\n                      <option value="Chamonix"></option>\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${r} ${l}">\n                    —\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${a} ${o}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      €\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${n}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">\n                        <label class="event__offer-label" for="event-offer-luggage-1">\n                          <span class="event__offer-title">Add luggage</span>\n                          +€&nbsp;\n                          <span class="event__offer-price">30</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">\n                        <label class="event__offer-label" for="event-offer-comfort-1">\n                          <span class="event__offer-title">Switch to comfort class</span>\n                          +€&nbsp;\n                          <span class="event__offer-price">100</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n                        <label class="event__offer-label" for="event-offer-meal-1">\n                          <span class="event__offer-title">Add meal</span>\n                          +€&nbsp;\n                          <span class="event__offer-price">15</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n                        <label class="event__offer-label" for="event-offer-seats-1">\n                          <span class="event__offer-title">Choose seats</span>\n                          +€&nbsp;\n                          <span class="event__offer-price">5</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n                        <label class="event__offer-label" for="event-offer-train-1">\n                          <span class="event__offer-title">Travel by train</span>\n                          +€&nbsp;\n                          <span class="event__offer-price">40</span>\n                        </label>\n                      </div>\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n                      </div>\n                    </div>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const _=[{type:"taxi",offers:[1,2],basePrice:500,dateFrom:"2023-06-11T03:45:56.845Z",dateTo:"2023-07-12T05:00:13.375Z",isFavorite:!0,destination:3},{type:"bus",offers:[1,3],basePrice:40,dateFrom:"2023-09-11T02:30:56.845Z",dateTo:"2023-09-12T04:00:13.375Z",isFavorite:!0,destination:2},{type:"train",offers:[1,2],basePrice:200,dateFrom:"2023-10-11T02:30:56.845Z",dateTo:"2023-10-12T06:00:13.375Z",isFavorite:!0,destination:3},{type:"ship",offers:[1,2],basePrice:80,dateFrom:"2023-08-10T01:30:56.845Z",dateTo:"2023-08-12T04:00:13.375Z",isFavorite:!0,destination:2},{type:"drive",offers:[1,2],basePrice:90,dateFrom:"2023-09-11T05:30:56.845Z",dateTo:"2023-09-11T07:00:13.375Z",isFavorite:!0,destination:1},{type:"flight",offers:[1,2,3],basePrice:150,dateFrom:"2023-06-11T03:15:56.845Z",dateTo:"2023-06-12T03:45:13.375Z",isFavorite:!0,destination:2},{type:"check-in",offers:[1,2],basePrice:150,dateFrom:"2023-07-11T03:30:56.845Z",dateTo:"2023-07-12T05:30:13.375Z",isFavorite:!1,destination:1},{type:"sightseeing",offers:[1,2],basePrice:100,dateFrom:"2023-08-11T03:30:56.845Z",dateTo:"2023-08-21T07:00:13.375Z",isFavorite:!1,destination:2},{type:"restaurant",offers:[1,2],basePrice:100,dateFrom:"2023-08-10T03:30:56.845Z",dateTo:"2023-08-10T04:15:13.375Z",isFavorite:!1,destination:1}],m={type:"",offers:[1,3],basePrice:"",dateFrom:null,dateTo:null,isFavorite:!1,destination:2};function y(){return(e=_)[Math.floor(Math.random()*e.length)];var e}const b=document.querySelector(".page-header"),g=document.querySelector(".page-main"),$=b.querySelector(".trip-main"),M=b.querySelector(".trip-controls__filters"),T=g.querySelector(".trip-events"),D=new class{points=Array.from({length:4},y);blankPoint=m;getPoints(){return this.points}getBlankPoint(){return this.blankPoint}},S=new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info"></section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},w=new class{pointListComponent=new i;constructor({presenterContainerElement:e,pointsModel:t}){this.presenterContainerElement=e,this.pointsModel=t}init(){this.points=[...this.pointsModel.getPoints()],this.blankPoint=this.pointsModel.getBlankPoint(),s(this.pointListComponent,this.presenterContainerElement),s(new h({point:this.points[0]}),this.pointListComponent.getElement());for(let e=1;e<this.points.length;e++)s(new v({point:this.points[e]}),this.pointListComponent.getElement())}}({presenterContainerElement:T,pointsModel:D});s(S,$,"afterbegin"),s(new class{getTemplate(){return'<div class="trip-info__main">\n            <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n            <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>\n          </div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},S.getElement()),s(new class{getTemplate(){return'<p class="trip-info__cost">\n            Total: €&nbsp;<span class="trip-info__cost-value">1230</span>\n          </p>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},S.getElement()),s(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n            <div class="trip-filters__filter">\n              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">\n              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n              <label class="trip-filters__filter-label" for="filter-future">Future</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n              <label class="trip-filters__filter-label" for="filter-present">Present</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n              <label class="trip-filters__filter-label" for="filter-past">Past</label>\n            </div>\n\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},M,e),s(new class{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled="">\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled="">\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},T),w.init()})()})();
//# sourceMappingURL=bundle.959ffafe6a05892b6992.js.map