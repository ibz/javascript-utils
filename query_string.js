
function qs_str2obj(value) {
    // converts a string "key1=value1&key2=value2..." to an object {key1: val1, key2: val2, ...}

    var parts = value.split("&");
    var result = new Object;
    for (var i = 0; i < parts.length; i++) {
        var index = parts[i].indexOf("=");
        result[parts[i].substr(0, index)] = parts[i].substr(index + 1);
    }
    return result;
}

function qs_obj_update(value, add, remove) {
    // updates an object {key1: value1, key2: value2, ...} by adding or removing elements
    // add should be an object {keya1: valuea1, keya2: valuea2, ...}
    // remove (optional) should be an array ["keyr1", "keyr2"]

    remove = remove || [];

    var i;
    for (i in remove) {
        delete value[remove[i]];
    }
    for (i in add) {
        delete value[i];
    }
    for (i in add) {
        value[i] = add[i];
    }
}

function qs_obj2str(value) {
    // converts an object {key1: val1, key2: val2, ...} to a string "key1=value1&key2=value2..."

    var result = "";
    for (var i in value) {
        if (value[i]) { // only add values that evaluate to true
            if (result != "") {
                result += "&";
            }
            result += i + "=" + value[i];
        }
    }
    return result;
}

function qs_parse(separator) {
    var parts = window.location.href.split(separator, 2);

    return parts.length == 2 ? qs_str2obj(parts[1]) : new Object;
}

function qs_parse_server() {
    // parse an url of the form "http://example.com/some-resource/?key1=value1&key2=value2..." to an object {key1: val1, key2: val2, ...}

    return qs_parse("?");
}

function qs_parse_client() {
    // parse an url of the form "http://example.com/some-resource/#key1=value1&key2=value2..." to an object {key1: val1, key2: val2, ...}

    return qs_parse("#");
}

function qs_update(add, remove, separator) {
    var href = window.location.href;
    var prefix, qs;
    var index = href.indexOf(separator);
    if (index != -1) {
        prefix = href.substr(0, index);
        qs = qs_str2obj(href.substr(index + 1));
        qs_obj_update(qs, add, remove);
    } else {
        prefix = href;
        qs = add;
    }

    window.location.href = prefix + separator + qs_obj2str(qs);
}

function qs_update_server(add, remove) {
    // update an url of the form "http://example.com/some-resource/?key1=value1&key2=value2..." by adding or removing parameters after the "?"

    qs_update(add, remove, "?");
}

function qs_update_client(add, remove) {
    // update an url of the form "http://example.com/some-resource/#key1=value1&key2=value2..." by adding or removing parameters after the "#"

    qs_update(add, remove, "#");
}
