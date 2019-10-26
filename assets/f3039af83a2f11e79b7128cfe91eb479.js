(function(){Function.prototype.bind=Function.prototype.bind||function(a){var d=this;return function(){return d.apply(a,arguments)}}})();var EMPTY_FUN=function(){},UNDEF;
(function(){function a(){}var d=null;try{d=(0,eval)("this")||function(){return this}()}catch(b){}a.global=function(){return d};a.namespace=function(b,g,e,k){b=b.split(".");var l=a.NAMESPACE_BASE||a.global(),f=null,m=null,l=e||l;for(e=0;e<b.length-1;e+=1)m=b[e],l[m]=l[m]||{},l=l[m];f=l;m=b[b.length-1];d.TAGSDK_NS_OVERRIDE&&(k=!1);void 0!==g?void 0!==f[m]&&k||(f[m]=g):f[m]=f[m]||{};return f[m]};a.clazz=function(b,d,e,k,l){a.namespace(b,d,k,!0);"function"===typeof e&&(d.superclass=e,d.prototype=new d.superclass(l));
d.prototype&&(b=b.split("."),d.prototype.CLASS_NAME=b[b.length-1],b.splice(b.length-1,1),d.prototype.PACKAGE_NAME=b.join("."));return d};a.clazz("taginspector.Define",a)})();
(function(){function a(a){if(a)if(a.alphabet)for(this.alphabet=a.alphabet,this.dict={},a=0;a<this.alphabet.length;a++)this.dict[this.alphabet[a]]=a;else this.alphabet=b,this.dict=e}function d(a,b){for(var f in b)if(a===b[f])return f;return null}for(var b=[],c=Math.pow(2,8),g=0;g<c;g++)b.push(String.fromCharCode(g));for(var e={},c=0;c<b.length;c++)e[b[c]]=c;taginspector.Define.clazz("taginspector.compression.LZW",a);a.prototype.encode=function(a){for(var b=this.alphabet.length,f={},c=[],e=0,h=a.charAt(e++),
p,n=this.dict;p=a.charAt(e++);){var q=h+p;if(n.hasOwnProperty(q)||f.hasOwnProperty(q))h=q;else{var d=n.hasOwnProperty(h)?n[h]:f[h];if(void 0===d)throw"Dictionary base is to small for those contents: "+h;c.push(d);f[q]=b++;h=p}}""!==h&&c.push(f.hasOwnProperty(h)?f[h]:n[h]);return c};a.prototype.decode=function(a){for(var b=this.dict,f=this.alphabet.length,c,e={},h=d(a[0],b),p=h,n=[h],q=1;q<a.length;q++){var g=a[q];c=d(g,b);null===c&&(e.hasOwnProperty(g)&&(c=e[g]),null===c&&(c=p+h));n.push(c);h=c.charAt(0);
e[f++]=p+h;p=c}return n.join("")}})();
(function(){function a(a){}for(var d={},b=0;45>b;b++)d["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)]=b;for(var c={},b=0;45>b;b++)c['ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b)]=b;for(var g={},b=0;45>b;b++)g["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)]='ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b);var e="abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".split(""),k=e.length,l=new taginspector.compression.LZW({});taginspector.Define.clazz("taginspector.compression.Compressor",
a);a.prototype.compress=function(a,b){for(var c=(b||l).encode(a),h=[],p=0;p<c.length;p++)h.push(String.fromCharCode(c[p]));return h.join("")};a.prototype.compressAnsi=function(a,b){for(var c=(b||l).encode(a),h=[],p=0;p<c.length;p++){var n;n=c[p];var q=0,d=0>n;d&&(n=-n);var v="",x=!0;do q=n%k,x?(v=g[e[q]],x=!1):v=e[q]+v,n=(n-q)/k;while(0<n);n=d?"-"+v:v;h.push(n)}return h.join("")};a.prototype.decompressAnsi=function(a,b){for(var e=[],h="",p=0;p<a.length;p++){var n=a.charAt(p);if(c.hasOwnProperty(n)){for(var n=
h+n,h="",q=0,g=0,v=!0,x=0;x<n.length;x++){var r=n.charAt(n.length-1-x);v&&(v=!1,r="abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(c[r]));q+=d[r]*Math.pow(k,g++)}n=q;e.push(n)}else h+=n}return(b||l).decode(e)};a.prototype.decompress=function(a,b){for(var c=[],h=0;h<a.length;h++)c.push(a.charCodeAt(h));return(b||l).decode(c)}})();
(function(){function a(b,c,e){this.collectLogs=!!a.COLLECT;this.collectLocally=e;this.collection=[];this.getPrefix=function(){var a="";c&&("function"===typeof c?a=c(this.ref):c.CLASS_NAME?a=c.CLASS_NAME:c.constructor&&c.constructor.name&&(a=c.constructor.name),a&&(a+=" -> "));return(b||"")+a}}function d(b,c,e,d,h,p,n,q){var g=a.LEVEL>=q;if(0<=a.COLLECT_LEVEL||g)c=h?[d,n,e]:[c+b.getPrefix()+d,p,e],c[3]=q,b.collect(c,q),g&&b.printMessage.apply(b,c)}var b=taginspector.Define,c=null;b.clazz("taginspector.datapulse.Log",
a);a.LEVEL_FINEST=4;a.LEVEL_FINE=3;a.LEVEL_INFO=2;a.LEVEL_WARN=1;a.LEVEL_ERROR=0;a.LEVEL_NONE=-1;a.MAX_LOG_LEN=1E4;a.prototype.MAX_LOG_LEN=-1;a.LEVEL=a.LEVEL_NONE;a.LEVEL=a.LEVEL_INFO;a.COLLECT_LEVEL=a.LEVEL_FINE;a.COLLECT=!0;var g=[];a.logsCollection=g;a.rePrintAll=function(b,e,d,g){var h=a.LEVEL;void 0!==b&&(a.LEVEL=b);try{if(a.COLLECT){try{d||c.clear()}catch(p){}var n=g||a.logsCollection,q=0;for(d=0;d<n.length;d++)(function(c){var p=n[c];c=p[3];void 0!==c&&a.LEVEL>=c&&(q++,e?taginspector.datapulse.Timed.setTimeout(function(){void 0!==
b&&(a.LEVEL=b);try{a.print.apply(a,p)}finally{a.LEVEL=h}},q*e):a.print.apply(a,p))})(d)}}catch(k){}finally{a.LEVEL=h}};a.isStyleSupported=function(){return!1};var e={};a.setConsole=function(a){return c=a=a||e};a.delayPrint=-1;var k=(new Date).valueOf();a.prototype.printMessage=function(b,c,e,d){if(0<a.delayPrint){var h=a.delayPrint,p=k-(new Date).valueOf();0<p&&(h+=p);try{taginspector.datapulse.Timed.setTimeout(function(){this.print(b,c,e,d)}.bind(this),h)}catch(n){setTimeout(function(){this.print(b,
c,e,d)}.bind(this),h)}k=(new Date).valueOf()+h}else this.print(b,c,e,d)};a.prototype.print=function(b,c,e,d){a.print(b,c,e,d)};a.print=function(b,e,d,g){if(!(void 0!==g&&a.LEVEL<g))try{if(c&&c.log)if(e&&a.isStyleSupported())if(d&&c[d])c[d]("%c"+b,e);else c.log("%c"+b,e);else if(d&&c[d])c[d](b);else c.log(b)}catch(h){}};a.prototype.collect=function(b,c){void 0===c&&(c=a.COLLECT_LEVEL);var e=!1,d=this.collectLogs&&a.COLLECT&&a.COLLECT_LEVEL>=+c;d&&(g.push(b),e=!0);this.collectLocally&&d&&(this.collection.push(b),
e=!0);0<a.MAX_LOG_LEN&&g.length>a.MAX_LOG_LEN&&g.splice(0,g.length-a.MAX_LOG_LEN);if(0<a.MAX_LOG_LEN||0<this.MAX_LOG_LEN)d=a.MAX_LOG_LEN,0<this.MAX_LOG_LEN&&(d=this.MAX_LOG_LEN),this.collection.length>d&&this.collection.splice(0,this.collection.length-d);return e?b:null};a.clearAllLogs=function(){try{c.clear()}catch(a){}finally{g.splice(0,g.length)}};a.getCollectedByLevel=function(a,b){b=b||g;for(var c=[],d=0;d<b.length;d++){var h=b[d];h[0][4]===a&&c.push(h)}return c};a.prototype.rePrint=function(b,
c,d){a.rePrintAll(b,c,!d,this.collection)};a.prototype.FINEST=function(b,c){d(this,"FINEST: ",!1,b,c,"color:#CCCCCC;",!1,a.LEVEL_FINEST)};a.prototype.FINE=function(b,c){d(this,"FINE: ",!1,b,c,"color:#999999;",!1,a.LEVEL_FINE)};a.prototype.INFO=function(b,c,e){d(this,"INFO: ","info",b,c,e,e,a.LEVEL_INFO)};a.prototype.WARN=function(b,c){d(this,"WARN: ","warn",b,c,"color:#26A110;",!1,a.LEVEL_WARN)};a.prototype.ERROR=function(b,c){d(this,"ERROR: ","error",b,c,"color:red;",!1,a.LEVEL_ERROR)};a.setConsole(b.global().console)})();
(function(){function a(a){}for(var d={},b=0;93>b;b++)d["abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=".charAt(b)]=b;taginspector.Define.clazz("taginspector.Cookie",a);a.cookieAlphabet="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=";a.cookieAlphabetMap=d;a.decode=function(a){return decodeURIComponent(a)};a.encode=function(a){return encodeURIComponent(a)};a.set=function(b,d,e,k,l){if(e){var f=new Date;
f.setTime(f.getTime()+864E5*e);e="; expires="+f.toGMTString()}else e="";l&&(b=a.encode(b),d=a.encode(d));b=b+"="+d+e+"; path=/;";k&&(b+=" domain="+k);document.cookie=b};a.get=function(b,d){for(var e=b+"=",k=document.cookie.split(";"),l=0;l<k.length;l++){for(var f=k[l];" "===f.charAt(0);)f=f.substring(1,f.length);if(0===f.indexOf(e))return e=f.substring(e.length,f.length),d&&(e=a.decode(e)),e}return null};a.getAll=function(b,d){for(var e=b+"=",k=document.cookie.split(";"),l=[],f=0;f<k.length;f++){for(var m=
k[f];" "===m.charAt(0);)m=m.substring(1,m.length);0===m.indexOf(e)&&(m=m.substring(e.length,m.length),d&&(m=a.decode(m)),l.push(m))}return l};a.rm=function(b,d){a.set(b,"",-1,d)}})();
(function(){function a(a){for(var b=[],h=0;h<a.length;h++){var c=g(a[h][0]);b.push([new RegExp(c,"g"),"*"+a[h][1]])}return b}function d(a,b){for(var h=0;h<b.length;h++)if(b[h][1]===a)return b[h][0];return null}function b(b){this._regexDefs=m;this._defs=f;b&&b.definitions&&(this._regexDefs=a(b.definitions),this._defs=b.definitions)}function c(a,b){for(var h=[],c=0;c<a.length;c++){var d=!0;b&&(d=a.charCodeAt(c)<=b);var e=l.cookieAlphabetMap.hasOwnProperty(a.charAt(c));d&&!e?h.push("*"+a.charCodeAt(c)+
"."):h.push(a.charAt(c))}return h.join("")}function g(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function e(a){for(var b={},c="",d=0;d<a.length;d++){var e=a.charAt(d);switch(e){case "=":case "&":case "?":case "/":case "*":case ",":case ":":isNaN(b[c])&&(b[c]=a.split(c).length-1);c="";break;default:c+=e}}a=[];for(var f in b)b.hasOwnProperty(f)&&(c=b[f],c>=h&&f.length>=s&&a.push([f,c]));return a=a.sort(function(a,b){return a[0].length===b[0].length?0:b[0].length>a[0].length?1:-1})}var k=
taginspector.Define,l=taginspector.Cookie,f=[['","referrer":[{"url":"http://',"1-"],['","referrer":[{"url":"https://',"2-"],[',"referrer":[{"url":"http://',"3-"],[',"referrer":[{"url":"https://',"4-"],[',"sessionStartTime":',"5-"],['":{}}',"6-"],["www.google.com","7-"],["www.google.co.uk","8-"],["www.google.","9-"],['"landing":"',"Z"],['"landing":',"L"],['"time":',"A"],['"sessionStartTime":',"S"],['"pageViews":',"P"],['"sessionCount":',"B"],['"sessionLandingPage":',"E"],['"referrer":',"R"],['"url":"http://www.',
"J"],['"url":"https://www.',"M"],['"url":"',"I"],['"url":',"U"],["http://www.","W"],["https://www.","V"],["%2Fen%2Ftsuk%2F","K"],["http%3A%2F%2Fwww","F"],["http%3A%2F%2F","D"],["http://","H"],["https://","X"],['""',"O"],['",',"Y"]],m=a(f);k.clazz("taginspector.datapulse.compression.Encoder",b);b.prototype.encode=function(a,b){for(var h=a.replace(/\*/g,"**"),d=0;d<this._regexDefs.length;d++)var f=this._regexDefs[d],h=h.replace(f[0],f[1]);for(var h=h.replace(/;/g,"*-"),h=h.replace(/&/g,"*."),h=h.replace(/\\/g,
"*/"),h=h.replace(/=/g,"*+"),h=h.replace(/\n/g,"*N"),h=h.replace(/ /g,"*_"),h=h.replace(/\t/g,"*T"),h=h.replace(/,/g,"*C"),h=h.replace(/"/g,"*Q"),d=e(h),f=h.replace(/\$/g,"$$$"),k=[],m=0,l=0;m<d.length;m++){var s=new RegExp(g(d[m][0]),"g"),s=f.replace(s,"$"+l+"-");s!==f&&(k.push(d[m][0]),l++,f=s)}d=[f,k];f=d[1];(k=0<f.length)&&(h=d[0]);h=b?c(h,b):c(h);return k?"Y"+f.join("*")+"?"+h:"N"+h};var s=4,h=2;b.prototype.decode=function(a){var b=null;if("N"===a.charAt(0))a=a.substring(1);else if("Y"===a.charAt(0)){var h=
a.indexOf("?");if(0<=h&&(b=a.substring(1,h),b=b.split("*"),a=a.substring(h+1),b&&0!==b.length&&a)){for(var h="",c=!1,e=!1,f="",g=0;g<a.length;g++){var k=a.charAt(g);"$"===k||c||e?c||e?(c=!1,"$"===k?h+="$":isNaN(+("-"+k))?e?(h=b&&"-"===k&&b[+f]?h+b[+f]:h+("$"+f+k),f="",e=!1):h+="$"+k:(e=!0,f+=k)):c=!0:h+=k}f&&(h+="$"+f);c&&(h+="$");a=h}}b="";c=h=!1;e="";for(f=0;f<a.length;f++)g=a.charAt(f),"*"===g||h||c?h||c?(h=!1,isNaN(+("-"+g))?c?(b="."===g?b+String.fromCharCode(+e):"-"===g&&d(e+"-",this._defs)?
b+d(e+"-",this._defs):b+("*"+e+g),e="",c=!1):"*"===g?b+="*":"-"===g?b+=";":"/"===g?b+="\\":"."===g?b+="&":"+"===g?b+="=":"N"===g?b+="\n":"_"===g?b+=" ":"T"===g?b+="\t":"C"===g?b+=",":"Q"===g?b+='"':null!==d(g,this._defs)?(g=d(g,this._defs),b+=g):b+="*"+g:(e+=g,c=!0)):h=!0:b+=g;e&&(b+="*"+e);h&&(b+="*");return b}})();
(function(){function a(b){this.testBinary=!1;this.binSupported=g;b&&(c.FINEST("Created compressor instance."),this.compressor=new taginspector.compression.Compressor,this.encoder=new taginspector.datapulse.compression.Encoder({}),void 0!==b.binSupported&&(this.binSupported=!!b.binSupported))}var d=taginspector.Define,b=taginspector.Cookie,c=new taginspector.datapulse.Log("CookieCompressor -> ");d.global();var g=!1;d.clazz("taginspector.datapulse.compression.CookieCompressor",a);a.prototype.compress=
function(a,d){if("string"!==typeof a||""===a)return a;c.FINEST("Compressing...");var g=this.encoder.encode(a),f;if(this.binSupported||this.testBinary){f=this.compressor.compress(g);f='"B'+this.encoder.encode(f,128)+'"';b.set("__qtag_test_bin__",f);var m=b.get("__qtag_test_bin__");b.rm("__qtag_test_bin__");m&&m!==f&&(f=null,c.FINEST("Binary cookie saving trial failed."))}m=this.encoder.encode(this.compressor.compressAnsi(g));g=!d&&g.length<=m.length?'"E'+g+'"':'"C'+m+'"';if(f&&f.length<g.length)return c.FINEST("Binary compression ratio: "+
f.length/a.length),f;c.FINEST("Compression ratio: "+g.length/a.length);return g};a.prototype.decompress=function(a){if("string"!==typeof a||""===a)return a;'"'===a.charAt(0)&&(a=a.substring(1,a.length-1));c.FINEST("Decompressing...");var b=a.charAt(0);a=a.substring(1);switch(b){case "E":return this.encoder.decode(a);case "C":return a=this.compressor.decompressAnsi(this.encoder.decode(a)),this.encoder.decode(a);case "B":return a=this.compressor.decompress(this.encoder.decode(a)),this.encoder.decode(a);
default:throw"This code is not supported! Code: "+b;}}})();
(function(){function a(){}function d(a,b){for(var c=k.length,d=0;d<c;d++)if(a===k[d][0])return k[d][1];k[k.length]=[a,b];return!1}function b(a,c,f,g,m){var l=!1,s=!1,r=!1,t=!1,u=!1,u=!1;c&&(l=(u=!!c.all)||c.nodes,t=u||c.win,s=u,r=c.noFunctions&&!u,void 0!==c.noOwn&&(s=!!c.noOwn),void 0!==c.noFunctions&&(r=!!c.noFunctions),void 0!==c.win&&(t=!!c.win),void 0!==c.nodes&&(l=!!c.nodes),u=!!c.copyReference);if(void 0===f||f){void 0!==f&&f--;if(!(a&&a instanceof Object))return a;if(!l){try{if(a instanceof
Node)return a}catch(y){if(a instanceof ActiveXObject&&void 0!==a.nodeType)return a}if(a===document)return a}if(!t&&a===e)return a;l=a instanceof Array?[]:{};a instanceof Date&&(l=new Date(a));!r&&a instanceof Function&&(r=String(a).replace(/\s+/g,""),l=r.indexOf("{[nativecode]}")+14===r.length?function(){return a.apply(m||this,arguments)}:function(){return a.apply(this,arguments)});void 0===g&&(k=[],g=0);if(r=d(a,l))return r;if(l instanceof Array)for(r=0;r<a.length;r++)l[l.length]=a[r]===a[r]?b(a[r],
c,f,g+1,a):a[r];else{var r=0,w;for(w in a){if(s||a.hasOwnProperty(w))l[w]=a[w]===a[w]?b(a[w],c,f,g+1,a):a[w];r++}}c.proto&&(l.prototype=b(a.prototype,c,f,g+1,a));u&&(l.___copy_ref=a);return l}}function c(a,b,d,f,g,k,m){d=d||{};void 0===d.hasOwn&&(d.hasOwn=!0);if(!d.objectsOnly||a instanceof Object)if(void 0===d.maxDeep||d.maxDeep){void 0!==d.maxDeep&&d.maxDeep--;if(!d||!d.nodes)try{if(a instanceof Node)return}catch(s){if(a instanceof ActiveXObject&&void 0!==a.nodeType)return}if(a!==e){void 0===f&&
(l=[],f=0);var t;a:{for(t=0;t<f&&t<l.length;t++)if(a===l[t]){t=!0;break a}t=!1}if(!(t||(l[f]=a,g=g||a,g&&k&&g[k]!==g[k]||b(a,g,k,m)))){k=0;t="";for(var u in a){if(!d.hasOwn||a.hasOwnProperty(u))try{var y=a[u];d.track&&(t=m?m+"."+u:u);c(y,b,d,f+1,g,u,t)}catch(w){}k++}}}}}var g=taginspector.Define,e=g.global();g.clazz("taginspector.datapulse.Utils",a);a.global=g.global;a.namespace=g.namespace;a.clazz=g.clazz;a.getObjectUsingPath=function(a,b){b=b||e;for(var c=a.split("."),d=0;d<c.length;d++)b&&c[d]&&
(b=b[c[d]]);return b};a.variableExists=function(a){return void 0!==a&&null!==a&&""!==a};a.ANON_VARS=[];a.getAnonymousAcessor=function(b){var c=a.indexInArray(b,a.ANON_VARS);-1===c&&(c=a.addToArrayIfNotExist(a.ANON_VARS,b));return"taginspector.datapulse.Utils.ANON_VARS["+c+"]"};a.replaceAll=function(a,b,c){return a.replace(new RegExp(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),c)};a.isInt=function(a){if(isNaN(a))return!1;a=parseFloat(a);return(a|0)===a};a.secureText=function(a){"string"!==
typeof a&&(a+="");a=a.replace(/</g,"&lt;");return a=a.replace(/>/g,"&gt;")};a.getUrl=function(){return document.location.href};a.getQueryParam=function(b){var c,d,e,f;c=a.getUrl();if(0<c.indexOf("?"))for(f=c.substring(c.indexOf("?")+1).split("&"),c=0,d=f.length;c<d;c+=1)if(e=f[c],0<e.indexOf("=")&&(e=e.split("="),2===e.length&&e[0]===b))return e[1];return null};a.getElementValue=function(a){return(a=document.getElementById(a))?a.textContent||a.innerText:null};var k=[];a.objectCopy=function(a,c){c=
c||{};var d=b(a,c,c.maxDeep);k=[];return d};var l=[];a.traverse=function(a,b,d){c(a,b,d)};a.prepareQuotedString=function(a){return"string"===typeof a?'"'+a.replace(/\"/g,'\\"')+'"':a};a.expressionToFunction=function(b,c){return a.gevalAndReturn("function ("+(c||"")+") {"+b+"}").result};a.defineClass=function(b,c,d){var e=b.split("."),e=a.gevalAndReturn("(function "+e[e.length-1]+"() {  if ("+b+"._CONSTRUCTOR) {    return "+b+"._CONSTRUCTOR.apply(this, arguments);  } else {    if ("+b+".superclass) {      return "+
b+".superclass.apply(this, arguments);    }  }})").result;e._CONSTRUCTOR=d.CONSTRUCTOR;e.superclass=c;a.clazz(b,e,c);for(var f in d)d.hasOwnProperty(f)&&"CONSTRUCTOR"!==f&&(e.prototype[f]=d[f]);return e};a.keys=function(a){if(a instanceof Object){if(Object.keys)return Object.keys(a);var b=[],c;for(c in a)a.hasOwnProperty(c)&&(b[b.length]=c);return b}throw"keys() called on non-object!";};a.getSrcElement=function(a){var b;a=a||window.event;a.srcElement?b=a.srcElement:a.target&&(b=a.target);return b};
a.addToArrayIfNotExist=function(a,b){for(var c=0,d=!1;c<a.length;c+=1)if(a[c]===b){d=!0;break}d||(a[a.length]=b,c=-1);return c};a.indexInArray=function(a,b){for(var c=0,d=!1;c<a.length;c++)if(a[c]===b){d=!0;break}return d?c:-1};a.removeFromArray=function(a,b){for(var c=0;c<a.length;c+=1)a[c]===b&&a.splice(c,1)};a.addClass=function(b,c){var d;try{b.classList.add(c)}catch(e){null===b.className?b.className=c:(d=b.className.split(" "),a.addToArrayIfNotExist(d,c),b.className=d.join(" "))}};a.removeClass=
function(b,c){var d;try{b.classList.remove(c)}catch(e){null===b.className?b.className="":(d=b.className.split(" "),a.removeFromArray(d,c),b.className=d.join(" "))}};a.gevalAndReturn=function(b){a.gevalAndReturn.___var_test___=void 0;a.gevalAndReturn.___var_test___error=void 0;a.geval("try{taginspector.datapulse.Utils.gevalAndReturn.___var_test___=("+b+");}catch(ex){taginspector.datapulse.Utils.gevalAndReturn.___var_test___error = ex;}");return{result:a.gevalAndReturn.___var_test___,error:a.gevalAndReturn.___var_test___error}};
a.trim=function(a){try{return String(a).trim()}catch(b){return String(a).replace(/^\s+|\s+$/g,"")}};a.setIfUnset=function(a,b){if(a&&b)for(var c in b)b.hasOwnProperty(c)&&!a.hasOwnProperty(c)&&(a[c]=b[c])};a.geval=function(a){window&&window.execScript?window.execScript(a):e.eval.call(e,a)};var f=[],m=!1;a.bodyReady=function(a){if(m)return a&&a(),!0;if(m=!(!document.body||"complete"!==document.readyState)){for(var b=0;b<f.length;b++)try{f[b]()}catch(c){e.console&&e.console.trace&&e.console.trace(c)}a&&
a()}else a&&f.push(a);return m};var s=e.onload;e.onload=function(b){a.bodyReady();s&&s(b)}})();
(function(){function a(b){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.config.name+"]"}.bind(this),"collectLogs");this.config={name:"Trigger-"+d++,uniqueId:"Trigger-"+d++,triggerScript:void 0,rules:[]};this.currentState=a.state.WAITING;if(b){for(var c in b)b.hasOwnProperty(c)&&(this.config[c]=b[c]);b.session&&this.setSession(b.session)}this.uniqueId=this.config.uniqueId}var d=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.trigger.BaseTrigger",
a);a.state={WAITING:0,FIRED:1};a.prototype.checkRules=function(){for(var a=0;a<this.config.rules.length;a++)rule=this.config.rules[a],rule.checkFiltersIfTriggersFired()};a.prototype.triggerCallback=function(){this.currentState=a.state.FIRED;this.checkRules()};a.prototype.initTrigger=function(){cb=this.triggerCallback;cb=cb.bind(this);this.config.triggerScript(cb)};a.prototype.getState=function(){return this.currentState};a.prototype.addRule=function(a){this.config.rules.push(a)};a.prototype.setTriggerScript=
function(a){this.config.triggerScript=a}})();
(function(){var a=taginspector.Cookie,d=taginspector.datapulse.Utils,b=new taginspector.datapulse.Log("Session -> "),c=function(){};d.clazz("taginspector.datapulse.Session",c);var g=new taginspector.datapulse.compression.CookieCompressor({});c.readCompressedCookie=function(b){b=a.get(b);return g.decompress(b)};c.setupSession=function(e){var k,l,f,m,s;k={};s="tm_"+e.containerId;var h="x_tm_"+e.containerId;f=a.get(s,!0);var p=!!f;null===f&&(f=a.get(h),f=g.decompress(f));if(f)try{f=JSON.parse(f)}catch(n){f=
{sc:0,sessionCount:0,pageViews:0,sessionStartTime:0,referrer:[],sessionLandingPage:"",__v:{}}}else f={sc:0,sessionCount:0,pageViews:0,sessionStartTime:0,referrer:[],sessionLandingPage:"",__v:{}};l=(new Date).getTime();k.sessionCount!==parseInt(f.sc,10)?(f.sessionStartTime=l,f.sc=k.sessionCount,f.sessionCount+=1,f.referrer.push({url:c.getReferrer(),landing:d.getUrl().substring(0,300),time:l}),f.sessionLandingPage=d.getUrl().substring(0,300)):c.isReferrerDifferent()&&!c.referrerIsSameAsPrevious(f.referrer,
l,18E5)&&(f.referrer.push({url:c.getReferrer(),landing:d.getUrl().substring(0,300),time:l}),f.sessionLandingPage=d.getUrl().substring(0,300),f.sessionStartTime=l,f.sessionCount+=1);k.sessionCount=f.sessionCount;k.sessionStartTime=f.sessionStartTime;k.pageStartTime=l;f.pageViews+=1;k.pageViews=f.pageViews;k.sessionLandingPage=f.sessionLandingPage;k.referrer=f.referrer;5<k.referrer.length&&k.referrer.splice(2,k.referrer.length-5);m=JSON.stringify(f);for(l=0;g.compress(m).length>e.maxCookieLength&&5>
l;)3<=f.referrer.length?f.referrer.splice(2,1):2===f.referrer.length?f.referrer=[f.referrer[0]]:1===f.referrer.length&&(f.referrer=[]),m=JSON.stringify(f),l+=1;k.referrer=f.referrer;p&&a.rm(s);s=g.compress(m);a.rm(h);a.set(h,s,365,e.cookieDomain);k.setVariable=function(b,c,d){f.__v[b]=[c,d?d:0];b=g.compress(JSON.stringify(f));a.set(h,b,365,e.cookieDomain)};k.getCookie=function(c,d){var e=a.get(c);if(e&&(d||0===c.indexOf("x_"))){b.FINE("getCookie() : Comressed cookie accessed:\n"+c+"="+e);try{e=g.decompress(e)}catch(f){b.ERROR("Cookie failed to decompress: "+
f)}}else e=a.decode(e);return e};k.getVariable=function(a){var b;if(a=f.__v[a])if(b=a[1],0===b||b>(new Date).getTime())return a[0];return null};k.on=function(a,b,c){b.attachEvent?b.attachEvent("on"+a,c):b.addEventListener&&b.addEventListener(a,c,!1)};k.getTagCookie=function(){return c.readCompressedCookie(h)};return c.lastSession=k};c.referrerIsSameAsPrevious=function(a,b,g){var f,m;return 0<a.length?(f=c.getReferrer(),m=d.getUrl().substring(0,300),a=a[a.length-1],a.url===f&&a.landing===m&&a.time+
g>b):!1};c.isReferrerDifferent=function(){var a,b;b=c.getReferrer();a=b.indexOf("://");if(-1===a)return!0;try{return 0!==b.substring(a+3).indexOf(c.getDomain())?!0:!1}catch(d){return!0}};c.getReferrer=function(){return document.referrer?document.referrer.substring(0,300):"direct"};c.getDomain=function(){return document.location.host}})();
(function(){function a(a){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.config.name+"]"}.bind(this),"collectLogs");this.config={order:0,include:!0,name:"Filter-"+d++,uniqueId:"Filter-"+d++,script:void 0,session:void 0};this.session=null;if(a){for(var c in a)a.hasOwnProperty(c)&&(this.config[c]=a[c]);a.session&&this.setSession(a.session)}this.uniqueId=this.config.uniqueId}var d=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.filter.BaseFilter",a);
a.state={DISABLED:-3,SESSION:-2,PASS:-1,FAIL:0};a.prototype.reset=function(){this.enable()};a.prototype.disable=function(){this.config.disabled=!0};a.prototype.enable=function(){this.config.disabled=!1};a.prototype.match=function(){return!0};a.prototype.setSession=function(a){this.session=a};a.prototype.getSession=function(){return this.session};a.prototype.getState=function(){var b=a.state.PASS;if(this.config.disabled)return a.state.DISABLED;this.config.script&&(b=this.config.script.call(this,b));
isNaN(+b)&&(this.log.WARN("filters should use a numerical state as a return for getState(): BaseFilter.state. Filter will fail. Returned: "+b),b=a.state.FAIL);this.lastState=+b;return b}})();
(function(){function a(b){this.config={};this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.uniqueId+"]"}.bind(this),"collectLogs");this.parameters=null;this.reportValue=!1;if(b){this.uniqueId=b.uniqueId;this.reportValue=b.reportValue;a.ALL_VARIABLES[this.uniqueId]=this;for(var c in b)this.config[c]=b[c];void 0!==b.value&&(this.value=b.value);void 0!==b.defaultValue&&(this.defaultValue=b.defaultValue);(b=a.register(this))&&b!==this&&(b.log.FINEST("Variable config already registered."),
b.log.FINEST("Returning existing one."));return b}}var d=taginspector.datapulse.Utils;d.clazz("taginspector.datapulse.pagevariable.BaseVariable",a);a.ALL_VARIABLES={};a.pageVariables=[];a.register=function(b){return b instanceof a?(a.pageVariables.push(b),b):null};a.prototype.getValue=function(){return this.value};a.prototype.setValue=function(a){this.value=a};a.prototype.getDefaultValue=function(){return this.defaultValue};a.prototype.setDefaultValue=function(a){this.defaultValue=a};a.prototype.exists=
function(a){var c=d.variableExists(this.getValue());a&&(c=c||d.variableExists(this.getDefaultValue()));return c};a.prototype.getRelativeValue=function(a,c){var g=this.getValue();d.variableExists(g)||(g=c);var e;a&&!d.variableExists(g)&&(e=this.getDefaultValue(),d.variableExists(e)&&(g=e));return g};a.prototype.replaceToken=function(a,c,g,e){var k=this.exists();g=k?this.getValue():g;a="\\$\\{"+a+"\\}";return e||g instanceof Array?(e=k?this.getValueAccessorString():d.getAnonymousAcessor(g),c.replace(new RegExp(a,
"g"),e)):c.replace(new RegExp(a,"g"),g)};a.prototype.getAccessorString=function(){return"taginspector.datapulse.pagevariable.BaseVariable.ALL_VARIABLES."+this.uniqueId};a.prototype.getValueAccessorString=function(){return this.getAccessorString()+".getValue()"}})();
(function(){function a(a){this.config={};this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"[BaseRule]"}.bind(this),"collectLogs");this.uniqueId="BR"+g++;this.ruleVersion=1;if(a){this.uniqueId=a.uniqueId;this.ruleVersion=a.ruleVersion;this.dataCollector=a.dataCollector;for(var b in a)this.config[b]=a[b]}this.filters=[];this.session=void 0;this.triggers=[]}var d=taginspector.datapulse.filter.BaseFilter,b=taginspector.datapulse.trigger.BaseTrigger,c=taginspector.datapulse.pagevariable.BaseVariable,
g=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.BaseRule",a);a.prototype.getFilters=function(){return this.filters};a.prototype.addFilter=function(a){this.filters.push(a)};a.prototype.addTrigger=function(a){this.triggers.push(a)};var e=b.state.WAITING,k=b.state.FIRED,l=d.state.PASS,f=d.state.FAIL;a.prototype.getFailedFilters=function(){filters=this.filters;failedFilters=[];for(var a=0;a<filters.length;a++)filter=filters[a],filter.match()||failedFilters.push(filter.uniqueId+"|"+filter.config.sourceVariable.uniqueId);
return failedFilters};a.prototype.checkFiltersIfTriggersFired=function(a){a=tiMonitor.dataCollector.timeOnPage();triggersRun=this.triggersState();if(triggersRun==k)if(validationResults=this.filtersState(),validationResults==f){failedFilters=this.getFailedFilters();qsPageVariables=[];pageVariables=c.pageVariables;for(i=0;i<pageVariables.length;i++)try{pageVariable=pageVariables[i],pageVariable instanceof c&&!0==pageVariable.reportValue&&(variableId=pageVariable.uniqueId,(variableValue=pageVariable.getValue())||
(variableValue="*undefined*"),combinedVariableValue=encodeURIComponent(variableId)+"="+encodeURIComponent(variableValue),qsPageVariables.push(combinedVariableValue))}catch(b){errMessage="Error with variable "+variableId+": "+b.message,console.log(errMessage),jeErrorObj={message:errMessage},tiMonitor.dataCollector.queueRequest(jeErrorObj,"jserror")}failedRuleObject={failedConditions:failedFilters.toString(),pageMacros:qsPageVariables.toString(),failedRule:this.uniqueId,validationTime:a,ruleVersion:this.ruleVersion};
this.dataCollector.queueRequest(failedRuleObject,"validationerror")}else passedRuleObject={passedRule:this.uniqueId,ruleVersion:this.ruleVersion,validationTime:a},this.dataCollector.queueRequest(passedRuleObject,"validationsuccess")};a.prototype.triggersState=function(){for(var a=k,b=0;b<this.triggers.length;b++)trigger=this.triggers[b],trigger.getState()==e&&(a=e);return a};a.prototype.filtersState=function(){filters=this.filters;session=this.session;filters=filters.sort(function(a,b){try{return b.config.order-
a.config.order}catch(c){return 0}});var a=l;if(!filters||0===filters.length)return a;for(var b,c=0;c<filters.length;c++)if(b=filters[c],b.setSession(session),!1==b.match()){a=f;break}return a}})();
(function(){taginspector.datapulse.Utils.namespace("taginspector.datapulse.filter.pattern.PatternType",{CONTAINS:"Contains",MATCHES_EXACTLY:"Matches Exactly",STARTS_WITH:"Starts With",ENDS_WITH:"Ends With",REGULAR_EXPRESSION:"Regular Expression",ALL_URLS:"All URLs",EQUALS:"Equals",DOES_NOT_EQUAL:"Does not Equal",DOES_NOT_CONTAIN:"Does not Contain",DOES_NOT_STARTS_WITH:"Does not Start With",DOES_NOT_END_WITH:"Does not End With",MATCHES_REGEX:"Matches Regex",DOES_NOT_MATCH_REGEX:"Does not Match Regex",
LESS_THAN:"Less Than",GREATER_THAN:"Greater Than"})})();
(function(){function a(c){this._lockObject={};var d={comparisonType:b.CONTAINS,sourceVariable:void 0,comparisonVariable:void 0};if(c)for(var e in c)c.hasOwnProperty(e)&&(d[e]=c[e]);a.superclass.call(this,d)}var d=taginspector.datapulse.Utils,b=taginspector.datapulse.filter.pattern.PatternType;d.clazz("taginspector.datapulse.filter.JsExpressionFilter",a,taginspector.datapulse.filter.BaseFilter);a.prototype.match=function(){var a=!0,g=this.config.sourceVariable.getValue();if("object"==typeof this.config.comparisonVariable)var e=
this.config.comparisonVariable.getValue();else if("string"==typeof this.config.comparisonVariable||"number"==typeof this.config.comparisonVariable)e=this.config.comparisonVariable;else return!1;switch(this.config.comparisonType){case b.LESS_THAN:case b.GREATER_THAN:if(!1==d.isInt(e))return!1;e=parseInt(e)}switch(this.config.comparisonType){case b.DOES_NOT_CONTAIN:case b.CONTAINS:a=0<=g.toLowerCase().indexOf(e.toLowerCase());break;case b.EQUALS:case b.DOES_NOT_EQUAL:case b.MATCHES_EXACTLY:a=g.toLowerCase()===
e.toLowerCase();break;case b.STARTS_WITH:case b.DOES_NOT_STARTS_WITH:a=0===g.toLowerCase().indexOf(e.toLowerCase());break;case b.ENDS_WITH:case b.DOES_NOT_END_WITH:a=g.toLowerCase().substr(-e.length)===e.toLowerCase();break;case b.MATCHES_REGEX:case b.REGULAR_EXPRESSION:case b.DOES_NOT_MATCH_REGEX:a=(new RegExp(e,"i")).test(g);break;case b.LESS_THAN:a=g<e;break;case b.GREATER_THAN:a=g>e;break;case b.ALL_variableValueS:a=!0}switch(this.config.comparisonType){case b.DOES_NOT_EQUAL:case b.DOES_NOT_CONTAIN:case b.DOES_NOT_STARTS_WITH:case b.DOES_NOT_END_WITH:case b.DOES_NOT_MATCH_REGEX:a=
!a}return a}})();(function(){function a(b){this._lockObject={};var c={uniqueId:"Macro-"+d++};if(b)for(var g in b)c[g]=b[g];this.reportValue=!1;b&&(this.uniqueId=b.uniqueId,this.reportValue=b.reportValue);a.superclass.call(this,c)}var d=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.pagevariable.JsExpression",a,taginspector.datapulse.pagevariable.BaseVariable);a.prototype.getValue=function(){this.log.FINEST("getting custom js value");return this.value(!0)?this.value(!0).toString():""}})();
(function(){function a(a){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"[DataCollector]"}.bind(this),"collectLogs");this.config={siteID:"",pixelHost:"",tagDefinitions:[]};this.session=null;if(a)for(var b in a)a.hasOwnProperty(b)&&(this.config[b]=a[b]);this.pixelHost=this.config.pixelHost;this.siteID=this.config.siteID;this.tagDefinitions=this.config.tagDefinitions;this.startTime=Date.now();this.resourceCounter=this.offsetTime=0;this.pageId="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)});this.pendingRequests=[];this.currentlySendingData=!1;this.identifiedRequests={}}taginspector.datapulse.Utils.clazz("taginspector.datapulse.DataCollector",a);a.prototype.timeOnPage=function(){return performance.now()-this.offsetTime};a.prototype.adjustTimeForOffset=function(a){return!1==isNaN(a)?(fts=parseFloat(a).toFixed(2),fts=parseFloat(a),fts-=this.offsetTime,0>fts&&(fts=0),fts.toString()):a};a.prototype.getPageCurrentTime=
function(){return Date.now()};a.prototype.getPageStartTime=function(){return this.startTime};a.prototype.isBeaconSupported=function(){return"sendBeacon"in navigator?!0:!1};a.prototype.getMaxBodySize=function(){isSendBeaconRequest=this.isBeaconSupported();return 1E4};a.prototype.createRequestBody=function(){tmpReqList={requestList:[]};requestLength=0;maxRequestLength=this.getMaxBodySize();for(urlCounter=0;0<this.pendingRequests.length;)if(tagReq=this.pendingRequests[0],void 0!=tagReq||null!=tagReq)if(requestLength+=
encodeURIComponent(tagReq).length,requestLength>maxRequestLength&&0!=urlCounter)break;else tmpReqList.requestList.push(this.pendingRequests.shift()),urlCounter+=1;else this.pendingRequests.shift();return tmpReqList};a.prototype.createPixelRequest=function(a){reqPixel=new Image;reqPixel.src=this.pixelHost+"?"+a};a.prototype.createAjaxPostRequest=function(a){XMLHttpRequest.prototype.sendAsBinary||(XMLHttpRequest.prototype.sendAsBinary=function(a){for(var b=a.length,c=new Uint8Array(b),d=0;d<b;d++)c[d]=
a.charCodeAt(d)&255;this.send(c)});var b=new XMLHttpRequest;b.open("POST",this.pixelHost,!0);var c="----"+Date.now().toString(16);b.setRequestHeader("Content-Type","multipart/form-data; boundary="+c);b.sendAsBinary("--"+c+'\r\nContent-Disposition: form-data; name="beaconreq"\r\n\r\n'+a+"\r\n--"+c+"--\r\n")};a.prototype.createSendBeaconRequest=function(a){var b=new FormData;b.append("beaconreq",a);result=navigator.sendBeacon(this.pixelHost,b);!1==result&&this.createAjaxPostRequest(a)};a.prototype.b64EncodeUnicode=
function(a){return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g,function(a,c){return String.fromCharCode("0x"+c)}))};a.prototype.identifyRequest=function(a){for(var b=0;b<this.tagDefinitions.length;b++){var c=this.tagDefinitions[b];if(!0==c.regex.test(a.name)){!1==this.identifiedRequests.hasOwnProperty(c.id)&&(this.identifiedRequests[c.id]=[]);this.identifiedRequests[c.id].push(a);break}}};a.prototype.sendRequests=function(a){if(!1==tiMonitor.dataCollector.currentlySendingData){tiMonitor.dataCollector.currentlySendingData=
!0;for(base_req_data="pid="+this.pageId+"&sid="+this.siteID+"&purl="+encodeURIComponent(tiMonitor.sendData.currentUrl)+"&pst="+encodeURIComponent(this.getPageStartTime())+"&pct="+encodeURIComponent(this.getPageCurrentTime());0<this.pendingRequests.length;)requestBody=this.createRequestBody(),encodedRequestString=encodeURIComponent(this.b64EncodeUnicode(JSON.stringify(requestBody))),req_data=base_req_data+"&taginfo="+encodedRequestString+"&b64=1",!0==this.isBeaconSupported()&&!0==a?this.createSendBeaconRequest(req_data):
this.createAjaxPostRequest(req_data);tiMonitor.dataCollector.currentlySendingData=!1}};a.prototype.isValidResourceStartTime=function(a){var b=!0;try{if(a=parseFloat(a),this.timeOnPage()<a||6E5<a)b=!1}catch(c){console.log(c.message)}return b};a.prototype.queueRequest=function(a,b){if("resource"==b)if(!0==this.isValidResourceStartTime(this.adjustTimeForOffset(a.startTime)))reqName=a.name,req="rt="+b+"&ce="+encodeURIComponent(this.adjustTimeForOffset(a.connectEnd))+"&cs="+encodeURIComponent(this.adjustTimeForOffset(a.connectStart))+
"&dle="+encodeURIComponent(this.adjustTimeForOffset(a.domainLookupEnd))+"&dls="+encodeURIComponent(this.adjustTimeForOffset(a.domainLookupStart))+"&d="+encodeURIComponent(a.duration.toFixed(2))+"&et="+encodeURIComponent(a.entryType)+"&fs="+encodeURIComponent(this.adjustTimeForOffset(a.fetchStart))+"&it="+encodeURIComponent(a.initiatorType)+"&n="+encodeURIComponent(a.name)+"&rde="+encodeURIComponent(this.adjustTimeForOffset(a.redirectEnd))+"&rds="+encodeURIComponent(this.adjustTimeForOffset(a.redirectStart))+
"&reqs="+encodeURIComponent(this.adjustTimeForOffset(a.requestStart))+"&rse="+encodeURIComponent(this.adjustTimeForOffset(a.responseEnd))+"&rss="+encodeURIComponent(this.adjustTimeForOffset(a.responseStart))+"&scc=&st="+encodeURIComponent(this.adjustTimeForOffset(a.startTime))+"&sz="+encodeURIComponent(this.adjustTimeForOffset(a.decodedBodySize)),this.identifyRequest(a),this.resourceCounter+=1;else return;else if("pageload"==b){dom_complete=dom_content_load=dom_interactive=page_size="";try{var c=
performance.timing;0!=c.domInteractive&&(dom_interactive=c.domInteractive-c.fetchStart);0!=c.domContentLoadedEventEnd&&(dom_content_load=c.domContentLoadedEventEnd-c.fetchStart);0!=c.domComplete&&(dom_complete=c.domComplete-c.fetchStart)}catch(g){console.log(g.message)}if(!1==isNaN(dom_interactive)&&6E5<dom_interactive)return;conn_type=conn_downlink=conn_roundtrip=conn_downlinkMax=conn_effType="";req="rt="+b+"&ref=&top="+encodeURIComponent(this.timeOnPage())+"&domint="+encodeURIComponent(dom_interactive)+
"&domcl="+encodeURIComponent(dom_content_load)+"&domcom="+encodeURIComponent(dom_complete)+"&condl="+encodeURIComponent(conn_downlink)+"&conrt="+encodeURIComponent(conn_roundtrip)+"&coneff="+encodeURIComponent(conn_effType)+"&psz="+ +encodeURIComponent(page_size)}else"validationerror"==b&&!1==tiMonitor.sendData.preventFiringValidationRules?req="rt="+b+"&fr="+encodeURIComponent(a.failedRule)+"&rv="+encodeURIComponent(a.ruleVersion)+"&pm="+encodeURIComponent(a.pageMacros)+"&fc="+encodeURIComponent(a.failedConditions)+
"&vt="+encodeURIComponent(a.validationTime):"validationsuccess"==b&&!1==tiMonitor.sendData.preventFiringValidationRules?req="rt="+b+"&pr="+encodeURIComponent(a.passedRule)+"&rv="+encodeURIComponent(a.ruleVersion)+"&vt="+encodeURIComponent(a.validationTime):"jserror"==b?req="rt="+b+"&msg="+a.message:"pageBeforeUnload"==b&&(c=performance.timing,dom_interactive=c.domInteractive-c.fetchStart,dom_content_load=c.domContentLoadedEventEnd-c.fetchStart,dom_complete=c.domComplete-c.fetchStart,dom_content_load_end=
c.domContentLoadedEventEnd,response_end=c.responseEnd,navigation_start=c.navigationStart,firstContentfulPaint=first_paint=timeToFirstPaint=void 0,window.performance&&(c=window.performance.getEntriesByType("paint"),void 0!=c&&0<c.length&&(timeToFirstPaint=parseInt(1E3*c[0].startTime),first_paint=navigation_start+timeToFirstPaint,firstContentfulPaint=parseInt(1E3*c[1].startTime))),req="rt="+b+"&ref=&top="+encodeURIComponent(performance.now())+"&domint="+encodeURIComponent(dom_interactive)+"&domcl="+
encodeURIComponent(dom_content_load)+"&domcom="+encodeURIComponent(dom_complete)+"&domcle="+encodeURIComponent(dom_content_load_end)+"&rse="+encodeURIComponent(response_end)+"&navs="+encodeURIComponent(navigation_start)+"&fpt="+encodeURIComponent(first_paint)+"&tfpt="+encodeURIComponent(timeToFirstPaint)+"&fcpt="+encodeURIComponent(firstContentfulPaint));0<this.resourceCounter&&(this.pendingRequests.push(req),"validationerror"!=b&&"validationsuccess"!=b||this.sendRequests(!0))}})();

if (typeof tiMonitor == "undefined"){
	var tiMonitor = tiMonitor || {};
	tiMonitor.dataCollector = new taginspector.datapulse.DataCollector({siteID:"f3039af83a2f11e79b7128cfe91eb479", pixelHost:"https://collect.analyze.ly", tagDefinitions: [{id: '1', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com(\\/r)?\\/__utm\\.gif)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/u\\/ga\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/p\\/__utm\\.gif)|(\\/u\\/ga_debug\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/ga\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)google\\.com\\/js\\/gweb\\/analytics\\/autotrack\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google\\.com\\/js\\/gweb\\/analytics\\/doubletrack\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/ga_exp\\.js)|((^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/analytics\\.js|^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/plugins\\/ua\\/))|((^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com(\\/[a-z])?\\/collect|^http(s)?:\\/\\/((.*)\\.|)stats\\.g\\.doubleclick\\.net(\\/[a-z])?\\/collect))|((stats\\.g\\.doubleclick\\.net\\/dc\\.js|stats\\.g\\.doubleclick\\.net\\/__utm\\.gif))', 'i')},{id: '740', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)constantcontact\\.com\\/(.*)\\/safe_subscribe_logo\\.gif)', 'i')},{id: '273', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)js\\.stormiq\\.com\\/[0-9]*\\.ct\\.js)', 'i')},{id: '882', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/urchin\\.js)', 'i')},{id: '139', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)atdmt\\.com\\/mstag\\/site\\/(.*)\\/(mstag\\.js|analytics\\.html))', 'i')},{id: '59', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)offermatica\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)d4isvpgrs7dwu\\.cloudfront\\.net\\/adobetarget\\/)|(\\/mbox\\.js)|(\\/m[0-9]\\/(.*)\\/mbox\\/)', 'i')},{id: '1420', regex: new RegExp('(^http(s)?:\\/\\/(ct\\.pinterest\\.com\\/|((.*)\\.|)pinimg.com\\/ct\\/core\\.js))', 'i')},{id: '85', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)leadback\\.advertising\\.com\\/)', 'i')},{id: '1436', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)snap\\.licdn\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)(dc|imp2|px).ads\\.linkedin\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)bizographics.com\\/insight\\.(min\\.)?js))', 'i')},{id: '401', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/siteopt\\.js)', 'i')},{id: '294', regex: new RegExp('(doubleclick\\.net\\/activity)|(fls\\.doubleclick\\.net\\/)|(^http(s)?:\\/\\/((.*)\\.|)googletagmanager\\.com\\/.*id=dc-)|(gtag\\/js\\?id\\=(DC|dc)-)', 'i')},{id: '1406', regex: new RegExp('((^http(s)?:\\/\\/connect\\.facebook\\.net\\/(.*)\\/fbevents\\.js|^http(s)?:\\/\\/www\\.facebook\\.com\\/tr(\\/|\\?)|http(s)?:\\/\\/connect\\.facebook\\.net\\/signals\\/config\\/))', 'i')},{id: '1480', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)googletagmanager\\.com\\/gtag\\/js)', 'i')},{id: '1450', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/gtm\\/js|^http(s)?:\\/\\/((.*)\\.|)googletagmanager\\.com\\/a\\?))', 'i')},{id: '1393', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)platform\\.twitter\\.com\\/oct\\.js|^http(s)?:\\/\\/((.*)\\.|)ads-twitter\\.com\\/uwt\\.js|^http(s)?:\\/\\/((.*)\\.|)t\\.co\\/i\\/adsct|^http(s)?:\\/\\/((.*)\\.|)analytics.twitter.com\\/i\\/adsct)', 'i')},{id: '396', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)googletagmanager\\.com\\/|\\?id=(gtm|GTM)-([a-zA-Z0-9]{4,10})))', 'i')},{id: '1397', regex: new RegExp('(^http(s)?:\\/\\/(.*)fls\\.doubleclick\\.net\\/(.*)type=visua0)', 'i')},{id: '292', regex: new RegExp('(gan\\.doubleclick\\.net\\/)', 'i')},{id: '291', regex: new RegExp('(googleads\\.g\\.doubleclick\\.net\\/)|(google\\.com\\/ads\\/user-lists\\/)', 'i')},{id: '1398', regex: new RegExp('(^http(s)?:\\/\\/(ad\\.doubleclick\\.net\\/(.*)visualiqinc(.*)|((.*)\\.|)myvisualiq\\.net\\/))', 'i')},{id: '296', regex: new RegExp('(adx\\.g\\.doubleclick\\.net\\/)', 'i')},{id: '390', regex: new RegExp('(survey\\.g\\.doubleclick\\.net\\/)', 'i')},{id: '295', regex: new RegExp('(www\\.googletagservices\\.com\\/tag\\/)|(ad-ace\\.doubleclick\\.net\\/)|(ad\\.doubleclick\\.net\\/)|(ad\\.[a-z]*\\.doubleclick\\.net\\/)|(ad-apac\\.doubleclick\\.net\\/)|(ad-emea\\.doubleclick\\.net\\/)|(pubads\\.g\\.doubleclick\\.net\\/)|(m\\.doubleclick\\.net\\/)|(ad-g\\.doubleclick\\.net\\/)|(2mdn\\.net\\/)|(static\\.doubleclick\\.net\\/)|(iv\\.doubleclick\\.net\\/)|(cm\\.g\\.doubleclick\\.net\\/)|(^http(s)?:\\/\\/((.*)\\.|)donotmatchme\\.com\\/)|(g\\.doubleclick\\.net\\/)', 'i')},{id: '1427', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)bluecore\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)triggeredmail\\.appspot\\.com\\/))', 'i')},{id: '376', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)gigya\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)gigcount\\.com\\/)', 'i')},{id: '1416', regex: new RegExp('(^http(s)?:\\/\\/bat\\.bing\\.com\\/)', 'i')},{id: '501', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)krxd\\.net\\/)', 'i')},{id: '152', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)bluekai\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)bkrtx\\.com\\/)', 'i')},{id: '323', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)(betrad|evidon)\\.com\\/)', 'i')}]});
	tiMonitor.sendData = {
		pageId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);}),
		sentUnload: false,
		currentlyIterating: false,
		pageBeingSampled: false,
		externalTagStartTimes: [],
		internalTagStartTimes: [],
		currentUrl: window.location.href,
		minimumBeforeUnloadRestriction: 5,
		sampleRate: 8,
		sampleBlackList: new RegExp('.*'),
		sampleBlackListEnabled: false,
		getRandomInt: function() {
			return Math.floor(Math.random() * (this.sampleRate - 1 + 1)) + 1;
		},
		shouldSamplePage: function(){
			if(this.sampleBlackListEnabled == true){
				if(this.sampleBlackList.test(this.currentUrl) == true){
					return false;
				}
			}
			if(1 == tiMonitor.sendData.getRandomInt()){
				return false;
			}else{
				tiMonitor.sendData.pageBeingSampled = true;
				return true;
			}
		},
		createFakeReq: function(reqUrl){
			fakeHit = {
				connectEnd: 0,
				connectStart: 0,
				decodedBodySize: 0,
				domainLookupEnd: 0,
				domainLookupStart: 0,
				duration: 0,
				entryType: "resource",
				fetchStart: 0,
				initiatorType: "script",
				name: "",
				redirectEnd: 0,
				redirectStart: 0,
				requestStart: 0,
				responseEnd: 0,
				responseStart: 0,
				startTime: 0
			};
			fetchStart = performance.now()
			fakeDuration = 10.47999999905005;
			
			fakeHit.fetchStart = fetchStart;
			fakeHit.startTime = fetchStart;
			fakeHit.duration = fakeDuration;
			fakeHit.responseEnd = fetchStart + fakeDuration;
			fakeHit.name = reqUrl;
			tiMonitor.dataCollector.queueRequest(fakeHit, "resource");
			
		},
		isSinglePageApp: function(){
			if(window.angular){
				return true;
			}else{
				return false;
			}
		},
		isPerformanceObserverSupported: function(){
			if(window.PerformanceObserver){
				return true;
			}else{
				return false;
			}
		},
		isPerformanceObserverInitialized: false,
		performanceObserverCallback: function(list){

			var perfEntries = list.getEntries();
			for (var i = 0; i < perfEntries.length; i++){
				var req = perfEntries[i];
				if(tiMonitor.sendData.isValidRequest(req) == true){
					tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
					tiMonitor.dataCollector.queueRequest(req, "resource");
				}else{
					tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
				}
			}

			tiMonitor.sendData.isPerformanceObserverInitialized=true;
		},
		suportedBrowser: function(){
			var isSupported = true;
			ua = navigator.userAgent;
			var isNativeAndroid = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1));
			var isIE = ((ua.indexOf('Trident') > -1) || (ua.indexOf('MSIE') > -1));
			var perfMonSupport = false;
			if ('performance' in window) { 
				if ('getEntries' in performance) {
					perfMonSupport = true;
				}
			}
			if(isNativeAndroid == true || perfMonSupport == false || isIE == true){
				isSupported = false;
			}
			return isSupported;
		},
		blackList: new RegExp('http(s)?:\/\/(col\.eum-appdynamics\.com|((.*)\.|)mouseflow.com)'),
		lastPerformanceObjLength: 0,
		areTriggersActivated: false,
		isDuplicateRequest: function(req){
			lt = tiMonitor.sendData.getUniqueReqKey(req);
			return !(tiMonitor.sendData.externalTagStartTimes.indexOf(lt) == -1 && tiMonitor.sendData.internalTagStartTimes.indexOf(lt) == -1);
		},
		isBlacklistedRequest: function(req){
			return this.blackList.test(req.name) == true;
		},
		isExternalRequest: function(req){
			externalReq = true;
			windowOrigin = window.location.protocol + '//' + window.location.hostname;
			if(req.name.length >= windowOrigin.length){
				truncReqName = (req.name).substr(0, windowOrigin.length);
				externalReq = (truncReqName).indexOf(windowOrigin) == -1;
			}
			return externalReq;
		},
		isTIRequest: function(req){
			return !((req.name).indexOf(tiMonitor.dataCollector.pixelHost) == -1);
		},
		isValidRequest:function(req){
			validReq = false;

			if(this.isTIRequest(req) == false && this.isExternalRequest(req) == true && this.isBlacklistedRequest(req) == false){
				validReq = true;
			}
			return validReq;
		},
		getUniqueReqKey:function(req){
			return (req.startTime).toString() + "-" + (req.responseEnd).toString();
		},
		isBufferFull:function(){
			bufferFull = false;
			if(window.performance.getEntriesByType("resource").length == 150 || window.performance.getEntriesByType("resource").length == 250 || window.performance.getEntriesByType("resource").length == 400){
				bufferFull = true;
			}
			return bufferFull;
		},
		iteratePerformance: function(){
			if(this.currentlyIterating == false){
				this.currentlyIterating = true;

				var pe = performance.getEntriesByType("resource");
				if(this.lastPerformanceObjLength != pe.length){
					this.lastPerformanceObjLength = pe.length;
					for (var i = 0; i < pe.length; i++) {
						var req = pe[i];
						if(this.isDuplicateRequest(req) == false){
							if(tiMonitor.sendData.isValidRequest(req) == true){
								tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
								tiMonitor.dataCollector.queueRequest(req, "resource");
							}else{
								tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
							}
						}
					}
				}
				if(this.areTriggersActivated == false){
					this.areTriggersActivated = true;
					tiMonitor.validationRules(true);
				}
				this.currentlyIterating = false;
			}
		},
		domLoadCompleteEvent: (document.readyState == 'complete'),
		windowUnloadEvent: false,
		preventFiringValidationRules: false,
		pageVariableFiredEvents: {},
		pageComplete: function(){
			if(tiMonitor.sendData.sentUnload == false && tiMonitor.sendData.pageBeingSampled == false){
				tiMonitor.sendData.sentUnload = true;
				tiMonitor.dataCollector.queueRequest(null, "pageload");
				this.iteratePerformance();
				this.fire();
			}
		},
		waitForDomLoad: function(){
			if (document.readyState == 'complete' && tiMonitor.sendData.sentUnload == false){
				tiMonitor.sendData.pageComplete();
				return true;
			}else{
				return false;
			}
		},
		fire: function(){
			tiMonitor.dataCollector.sendRequests(false);
		},
		clearBuffer: function(){
			if(window.performance.clearResourceTimings){
				startBufferLength = window.performance.getEntriesByType("resource").length;
				tiMonitor.sendData.iteratePerformance();
				window.performance.clearResourceTimings();
				endBufferLength = window.performance.getEntriesByType("resource").length;

				if (startBufferLength == endBufferLength){
					this.preventFiringValidationRules = true;
				}
			}
		},
		handleUnload: function(){
			tiMonitor.windowUnloadEvent=true;
			tiMonitor.sendData.pageComplete();

			if(tiMonitor.sendData.isPerformanceObserverSupported() == false){
				tiMonitor.sendData.iteratePerformance();
			}
			tiMonitor.sendData.fire();
		},
		fullBufferEventListener: function(){
			if("clearResourceTimings" in window.performance){
				if("addEventListener" in window.performance){
					window.performance.addEventListener("resourcetimingbufferfull", function(){
						tiMonitor.sendData.clearBuffer();
					});
				}else{
					if("onresourcetimingbufferfull" in window.performance){
						window.performance.onresourcetimingbufferfull = function(event) {
							tiMonitor.sendData.clearBuffer();
						};
					}
				}
			}
		},
		initialized: false
	};


	tiMonitor.validationRules = function (){
		try {
			macro_function_b0e1cb85_cbdf_5dfe_994d_eafa90f0a412 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('376') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_b0e1cb85_cbdf_5dfe_994d_eafa90f0a412 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'b0e1cb85_cbdf_5dfe_994d_eafa90f0a412', reportValue: false});
		macro_b0e1cb85_cbdf_5dfe_994d_eafa90f0a412.setValue(macro_function_b0e1cb85_cbdf_5dfe_994d_eafa90f0a412);
		macro_function_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1 = function(){
			return 'true';
		} 
		macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1', reportValue: false});
		macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1.setValue(macro_function_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1);
		macro_function_22dc7922_97c9_5d53_99a1_7cab6cf97b25 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '22dc7922_97c9_5d53_99a1_7cab6cf97b25', reportValue: false});
		macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25.setValue(macro_function_22dc7922_97c9_5d53_99a1_7cab6cf97b25);
		macro_function_c01dd0cd_51e8_5173_9dbe_051b24e09698 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('323') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_c01dd0cd_51e8_5173_9dbe_051b24e09698 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'c01dd0cd_51e8_5173_9dbe_051b24e09698', reportValue: false});
		macro_c01dd0cd_51e8_5173_9dbe_051b24e09698.setValue(macro_function_c01dd0cd_51e8_5173_9dbe_051b24e09698);
		macro_function_df1ffe60_e3b0_55e8_9636_4ea120894feb = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('396') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_df1ffe60_e3b0_55e8_9636_4ea120894feb = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'df1ffe60_e3b0_55e8_9636_4ea120894feb', reportValue: false});
		macro_df1ffe60_e3b0_55e8_9636_4ea120894feb.setValue(macro_function_df1ffe60_e3b0_55e8_9636_4ea120894feb);
		macro_function_1c49c12d_773f_5abd_8621_418c039a1e45 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1') == true){
				var re = new RegExp("(?:[?&])(tid=UA-27534376-1)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['1'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['1'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_1c49c12d_773f_5abd_8621_418c039a1e45 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '1c49c12d_773f_5abd_8621_418c039a1e45', reportValue: false});
		macro_1c49c12d_773f_5abd_8621_418c039a1e45.setValue(macro_function_1c49c12d_773f_5abd_8621_418c039a1e45);
		macro_function_bb4cd1ae_7fe4_5a8e_954c_658ccac4c861 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('501') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_bb4cd1ae_7fe4_5a8e_954c_658ccac4c861 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'bb4cd1ae_7fe4_5a8e_954c_658ccac4c861', reportValue: false});
		macro_bb4cd1ae_7fe4_5a8e_954c_658ccac4c861.setValue(macro_function_bb4cd1ae_7fe4_5a8e_954c_658ccac4c861);
		macro_function_6b130667_f6bc_529e_a50b_34d90d61e853 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('152') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_6b130667_f6bc_529e_a50b_34d90d61e853 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '6b130667_f6bc_529e_a50b_34d90d61e853', reportValue: false});
		macro_6b130667_f6bc_529e_a50b_34d90d61e853.setValue(macro_function_6b130667_f6bc_529e_a50b_34d90d61e853);
		macro_function_ca3c135d_5134_507d_bbe6_810c5b1cca19 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1416') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_ca3c135d_5134_507d_bbe6_810c5b1cca19 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'ca3c135d_5134_507d_bbe6_810c5b1cca19', reportValue: false});
		macro_ca3c135d_5134_507d_bbe6_810c5b1cca19.setValue(macro_function_ca3c135d_5134_507d_bbe6_810c5b1cca19);
		macro_function_5a32489c_9e69_519a_ad92_d895ee728442 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('294') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_5a32489c_9e69_519a_ad92_d895ee728442 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '5a32489c_9e69_519a_ad92_d895ee728442', reportValue: false});
		macro_5a32489c_9e69_519a_ad92_d895ee728442.setValue(macro_function_5a32489c_9e69_519a_ad92_d895ee728442);
		

condition_49947da5_18d0_446d_9737_24ba50d898c9 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_b0e1cb85_cbdf_5dfe_994d_eafa90f0a412, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '49947da5_18d0_446d_9737_24ba50d898c9'});

rule_1260 = new taginspector.datapulse.BaseRule({uniqueId: '1260', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1260.addFilter(condition_49947da5_18d0_446d_9737_24ba50d898c9);

condition_c6c1bcfe_dc66_41c2_b364_0fde681d976b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'c6c1bcfe_dc66_41c2_b364_0fde681d976b'});

rule_1252 = new taginspector.datapulse.BaseRule({uniqueId: '1252', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1252.addFilter(condition_c6c1bcfe_dc66_41c2_b364_0fde681d976b);

condition_6afb0e84_3d96_489a_a59b_c67e6c01ace5 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_c01dd0cd_51e8_5173_9dbe_051b24e09698, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '6afb0e84_3d96_489a_a59b_c67e6c01ace5'});

rule_1400 = new taginspector.datapulse.BaseRule({uniqueId: '1400', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1400.addFilter(condition_6afb0e84_3d96_489a_a59b_c67e6c01ace5);

condition_7919a0fe_bde7_4060_b552_d7b8b5bb94b1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_df1ffe60_e3b0_55e8_9636_4ea120894feb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '7919a0fe_bde7_4060_b552_d7b8b5bb94b1'});

rule_1250 = new taginspector.datapulse.BaseRule({uniqueId: '1250', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1250.addFilter(condition_7919a0fe_bde7_4060_b552_d7b8b5bb94b1);

condition_d4b55447_1915_4b7e_a2e4_031305699dcb = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1c49c12d_773f_5abd_8621_418c039a1e45, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'd4b55447_1915_4b7e_a2e4_031305699dcb'});

rule_1251 = new taginspector.datapulse.BaseRule({uniqueId: '1251', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1251.addFilter(condition_d4b55447_1915_4b7e_a2e4_031305699dcb);

condition_236b356d_0216_4a97_9bd9_bb2eefbdcc24 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_bb4cd1ae_7fe4_5a8e_954c_658ccac4c861, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '236b356d_0216_4a97_9bd9_bb2eefbdcc24'});

rule_1262 = new taginspector.datapulse.BaseRule({uniqueId: '1262', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1262.addFilter(condition_236b356d_0216_4a97_9bd9_bb2eefbdcc24);

condition_ac3bb4e5_7078_4dd1_a5d3_b147bc3c2809 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_6b130667_f6bc_529e_a50b_34d90d61e853, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'ac3bb4e5_7078_4dd1_a5d3_b147bc3c2809'});

rule_1257 = new taginspector.datapulse.BaseRule({uniqueId: '1257', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1257.addFilter(condition_ac3bb4e5_7078_4dd1_a5d3_b147bc3c2809);

condition_92c042b8_de26_47a1_8f83_988f9b77ac8b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_ca3c135d_5134_507d_bbe6_810c5b1cca19, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '92c042b8_de26_47a1_8f83_988f9b77ac8b'});

rule_1266 = new taginspector.datapulse.BaseRule({uniqueId: '1266', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1266.addFilter(condition_92c042b8_de26_47a1_8f83_988f9b77ac8b);

condition_fa56ed47_c9c2_443f_a351_5bfaec20d63e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5a32489c_9e69_519a_ad92_d895ee728442, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'fa56ed47_c9c2_443f_a351_5bfaec20d63e'});

rule_1256 = new taginspector.datapulse.BaseRule({uniqueId: '1256', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1256.addFilter(condition_fa56ed47_c9c2_443f_a351_5bfaec20d63e);


condition_22e7f149_fd92_4693_a686_48538bcadf96 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '22e7f149_fd92_4693_a686_48538bcadf96'});
trigger_function_trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_22e7f149_fd92_4693_a686_48538bcadf96.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a, uniqueId: '474d6cd6_be33_11e9_9f5c_12b0c998558a' });
trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a.addRule(rule_1260);
rule_1260.addTrigger(trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a);

condition_f889d4e1_4afd_4455_9641_f13fcbcd267c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f889d4e1_4afd_4455_9641_f13fcbcd267c'});
trigger_function_trigger_474d816c_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_f889d4e1_4afd_4455_9641_f13fcbcd267c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474d816c_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474d816c_be33_11e9_9f5c_12b0c998558a, uniqueId: '474d816c_be33_11e9_9f5c_12b0c998558a' });
trigger_474d816c_be33_11e9_9f5c_12b0c998558a.addRule(rule_1252);
rule_1252.addTrigger(trigger_474d816c_be33_11e9_9f5c_12b0c998558a);

condition_21457ee4_7c48_46f8_90c9_16ac66db10e0 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '21457ee4_7c48_46f8_90c9_16ac66db10e0'});
trigger_function_trigger_474d959e_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_21457ee4_7c48_46f8_90c9_16ac66db10e0.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474d959e_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474d959e_be33_11e9_9f5c_12b0c998558a, uniqueId: '474d959e_be33_11e9_9f5c_12b0c998558a' });
trigger_474d959e_be33_11e9_9f5c_12b0c998558a.addRule(rule_1400);
rule_1400.addTrigger(trigger_474d959e_be33_11e9_9f5c_12b0c998558a);

condition_9e2da5f9_4324_4501_b403_a8a59e80f750 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '9e2da5f9_4324_4501_b403_a8a59e80f750'});
trigger_function_trigger_474da976_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_9e2da5f9_4324_4501_b403_a8a59e80f750.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474da976_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474da976_be33_11e9_9f5c_12b0c998558a, uniqueId: '474da976_be33_11e9_9f5c_12b0c998558a' });
trigger_474da976_be33_11e9_9f5c_12b0c998558a.addRule(rule_1250);
rule_1250.addTrigger(trigger_474da976_be33_11e9_9f5c_12b0c998558a);

condition_225d7c79_a89f_4cbe_b11a_6276118b7612 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '225d7c79_a89f_4cbe_b11a_6276118b7612'});
trigger_function_trigger_474dc0be_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_225d7c79_a89f_4cbe_b11a_6276118b7612.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474dc0be_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474dc0be_be33_11e9_9f5c_12b0c998558a, uniqueId: '474dc0be_be33_11e9_9f5c_12b0c998558a' });
trigger_474dc0be_be33_11e9_9f5c_12b0c998558a.addRule(rule_1251);
rule_1251.addTrigger(trigger_474dc0be_be33_11e9_9f5c_12b0c998558a);

condition_ba434b7e_005e_4219_b8e7_b1d6bb61e2d3 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'ba434b7e_005e_4219_b8e7_b1d6bb61e2d3'});
trigger_function_trigger_474dd662_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_ba434b7e_005e_4219_b8e7_b1d6bb61e2d3.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474dd662_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474dd662_be33_11e9_9f5c_12b0c998558a, uniqueId: '474dd662_be33_11e9_9f5c_12b0c998558a' });
trigger_474dd662_be33_11e9_9f5c_12b0c998558a.addRule(rule_1262);
rule_1262.addTrigger(trigger_474dd662_be33_11e9_9f5c_12b0c998558a);

condition_e956023e_3a38_40a3_aa89_3a3baec5c595 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e956023e_3a38_40a3_aa89_3a3baec5c595'});
trigger_function_trigger_474deabc_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_e956023e_3a38_40a3_aa89_3a3baec5c595.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474deabc_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474deabc_be33_11e9_9f5c_12b0c998558a, uniqueId: '474deabc_be33_11e9_9f5c_12b0c998558a' });
trigger_474deabc_be33_11e9_9f5c_12b0c998558a.addRule(rule_1257);
rule_1257.addTrigger(trigger_474deabc_be33_11e9_9f5c_12b0c998558a);

condition_09b0b91f_ec73_42eb_8b5f_9c76541973cc = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '09b0b91f_ec73_42eb_8b5f_9c76541973cc'});
trigger_function_trigger_474dfe94_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_09b0b91f_ec73_42eb_8b5f_9c76541973cc.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474dfe94_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474dfe94_be33_11e9_9f5c_12b0c998558a, uniqueId: '474dfe94_be33_11e9_9f5c_12b0c998558a' });
trigger_474dfe94_be33_11e9_9f5c_12b0c998558a.addRule(rule_1266);
rule_1266.addTrigger(trigger_474dfe94_be33_11e9_9f5c_12b0c998558a);

condition_2a6fb6f7_7880_4e0a_9327_f117f7ad3663 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '2a6fb6f7_7880_4e0a_9327_f117f7ad3663'});
trigger_function_trigger_474e12da_be33_11e9_9f5c_12b0c998558a = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_2a6fb6f7_7880_4e0a_9327_f117f7ad3663.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_474e12da_be33_11e9_9f5c_12b0c998558a = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_474e12da_be33_11e9_9f5c_12b0c998558a, uniqueId: '474e12da_be33_11e9_9f5c_12b0c998558a' });
trigger_474e12da_be33_11e9_9f5c_12b0c998558a.addRule(rule_1256);
rule_1256.addTrigger(trigger_474e12da_be33_11e9_9f5c_12b0c998558a);

trigger_474d6cd6_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474d816c_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474d959e_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474da976_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474dc0be_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474dd662_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474deabc_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474dfe94_be33_11e9_9f5c_12b0c998558a.initTrigger();
trigger_474e12da_be33_11e9_9f5c_12b0c998558a.initTrigger();

		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	tiMonitor.fireValidationRules = function (){
		try {
			//fire unload triggers:
			if(document.createEvent && tiMonitor.sendData.pageBeingSampled == false){
				var event = document.createEvent('Event');
				event.initEvent('tiSimulateUnload', true, true);

				tiMonitor.sendData.handleUnload();
				document.dispatchEvent(event);
			}
		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	tiMonitor.enableEnhancedTagSupport = function (){
		try {
			scInterval = 0;
			var tiScPostSupport = setInterval(function() {
				scInterval = scInterval + 500;
				if(scInterval >= 20000){
					clearInterval(tiScPostSupport);
				}
				if(typeof(s) != "undefined"){
					if (s.hasOwnProperty("registerPreTrackCallback")){
						s.registerPreTrackCallback(function(requestUrl) {
							if(requestUrl.length > 2048){
								tiMonitor.sendData.createFakeReq(requestUrl);
							}
						});
						clearInterval(tiScPostSupport);
					}
				}
			}, 500);
			fbInterval = 0;
			var tiFbPostSupport = setInterval(function() {
				fbInterval = fbInterval + 100;
				if(fbInterval >= 20000){
					clearInterval(tiFbPostSupport);
				}
				if(typeof(fbq) != "undefined"){
					if (fbq.hasOwnProperty("on")){
						clearInterval(tiFbPostSupport);
						fbq.on( "fired", function(reqMethod, reqData) {
							if(reqMethod == "POST"){
								params = []
								for(x=1;x<reqData["_params"].length;x++){
									param = reqData["_params"][x];
									params.push(encodeURIComponent(param.name) + '=' + encodeURIComponent(param.value));
								}
								fbUrl = "https://www.facebook.com/tr/?" + params.join('&');
								tiMonitor.sendData.createFakeReq(fbUrl);
							}
						});
					}
				}
			}, 100);
		
			function initGaTracker(tracker){
				var globalSendTaskName = '_' + tracker.get('trackingId') + '_sendHitTask';
				var originalSendHitTask = window[globalSendTaskName] = window[globalSendTaskName] || tracker.get('sendHitTask');

				tracker.set('sendHitTask', function(model) {
					globalSendTaskName2 = '_' + model.get('trackingId') + '_sendHitTask';
					originalSendHitTask2 = window[globalSendTaskName2];
					originalSendHitTask2(model);
					hitPayload = model.get('hitPayload');
					fullHitUrl = "https://www.google-analytics.com/collect?" + hitPayload
					if(hitPayload.length > 2036 && hitPayload.length <= 8192){
						tiMonitor.sendData.createFakeReq(fullHitUrl);
					}
				});
			}
			gaInterval = 0;
			tiGaPostSupport = setInterval(function() {
				gaInterval = gaInterval + 500;
				if(gaInterval >= 20000){
					clearInterval(tiGaPostSupport);
				}
				if(typeof(ga) != "undefined"){
					if (ga.hasOwnProperty("getAll")){
						if(ga.getAll().length > 0){
							for(x=0; x<ga.getAll().length; x++){
							initGaTracker(ga.getAll()[x])
							}
							clearInterval(tiGaPostSupport);
						}
					}
				}
			}, 500);
		}catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	tiMonitor.initializeNewPage = function (){
		try {
			tiMonitor.windowUnloadEvent = false;
			tiMonitor.sendData.sentUnload = false;
			tiMonitor.sendData.pageBeingSampled = tiMonitor.sendData.shouldSamplePage();
			newPageId =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
			tiMonitor.sendData.pageId = newPageId;
			tiMonitor.dataCollector.pageId = newPageId;
			
			tiMonitor.dataCollector.startTime = Date.now();
			tiMonitor.dataCollector.identifiedRequests = {};
			tiMonitor.dataCollector.offsetTime = performance.now();
			tiMonitor.sendData.currentUrl = window.location.href;
			tiMonitor.sendData.preventFiringValidationRules = false;
		
		tiMonitor.dataCollector.resource_size = 0;
		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	if(tiMonitor.sendData.suportedBrowser() == true){
		if(tiMonitor.sendData.initialized == false){
			tiMonitor.sendData.initialized = true;
			if(tiMonitor.sendData.shouldSamplePage() == false && tiMonitor.sendData.isBufferFull() == false){
				if(false){
					tiMonitor.dataCollector.session = taginspector.datapulse.Session.setupSession({"containerId": "f3039af83a2f11e79b7128cfe91eb479"});
				}
				tiMonitor.sendData.fullBufferEventListener();

				if(tiMonitor.sendData.isPerformanceObserverSupported() == true){
					var iteratePerformanceCompleted = false;
					while(iteratePerformanceCompleted == false){
						tiMonitor.sendData.iteratePerformance();
						pe = performance.getEntriesByType("resource");
						if(tiMonitor.sendData.lastPerformanceObjLength == pe.length){
							iteratePerformanceCompleted = true;
						}
					}
					var observer = new PerformanceObserver(tiMonitor.sendData.performanceObserverCallback);
					observer.observe({entryTypes: ['resource']});

				}else{
					setInterval(function () {tiMonitor.sendData.iteratePerformance()}, 1000);
				}
				tiMonitor.enableEnhancedTagSupport();
				window.addEventListener('beforeunload', function(event) { tiMonitor.sendData.handleUnload();});
				
				window.addEventListener('hashchange', function() {
					spaHashIndex = (window.location.hash).indexOf("#/");
					if(spaHashIndex > -1){
						cHashUrl = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
						for(zx=0; zx<cHashUrl.length; zx++){
							cHashUrl[zx] = cHashUrl[zx].replace(/\?(.*)/g, '')
						}
						pUrl = tiMonitor.sendData.currentUrl;
						pHash = pUrl.substring(pUrl.indexOf("#"),  pUrl.length);
						pHashUrl = pHash.replace(/^#\/?|\/$/g, '').split('/');
						for(zy=0; zy<pHashUrl.length; zy++){
							pHashUrl[zy] = pHashUrl[zy].replace(/\?(.*)/g, '')
						}
						if(JSON.stringify(cHashUrl) != JSON.stringify(pHashUrl)){
							tiMonitor.fireValidationRules();
							tiMonitor.sendData.pageComplete();
							tiMonitor.initializeNewPage();
						}
					}
				}, false);
				if((window.location.hash).indexOf("#/") == -1){
					if(typeof(MutationObserver) != "undefined"){
						observer = new MutationObserver(function(){
							tiMonitor.fireValidationRules();
							tiMonitor.sendData.pageComplete();
							tiMonitor.initializeNewPage();
						});
						targetNode = document.getElementsByTagName('title');
						if(targetNode.length > 0){
							observer.observe(targetNode[0], { attributes: false, childList: true, subtree: false });
						}
					}
				}
				
				var tiDomLoadInterval = setInterval(function () {
					isDomLoaded = tiMonitor.sendData.waitForDomLoad();
					if(isDomLoaded){
						clearInterval(tiDomLoadInterval);
					}
				}, 1000);
				setInterval(function () {tiMonitor.sendData.fire()}, 1000);

			}
		}
	}
}


