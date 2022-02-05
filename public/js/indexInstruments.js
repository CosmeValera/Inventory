function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function insertInstruments(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (instruments) {pug_html = pug_html + "\u003Ctr id=\"titles\"\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Image") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Type") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Price") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
// iterate instruments
;(function(){
  var $$obj = instruments;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var inst = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Ca class=\"d-flex justify-content-center\" href=\"#\"\u003E";
if ((inst.name == "Snare Drum")) {
pug_html = pug_html + "\u003Cimg class=\"img-fluid thumbnail zoom\" src=\"img\u002FsnareDrum.png\" width=\"100px\" height=\"100px\" alt=\"img\"\u002F\u003E";
}
else {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid thumbnail zoom\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"100px\" height=\"100px\" alt=\"img\"") + "\u002F\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
if (inst.subtype) {
pug_html = pug_html + "\u003Chr class=\"m-4\"\u002F\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.subtype) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv\u003E\u003Ca class=\"item-upper-right link-as-button me-3 mt-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "View") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}.00`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var inst = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Ca class=\"d-flex justify-content-center\" href=\"#\"\u003E";
if ((inst.name == "Snare Drum")) {
pug_html = pug_html + "\u003Cimg class=\"img-fluid thumbnail zoom\" src=\"img\u002FsnareDrum.png\" width=\"100px\" height=\"100px\" alt=\"img\"\u002F\u003E";
}
else {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid thumbnail zoom\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"100px\" height=\"100px\" alt=\"img\"") + "\u002F\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
if (inst.subtype) {
pug_html = pug_html + "\u003Chr class=\"m-4\"\u002F\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.subtype) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv\u003E\u003Ca class=\"item-upper-right link-as-button me-3 mt-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "View") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}.00`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);
}.call(this,"instruments" in locals_for_with?locals_for_with.instruments:typeof instruments!=="undefined"?instruments:undefined));;return pug_html;}