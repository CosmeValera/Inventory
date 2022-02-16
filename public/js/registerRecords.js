function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function insertRecords(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {pug_html = pug_html + "\u003Ctr id=\"titles\"\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Type") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = "Summary") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E";
if ((data.filterDate == "date-old-to-new" || data.filterDate == false)) {
pug_html = pug_html + "\u003Ch2 class=\"date-switch\"\u003E" + (pug_escape(null == (pug_interp = "Date⏶") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
else {
pug_html = pug_html + "\u003Ch2 class=\"date-switch\"\u003E" + (pug_escape(null == (pug_interp = "Date⏷") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
// iterate data.records
;(function(){
  var $$obj = data.records;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var record = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr class=\"this-is-a-table-row\"\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = record.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cp class=\"secret-invisible-id\"\u003E" + (pug_escape(null == (pug_interp = record._id) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv\u003E\u003Cp class=\"px-2\"\u003E" + (pug_escape(null == (pug_interp = record.summary) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = record.date) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var record = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr class=\"this-is-a-table-row\"\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = record.type) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cp class=\"secret-invisible-id\"\u003E" + (pug_escape(null == (pug_interp = record._id) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv\u003E\u003Cp class=\"px-2\"\u003E" + (pug_escape(null == (pug_interp = record.summary) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd id=\"container-fill-height\"\u003E\u003Cdiv class=\"centerElement\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = record.date) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);
}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;}