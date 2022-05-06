var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
var findEx = /[&<>"']/g;
export default function xssEscape(markup) {
    return markup.replace(findEx, function (match) { return htmlEscapes[match]; });
}
