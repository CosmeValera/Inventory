function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function insertUpdateInstrument(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (instrument) {pug_html = pug_html + "\u003Cdiv class=\"modal-header\" id=\"container-fill-height\"\u003E\u003Ch2 class=\"my-0\"\u003E" + (pug_escape(null == (pug_interp = "UPDATE:") ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cspan class=\"close item-upper-right px-4 py-3\"\u003E" + (pug_escape(null == (pug_interp = "×") ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body\"\u003E\u003Cp class=\"d-none modal-invisible-id\"\u003E" + (pug_escape(null == (pug_interp = instrument._id) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Csection class=\"my-1 mx-5 row\" id=\"my-form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Instrument*:") ? "" : pug_interp)) + "\u003Cselect class=\"form-control\" id=\"selectName\" name=\"name\"\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Violin") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Guitar") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Piano") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Flute") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Clarinet") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Saxophone") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Horn") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Trumpet") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Tuba") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Snare Drum") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Conga") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Battery") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Type*:") ? "" : pug_interp)) + "\u003Cselect class=\"form-control\" id=\"selectType\" name=\"type\"\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Wind") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "String") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Percussion") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Subtype:") ? "" : pug_interp)) + "\u003Cselect class=\"form-control\" id=\"selectSubtype\" name=\"subtype\"\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Wood") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003Coption\u003E" + (pug_escape(null == (pug_interp = "Brass") ? "" : pug_interp)) + "\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Sonority*:") ? "" : pug_interp)) + "\u003Cinput" + (" class=\"custom-range pt-3 custom-range-danger\""+" type=\"range\" min=\"0\" max=\"100\" step=\"10\" id=\"inputSonority\" name=\"sonority\""+pug_attr("value", instrument.sonority, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Price*:") ? "" : pug_interp)) + "\u003Cinput" + (" class=\"form-control\""+" type=\"number\" id=\"inputPrice\" name=\"price\" min=\"0\" max=\"99999\" placeholder=\"$1500\""+pug_attr("value", instrument.price, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cstrong class=\"my-1 d-flex justify-content-center me-2\"\u003E\u003C\u002Fstrong\u003E" + (pug_escape(null == (pug_interp = "Summary:") ? "" : pug_interp)) + "\u003Cinput" + (" class=\"form-control\""+" type=\"text\" id=\"inputSummary\" name=\"summary\" maxLength=\"256\" placeholder=\"Instrument's description\""+pug_attr("value", instrument.summary, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E \u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ca class=\"link-as-button-orange cancel-update-button m-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Cancel") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex justify-content-center\"\u003E\u003Ca class=\"link-as-button-green accept-update-button m-2\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = "Accept") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E";}.call(this,"instrument" in locals_for_with?locals_for_with.instrument:typeof instrument!=="undefined"?instrument:undefined));;return pug_html;}