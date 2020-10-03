var escaped_one_to_xml_special_map = {
    '&amp;': '&',
    '&quot;': '"',
    '&#039;': '\'',
    '&ldquo;': '“',
    '&rdquo' : '”',
    '&cent;' : '¢',
    '&pound;' : '£',
    '&sect;' : '§',
    '&copy;' : '©',
    '&laquo;' : '«',
    '&raquo;' : '»',
    '&reg;' : '®',
    '&deg;' : '°',
    '&plusmn;' : '±',
    '&para;' : '¶',
    '&middot;' : '·',
    '&frac12' : '½',
    '&ndash;' : '–',
    '&mdash;' : '—',
    '&sbquo;' : '‚',
    '&lsquo' : '‘',
    '&rsquo;' : '’',
    '&bdquo;' : '„',
    '&dagger;' : '†',
    '&Dagger;' : '‡',
    '&bull;' : '•',
    '&hellip;' : '…',
    '&prime;' : '′',
    '&Prime;' : '″',
    '&euro;' : '€',
    '&trade;' : '™',
    '&asymp;' : '≈',
    '&ne;' : '≠',
    '&le;' : '≤',
    '&ge;' : '≥',
    '&lt;' : '<',
    '&gt;' : '>'
};


function decode(string) {
    return string.replace(/(&quot;|&lt;|&gt;|&amp;|&#039;|&lqduo|&rqduo|&cent;|&pound;|&sect;|&copy;|&laquo;|&raquo;|&reg;|&deg;|&plusmn;|&para;|&middot;|&frac12;|&ndash;|&mdash;|&sbquo;|&lsquo;|&rsquo;|&bdquo;|&dagger;|&Dagger;|&bull;|&hrllip;|&prime;|&Prime;|&euro;|&trade;|&ne;|&le;|&ge;|&lt;|&gt;)/g,
        function(str, item) {
            return escaped_one_to_xml_special_map[item];
    });
}

export default decode