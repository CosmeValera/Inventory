function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function insertInstruments(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (Math, data) {pug_html = pug_html + "\u003Ctr id=\"titles\"\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Image") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Type") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E";
if ((data.filterPrice == "price-high-to-low" || data.filterPrice == false)) {
pug_html = pug_html + "\u003Ch2 class=\"price-switch\"\u003E" + (pug_escape(null == (pug_interp = "Price⏷") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
else {
pug_html = pug_html + "\u003Ch2 class=\"price-switch\"\u003E" + (pug_escape(null == (pug_interp = "Price⏶") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
// iterate data.instruments
;(function(){
  var $$obj = data.instruments;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var inst = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr class=\"this-is-a-table-row\"\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Ca class=\"d-flex justify-content-center\" href=\"#\"\u003E";
if (data.bigInstruments) {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"150px\" height=\"150px\" alt=\"img\"") + "\u002F\u003E";
}
else {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid thumbnail zoom\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"100px\" height=\"100px\" alt=\"img\"") + "\u002F\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
if (inst.subtype) {
pug_html = pug_html + "\u003Chr class=\"m-4\"\u002F\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.subtype) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cp class=\"secret-invisible-id\"\u003E" + (pug_escape(null == (pug_interp = inst._id) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv\u003E \u003Ca class=\"item-upper-right link-as-button-blue update-button me-3 mt-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Update") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ca class=\"item-bottom-right link-as-button-red delete-button me-3 mb-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Delete") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E";
if (data.priceWithDecimals) {
if ((inst.price.toString().includes("."))) {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
else {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}.00`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
}
else {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${Math.round(inst.price)}`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var inst = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr class=\"this-is-a-table-row\"\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Ca class=\"d-flex justify-content-center\" href=\"#\"\u003E";
if (data.bigInstruments) {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"150px\" height=\"150px\" alt=\"img\"") + "\u002F\u003E";
}
else {
pug_html = pug_html + "\u003Cimg" + (" class=\"img-fluid thumbnail zoom\""+pug_attr("src", `img/${inst.name}.png`, true, false)+" width=\"100px\" height=\"100px\" alt=\"img\"") + "\u002F\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
if (inst.subtype) {
pug_html = pug_html + "\u003Chr class=\"m-4\"\u002F\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = inst.subtype) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cp class=\"secret-invisible-id\"\u003E" + (pug_escape(null == (pug_interp = inst._id) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv\u003E \u003Ca class=\"item-upper-right link-as-button-blue update-button me-3 mt-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Update") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ca class=\"item-bottom-right link-as-button-red delete-button me-3 mb-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Delete") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E";
if (data.priceWithDecimals) {
if ((inst.price.toString().includes("."))) {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
else {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${inst.price}.00`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
}
else {
pug_html = pug_html + "\u003Ch2\u003E" + (pug_escape(null == (pug_interp = `$ ${Math.round(inst.price)}`) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);
}.call(this,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;}