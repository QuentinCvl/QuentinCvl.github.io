/**
 * ===================================================================
 * javascript plugins
 *
 * -------------------------------------------------------------------
 */

/*!
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi

Use:
===
$('#form_id').ajaxchimp(options);

- Form should have one <input> element with attribute 'type=email'
- Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
- All options are optional.

Options:
=======
options = {
    language: 'en',
    callback: callbackFunction,
    url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
}

Notes:
=====
To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
*/
(function ($) {
    "use strict";
    $.ajaxChimp = {
        responses: {
            "We have sent you a confirmation email": 0,
            "Please enter a value": 1,
            "An email address must contain a single @": 2,
            "The domain portion of the email address is invalid (the portion after the @: )": 3,
            "The username portion of the email address is invalid (the portion before the @: )": 4,
            "This email address looks fake or invalid. Please enter a real email address": 5
        }, translations: {en: null}, init: function (selector, options) {
            $(selector).ajaxChimp(options)
        }
    };
    $.fn.ajaxChimp = function (options) {
        $(this).each(function (i, elem) {
            var form = $(elem);
            var email = form.find("input[type=email]");
            var label = form.find("label[for=" + email.attr("id") + "]");
            var settings = $.extend({url: form.attr("action"), language: "en"}, options);
            var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            form.attr("novalidate", "true");
            email.attr("name", "EMAIL");
            form.submit(function () {
                var msg;

                function successCallback(resp) {
                    if (resp.result === "success") {
                        msg = "We have sent you a confirmation email";
                        label.removeClass("error").addClass("valid");
                        email.removeClass("error").addClass("valid")
                    } else {
                        email.removeClass("valid").addClass("error");
                        label.removeClass("valid").addClass("error");
                        var index = -1;
                        try {
                            var parts = resp.msg.split(" - ", 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1]
                                } else {
                                    index = -1;
                                    msg = resp.msg
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg
                        }
                    }
                    if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
                        msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
                    }
                    label.html(msg);
                    label.show(2e3);
                    if (settings.callback) {
                        settings.callback(resp)
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value
                });
                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: "jsonp",
                    error: function (resp, text) {
                        console.log("mailchimp ajax submit error: " + text)
                    }
                });
                var submitMsg = "Submitting...";
                if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) {
                    submitMsg = $.ajaxChimp.translations[settings.language]["submit"]
                }
                label.html(submitMsg).show(2e3);
                return false
            })
        });
        return this
    }
})(jQuery);


/* jshint browser:true
 * !
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
!function (a) {
    "use strict";
    a.fn.fitVids = function (b) {
        var c = {customSelector: null, ignore: null};
        if (!document.getElementById("fit-vids-style")) {
            var d = document.head || document.getElementsByTagName("head")[0],
                e = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                f = document.createElement("div");
            f.innerHTML = '<p>x</p><style id="fit-vids-style">' + e + "</style>", d.appendChild(f.childNodes[1])
        }
        return b && a.extend(c, b), this.each(function () {
            var b = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            c.customSelector && b.push(c.customSelector);
            var d = ".fitvidsignore";
            c.ignore && (d = d + ", " + c.ignore);
            var e = a(this).find(b.join(","));
            e = e.not("object object"), e = e.not(d), e.each(function (b) {
                var c = a(this);
                if (!(c.parents(d).length > 0 || "embed" === this.tagName.toLowerCase() && c.parent("object").length || c.parent(".fluid-width-video-wrapper").length)) {
                    c.css("height") || c.css("width") || !isNaN(c.attr("height")) && !isNaN(c.attr("width")) || (c.attr("height", 9), c.attr("width", 16));
                    var e = "object" === this.tagName.toLowerCase() || c.attr("height") && !isNaN(parseInt(c.attr("height"), 10)) ? parseInt(c.attr("height"), 10) : c.height(),
                        f = isNaN(parseInt(c.attr("width"), 10)) ? c.width() : parseInt(c.attr("width"), 10), g = e / f;
                    if (!c.attr("id")) {
                        var h = "fitvid" + b;
                        c.attr("id", h)
                    }
                    c.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * g + "%"), c.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);


/* HTML5 Placeholder jQuery Plugin - v2.1.2
 * Copyright (c)2015 Mathias Bynens
 * 2015-06-09
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function (a) {
    function b(b) {
        var c = {}, d = /^jQuery\d+$/;
        return a.each(b.attributes, function (a, b) {
            b.specified && !d.test(b.name) && (c[b.name] = b.value)
        }), c
    }

    function c(b, c) {
        var d = this, f = a(d);
        if (d.value == f.attr("placeholder") && f.hasClass(m.customClass)) if (f.data("placeholder-password")) {
            if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c;
            f.focus()
        } else d.value = "", f.removeClass(m.customClass), d == e() && d.select()
    }

    function d() {
        var d, e = this, f = a(e), g = this.id;
        if ("" === e.value) {
            if ("password" === e.type) {
                if (!f.data("placeholder-textinput")) {
                    try {
                        d = f.clone().prop({type: "text"})
                    } catch (h) {
                        d = a("<input>").attr(a.extend(b(this), {type: "text"}))
                    }
                    d.removeAttr("name").data({
                        "placeholder-password": f,
                        "placeholder-id": g
                    }).bind("focus.placeholder", c), f.data({"placeholder-textinput": d, "placeholder-id": g}).before(d)
                }
                f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show()
            }
            f.addClass(m.customClass), f[0].value = f.attr("placeholder")
        } else f.removeClass(m.customClass)
    }

    function e() {
        try {
            return document.activeElement
        } catch (a) {
        }
    }

    var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
        i = "placeholder" in document.createElement("input") && !h,
        j = "placeholder" in document.createElement("textarea") && !h, k = a.valHooks, l = a.propHooks;
    if (i && j) g = a.fn.placeholder = function () {
        return this
    }, g.input = g.textarea = !0; else {
        var m = {};
        g = a.fn.placeholder = function (b) {
            var e = {customClass: "placeholder"};
            m = a.extend({}, e, b);
            var f = this;
            return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({
                "focus.placeholder": c,
                "blur.placeholder": d
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f
        }, g.input = i, g.textarea = j, f = {
            get: function (b) {
                var c = a(b), d = c.data("placeholder-password");
                return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value
            }, set: function (b, f) {
                var g = a(b), h = g.data("placeholder-password");
                return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f
            }
        }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function () {
            a(document).delegate("form", "submit.placeholder", function () {
                var b = a("." + m.customClass, this).each(c);
                setTimeout(function () {
                    b.each(d)
                }, 10)
            })
        }), a(window).bind("beforeunload.placeholder", function () {
            a("." + m.customClass).each(function () {
                this.value = ""
            })
        })
    }
});


/*!
 * Masonry PACKAGED v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, r, a) {
        function h(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function (t, h) {
                var u = a.data(h, i);
                if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = u[e];
                if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
                var l = d.apply(u, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
            })
        }

        a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return h(this, t, e)
            }
            return u(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var o = Array.prototype.slice, r = t.console, s = "undefined" == typeof r ? function () {
    } : function (t) {
        r.error(t)
    };
    return n(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o], s = n && n[r];
                s && (this.off(t, r), delete n[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; u > e; e++) {
            var i = h[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e)
        }
    }

    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                var c = h[l], f = r[c], m = parseFloat(f);
                a[c] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom,
                y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, E = d && s,
                b = t(r.width);
            b !== !1 && (a.width = b + (E ? 0 : p + _));
            var x = t(r.height);
            return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
        }
    }

    var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = h.length, d = !1;
    return r
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i], o = n + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    }, i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "object" == typeof t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
            }
        }), o
    }, i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e], o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments, r = this;
            this[o] = setTimeout(function () {
                n.apply(r, e), delete r[o]
            }, i || 100)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, o) {
        i.docReady(function () {
            var r = i.toDashed(o), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"),
                h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)),
                d = s + "-options", l = t.jQuery;
            u.forEach(function (t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (a) {
                    return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + a))
                }
                var h = new e(t, i);
                l && l.data(t, o, h)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        h = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[s], u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        }, d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function () {
        this.size = e(this.element)
    }, d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var n = u[i] || i;
            e[n] = t[i]
        }
    }, d.getPosition = function () {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"],
            r = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
            a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a
    }, d.layoutPosition = function () {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right",
            s = i ? "right" : "left", a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = "";
        var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top",
            l = this.position.y + t[h];
        e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10),
            s = o === this.position.x && r === this.position.y;
        if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i, h = e - n, u = {};
        u.transform = this.getTranslate(a, h), this.transition({
            to: u,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(h, this, !1)
        }
    }, d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var c = {"-webkit-transform": "transform"};
    d.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn, n = c[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var f = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
    return d.removeTransitionStyles = function () {
        this.css(f)
    }, d.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, d.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
    "use strict";

    function r(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, c[o] = this, this._create();
        var r = this._getOption("initLayout");
        r && this.layout()
    }

    function s(t) {
        function e() {
            t.apply(this, arguments)
        }

        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o
    }

    var h = t.console, u = t.jQuery, d = function () {
    }, l = 0, c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"},
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function (t) {
        n.extend(this.options, t)
    }, f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, f.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, f._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = e[o], s = new i(r, this);
            n.push(s)
        }
        return n
    }, f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function () {
        this.getSize()
    }, f.getSize = function () {
        this.size = i(this.element)
    }, f._getMeasurement = function (t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, f._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, f._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, f._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function () {
        this.resizeContainer()
    }, f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, f._emitCompleteOnItems = function (t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            s++, s == r && i()
        }

        var o = this, r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
            e.once(t, n)
        })
    }, f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
            var o = u.Event(e);
            o.type = t, this.$element.trigger(o, i)
        } else this.$element.trigger(t, i)
    }, f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, f.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, f._find = function (t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, f._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, f._manageStamp = d, f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        };
        return r
    }, f.handleEvent = n.handleEvent, f.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function () {
        this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function () {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, f.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, f.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, f.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e]
    }, r.create = function (t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var m = {ms: 1, s: 1e3};
    return r.Item = o, r
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n,
            a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1)
    }, n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
        this.containerWidth = n && n.innerWidth
    }, n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
            x: this.columnWidth * r.col,
            y: r.y
        }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;
        return s
    }, n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
        return {col: e.indexOf(i), y: i}
    }, n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
        return e
    }, n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols, n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
    }, n._manageStamp = function (t) {
        var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), r = o ? n.left : n.right,
            s = r + i.outerWidth, a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {height: this.maxY};
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
});


/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o], s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function () {
        delete this._events, delete this._onceEvents
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var h = e.jQuery, a = e.console, d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {1: !0, 9: !0, 11: !0};
    return o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
            var o = n && n[2];
            o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
        }
    }, o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function () {
        function e(e, i, n) {
            setTimeout(function () {
                t.progress(e, i, n)
            })
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});


/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    var b = window.Slick || {};
    b = function () {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
        }

        var b = 0;
        return c
    }(), b.prototype.activateADA = function () {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({height: b}, a.options.speed)
        }
    }, b.prototype.animateSlide = function (b, c) {
        var d = {}, e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({left: b}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({top: b}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({animStart: e.currentLeft}).animate({animStart: b}, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function (a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function () {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function () {
        var b = this, c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function (b) {
        var c = this, d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function () {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function (a) {
        var b = this, c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function () {
        var a = this, b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function () {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function () {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function () {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function (b, c) {
        var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function (b, c) {
        var f, g, h, d = this, e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case"previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case"next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case"index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function (a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) {
            if (a < c[e]) {
                a = d;
                break
            }
            d = c[e]
        }
        return a
    }, b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function () {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function () {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function (a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function (a) {
        var b = this, c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({zIndex: c.options.zIndex}), c.$slides.eq(a).animate({opacity: 1}, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function () {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function (a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function () {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function () {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function () {
        var a = this, b = 0, c = 0, d = 0;
        if (a.options.infinite === !0) for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else if (a.options.asNavFor) for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function (a) {
        var c, d, f, b = this, e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function () {
        var e, a = this, b = 0, c = 0, d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function () {
        return this
    }, b.prototype.getSlideCount = function () {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
        var c = this;
        c.changeSlide({data: {message: "index", index: parseInt(a)}}, b)
    }, b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function () {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            a(this).attr({role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c})
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, a.changeSlide))
    }, b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {message: "index"}, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function () {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {action: "start"}, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {action: "move"}, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {action: "end"}, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({data: {message: b.options.rtl === !0 ? "next" : "previous"}}) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({data: {message: b.options.rtl === !0 ? "previous" : "next"}}))
    }, b.prototype.lazyLoad = function () {
        function g(c) {
            a("img[data-lazy]", c).each(function () {
                var c = a(this), d = a(this).attr("data-lazy"), e = document.createElement("img");
                e.onload = function () {
                    c.animate({opacity: 0}, 100, function () {
                        c.attr("src", d).animate({opacity: 1}, 200, function () {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }), b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }, e.onerror = function () {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
                }, e.src = d
            })
        }

        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(), a.$slideTrack.css({opacity: 1}), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function () {
        var a = this;
        a.changeSlide({data: {message: "next"}})
    }, b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function () {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function () {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function (a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function () {
        var a = this;
        a.changeSlide({data: {message: "previous"}})
    }, b.prototype.preventDefault = function (a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function (b) {
        b = b || 1;
        var e, f, g, c = this, d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
        }, g.onerror = function () {
            3 > b ? setTimeout(function () {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
        }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function (b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {currentSlide: d}), c.init(), b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function () {
        var c, d, e, b = this, f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
            }
            b.breakpoints.sort(function (a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function () {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function (a) {
        var d, e, b = this, c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function () {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({padding: "0px " + a.options.centerPadding}) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({padding: a.options.centerPadding + " 0px"})), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function () {
        var c, b = this;
        b.$slides.each(function (d, e) {
            c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0})
        }), b.$slides.eq(b.currentSlide).css({zIndex: b.options.zIndex - 1, opacity: 1})
    }, b.prototype.setHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function () {
        var c, d, e, f, h, b = this, g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f; else if ("multiple" === h) a.each(e, function (a, c) {
            b.options[a] = c
        }); else if ("responsive" === h) for (d in f) if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]]; else {
            for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
            b.options.responsive.push(f[d])
        }
        g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function () {
        var a = this, b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function (a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function () {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function (a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function (b) {
        var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function (a, b, c) {
        var d, e, f, g, j, h = null, i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
            i.postSlide(e)
        })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }, b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function () {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function (a) {
        var c, d, b = this;
        if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
                case"left":
                case"down":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function (a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case"start":
                b.swipeStart(a);
                break;
            case"move":
                b.swipeMove(a);
                break;
            case"end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function (a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function (a) {
        var c, b = this;
        return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function () {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function () {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function () {
        var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length;
        for (f = 0; e > f; f++) if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});


/*
 * google code-prettify
 */
!function () {
    var q = null;
    window.PR_SHOULD_USE_CONTINUATION = !0;
    (function () {
        function S(a) {
            function d(e) {
                var b = e.charCodeAt(0);
                if (b !== 92) return b;
                var a = e.charAt(1);
                return (b = r[a]) ? b : "0" <= a && a <= "7" ? parseInt(e.substring(1), 8) : a === "u" || a === "x" ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
            }

            function g(e) {
                if (e < 32) return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
                e = String.fromCharCode(e);
                return e === "\\" || e === "-" || e === "]" || e === "^" ? "\\" + e : e
            }

            function b(e) {
                var b = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),
                    e = [], a =
                        b[0] === "^", c = ["["];
                a && c.push("^");
                for (var a = a ? 1 : 0, f = b.length; a < f; ++a) {
                    var h = b[a];
                    if (/\\[bdsw]/i.test(h)) c.push(h); else {
                        var h = d(h), l;
                        a + 2 < f && "-" === b[a + 1] ? (l = d(b[a + 2]), a += 2) : l = h;
                        e.push([h, l]);
                        l < 65 || h > 122 || (l < 65 || h > 90 || e.push([Math.max(65, h) | 32, Math.min(l, 90) | 32]), l < 97 || h > 122 || e.push([Math.max(97, h) & -33, Math.min(l, 122) & -33]))
                    }
                }
                e.sort(function (e, a) {
                    return e[0] - a[0] || a[1] - e[1]
                });
                b = [];
                f = [];
                for (a = 0; a < e.length; ++a) h = e[a], h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : b.push(f = h);
                for (a = 0; a < b.length; ++a) h = b[a], c.push(g(h[0])),
                h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"), c.push(g(h[1])));
                c.push("]");
                return c.join("")
            }

            function s(e) {
                for (var a = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), c = a.length, d = [], f = 0, h = 0; f < c; ++f) {
                    var l = a[f];
                    l === "(" ? ++h : "\\" === l.charAt(0) && (l = +l.substring(1)) && (l <= h ? d[l] = -1 : a[f] = g(l))
                }
                for (f = 1; f < d.length; ++f) -1 === d[f] && (d[f] = ++x);
                for (h = f = 0; f < c; ++f) l = a[f], l === "(" ? (++h, d[h] || (a[f] = "(?:")) : "\\" === l.charAt(0) && (l = +l.substring(1)) && l <= h &&
                    (a[f] = "\\" + d[l]);
                for (f = 0; f < c; ++f) "^" === a[f] && "^" !== a[f + 1] && (a[f] = "");
                if (e.ignoreCase && m) for (f = 0; f < c; ++f) l = a[f], e = l.charAt(0), l.length >= 2 && e === "[" ? a[f] = b(l) : e !== "\\" && (a[f] = l.replace(/[A-Za-z]/g, function (a) {
                    a = a.charCodeAt(0);
                    return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                }));
                return a.join("")
            }

            for (var x = 0, m = !1, j = !1, k = 0, c = a.length; k < c; ++k) {
                var i = a[k];
                if (i.ignoreCase) j = !0; else if (/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    m = !0;
                    j = !1;
                    break
                }
            }
            for (var r = {
                b: 8, t: 9, n: 10, v: 11,
                f: 12, r: 13
            }, n = [], k = 0, c = a.length; k < c; ++k) {
                i = a[k];
                if (i.global || i.multiline) throw Error("" + i);
                n.push("(?:" + s(i) + ")")
            }
            return RegExp(n.join("|"), j ? "gi" : "g")
        }

        function T(a, d) {
            function g(a) {
                var c = a.nodeType;
                if (c == 1) {
                    if (!b.test(a.className)) {
                        for (c = a.firstChild; c; c = c.nextSibling) g(c);
                        c = a.nodeName.toLowerCase();
                        if ("br" === c || "li" === c) s[j] = "\n", m[j << 1] = x++, m[j++ << 1 | 1] = a
                    }
                } else if (c == 3 || c == 4) c = a.nodeValue, c.length && (c = d ? c.replace(/\r\n?/g, "\n") : c.replace(/[\t\n\r ]+/g, " "), s[j] = c, m[j << 1] = x, x += c.length, m[j++ << 1 | 1] =
                    a)
            }

            var b = /(?:^|\s)nocode(?:\s|$)/, s = [], x = 0, m = [], j = 0;
            g(a);
            return {a: s.join("").replace(/\n$/, ""), d: m}
        }

        function H(a, d, g, b) {
            d && (a = {a: d, e: a}, g(a), b.push.apply(b, a.g))
        }

        function U(a) {
            for (var d = void 0, g = a.firstChild; g; g = g.nextSibling) var b = g.nodeType, d = b === 1 ? d ? a : g : b === 3 ? V.test(g.nodeValue) ? a : d : d;
            return d === a ? void 0 : d
        }

        function C(a, d) {
            function g(a) {
                for (var j = a.e, k = [j, "pln"], c = 0, i = a.a.match(s) || [], r = {}, n = 0, e = i.length; n < e; ++n) {
                    var z = i[n], w = r[z], t = void 0, f;
                    if (typeof w === "string") f = !1; else {
                        var h = b[z.charAt(0)];
                        if (h) t = z.match(h[1]), w = h[0]; else {
                            for (f = 0; f < x; ++f) if (h = d[f], t = z.match(h[1])) {
                                w = h[0];
                                break
                            }
                            t || (w = "pln")
                        }
                        if ((f = w.length >= 5 && "lang-" === w.substring(0, 5)) && !(t && typeof t[1] === "string")) f = !1, w = "src";
                        f || (r[z] = w)
                    }
                    h = c;
                    c += z.length;
                    if (f) {
                        f = t[1];
                        var l = z.indexOf(f), B = l + f.length;
                        t[2] && (B = z.length - t[2].length, l = B - f.length);
                        w = w.substring(5);
                        H(j + h, z.substring(0, l), g, k);
                        H(j + h + l, f, I(w, f), k);
                        H(j + h + B, z.substring(B), g, k)
                    } else k.push(j + h, w)
                }
                a.g = k
            }

            var b = {}, s;
            (function () {
                for (var g = a.concat(d), j = [], k = {}, c = 0, i = g.length; c < i; ++c) {
                    var r =
                        g[c], n = r[3];
                    if (n) for (var e = n.length; --e >= 0;) b[n.charAt(e)] = r;
                    r = r[1];
                    n = "" + r;
                    k.hasOwnProperty(n) || (j.push(r), k[n] = q)
                }
                j.push(/[\S\s]/);
                s = S(j)
            })();
            var x = d.length;
            return g
        }

        function v(a) {
            var d = [], g = [];
            a.tripleQuotedStrings ? d.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? d.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
                q, "'\"`"]) : d.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
            a.verbatimStrings && g.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
            var b = a.hashComments;
            b && (a.cStyleComments ? (b > 1 ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : d.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), g.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, q])) : d.push(["com",
                /^#[^\n\r]*/, q, "#"]));
            a.cStyleComments && (g.push(["com", /^\/\/[^\n\r]*/, q]), g.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
            if (b = a.regexLiterals) {
                var s = (b = b > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
                g.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + b + "])(?:[^/\\x5B\\x5C" + b + "]|\\x5C" + s + "|\\x5B(?:[^\\x5C\\x5D" + b + "]|\\x5C" +
                    s + ")*(?:\\x5D|$))+/") + ")")])
            }
            (b = a.types) && g.push(["typ", b]);
            b = ("" + a.keywords).replace(/^ | $/g, "");
            b.length && g.push(["kwd", RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"), q]);
            d.push(["pln", /^\s+/, q, " \r\n\t\u00a0"]);
            b = "^.[^\\s\\w.$@'\"`/\\\\]*";
            a.regexLiterals && (b += "(?!s*/)");
            g.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/,
                q], ["pun", RegExp(b), q]);
            return C(d, g)
        }

        function J(a, d, g) {
            function b(a) {
                var c = a.nodeType;
                if (c == 1 && !x.test(a.className)) if ("br" === a.nodeName) s(a), a.parentNode && a.parentNode.removeChild(a); else for (a = a.firstChild; a; a = a.nextSibling) b(a); else if ((c == 3 || c == 4) && g) {
                    var d = a.nodeValue, i = d.match(m);
                    if (i) c = d.substring(0, i.index), a.nodeValue = c, (d = d.substring(i.index + i[0].length)) && a.parentNode.insertBefore(j.createTextNode(d), a.nextSibling), s(a), c || a.parentNode.removeChild(a)
                }
            }

            function s(a) {
                function b(a, c) {
                    var d =
                        c ? a.cloneNode(!1) : a, e = a.parentNode;
                    if (e) {
                        var e = b(e, 1), g = a.nextSibling;
                        e.appendChild(d);
                        for (var i = g; i; i = g) g = i.nextSibling, e.appendChild(i)
                    }
                    return d
                }

                for (; !a.nextSibling;) if (a = a.parentNode, !a) return;
                for (var a = b(a.nextSibling, 0), d; (d = a.parentNode) && d.nodeType === 1;) a = d;
                c.push(a)
            }

            for (var x = /(?:^|\s)nocode(?:\s|$)/, m = /\r\n?|\n/, j = a.ownerDocument, k = j.createElement("li"); a.firstChild;) k.appendChild(a.firstChild);
            for (var c = [k], i = 0; i < c.length; ++i) b(c[i]);
            d === (d | 0) && c[0].setAttribute("value", d);
            var r = j.createElement("ol");
            r.className = "linenums";
            for (var d = Math.max(0, d - 1 | 0) || 0, i = 0, n = c.length; i < n; ++i) k = c[i], k.className = "L" + (i + d) % 10, k.firstChild || k.appendChild(j.createTextNode("\u00a0")), r.appendChild(k);
            a.appendChild(r)
        }

        function p(a, d) {
            for (var g = d.length; --g >= 0;) {
                var b = d[g];
                F.hasOwnProperty(b) ? D.console && console.warn("cannot override language handler %s", b) : F[b] = a
            }
        }

        function I(a, d) {
            if (!a || !F.hasOwnProperty(a)) a = /^\s*</.test(d) ? "default-markup" : "default-code";
            return F[a]
        }

        function K(a) {
            var d = a.h;
            try {
                var g = T(a.c, a.i), b = g.a;
                a.a = b;
                a.d = g.d;
                a.e = 0;
                I(d, b)(a);
                var s = /\bMSIE\s(\d+)/.exec(navigator.userAgent), s = s && +s[1] <= 8, d = /\n/g, x = a.a,
                    m = x.length, g = 0, j = a.d, k = j.length, b = 0, c = a.g, i = c.length, r = 0;
                c[i] = m;
                var n, e;
                for (e = n = 0; e < i;) c[e] !== c[e + 2] ? (c[n++] = c[e++], c[n++] = c[e++]) : e += 2;
                i = n;
                for (e = n = 0; e < i;) {
                    for (var p = c[e], w = c[e + 1], t = e + 2; t + 2 <= i && c[t + 1] === w;) t += 2;
                    c[n++] = p;
                    c[n++] = w;
                    e = t
                }
                c.length = n;
                var f = a.c, h;
                if (f) h = f.style.display, f.style.display = "none";
                try {
                    for (; b < k;) {
                        var l = j[b + 2] || m, B = c[r + 2] || m, t = Math.min(l, B), A = j[b + 1], G;
                        if (A.nodeType !== 1 && (G = x.substring(g,
                            t))) {
                            s && (G = G.replace(d, "\r"));
                            A.nodeValue = G;
                            var L = A.ownerDocument, o = L.createElement("span");
                            o.className = c[r + 1];
                            var v = A.parentNode;
                            v.replaceChild(o, A);
                            o.appendChild(A);
                            g < l && (j[b + 1] = A = L.createTextNode(x.substring(t, l)), v.insertBefore(A, o.nextSibling))
                        }
                        g = t;
                        g >= l && (b += 2);
                        g >= B && (r += 2)
                    }
                } finally {
                    if (f) f.style.display = h
                }
            } catch (u) {
                D.console && console.log(u && u.stack || u)
            }
        }

        var D = window, y = ["break,continue,do,else,for,if,return,while"],
            E = [[y, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
                "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],
            M = [E, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
            N = [E, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
            O = [N, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],
            E = [E, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
            P = [y, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
            Q = [y, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
            W = [y, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],
            y = [y, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
            R = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
            V = /\S/, X = v({
                keywords: [M, O, E, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", P, Q, y],
                hashComments: !0,
                cStyleComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }), F = {};
        p(X, ["default-code"]);
        p(C([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\S\s]*?(?:--\>|$)/], ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/], ["lang-", /^<%([\S\s]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-",
            /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
        p(C([["pln", /^\s+/, q, " \t\r\n"], ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/], ["pun", /^[/<->]+/],
            ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i], ["lang-js", /^on\w+\s*=\s*'([^']+)'/i], ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i], ["lang-css", /^style\s*=\s*"([^"]+)"/i], ["lang-css", /^style\s*=\s*'([^']+)'/i], ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]]), ["in.tag"]);
        p(C([], [["atv", /^[\S\s]+/]]), ["uq.val"]);
        p(v({keywords: M, hashComments: !0, cStyleComments: !0, types: R}), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
        p(v({keywords: "null,true,false"}), ["json"]);
        p(v({keywords: O, hashComments: !0, cStyleComments: !0, verbatimStrings: !0, types: R}),
            ["cs"]);
        p(v({keywords: N, cStyleComments: !0}), ["java"]);
        p(v({keywords: y, hashComments: !0, multiLineStrings: !0}), ["bash", "bsh", "csh", "sh"]);
        p(v({keywords: P, hashComments: !0, multiLineStrings: !0, tripleQuotedStrings: !0}), ["cv", "py", "python"]);
        p(v({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]);
        p(v({
            keywords: Q,
            hashComments: !0, multiLineStrings: !0, regexLiterals: !0
        }), ["rb", "ruby"]);
        p(v({keywords: E, cStyleComments: !0, regexLiterals: !0}), ["javascript", "js"]);
        p(v({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]);
        p(v({keywords: W, cStyleComments: !0, multilineStrings: !0}), ["rc", "rs", "rust"]);
        p(C([], [["str", /^[\S\s]+/]]), ["regex"]);
        var Y = D.PR = {
            createSimpleLexer: C,
            registerLangHandler: p,
            sourceDecorator: v,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ",
            prettyPrintOne: D.prettyPrintOne = function (a, d, g) {
                var b = document.createElement("div");
                b.innerHTML = "<pre>" + a + "</pre>";
                b = b.firstChild;
                g && J(b, g, !0);
                K({h: d, j: g, c: b, i: 1});
                return b.innerHTML
            },
            prettyPrint: D.prettyPrint = function (a, d) {
                function g() {
                    for (var b = D.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity; i < p.length && c.now() < b; i++) {
                        for (var d = p[i], j = h, k = d; k = k.previousSibling;) {
                            var m = k.nodeType, o = (m === 7 || m === 8) && k.nodeValue;
                            if (o ? !/^\??prettify\b/.test(o) : m !== 3 || /\S/.test(k.nodeValue)) break;
                            if (o) {
                                j = {};
                                o.replace(/\b(\w+)=([\w%+\-.:]+)/g, function (a, b, c) {
                                    j[b] = c
                                });
                                break
                            }
                        }
                        k = d.className;
                        if ((j !== h || e.test(k)) && !v.test(k)) {
                            m = !1;
                            for (o = d.parentNode; o; o = o.parentNode) if (f.test(o.tagName) &&
                                o.className && e.test(o.className)) {
                                m = !0;
                                break
                            }
                            if (!m) {
                                d.className += " prettyprinted";
                                m = j.lang;
                                if (!m) {
                                    var m = k.match(n), y;
                                    if (!m && (y = U(d)) && t.test(y.tagName)) m = y.className.match(n);
                                    m && (m = m[1])
                                }
                                if (w.test(d.tagName)) o = 1; else var o = d.currentStyle, u = s.defaultView,
                                    o = (o = o ? o.whiteSpace : u && u.getComputedStyle ? u.getComputedStyle(d, q).getPropertyValue("white-space") : 0) && "pre" === o.substring(0, 3);
                                u = j.linenums;
                                if (!(u = u === "true" || +u)) u = (u = k.match(/\blinenums\b(?::(\d+))?/)) ? u[1] && u[1].length ? +u[1] : !0 : !1;
                                u && J(d, u, o);
                                r =
                                    {h: m, c: d, j: u, i: o};
                                K(r)
                            }
                        }
                    }
                    i < p.length ? setTimeout(g, 250) : "function" === typeof a && a()
                }

                for (var b = d || document.body, s = b.ownerDocument || document, b = [b.getElementsByTagName("pre"), b.getElementsByTagName("code"), b.getElementsByTagName("xmp")], p = [], m = 0; m < b.length; ++m) for (var j = 0, k = b[m].length; j < k; ++j) p.push(b[m][j]);
                var b = q, c = Date;
                c.now || (c = {
                    now: function () {
                        return +new Date
                    }
                });
                var i = 0, r, n = /\blang(?:uage)?-([\w.]+)(?!\S)/, e = /\bprettyprint\b/, v = /\bprettyprinted\b/,
                    w = /pre|xmp/i, t = /^code$/i, f = /^(?:pre|code|xmp)$/i,
                    h = {};
                g()
            }
        };
        typeof define === "function" && define.amd && define("google-code-prettify", [], function () {
            return Y
        })
    })();
}()


/*!
 * AOS.js
 * https://michalsnik.github.io/aos/
 */

!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function () {
    return function (e) {
        function t(n) {
            if (o[n]) return o[n].exports;
            var i = o[n] = {exports: {}, id: n, loaded: !1};
            return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }

        var o = {};
        return t.m = e, t.c = o, t.p = "dist/", t(0)
    }([function (e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        var i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
                }
                return e
            }, a = o(1), r = (n(a), o(5)), c = n(r), u = o(6), s = n(u), d = o(7), f = n(d), l = o(8), m = n(l), p = o(9),
            b = n(p), v = o(10), g = n(v), y = o(13), w = n(y), h = [], k = !1, x = document.all && !window.atob, j = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            }, O = function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                return e && (k = !0), k ? (h = (0, g["default"])(h, j), (0, b["default"])(h, j.once), h) : void 0
            }, _ = function () {
                h = (0, w["default"])(), O()
            }, z = function () {
                h.forEach(function (e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            }, A = function (e) {
                return e === !0 || "mobile" === e && m["default"].mobile() || "phone" === e && m["default"].phone() || "tablet" === e && m["default"].tablet() || "function" == typeof e && e() === !0
            }, E = function (e) {
                return j = i(j, e), h = (0, w["default"])(), A(j.disable) || x ? z() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function () {
                    O(!0)
                }) : document.addEventListener(j.startEvent, function () {
                    O(!0)
                }), window.addEventListener("resize", (0, s["default"])(O, 50, !0)), window.addEventListener("orientationchange", (0, s["default"])(O, 50, !0)), window.addEventListener("scroll", (0, c["default"])(function () {
                    (0, b["default"])(h, j.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function (e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, s["default"])(_, 50, !0)
                }), (0, f["default"])("[data-aos]", _), h)
            };
        e.exports = {init: E, refresh: O, refreshHard: _}
    }, function (e, t) {
    }, , , , function (e, t, o) {
        "use strict";

        function n(e, t, o) {
            var n = !0, a = !0;
            if ("function" != typeof e) throw new TypeError(c);
            return i(o) && (n = "leading" in o ? !!o.leading : n, a = "trailing" in o ? !!o.trailing : a), r(e, t, {
                leading: n,
                maxWait: t,
                trailing: a
            })
        }

        function i(e) {
            var t = "undefined" == typeof e ? "undefined" : a(e);
            return !!e && ("object" == t || "function" == t)
        }

        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        }, r = o(6), c = "Expected a function";
        e.exports = n
    }, function (e, t) {
        "use strict";

        function o(e, t, o) {
            function n(t) {
                var o = b, n = v;
                return b = v = void 0, O = t, y = e.apply(n, o)
            }

            function a(e) {
                return O = e, w = setTimeout(d, t), _ ? n(e) : y
            }

            function r(e) {
                var o = e - h, n = e - O, i = t - o;
                return z ? x(i, g - n) : i
            }

            function u(e) {
                var o = e - h, n = e - O;
                return !h || o >= t || 0 > o || z && n >= g
            }

            function d() {
                var e = j();
                return u(e) ? f(e) : void (w = setTimeout(d, r(e)))
            }

            function f(e) {
                return clearTimeout(w), w = void 0, A && b ? n(e) : (b = v = void 0, y)
            }

            function l() {
                void 0 !== w && clearTimeout(w), h = O = 0, b = v = w = void 0
            }

            function m() {
                return void 0 === w ? y : f(j())
            }

            function p() {
                var e = j(), o = u(e);
                if (b = arguments, v = this, h = e, o) {
                    if (void 0 === w) return a(h);
                    if (z) return clearTimeout(w), w = setTimeout(d, t), n(h)
                }
                return void 0 === w && (w = setTimeout(d, t)), y
            }

            var b, v, g, y, w, h = 0, O = 0, _ = !1, z = !1, A = !0;
            if ("function" != typeof e) throw new TypeError(s);
            return t = c(t) || 0, i(o) && (_ = !!o.leading, z = "maxWait" in o, g = z ? k(c(o.maxWait) || 0, t) : g, A = "trailing" in o ? !!o.trailing : A), p.cancel = l, p.flush = m, p
        }

        function n(e) {
            var t = i(e) ? h.call(e) : "";
            return t == f || t == l
        }

        function i(e) {
            var t = "undefined" == typeof e ? "undefined" : u(e);
            return !!e && ("object" == t || "function" == t)
        }

        function a(e) {
            return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
        }

        function r(e) {
            return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || a(e) && h.call(e) == m
        }

        function c(e) {
            if ("number" == typeof e) return e;
            if (r(e)) return d;
            if (i(e)) {
                var t = n(e.valueOf) ? e.valueOf() : e;
                e = i(t) ? t + "" : t
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(p, "");
            var o = v.test(e);
            return o || g.test(e) ? y(e.slice(2), o ? 2 : 8) : b.test(e) ? d : +e
        }

        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            }, s = "Expected a function", d = NaN, f = "[object Function]", l = "[object GeneratorFunction]",
            m = "[object Symbol]", p = /^\s+|\s+$/g, b = /^[-+]0x[0-9a-f]+$/i, v = /^0b[01]+$/i, g = /^0o[0-7]+$/i,
            y = parseInt, w = Object.prototype, h = w.toString, k = Math.max, x = Math.min, j = Date.now;
        e.exports = o
    }, function (e, t) {
        "use strict";

        function o(e, t) {
            r.push({selector: e, fn: t}), !c && a && (c = new a(n), c.observe(i.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })), n()
        }

        function n() {
            for (var e, t, o = 0, n = r.length; n > o; o++) {
                e = r[o], t = i.querySelectorAll(e.selector);
                for (var a, c = 0, u = t.length; u > c; c++) a = t[c], a.ready || (a.ready = !0, e.fn.call(a, a))
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var i = window.document, a = window.MutationObserver || window.WebKitMutationObserver, r = [], c = void 0;
        t["default"] = o
    }, function (e, t) {
        "use strict";

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var n = function () {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(), i = function () {
            function e() {
                o(this, e)
            }

            return n(e, [{
                key: "phone", value: function () {
                    var e = !1;
                    return function (t) {
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                    }(navigator.userAgent || navigator.vendor || window.opera), e
                }
            }, {
                key: "mobile", value: function () {
                    var e = !1;
                    return function (t) {
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                    }(navigator.userAgent || navigator.vendor || window.opera), e
                }
            }, {
                key: "tablet", value: function () {
                    return this.mobile() && !this.phone()
                }
            }]), e
        }();
        t["default"] = new i
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function (e, t, o) {
            var n = e.node.getAttribute("data-aos-once");
            t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof n && ("false" === n || !o && "true" !== n) && e.node.classList.remove("aos-animate")
        }, n = function (e, t) {
            var n = window.pageYOffset, i = window.innerHeight;
            e.forEach(function (e, a) {
                o(e, i + n, t)
            })
        };
        t["default"] = n
    }, function (e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var i = o(11), a = n(i), r = function (e, t) {
            return e.forEach(function (e, o) {
                e.node.classList.add("aos-init"), e.position = (0, a["default"])(e.node, t.offset)
            }), e
        };
        t["default"] = r
    }, function (e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var i = o(12), a = n(i), r = function (e, t) {
            var o = 0, n = 0, i = window.innerHeight, r = {
                offset: e.getAttribute("data-aos-offset"),
                anchor: e.getAttribute("data-aos-anchor"),
                anchorPlacement: e.getAttribute("data-aos-anchor-placement")
            };
            switch (r.offset && !isNaN(r.offset) && (n = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), o = (0, a["default"])(e).top, r.anchorPlacement) {
                case"top-bottom":
                    break;
                case"center-bottom":
                    o += e.offsetHeight / 2;
                    break;
                case"bottom-bottom":
                    o += e.offsetHeight;
                    break;
                case"top-center":
                    o += i / 2;
                    break;
                case"bottom-center":
                    o += i / 2 + e.offsetHeight;
                    break;
                case"center-center":
                    o += i / 2 + e.offsetHeight / 2;
                    break;
                case"top-top":
                    o += i;
                    break;
                case"bottom-top":
                    o += e.offsetHeight + i;
                    break;
                case"center-top":
                    o += e.offsetHeight / 2 + i
            }
            return r.anchorPlacement || r.offset || isNaN(t) || (n = t), o + n
        };
        t["default"] = r
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function (e) {
            for (var t = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), o += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {top: o, left: t}
        };
        t["default"] = o
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function (e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, function (e, o) {
                t.push({node: e})
            }), t
        };
        t["default"] = o
    }])
});
//# sourceMappingURL=aos.js.map


/*! Lity - v1.6.6 - 2016-04-22
* http://sorgalla.com/lity/
* Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
!function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function (c) {
        return b(a, c)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = b(a, require("jquery")) : a.lity = b(a, a.jQuery || a.Zepto)
}("undefined" != typeof window ? window : this, function (a, b) {
    "use strict";

    function c() {
        o[p > 0 ? "addClass" : "removeClass"]("lity-active")
    }

    function d(a) {
        var c = b.Deferred();
        return w ? (a.one(w, c.resolve), setTimeout(c.resolve, 500)) : c.resolve(), c.promise()
    }

    function e(a, c, d) {
        if (1 === arguments.length) return b.extend({}, a);
        if ("string" == typeof c) {
            if ("undefined" == typeof d) return "undefined" == typeof a[c] ? null : a[c];
            a[c] = d
        } else b.extend(a, c);
        return this
    }

    function f(a) {
        for (var b, c = decodeURI(a).split("&"), d = {}, e = 0, f = c.length; f > e; e++) c[e] && (b = c[e].split("="), d[b[0]] = b[1]);
        return d
    }

    function g(a, c) {
        return a + (a.indexOf("?") > -1 ? "&" : "?") + b.param(c)
    }

    function h(a) {
        return b('<span class="lity-error"/>').append(a)
    }

    function i(a) {
        if (!q.test(a)) return !1;
        var c = b('<img src="' + a + '">'), d = b.Deferred(), e = function () {
            d.reject(h("Failed loading image"))
        };
        return c.on("load", function () {
            return 0 === this.naturalWidth ? e() : void d.resolve(c)
        }).on("error", e), d.promise()
    }

    function j(a) {
        var c;
        try {
            c = b(a)
        } catch (d) {
            return !1
        }
        if (!c.length) return !1;
        var e = b('<span style="display:none !important" class="lity-inline-placeholder"/>');
        return c.after(e).on("lity:ready", function (a, b) {
            b.one("lity:remove", function () {
                e.before(c.addClass("lity-hide")).remove()
            })
        })
    }

    function k(a) {
        var c, d = a;
        return c = r.exec(a), c && (d = g("https://www.youtube" + (c[2] || "") + ".com/embed/" + c[4], b.extend({autoplay: 1}, f(c[5] || "")))), c = s.exec(a), c && (d = g("https://player.vimeo.com/video/" + c[3], b.extend({autoplay: 1}, f(c[4] || "")))), c = t.exec(a), c && (d = g("https://www.google." + c[3] + "/maps?" + c[6], {output: c[6].indexOf("layer=c") > 0 ? "svembed" : "embed"})), '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + d + '"></iframe></div>'
    }

    function l(a) {
        function f(a) {
            27 === a.keyCode && k()
        }

        function g() {
            var a = m.documentElement.clientHeight ? m.documentElement.clientHeight : Math.round(n.height());
            q.css("max-height", Math.floor(a) + "px").trigger("lity:resize", [o])
        }

        function h(a, c) {
            o && (q = b(c), n.on("resize", g), g(), o.find(".lity-loader").each(function () {
                var a = b(this);
                d(a).always(function () {
                    a.remove()
                })
            }), o.removeClass("lity-loading").find(".lity-content").empty().append(q), q.removeClass("lity-hide").trigger("lity:ready", [o, a]), t.resolve())
        }

        function i(a, d, e, g) {
            t = b.Deferred(), p++, c(), o = b(e.template).addClass("lity-loading").appendTo("body"), e.esc && n.on("keyup", f), setTimeout(function () {
                o.addClass("lity-opened lity-" + a).on("click", "[data-lity-close]", function (a) {
                    b(a.target).is("[data-lity-close]") && k()
                }).trigger("lity:open", [o, g]), b.when(d).always(b.proxy(h, null, g))
            }, 0)
        }

        function j(a, c, d) {
            var e, f, g = b.extend({}, u, s);
            if (c = b.extend({}, v, r, c), c.handler && g[c.handler]) f = g[c.handler](a, l), e = c.handler; else {
                var h = {};
                b.each(["inline", "iframe"], function (a, b) {
                    g[b] && (h[b] = g[b]), delete g[b]
                });
                var j = function (b, c) {
                    return c ? (f = c(a, l), f ? (e = b, !1) : void 0) : !0
                };
                b.each(g, j), e || b.each(h, j)
            }
            return f && b.when(k()).done(b.proxy(i, null, e, f, c, d)), !!f
        }

        function k() {
            if (o) {
                var a = b.Deferred();
                return t.done(function () {
                    p--, c(), n.off("resize", g).off("keyup", f), q.trigger("lity:close", [o]), o.removeClass("lity-opened").addClass("lity-closed");
                    var b = o, e = q;
                    o = null, q = null, d(e.add(b)).always(function () {
                        e.trigger("lity:remove", [b]), b.remove(), a.resolve()
                    })
                }), a.promise()
            }
        }

        function l(a) {
            if (!a.preventDefault) return l.open(a);
            var c = b(this), d = c.data("lity-target") || c.attr("href") || c.attr("src");
            if (d) {
                var e = c.data("lity-options") || c.data("lity");
                j(d, e, c) && (c.blur(), a.preventDefault())
            }
        }

        var o, q, r = {}, s = {}, t = b.Deferred().resolve();
        return l.handlers = b.proxy(e, l, s), l.options = b.proxy(e, l, r), l.open = function (a, b, c) {
            return j(a, b, c), l
        }, l.close = function () {
            return k(), l
        }, l.options(a)
    }

    var m = a.document, n = b(a), o = b("html"), p = 0,
        q = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        r = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        s = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        t = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i, u = {image: i, inline: j, iframe: k}, v = {
            esc: !0,
            handler: null,
            template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'
        }, w = function () {
            var a = m.createElement("div"), b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var c in b) if (void 0 !== a.style[c]) return b[c];
            return !1
        }();
    return l.version = "1.6.6", l.handlers = b.proxy(e, l, u), l.options = b.proxy(e, l, v), b(m).on("click", "[data-lity]", l()), l
});


/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
!function e(t, n, o) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (r) return r(a, !0);
                var d = new Error("Cannot find module '" + a + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var u = n[a] = {exports: {}};
            t[a][0].call(u.exports, function (e) {
                var n = t[a][1][e];
                return i(n || e)
            }, u, u.exports, e, t, n, o)
        }
        return n[a].exports
    }

    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
    return i
}({
    1: [function (e, t, n) {
    }, {}], 2: [function (e, t, n) {
        (function (n) {
            var o, i = void 0 !== n ? n : "undefined" != typeof window ? window : {}, r = e(1);
            "undefined" != typeof document ? o = document : (o = i["__GLOBAL_DOCUMENT_CACHE@4"]) || (o = i["__GLOBAL_DOCUMENT_CACHE@4"] = r), t.exports = o
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {1: 1}], 3: [function (e, t, n) {
        (function (e) {
            var n;
            n = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}, t.exports = n
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 4: [function (e, t, n) {
        !function (e) {
            function n() {
            }

            function o(e, t) {
                return function () {
                    e.apply(t, arguments)
                }
            }

            function i(e) {
                if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof e) throw new TypeError("not a function");
                this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], u(e, this)
            }

            function r(e, t) {
                for (; 3 === e._state;) e = e._value;
                0 !== e._state ? (e._handled = !0, i._immediateFn(function () {
                    var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                    if (null !== n) {
                        var o;
                        try {
                            o = n(e._value)
                        } catch (e) {
                            return void s(t.promise, e)
                        }
                        a(t.promise, o)
                    } else (1 === e._state ? a : s)(t.promise, e._value)
                })) : e._deferreds.push(t)
            }

            function a(e, t) {
                try {
                    if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                    if (t && ("object" == typeof t || "function" == typeof t)) {
                        var n = t.then;
                        if (t instanceof i) return e._state = 3, e._value = t, void l(e);
                        if ("function" == typeof n) return void u(o(n, t), e)
                    }
                    e._state = 1, e._value = t, l(e)
                } catch (t) {
                    s(e, t)
                }
            }

            function s(e, t) {
                e._state = 2, e._value = t, l(e)
            }

            function l(e) {
                2 === e._state && 0 === e._deferreds.length && i._immediateFn(function () {
                    e._handled || i._unhandledRejectionFn(e._value)
                });
                for (var t = 0, n = e._deferreds.length; t < n; t++) r(e, e._deferreds[t]);
                e._deferreds = null
            }

            function d(e, t, n) {
                this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
            }

            function u(e, t) {
                var n = !1;
                try {
                    e(function (e) {
                        n || (n = !0, a(t, e))
                    }, function (e) {
                        n || (n = !0, s(t, e))
                    })
                } catch (e) {
                    if (n) return;
                    n = !0, s(t, e)
                }
            }

            var c = setTimeout;
            i.prototype.catch = function (e) {
                return this.then(null, e)
            }, i.prototype.then = function (e, t) {
                var o = new this.constructor(n);
                return r(this, new d(e, t, o)), o
            }, i.all = function (e) {
                var t = Array.prototype.slice.call(e);
                return new i(function (e, n) {
                    function o(r, a) {
                        try {
                            if (a && ("object" == typeof a || "function" == typeof a)) {
                                var s = a.then;
                                if ("function" == typeof s) return void s.call(a, function (e) {
                                    o(r, e)
                                }, n)
                            }
                            t[r] = a, 0 == --i && e(t)
                        } catch (e) {
                            n(e)
                        }
                    }

                    if (0 === t.length) return e([]);
                    for (var i = t.length, r = 0; r < t.length; r++) o(r, t[r])
                })
            }, i.resolve = function (e) {
                return e && "object" == typeof e && e.constructor === i ? e : new i(function (t) {
                    t(e)
                })
            }, i.reject = function (e) {
                return new i(function (t, n) {
                    n(e)
                })
            }, i.race = function (e) {
                return new i(function (t, n) {
                    for (var o = 0, i = e.length; o < i; o++) e[o].then(t, n)
                })
            }, i._immediateFn = "function" == typeof setImmediate && function (e) {
                setImmediate(e)
            } || function (e) {
                c(e, 0)
            }, i._unhandledRejectionFn = function (e) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
            }, i._setImmediateFn = function (e) {
                i._immediateFn = e
            }, i._setUnhandledRejectionFn = function (e) {
                i._unhandledRejectionFn = e
            }, void 0 !== t && t.exports ? t.exports = i : e.Promise || (e.Promise = i)
        }(this)
    }, {}], 5: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, i = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(7)), r = e(15), a = e(27), s = {lang: "en", en: r.EN};
        s.language = function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            if (null !== t && void 0 !== t && t.length) {
                if ("string" != typeof t[0]) throw new TypeError("Language code must be a string value");
                if (!/^[a-z]{2,3}((\-|_)[a-z]{2})?$/i.test(t[0])) throw new TypeError("Language code must have format 2-3 letters and. optionally, hyphen, underscore followed by 2 more letters");
                s.lang = t[0], void 0 === s[t[0]] ? (t[1] = null !== t[1] && void 0 !== t[1] && "object" === o(t[1]) ? t[1] : {}, s[t[0]] = (0, a.isObjectEmpty)(t[1]) ? r.EN : t[1]) : null !== t[1] && void 0 !== t[1] && "object" === o(t[1]) && (s[t[0]] = t[1])
            }
            return s.lang
        }, s.t = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if ("string" == typeof e && e.length) {
                var n = void 0, i = void 0, r = s.language(), l = function (e, t, n) {
                    return "object" !== (void 0 === e ? "undefined" : o(e)) || "number" != typeof t || "number" != typeof n ? e : [function () {
                        return arguments.length <= 1 ? void 0 : arguments[1]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2]
                    }, function () {
                        return 0 === (arguments.length <= 0 ? void 0 : arguments[0]) || 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2]
                    }, function () {
                        return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 != 11 ? arguments.length <= 1 ? void 0 : arguments[1] : 0 !== (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) || 11 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 2 === (arguments.length <= 0 ? void 0 : arguments[0]) || 12 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) > 2 && (arguments.length <= 0 ? void 0 : arguments[0]) < 20 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 0 === (arguments.length <= 0 ? void 0 : arguments[0]) || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 0 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 20 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 != 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : [3]
                    }, function () {
                        return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 != 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) <= 4 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return (arguments.length <= 0 ? void 0 : arguments[0]) % 100 == 1 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 == 2 ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 == 3 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 == 4 ? arguments.length <= 4 ? void 0 : arguments[4] : arguments.length <= 1 ? void 0 : arguments[1]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 2 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) > 2 && (arguments.length <= 0 ? void 0 : arguments[0]) < 7 ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) > 6 && (arguments.length <= 0 ? void 0 : arguments[0]) < 11 ? arguments.length <= 4 ? void 0 : arguments[4] : arguments.length <= 5 ? void 0 : arguments[5]
                    }, function () {
                        return 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : 2 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 3 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 <= 10 ? arguments.length <= 4 ? void 0 : arguments[4] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 11 ? arguments.length <= 5 ? void 0 : arguments[5] : arguments.length <= 6 ? void 0 : arguments[6]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 0 === (arguments.length <= 0 ? void 0 : arguments[0]) || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 11 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 10 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 20 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4]
                    }, function () {
                        return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 2 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return 11 !== (arguments.length <= 0 ? void 0 : arguments[0]) && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 == 1 ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 2 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : 8 !== (arguments.length <= 0 ? void 0 : arguments[0]) && 11 !== (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4]
                    }, function () {
                        return 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2]
                    }, function () {
                        return 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 2 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : 3 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4]
                    }, function () {
                        return 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 1 ? void 0 : arguments[1] : 1 === (arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3]
                    }][n].apply(null, [t].concat(e))
                };
                return void 0 !== s[r] && (n = s[r][e], null !== t && "number" == typeof t && (i = s[r]["mejs.plural-form"], n = l.apply(null, [n, t, i]))), !n && s.en && (n = s.en[e], null !== t && "number" == typeof t && (i = s.en["mejs.plural-form"], n = l.apply(null, [n, t, i]))), n = n || e, null !== t && "number" == typeof t && (n = n.replace("%1", t)), (0, a.escapeHTML)(n)
            }
            return e
        }, i.default.i18n = s, "undefined" != typeof mejsL10n && i.default.i18n.language(mejsL10n.language, mejsL10n.strings), n.default = s
    }, {15: 15, 27: 27, 7: 7}], 6: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(n, "__esModule", {value: !0});
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, a = o(e(3)), s = o(e(2)), l = o(e(7)), d = e(27), u = e(28), c = e(8), f = e(25), p = function e(t, n, o) {
            var p = this;
            i(this, e);
            var m = this;
            o = Array.isArray(o) ? o : null, m.defaults = {
                renderers: [],
                fakeNodeName: "mediaelementwrapper",
                pluginPath: "build/",
                shimScriptAccess: "sameDomain"
            }, n = Object.assign(m.defaults, n), m.mediaElement = s.default.createElement(n.fakeNodeName);
            var h = t, v = !1;
            if ("string" == typeof t ? m.mediaElement.originalNode = s.default.getElementById(t) : (m.mediaElement.originalNode = t, h = t.id), void 0 === m.mediaElement.originalNode || null === m.mediaElement.originalNode) return null;
            m.mediaElement.options = n, h = h || "mejs_" + Math.random().toString().slice(2), m.mediaElement.originalNode.setAttribute("id", h + "_from_mejs");
            var g = m.mediaElement.originalNode.tagName.toLowerCase();
            ["video", "audio"].indexOf(g) > -1 && !m.mediaElement.originalNode.getAttribute("preload") && m.mediaElement.originalNode.setAttribute("preload", "none"), m.mediaElement.originalNode.parentNode.insertBefore(m.mediaElement, m.mediaElement.originalNode), m.mediaElement.appendChild(m.mediaElement.originalNode);
            var y = function (e, t) {
                if ("https:" === a.default.location.protocol && 0 === e.indexOf("http:") && f.IS_IOS && l.default.html5media.mediaTypes.indexOf(t) > -1) {
                    var n = new XMLHttpRequest;
                    n.onreadystatechange = function () {
                        if (4 === this.readyState && 200 === this.status) {
                            var t = (a.default.URL || a.default.webkitURL).createObjectURL(this.response);
                            return m.mediaElement.originalNode.setAttribute("src", t), t
                        }
                        return e
                    }, n.open("GET", e), n.responseType = "blob", n.send()
                }
                return e
            }, E = void 0;
            if (null !== o) E = o; else if (null !== m.mediaElement.originalNode) switch (E = [], m.mediaElement.originalNode.nodeName.toLowerCase()) {
                case"iframe":
                    E.push({type: "", src: m.mediaElement.originalNode.getAttribute("src")});
                    break;
                case"audio":
                case"video":
                    var b = m.mediaElement.originalNode.children.length,
                        S = m.mediaElement.originalNode.getAttribute("src");
                    if (S) {
                        var x = m.mediaElement.originalNode, w = (0, u.formatType)(S, x.getAttribute("type"));
                        E.push({type: w, src: y(S, w)})
                    }
                    for (var P = 0; P < b; P++) {
                        var T = m.mediaElement.originalNode.children[P];
                        if ("source" === T.tagName.toLowerCase()) {
                            var C = T.getAttribute("src"), k = (0, u.formatType)(C, T.getAttribute("type"));
                            E.push({type: k, src: y(C, k)})
                        }
                    }
            }
            m.mediaElement.id = h, m.mediaElement.renderers = {}, m.mediaElement.events = {}, m.mediaElement.promises = [], m.mediaElement.renderer = null, m.mediaElement.rendererName = null, m.mediaElement.changeRenderer = function (e, t) {
                var n = p, o = Object.keys(t[0]).length > 2 ? t[0] : t[0].src;
                if (void 0 !== n.mediaElement.renderer && null !== n.mediaElement.renderer && n.mediaElement.renderer.name === e) return n.mediaElement.renderer.pause(), n.mediaElement.renderer.stop && n.mediaElement.renderer.stop(), n.mediaElement.renderer.show(), n.mediaElement.renderer.setSrc(o), !0;
                void 0 !== n.mediaElement.renderer && null !== n.mediaElement.renderer && (n.mediaElement.renderer.pause(), n.mediaElement.renderer.stop && n.mediaElement.renderer.stop(), n.mediaElement.renderer.hide());
                var i = n.mediaElement.renderers[e], r = null;
                if (void 0 !== i && null !== i) return i.show(), i.setSrc(o), n.mediaElement.renderer = i, n.mediaElement.rendererName = e, !0;
                for (var a = n.mediaElement.options.renderers.length ? n.mediaElement.options.renderers : c.renderer.order, s = 0, l = a.length; s < l; s++) {
                    var d = a[s];
                    if (d === e) {
                        r = c.renderer.renderers[d];
                        var u = Object.assign(r.options, n.mediaElement.options);
                        return i = r.create(n.mediaElement, u, t), i.name = e, n.mediaElement.renderers[r.name] = i, n.mediaElement.renderer = i, n.mediaElement.rendererName = e, i.show(), !0
                    }
                }
                return !1
            }, m.mediaElement.setSize = function (e, t) {
                void 0 !== m.mediaElement.renderer && null !== m.mediaElement.renderer && m.mediaElement.renderer.setSize(e, t)
            }, m.mediaElement.generateError = function (e, t) {
                e = e || "", t = Array.isArray(t) ? t : [];
                var n = (0, d.createEvent)("error", m.mediaElement);
                n.message = e, n.urls = t, m.mediaElement.dispatchEvent(n), v = !0
            };
            var _ = l.default.html5media.properties, N = l.default.html5media.methods, A = function (e, t, n, o) {
                var i = e[t];
                Object.defineProperty(e, t, {
                    get: function () {
                        return n.apply(e, [i])
                    }, set: function (t) {
                        return i = o.apply(e, [t])
                    }
                })
            }, L = function () {
                return void 0 !== m.mediaElement.renderer && null !== m.mediaElement.renderer ? m.mediaElement.renderer.getSrc() : null
            }, F = function (e) {
                var t = [];
                if ("string" == typeof e) t.push({
                    src: e,
                    type: e ? (0, u.getTypeFromFile)(e) : ""
                }); else if ("object" === (void 0 === e ? "undefined" : r(e)) && void 0 !== e.src) {
                    var n = (0, u.absolutizeUrl)(e.src), o = e.type, i = Object.assign(e, {
                        src: n,
                        type: "" !== o && null !== o && void 0 !== o || !n ? o : (0, u.getTypeFromFile)(n)
                    });
                    t.push(i)
                } else if (Array.isArray(e)) for (var a = 0, s = e.length; a < s; a++) {
                    var l = (0, u.absolutizeUrl)(e[a].src), f = e[a].type, p = Object.assign(e[a], {
                        src: l,
                        type: "" !== f && null !== f && void 0 !== f || !l ? f : (0, u.getTypeFromFile)(l)
                    });
                    t.push(p)
                }
                var h = c.renderer.select(t, m.mediaElement.options.renderers.length ? m.mediaElement.options.renderers : []),
                    v = void 0;
                if (m.mediaElement.paused || (m.mediaElement.pause(), v = (0, d.createEvent)("pause", m.mediaElement), m.mediaElement.dispatchEvent(v)), m.mediaElement.originalNode.src = t[0].src || "", null !== h || !t[0].src) return t[0].src ? m.mediaElement.changeRenderer(h.rendererName, t) : null;
                m.mediaElement.generateError("No renderer found", t)
            }, j = function (e, t) {
                try {
                    if ("play" === e && "native_dash" === m.mediaElement.rendererName) {
                        var n = m.mediaElement.renderer[e](t);
                        n && "function" == typeof n.then && n.catch(function () {
                            m.mediaElement.paused && setTimeout(function () {
                                var e = m.mediaElement.renderer.play();
                                void 0 !== e && e.catch(function () {
                                    m.mediaElement.renderer.paused || m.mediaElement.renderer.pause()
                                })
                            }, 150)
                        })
                    } else m.mediaElement.renderer[e](t)
                } catch (e) {
                    m.mediaElement.generateError(e, E)
                }
            };
            A(m.mediaElement, "src", L, F), m.mediaElement.getSrc = L, m.mediaElement.setSrc = F;
            for (var I = 0, M = _.length; I < M; I++) !function (e) {
                if ("src" !== e) {
                    var t = "" + e.substring(0, 1).toUpperCase() + e.substring(1), n = function () {
                        return void 0 !== m.mediaElement.renderer && null !== m.mediaElement.renderer && "function" == typeof m.mediaElement.renderer["get" + t] ? m.mediaElement.renderer["get" + t]() : null
                    }, o = function (e) {
                        void 0 !== m.mediaElement.renderer && null !== m.mediaElement.renderer && "function" == typeof m.mediaElement.renderer["set" + t] && m.mediaElement.renderer["set" + t](e)
                    };
                    A(m.mediaElement, e, n, o), m.mediaElement["get" + t] = n, m.mediaElement["set" + t] = o
                }
            }(_[I]);
            for (var O = 0, D = N.length; O < D; O++) !function (e) {
                m.mediaElement[e] = function () {
                    for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) n[o] = arguments[o];
                    return void 0 !== m.mediaElement.renderer && null !== m.mediaElement.renderer && "function" == typeof m.mediaElement.renderer[e] && (m.mediaElement.promises.length ? Promise.all(m.mediaElement.promises).then(function () {
                        j(e, n)
                    }).catch(function (e) {
                        m.mediaElement.generateError(e, E)
                    }) : j(e, n)), null
                }
            }(N[O]);
            return m.mediaElement.addEventListener = function (e, t) {
                m.mediaElement.events[e] = m.mediaElement.events[e] || [], m.mediaElement.events[e].push(t)
            }, m.mediaElement.removeEventListener = function (e, t) {
                if (!e) return m.mediaElement.events = {}, !0;
                var n = m.mediaElement.events[e];
                if (!n) return !0;
                if (!t) return m.mediaElement.events[e] = [], !0;
                for (var o = 0; o < n.length; o++) if (n[o] === t) return m.mediaElement.events[e].splice(o, 1), !0;
                return !1
            }, m.mediaElement.dispatchEvent = function (e) {
                var t = m.mediaElement.events[e.type];
                if (t) for (var n = 0; n < t.length; n++) t[n].apply(null, [e])
            }, m.mediaElement.destroy = function () {
                var e = m.mediaElement.originalNode.cloneNode(!0), t = m.mediaElement.parentElement;
                e.removeAttribute("id"), e.remove(), m.mediaElement.remove(), t.append(e)
            }, E.length && (m.mediaElement.src = E), m.mediaElement.promises.length ? Promise.all(m.mediaElement.promises).then(function () {
                m.mediaElement.options.success && m.mediaElement.options.success(m.mediaElement, m.mediaElement.originalNode)
            }).catch(function () {
                v && m.mediaElement.options.error && m.mediaElement.options.error(m.mediaElement, m.mediaElement.originalNode)
            }) : (m.mediaElement.options.success && m.mediaElement.options.success(m.mediaElement, m.mediaElement.originalNode), v && m.mediaElement.options.error && m.mediaElement.options.error(m.mediaElement, m.mediaElement.originalNode)), m.mediaElement
        };
        a.default.MediaElement = p, l.default.MediaElement = p, n.default = p
    }, {2: 2, 25: 25, 27: 27, 28: 28, 3: 3, 7: 7, 8: 8}], 7: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var o = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(3)), i = {};
        i.version = "4.2.7", i.html5media = {
            properties: ["volume", "src", "currentTime", "muted", "duration", "paused", "ended", "buffered", "error", "networkState", "readyState", "seeking", "seekable", "currentSrc", "preload", "bufferedBytes", "bufferedTime", "initialTime", "startOffsetTime", "defaultPlaybackRate", "playbackRate", "played", "autoplay", "loop", "controls"],
            readOnlyProperties: ["duration", "paused", "ended", "buffered", "error", "networkState", "readyState", "seeking", "seekable"],
            methods: ["load", "play", "pause", "canPlayType"],
            events: ["loadstart", "durationchange", "loadedmetadata", "loadeddata", "progress", "canplay", "canplaythrough", "suspend", "abort", "error", "emptied", "stalled", "play", "playing", "pause", "waiting", "seeking", "seeked", "timeupdate", "ended", "ratechange", "volumechange"],
            mediaTypes: ["audio/mp3", "audio/ogg", "audio/oga", "audio/wav", "audio/x-wav", "audio/wave", "audio/x-pn-wav", "audio/mpeg", "audio/mp4", "video/mp4", "video/webm", "video/ogg", "video/ogv"]
        }, o.default.mejs = i, n.default = i
    }, {3: 3}], 8: [function (e, t, n) {
        "use strict";

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.renderer = void 0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(), a = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(7)), s = function () {
            function e() {
                o(this, e), this.renderers = {}, this.order = []
            }

            return r(e, [{
                key: "add", value: function (e) {
                    if (void 0 === e.name) throw new TypeError("renderer must contain at least `name` property");
                    this.renderers[e.name] = e, this.order.push(e.name)
                }
            }, {
                key: "select", value: function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = t.length;
                    if (t = t.length ? t : this.order, !n) {
                        var o = [/^(html5|native)/i, /^flash/i, /iframe$/i], i = function (e) {
                            for (var t = 0, n = o.length; t < n; t++) if (o[t].test(e)) return t;
                            return o.length
                        };
                        t.sort(function (e, t) {
                            return i(e) - i(t)
                        })
                    }
                    for (var r = 0, a = t.length; r < a; r++) {
                        var s = t[r], l = this.renderers[s];
                        if (null !== l && void 0 !== l) for (var d = 0, u = e.length; d < u; d++) if ("function" == typeof l.canPlayType && "string" == typeof e[d].type && l.canPlayType(e[d].type)) return {
                            rendererName: l.name,
                            src: e[d].src
                        }
                    }
                    return null
                }
            }, {
                key: "order", set: function (e) {
                    if (!Array.isArray(e)) throw new TypeError("order must be an array of strings.");
                    this._order = e
                }, get: function () {
                    return this._order
                }
            }, {
                key: "renderers", set: function (e) {
                    if (null !== e && "object" !== (void 0 === e ? "undefined" : i(e))) throw new TypeError("renderers must be an array of objects.");
                    this._renderers = e
                }, get: function () {
                    return this._renderers
                }
            }]), e
        }(), l = n.renderer = new s;
        a.default.Renderers = l
    }, {7: 7}], 9: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(3)), r = o(e(2)), a = o(e(5)), s = e(16), l = o(s), d = function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }(e(25)), u = e(27), c = e(26), f = e(28);
        Object.assign(s.config, {
            usePluginFullScreen: !0,
            fullscreenText: null,
            useFakeFullscreen: !1
        }), Object.assign(l.default.prototype, {
            isFullScreen: !1,
            isNativeFullScreen: !1,
            isInIframe: !1,
            isPluginClickThroughCreated: !1,
            fullscreenMode: "",
            containerSizeTimeout: null,
            buildfullscreen: function (e) {
                if (e.isVideo) {
                    e.isInIframe = i.default.location !== i.default.parent.location, e.detectFullscreenMode();
                    var t = this,
                        n = (0, u.isString)(t.options.fullscreenText) ? t.options.fullscreenText : a.default.t("mejs.fullscreen"),
                        o = r.default.createElement("div");
                    if (o.className = t.options.classPrefix + "button " + t.options.classPrefix + "fullscreen-button", o.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + n + '" aria-label="' + n + '" tabindex="0"></button>', t.addControlElement(o, "fullscreen"), o.addEventListener("click", function () {
                        d.HAS_TRUE_NATIVE_FULLSCREEN && d.IS_FULLSCREEN || e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
                    }), e.fullscreenBtn = o, t.options.keyActions.push({
                        keys: [70], action: function (e, t, n, o) {
                            o.ctrlKey || void 0 !== e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
                        }
                    }), t.exitFullscreenCallback = function (n) {
                        27 === (n.which || n.keyCode || 0) && (d.HAS_TRUE_NATIVE_FULLSCREEN && d.IS_FULLSCREEN || t.isFullScreen) && e.exitFullScreen()
                    }, t.globalBind("keydown", t.exitFullscreenCallback), t.normalHeight = 0, t.normalWidth = 0, d.HAS_TRUE_NATIVE_FULLSCREEN) {
                        e.globalBind(d.FULLSCREEN_EVENT_NAME, function () {
                            e.isFullScreen && (d.isFullScreen() ? (e.isNativeFullScreen = !0, e.setControlsSize()) : (e.isNativeFullScreen = !1, e.exitFullScreen()))
                        })
                    }
                }
            },
            cleanfullscreen: function (e) {
                e.exitFullScreen(), e.globalUnbind("keydown", e.exitFullscreenCallback)
            },
            detectFullscreenMode: function () {
                var e = this, t = null !== e.media.rendererName && /(native|html5)/i.test(e.media.rendererName), n = "";
                return d.HAS_TRUE_NATIVE_FULLSCREEN && t ? n = "native-native" : d.HAS_TRUE_NATIVE_FULLSCREEN && !t ? n = "plugin-native" : e.usePluginFullScreen && d.SUPPORT_POINTER_EVENTS && (n = "plugin-click"), e.fullscreenMode = n, n
            },
            enterFullScreen: function () {
                var e = this, t = null !== e.media.rendererName && /(html5|native)/i.test(e.media.rendererName),
                    n = getComputedStyle(e.getElement(e.container));
                if (!1 === e.options.useFakeFullscreen && d.IS_IOS && d.HAS_IOS_FULLSCREEN && "function" == typeof e.media.originalNode.webkitEnterFullscreen && e.media.originalNode.canPlayType((0, f.getTypeFromFile)(e.media.getSrc()))) e.media.originalNode.webkitEnterFullscreen(); else {
                    if ((0, c.addClass)(r.default.documentElement, e.options.classPrefix + "fullscreen"), (0, c.addClass)(e.getElement(e.container), e.options.classPrefix + "container-fullscreen"), e.normalHeight = parseFloat(n.height), e.normalWidth = parseFloat(n.width), "native-native" !== e.fullscreenMode && "plugin-native" !== e.fullscreenMode || (d.requestFullScreen(e.getElement(e.container)), e.isInIframe && setTimeout(function t() {
                        if (e.isNativeFullScreen) {
                            var n = i.default.innerWidth || r.default.documentElement.clientWidth || r.default.body.clientWidth,
                                o = screen.width;
                            Math.abs(o - n) > .002 * o ? e.exitFullScreen() : setTimeout(t, 500)
                        }
                    }, 1e3)), e.getElement(e.container).style.width = "100%", e.getElement(e.container).style.height = "100%", e.containerSizeTimeout = setTimeout(function () {
                        e.getElement(e.container).style.width = "100%", e.getElement(e.container).style.height = "100%", e.setControlsSize()
                    }, 500), t) e.node.style.width = "100%", e.node.style.height = "100%"; else for (var o = e.getElement(e.container).querySelectorAll("embed, object, video"), a = o.length, s = 0; s < a; s++) o[s].style.width = "100%", o[s].style.height = "100%";
                    e.options.setDimensions && "function" == typeof e.media.setSize && e.media.setSize(screen.width, screen.height);
                    for (var l = e.getElement(e.layers).children, p = l.length, m = 0; m < p; m++) l[m].style.width = "100%", l[m].style.height = "100%";
                    e.fullscreenBtn && ((0, c.removeClass)(e.fullscreenBtn, e.options.classPrefix + "fullscreen"), (0, c.addClass)(e.fullscreenBtn, e.options.classPrefix + "unfullscreen")), e.setControlsSize(), e.isFullScreen = !0;
                    var h = Math.min(screen.width / e.width, screen.height / e.height),
                        v = e.getElement(e.container).querySelector("." + e.options.classPrefix + "captions-text");
                    v && (v.style.fontSize = 100 * h + "%", v.style.lineHeight = "normal", e.getElement(e.container).querySelector("." + e.options.classPrefix + "captions-position").style.bottom = (screen.height - e.normalHeight) / 2 - e.getElement(e.controls).offsetHeight / 2 + h + 15 + "px");
                    var g = (0, u.createEvent)("enteredfullscreen", e.getElement(e.container));
                    e.getElement(e.container).dispatchEvent(g)
                }
            },
            exitFullScreen: function () {
                var e = this, t = null !== e.media.rendererName && /(native|html5)/i.test(e.media.rendererName);
                if (clearTimeout(e.containerSizeTimeout), d.HAS_TRUE_NATIVE_FULLSCREEN && (d.IS_FULLSCREEN || e.isFullScreen) && d.cancelFullScreen(), (0, c.removeClass)(r.default.documentElement, e.options.classPrefix + "fullscreen"), (0, c.removeClass)(e.getElement(e.container), e.options.classPrefix + "container-fullscreen"), e.options.setDimensions) {
                    if (e.getElement(e.container).style.width = e.normalWidth + "px", e.getElement(e.container).style.height = e.normalHeight + "px", t) e.node.style.width = e.normalWidth + "px", e.node.style.height = e.normalHeight + "px"; else for (var n = e.getElement(e.container).querySelectorAll("embed, object, video"), o = n.length, i = 0; i < o; i++) n[i].style.width = e.normalWidth + "px", n[i].style.height = e.normalHeight + "px";
                    "function" == typeof e.media.setSize && e.media.setSize(e.normalWidth, e.normalHeight);
                    for (var a = e.getElement(e.layers).children, s = a.length, l = 0; l < s; l++) a[l].style.width = e.normalWidth + "px", a[l].style.height = e.normalHeight + "px"
                }
                e.fullscreenBtn && ((0, c.removeClass)(e.fullscreenBtn, e.options.classPrefix + "unfullscreen"), (0, c.addClass)(e.fullscreenBtn, e.options.classPrefix + "fullscreen")), e.setControlsSize(), e.isFullScreen = !1;
                var f = e.getElement(e.container).querySelector("." + e.options.classPrefix + "captions-text");
                f && (f.style.fontSize = "", f.style.lineHeight = "", e.getElement(e.container).querySelector("." + e.options.classPrefix + "captions-position").style.bottom = "");
                var p = (0, u.createEvent)("exitedfullscreen", e.getElement(e.container));
                e.getElement(e.container).dispatchEvent(p)
            }
        })
    }, {16: 16, 2: 2, 25: 25, 26: 26, 27: 27, 28: 28, 3: 3, 5: 5}], 10: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = e(16), a = o(r), s = o(e(5)), l = e(27), d = e(26);
        Object.assign(r.config, {playText: null, pauseText: null}), Object.assign(a.default.prototype, {
            buildplaypause: function (e, t, n, o) {
                function r(e) {
                    "play" === e ? ((0, d.removeClass)(p, a.options.classPrefix + "play"), (0, d.removeClass)(p, a.options.classPrefix + "replay"), (0, d.addClass)(p, a.options.classPrefix + "pause"), m.setAttribute("title", f), m.setAttribute("aria-label", f)) : ((0, d.removeClass)(p, a.options.classPrefix + "pause"), (0, d.removeClass)(p, a.options.classPrefix + "replay"), (0, d.addClass)(p, a.options.classPrefix + "play"), m.setAttribute("title", c), m.setAttribute("aria-label", c))
                }

                var a = this, u = a.options, c = (0, l.isString)(u.playText) ? u.playText : s.default.t("mejs.play"),
                    f = (0, l.isString)(u.pauseText) ? u.pauseText : s.default.t("mejs.pause"),
                    p = i.default.createElement("div");
                p.className = a.options.classPrefix + "button " + a.options.classPrefix + "playpause-button " + a.options.classPrefix + "play", p.innerHTML = '<button type="button" aria-controls="' + a.id + '" title="' + c + '" aria-label="' + f + '" tabindex="0"></button>', p.addEventListener("click", function () {
                    a.paused ? a.play() : a.pause()
                });
                var m = p.querySelector("button");
                a.addControlElement(p, "playpause"), r("pse"), o.addEventListener("loadedmetadata", function () {
                    -1 === o.rendererName.indexOf("flash") && r("pse")
                }), o.addEventListener("play", function () {
                    r("play")
                }), o.addEventListener("playing", function () {
                    r("play")
                }), o.addEventListener("pause", function () {
                    r("pse")
                }), o.addEventListener("ended", function () {
                    e.options.loop || ((0, d.removeClass)(p, a.options.classPrefix + "pause"), (0, d.removeClass)(p, a.options.classPrefix + "play"), (0, d.addClass)(p, a.options.classPrefix + "replay"), m.setAttribute("title", c), m.setAttribute("aria-label", c))
                })
            }
        })
    }, {16: 16, 2: 2, 26: 26, 27: 27, 5: 5}], 11: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = e(16), a = o(r), s = o(e(5)), l = e(25), d = e(30), u = e(26);
        Object.assign(r.config, {
            enableProgressTooltip: !0,
            useSmoothHover: !0,
            forceLive: !1
        }), Object.assign(a.default.prototype, {
            buildprogress: function (e, t, n, o) {
                var a = 0, c = !1, f = !1, p = this, m = e.options.autoRewind,
                    h = e.options.enableProgressTooltip ? '<span class="' + p.options.classPrefix + 'time-float"><span class="' + p.options.classPrefix + 'time-float-current">00:00</span><span class="' + p.options.classPrefix + 'time-float-corner"></span></span>' : "",
                    v = i.default.createElement("div");
                v.className = p.options.classPrefix + "time-rail", v.innerHTML = '<span class="' + p.options.classPrefix + "time-total " + p.options.classPrefix + 'time-slider"><span class="' + p.options.classPrefix + 'time-buffering"></span><span class="' + p.options.classPrefix + 'time-loaded"></span><span class="' + p.options.classPrefix + 'time-current"></span><span class="' + p.options.classPrefix + 'time-hovered no-hover"></span><span class="' + p.options.classPrefix + 'time-handle"><span class="' + p.options.classPrefix + 'time-handle-content"></span></span>' + h + "</span>", p.addControlElement(v, "progress"), p.options.keyActions.push({
                    keys: [37, 227],
                    action: function (e) {
                        if (!isNaN(e.duration) && e.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer()), e.getElement(e.container).querySelector("." + r.config.classPrefix + "time-total").focus();
                            var t = Math.max(e.currentTime - e.options.defaultSeekBackwardInterval(e), 0);
                            e.setCurrentTime(t)
                        }
                    }
                }, {
                    keys: [39, 228], action: function (e) {
                        if (!isNaN(e.duration) && e.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer()), e.getElement(e.container).querySelector("." + r.config.classPrefix + "time-total").focus();
                            var t = Math.min(e.currentTime + e.options.defaultSeekForwardInterval(e), e.duration);
                            e.setCurrentTime(t)
                        }
                    }
                }), p.rail = t.querySelector("." + p.options.classPrefix + "time-rail"), p.total = t.querySelector("." + p.options.classPrefix + "time-total"), p.loaded = t.querySelector("." + p.options.classPrefix + "time-loaded"), p.current = t.querySelector("." + p.options.classPrefix + "time-current"), p.handle = t.querySelector("." + p.options.classPrefix + "time-handle"), p.timefloat = t.querySelector("." + p.options.classPrefix + "time-float"), p.timefloatcurrent = t.querySelector("." + p.options.classPrefix + "time-float-current"), p.slider = t.querySelector("." + p.options.classPrefix + "time-slider"), p.hovered = t.querySelector("." + p.options.classPrefix + "time-hovered"), p.buffer = t.querySelector("." + p.options.classPrefix + "time-buffering"), p.newTime = 0, p.forcedHandlePause = !1, p.setTransformStyle = function (e, t) {
                    e.style.transform = t, e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t
                }, p.buffer.style.display = "none";
                var g = function (t) {
                    var n = getComputedStyle(p.total), o = (0, u.offset)(p.total), i = p.total.offsetWidth,
                        r = void 0 !== n.webkitTransform ? "webkitTransform" : void 0 !== n.mozTransform ? "mozTransform " : void 0 !== n.oTransform ? "oTransform" : void 0 !== n.msTransform ? "msTransform" : "transform",
                        a = "WebKitCSSMatrix" in window ? "WebKitCSSMatrix" : "MSCSSMatrix" in window ? "MSCSSMatrix" : "CSSMatrix" in window ? "CSSMatrix" : void 0,
                        s = 0, f = 0, m = 0, h = void 0;
                    if (h = t.originalEvent && t.originalEvent.changedTouches ? t.originalEvent.changedTouches[0].pageX : t.changedTouches ? t.changedTouches[0].pageX : t.pageX, p.getDuration()) {
                        if (h < o.left ? h = o.left : h > i + o.left && (h = i + o.left), m = h - o.left, s = m / i, p.newTime = s <= .02 ? 0 : s * p.getDuration(), c && null !== p.getCurrentTime() && p.newTime.toFixed(4) !== p.getCurrentTime().toFixed(4) && (p.setCurrentRailHandle(p.newTime), p.updateCurrent(p.newTime)), !l.IS_IOS && !l.IS_ANDROID) {
                            if (m < 0 && (m = 0), p.options.useSmoothHover && null !== a && void 0 !== window[a]) {
                                var v = new window[a](getComputedStyle(p.handle)[r]).m41,
                                    g = m / parseFloat(getComputedStyle(p.total).width) - v / parseFloat(getComputedStyle(p.total).width);
                                p.hovered.style.left = v + "px", p.setTransformStyle(p.hovered, "scaleX(" + g + ")"), p.hovered.setAttribute("pos", m), g >= 0 ? (0, u.removeClass)(p.hovered, "negative") : (0, u.addClass)(p.hovered, "negative")
                            }
                            if (p.timefloat) {
                                var y = p.timefloat.offsetWidth / 2, E = mejs.Utils.offset(p.getElement(p.container)),
                                    b = getComputedStyle(p.timefloat);
                                f = h - E.left < p.timefloat.offsetWidth ? y : h - E.left >= p.getElement(p.container).offsetWidth - y ? p.total.offsetWidth - y : m, (0, u.hasClass)(p.getElement(p.container), p.options.classPrefix + "long-video") && (f += parseFloat(b.marginLeft) / 2 + p.timefloat.offsetWidth / 2), p.timefloat.style.left = f + "px", p.timefloatcurrent.innerHTML = (0, d.secondsToTimeCode)(p.newTime, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond, e.options.secondsDecimalLength, e.options.timeFormat), p.timefloat.style.display = "block"
                            }
                        }
                    } else l.IS_IOS || l.IS_ANDROID || !p.timefloat || (f = p.timefloat.offsetWidth + i >= p.getElement(p.container).offsetWidth ? p.timefloat.offsetWidth / 2 : 0, p.timefloat.style.left = f + "px", p.timefloat.style.left = f + "px", p.timefloat.style.display = "block")
                }, y = function () {
                    var t = p.getCurrentTime(), n = s.default.t("mejs.time-slider"),
                        i = (0, d.secondsToTimeCode)(t, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond, e.options.secondsDecimalLength, e.options.timeFormat),
                        r = p.getDuration();
                    p.slider.setAttribute("role", "slider"), p.slider.tabIndex = 0, o.paused ? (p.slider.setAttribute("aria-label", n), p.slider.setAttribute("aria-valuemin", 0), p.slider.setAttribute("aria-valuemax", r), p.slider.setAttribute("aria-valuenow", t), p.slider.setAttribute("aria-valuetext", i)) : (p.slider.removeAttribute("aria-label"), p.slider.removeAttribute("aria-valuemin"), p.slider.removeAttribute("aria-valuemax"), p.slider.removeAttribute("aria-valuenow"), p.slider.removeAttribute("aria-valuetext"))
                }, E = function () {
                    new Date - a >= 1e3 && p.play()
                }, b = function () {
                    c && null !== p.getCurrentTime() && p.newTime.toFixed(4) !== p.getCurrentTime().toFixed(4) && (p.setCurrentTime(p.newTime), p.setCurrentRail(), p.updateCurrent(p.newTime)), p.forcedHandlePause && (p.slider.focus(), p.play()), p.forcedHandlePause = !1
                };
                p.slider.addEventListener("focus", function () {
                    e.options.autoRewind = !1
                }), p.slider.addEventListener("blur", function () {
                    e.options.autoRewind = m
                }), p.slider.addEventListener("keydown", function (t) {
                    if (new Date - a >= 1e3 && (f = p.paused), p.options.keyActions.length) {
                        var n = t.which || t.keyCode || 0, i = p.getDuration(),
                            r = e.options.defaultSeekForwardInterval(o), s = e.options.defaultSeekBackwardInterval(o),
                            d = p.getCurrentTime(),
                            u = p.getElement(p.container).querySelector("." + p.options.classPrefix + "volume-slider");
                        if (38 === n || 40 === n) {
                            u && (u.style.display = "block"), p.isVideo && (p.showControls(), p.startControlsTimer());
                            var c = 38 === n ? Math.min(p.volume + .1, 1) : Math.max(p.volume - .1, 0), m = c <= 0;
                            return p.setVolume(c), void p.setMuted(m)
                        }
                        switch (u && (u.style.display = "none"), n) {
                            case 37:
                                p.getDuration() !== 1 / 0 && (d -= s);
                                break;
                            case 39:
                                p.getDuration() !== 1 / 0 && (d += r);
                                break;
                            case 36:
                                d = 0;
                                break;
                            case 35:
                                d = i;
                                break;
                            case 13:
                            case 32:
                                return void (l.IS_FIREFOX && (p.paused ? p.play() : p.pause()));
                            default:
                                return
                        }
                        d = d < 0 ? 0 : d >= i ? i : Math.floor(d), a = new Date, f || e.pause(), d < p.getDuration() && !f && setTimeout(E, 1100), p.setCurrentTime(d), e.showControls(), t.preventDefault(), t.stopPropagation()
                    }
                });
                var S = ["mousedown", "touchstart"];
                p.slider.addEventListener("dragstart", function () {
                    return !1
                });
                for (var x = 0, w = S.length; x < w; x++) p.slider.addEventListener(S[x], function (e) {
                    if (p.forcedHandlePause = !1, p.getDuration() !== 1 / 0 && (1 === e.which || 0 === e.which)) {
                        p.paused || (p.pause(), p.forcedHandlePause = !0), c = !0, g(e);
                        for (var t = ["mouseup", "touchend"], n = 0, o = t.length; n < o; n++) p.getElement(p.container).addEventListener(t[n], function (e) {
                            var t = e.target;
                            (t === p.slider || t.closest("." + p.options.classPrefix + "time-slider")) && g(e)
                        });
                        p.globalBind("mouseup.dur touchend.dur", function () {
                            b(), c = !1, p.timefloat && (p.timefloat.style.display = "none")
                        })
                    }
                }, !(!l.SUPPORT_PASSIVE_EVENT || "touchstart" !== S[x]) && {passive: !0});
                p.slider.addEventListener("mouseenter", function (e) {
                    e.target === p.slider && p.getDuration() !== 1 / 0 && (p.getElement(p.container).addEventListener("mousemove", function (e) {
                        var t = e.target;
                        (t === p.slider || t.closest("." + p.options.classPrefix + "time-slider")) && g(e)
                    }), !p.timefloat || l.IS_IOS || l.IS_ANDROID || (p.timefloat.style.display = "block"), p.hovered && !l.IS_IOS && !l.IS_ANDROID && p.options.useSmoothHover && (0, u.removeClass)(p.hovered, "no-hover"))
                }), p.slider.addEventListener("mouseleave", function () {
                    p.getDuration() !== 1 / 0 && (c || (p.timefloat && (p.timefloat.style.display = "none"), p.hovered && p.options.useSmoothHover && (0, u.addClass)(p.hovered, "no-hover")))
                }), p.broadcastCallback = function (n) {
                    var o = t.querySelector("." + p.options.classPrefix + "broadcast");
                    if (p.options.forceLive || p.getDuration() === 1 / 0) {
                        if (!o || p.options.forceLive) {
                            var r = i.default.createElement("span");
                            r.className = p.options.classPrefix + "broadcast", r.innerText = s.default.t("mejs.live-broadcast"), p.slider.style.display = "none", p.rail.appendChild(r)
                        }
                    } else o && (p.slider.style.display = "", o.remove()), e.setProgressRail(n), p.forcedHandlePause || e.setCurrentRail(n), y()
                }, o.addEventListener("progress", p.broadcastCallback), o.addEventListener("timeupdate", p.broadcastCallback), o.addEventListener("play", function () {
                    p.buffer.style.display = "none"
                }), o.addEventListener("playing", function () {
                    p.buffer.style.display = "none"
                }), o.addEventListener("seeking", function () {
                    p.buffer.style.display = ""
                }), o.addEventListener("seeked", function () {
                    p.buffer.style.display = "none"
                }), o.addEventListener("pause", function () {
                    p.buffer.style.display = "none"
                }), o.addEventListener("waiting", function () {
                    p.buffer.style.display = ""
                }), o.addEventListener("loadeddata", function () {
                    p.buffer.style.display = ""
                }), o.addEventListener("canplay", function () {
                    p.buffer.style.display = "none"
                }), o.addEventListener("error", function () {
                    p.buffer.style.display = "none"
                }), p.getElement(p.container).addEventListener("controlsresize", function (t) {
                    p.getDuration() !== 1 / 0 && (e.setProgressRail(t), p.forcedHandlePause || e.setCurrentRail(t))
                })
            }, cleanprogress: function (e, t, n, o) {
                o.removeEventListener("progress", e.broadcastCallback), o.removeEventListener("timeupdate", e.broadcastCallback), e.rail && e.rail.remove()
            }, setProgressRail: function (e) {
                var t = this, n = void 0 !== e ? e.detail.target || e.target : t.media, o = null;
                n && n.buffered && n.buffered.length > 0 && n.buffered.end && t.getDuration() ? o = n.buffered.end(n.buffered.length - 1) / t.getDuration() : n && void 0 !== n.bytesTotal && n.bytesTotal > 0 && void 0 !== n.bufferedBytes ? o = n.bufferedBytes / n.bytesTotal : e && e.lengthComputable && 0 !== e.total && (o = e.loaded / e.total), null !== o && (o = Math.min(1, Math.max(0, o)), t.loaded && t.setTransformStyle(t.loaded, "scaleX(" + o + ")"))
            }, setCurrentRailHandle: function (e) {
                var t = this;
                t.setCurrentRailMain(t, e)
            }, setCurrentRail: function () {
                var e = this;
                e.setCurrentRailMain(e)
            }, setCurrentRailMain: function (e, t) {
                if (void 0 !== e.getCurrentTime() && e.getDuration()) {
                    var n = void 0 === t ? e.getCurrentTime() : t;
                    if (e.total && e.handle) {
                        var o = parseFloat(getComputedStyle(e.total).width), i = Math.round(o * n / e.getDuration()),
                            r = i - Math.round(e.handle.offsetWidth / 2);
                        if (r = r < 0 ? 0 : r, e.setTransformStyle(e.current, "scaleX(" + i / o + ")"), e.setTransformStyle(e.handle, "translateX(" + r + "px)"), e.options.useSmoothHover && !(0, u.hasClass)(e.hovered, "no-hover")) {
                            var a = parseInt(e.hovered.getAttribute("pos"), 10), s = (a = isNaN(a) ? 0 : a) / o - r / o;
                            e.hovered.style.left = r + "px", e.setTransformStyle(e.hovered, "scaleX(" + s + ")"), s >= 0 ? (0, u.removeClass)(e.hovered, "negative") : (0, u.addClass)(e.hovered, "negative")
                        }
                    }
                }
            }
        })
    }, {16: 16, 2: 2, 25: 25, 26: 26, 30: 30, 5: 5}], 12: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = e(16), a = o(r), s = e(30), l = e(26);
        Object.assign(r.config, {
            duration: 0,
            timeAndDurationSeparator: "<span> | </span>"
        }), Object.assign(a.default.prototype, {
            buildcurrent: function (e, t, n, o) {
                var r = this, a = i.default.createElement("div");
                a.className = r.options.classPrefix + "time", a.setAttribute("role", "timer"), a.setAttribute("aria-live", "off"), a.innerHTML = '<span class="' + r.options.classPrefix + 'currenttime">' + (0, s.secondsToTimeCode)(0, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond, e.options.secondsDecimalLength, e.options.timeFormat) + "</span>", r.addControlElement(a, "current"), e.updateCurrent(), r.updateTimeCallback = function () {
                    r.controlsAreVisible && e.updateCurrent()
                }, o.addEventListener("timeupdate", r.updateTimeCallback)
            }, cleancurrent: function (e, t, n, o) {
                o.removeEventListener("timeupdate", e.updateTimeCallback)
            }, buildduration: function (e, t, n, o) {
                var r = this;
                if (t.lastChild.querySelector("." + r.options.classPrefix + "currenttime")) t.querySelector("." + r.options.classPrefix + "time").innerHTML += r.options.timeAndDurationSeparator + '<span class="' + r.options.classPrefix + 'duration">' + (0, s.secondsToTimeCode)(r.options.duration, r.options.alwaysShowHours, r.options.showTimecodeFrameCount, r.options.framesPerSecond, r.options.secondsDecimalLength, r.options.timeFormat) + "</span>"; else {
                    t.querySelector("." + r.options.classPrefix + "currenttime") && (0, l.addClass)(t.querySelector("." + r.options.classPrefix + "currenttime").parentNode, r.options.classPrefix + "currenttime-container");
                    var a = i.default.createElement("div");
                    a.className = r.options.classPrefix + "time " + r.options.classPrefix + "duration-container", a.innerHTML = '<span class="' + r.options.classPrefix + 'duration">' + (0, s.secondsToTimeCode)(r.options.duration, r.options.alwaysShowHours, r.options.showTimecodeFrameCount, r.options.framesPerSecond, r.options.secondsDecimalLength, r.options.timeFormat) + "</span>", r.addControlElement(a, "duration")
                }
                r.updateDurationCallback = function () {
                    r.controlsAreVisible && e.updateDuration()
                }, o.addEventListener("timeupdate", r.updateDurationCallback)
            }, cleanduration: function (e, t, n, o) {
                o.removeEventListener("timeupdate", e.updateDurationCallback)
            }, updateCurrent: function () {
                var e = this, t = e.getCurrentTime();
                isNaN(t) && (t = 0);
                var n = (0, s.secondsToTimeCode)(t, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond, e.options.secondsDecimalLength, e.options.timeFormat);
                n.length > 5 ? (0, l.addClass)(e.getElement(e.container), e.options.classPrefix + "long-video") : (0, l.removeClass)(e.getElement(e.container), e.options.classPrefix + "long-video"), e.getElement(e.controls).querySelector("." + e.options.classPrefix + "currenttime") && (e.getElement(e.controls).querySelector("." + e.options.classPrefix + "currenttime").innerText = n)
            }, updateDuration: function () {
                var e = this, t = e.getDuration();
                (isNaN(t) || t === 1 / 0 || t < 0) && (e.media.duration = e.options.duration = t = 0), e.options.duration > 0 && (t = e.options.duration);
                var n = (0, s.secondsToTimeCode)(t, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond, e.options.secondsDecimalLength, e.options.timeFormat);
                n.length > 5 ? (0, l.addClass)(e.getElement(e.container), e.options.classPrefix + "long-video") : (0, l.removeClass)(e.getElement(e.container), e.options.classPrefix + "long-video"), e.getElement(e.controls).querySelector("." + e.options.classPrefix + "duration") && t > 0 && (e.getElement(e.controls).querySelector("." + e.options.classPrefix + "duration").innerHTML = n)
            }
        })
    }, {16: 16, 2: 2, 26: 26, 30: 30}], 13: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = o(e(7)), a = o(e(5)), s = e(16), l = o(s), d = e(30), u = e(27), c = e(26);
        Object.assign(s.config, {
            startLanguage: "",
            tracksText: null,
            chaptersText: null,
            tracksAriaLive: !1,
            hideCaptionsButtonWhenEmpty: !0,
            toggleCaptionsButtonWhenOnlyOne: !1,
            slidesSelector: ""
        }), Object.assign(l.default.prototype, {
            hasChapters: !1, buildtracks: function (e, t, n, o) {
                if (this.findTracks(), e.tracks.length || e.trackFiles && 0 !== !e.trackFiles.length) {
                    var r = this,
                        s = r.options.tracksAriaLive ? ' role="log" aria-live="assertive" aria-atomic="false"' : "",
                        l = (0, u.isString)(r.options.tracksText) ? r.options.tracksText : a.default.t("mejs.captions-subtitles"),
                        d = (0, u.isString)(r.options.chaptersText) ? r.options.chaptersText : a.default.t("mejs.captions-chapters"),
                        f = null === e.trackFiles ? e.tracks.length : e.trackFiles.length;
                    if (r.domNode.textTracks) for (var p = r.domNode.textTracks.length - 1; p >= 0; p--) r.domNode.textTracks[p].mode = "hidden";
                    r.cleartracks(e), e.captions = i.default.createElement("div"), e.captions.className = r.options.classPrefix + "captions-layer " + r.options.classPrefix + "layer", e.captions.innerHTML = '<div class="' + r.options.classPrefix + "captions-position " + r.options.classPrefix + 'captions-position-hover"' + s + '><span class="' + r.options.classPrefix + 'captions-text"></span></div>', e.captions.style.display = "none", n.insertBefore(e.captions, n.firstChild), e.captionsText = e.captions.querySelector("." + r.options.classPrefix + "captions-text"), e.captionsButton = i.default.createElement("div"), e.captionsButton.className = r.options.classPrefix + "button " + r.options.classPrefix + "captions-button", e.captionsButton.innerHTML = '<button type="button" aria-controls="' + r.id + '" title="' + l + '" aria-label="' + l + '" tabindex="0"></button><div class="' + r.options.classPrefix + "captions-selector " + r.options.classPrefix + 'offscreen"><ul class="' + r.options.classPrefix + 'captions-selector-list"><li class="' + r.options.classPrefix + 'captions-selector-list-item"><input type="radio" class="' + r.options.classPrefix + 'captions-selector-input" name="' + e.id + '_captions" id="' + e.id + '_captions_none" value="none" checked disabled><label class="' + r.options.classPrefix + "captions-selector-label " + r.options.classPrefix + 'captions-selected" for="' + e.id + '_captions_none">' + a.default.t("mejs.none") + "</label></li></ul></div>", r.addControlElement(e.captionsButton, "tracks"), e.captionsButton.querySelector("." + r.options.classPrefix + "captions-selector-input").disabled = !1, e.chaptersButton = i.default.createElement("div"), e.chaptersButton.className = r.options.classPrefix + "button " + r.options.classPrefix + "chapters-button", e.chaptersButton.innerHTML = '<button type="button" aria-controls="' + r.id + '" title="' + d + '" aria-label="' + d + '" tabindex="0"></button><div class="' + r.options.classPrefix + "chapters-selector " + r.options.classPrefix + 'offscreen"><ul class="' + r.options.classPrefix + 'chapters-selector-list"></ul></div>';
                    for (var m = 0, h = 0; h < f; h++) {
                        var v = e.tracks[h].kind;
                        e.tracks[h].src.trim() && ("subtitles" === v || "captions" === v ? m++ : "chapters" !== v || t.querySelector("." + r.options.classPrefix + "chapter-selector") || e.captionsButton.parentNode.insertBefore(e.chaptersButton, e.captionsButton))
                    }
                    e.trackToLoad = -1, e.selectedTrack = null, e.isLoadingTrack = !1;
                    for (var g = 0; g < f; g++) {
                        var y = e.tracks[g].kind;
                        !e.tracks[g].src.trim() || "subtitles" !== y && "captions" !== y || e.addTrackButton(e.tracks[g].trackId, e.tracks[g].srclang, e.tracks[g].label)
                    }
                    e.loadNextTrack();
                    var E = ["mouseenter", "focusin"], b = ["mouseleave", "focusout"];
                    if (r.options.toggleCaptionsButtonWhenOnlyOne && 1 === m) e.captionsButton.addEventListener("click", function (t) {
                        var n = "none";
                        null === e.selectedTrack && (n = e.tracks[0].trackId);
                        var o = t.keyCode || t.which;
                        e.setTrack(n, void 0 !== o)
                    }); else {
                        for (var S = e.captionsButton.querySelectorAll("." + r.options.classPrefix + "captions-selector-label"), x = e.captionsButton.querySelectorAll("input[type=radio]"), w = 0, P = E.length; w < P; w++) e.captionsButton.addEventListener(E[w], function () {
                            (0, c.removeClass)(this.querySelector("." + r.options.classPrefix + "captions-selector"), r.options.classPrefix + "offscreen")
                        });
                        for (var T = 0, C = b.length; T < C; T++) e.captionsButton.addEventListener(b[T], function () {
                            (0, c.addClass)(this.querySelector("." + r.options.classPrefix + "captions-selector"), r.options.classPrefix + "offscreen")
                        });
                        for (var k = 0, _ = x.length; k < _; k++) x[k].addEventListener("click", function (t) {
                            var n = t.keyCode || t.which;
                            e.setTrack(this.value, void 0 !== n)
                        });
                        for (var N = 0, A = S.length; N < A; N++) S[N].addEventListener("click", function (e) {
                            var t = (0, c.siblings)(this, function (e) {
                                return "INPUT" === e.tagName
                            })[0], n = (0, u.createEvent)("click", t);
                            t.dispatchEvent(n), e.preventDefault()
                        });
                        e.captionsButton.addEventListener("keydown", function (e) {
                            e.stopPropagation()
                        })
                    }
                    for (var L = 0, F = E.length; L < F; L++) e.chaptersButton.addEventListener(E[L], function () {
                        this.querySelector("." + r.options.classPrefix + "chapters-selector-list").children.length && (0, c.removeClass)(this.querySelector("." + r.options.classPrefix + "chapters-selector"), r.options.classPrefix + "offscreen")
                    });
                    for (var j = 0, I = b.length; j < I; j++) e.chaptersButton.addEventListener(b[j], function () {
                        (0, c.addClass)(this.querySelector("." + r.options.classPrefix + "chapters-selector"), r.options.classPrefix + "offscreen")
                    });
                    e.chaptersButton.addEventListener("keydown", function (e) {
                        e.stopPropagation()
                    }), e.options.alwaysShowControls ? (0, c.addClass)(e.getElement(e.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover") : (e.getElement(e.container).addEventListener("controlsshown", function () {
                        (0, c.addClass)(e.getElement(e.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover")
                    }), e.getElement(e.container).addEventListener("controlshidden", function () {
                        o.paused || (0, c.removeClass)(e.getElement(e.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover")
                    })), o.addEventListener("timeupdate", function () {
                        e.displayCaptions()
                    }), "" !== e.options.slidesSelector && (e.slidesContainer = i.default.querySelectorAll(e.options.slidesSelector), o.addEventListener("timeupdate", function () {
                        e.displaySlides()
                    }))
                }
            }, cleartracks: function (e) {
                e && (e.captions && e.captions.remove(), e.chapters && e.chapters.remove(), e.captionsText && e.captionsText.remove(), e.captionsButton && e.captionsButton.remove(), e.chaptersButton && e.chaptersButton.remove())
            }, rebuildtracks: function () {
                var e = this;
                e.findTracks(), e.buildtracks(e, e.getElement(e.controls), e.getElement(e.layers), e.media)
            }, findTracks: function () {
                var e = this, t = null === e.trackFiles ? e.node.querySelectorAll("track") : e.trackFiles, n = t.length;
                e.tracks = [];
                for (var o = 0; o < n; o++) {
                    var i = t[o], r = i.getAttribute("srclang").toLowerCase() || "",
                        a = e.id + "_track_" + o + "_" + i.getAttribute("kind") + "_" + r;
                    e.tracks.push({
                        trackId: a,
                        srclang: r,
                        src: i.getAttribute("src"),
                        kind: i.getAttribute("kind"),
                        label: i.getAttribute("label") || "",
                        entries: [],
                        isLoaded: !1
                    })
                }
            }, setTrack: function (e, t) {
                for (var n = this, o = n.captionsButton.querySelectorAll('input[type="radio"]'), i = n.captionsButton.querySelectorAll("." + n.options.classPrefix + "captions-selected"), r = n.captionsButton.querySelector('input[value="' + e + '"]'), a = 0, s = o.length; a < s; a++) o[a].checked = !1;
                for (var l = 0, d = i.length; l < d; l++) (0, c.removeClass)(i[l], n.options.classPrefix + "captions-selected");
                r.checked = !0;
                for (var f = (0, c.siblings)(r, function (e) {
                    return (0, c.hasClass)(e, n.options.classPrefix + "captions-selector-label")
                }), p = 0, m = f.length; p < m; p++) (0, c.addClass)(f[p], n.options.classPrefix + "captions-selected");
                if ("none" === e) n.selectedTrack = null, (0, c.removeClass)(n.captionsButton, n.options.classPrefix + "captions-enabled"); else for (var h = 0, v = n.tracks.length; h < v; h++) {
                    var g = n.tracks[h];
                    if (g.trackId === e) {
                        null === n.selectedTrack && (0, c.addClass)(n.captionsButton, n.options.classPrefix + "captions-enabled"), n.selectedTrack = g, n.captions.setAttribute("lang", n.selectedTrack.srclang), n.displayCaptions();
                        break
                    }
                }
                var y = (0, u.createEvent)("captionschange", n.media);
                y.detail.caption = n.selectedTrack, n.media.dispatchEvent(y), t || setTimeout(function () {
                    n.getElement(n.container).focus()
                }, 500)
            }, loadNextTrack: function () {
                var e = this;
                e.trackToLoad++, e.trackToLoad < e.tracks.length ? (e.isLoadingTrack = !0, e.loadTrack(e.trackToLoad)) : (e.isLoadingTrack = !1, e.checkForTracks())
            }, loadTrack: function (e) {
                var t = this, n = t.tracks[e];
                void 0 === n || void 0 === n.src && "" === n.src || (0, c.ajax)(n.src, "text", function (e) {
                    n.entries = "string" == typeof e && /<tt\s+xml/gi.exec(e) ? r.default.TrackFormatParser.dfxp.parse(e) : r.default.TrackFormatParser.webvtt.parse(e), n.isLoaded = !0, t.enableTrackButton(n), t.loadNextTrack(), "slides" === n.kind ? t.setupSlides(n) : "chapters" !== n.kind || t.hasChapters || (t.drawChapters(n), t.hasChapters = !0)
                }, function () {
                    t.removeTrackButton(n.trackId), t.loadNextTrack()
                })
            }, enableTrackButton: function (e) {
                var t = this, n = e.srclang, o = i.default.getElementById("" + e.trackId);
                if (o) {
                    var s = e.label;
                    "" === s && (s = a.default.t(r.default.language.codes[n]) || n), o.disabled = !1;
                    for (var l = (0, c.siblings)(o, function (e) {
                        return (0, c.hasClass)(e, t.options.classPrefix + "captions-selector-label")
                    }), d = 0, f = l.length; d < f; d++) l[d].innerHTML = s;
                    if (t.options.startLanguage === n) {
                        o.checked = !0;
                        var p = (0, u.createEvent)("click", o);
                        o.dispatchEvent(p)
                    }
                }
            }, removeTrackButton: function (e) {
                var t = i.default.getElementById("" + e);
                if (t) {
                    var n = t.closest("li");
                    n && n.remove()
                }
            }, addTrackButton: function (e, t, n) {
                var o = this;
                "" === n && (n = a.default.t(r.default.language.codes[t]) || t), o.captionsButton.querySelector("ul").innerHTML += '<li class="' + o.options.classPrefix + 'captions-selector-list-item"><input type="radio" class="' + o.options.classPrefix + 'captions-selector-input" name="' + o.id + '_captions" id="' + e + '" value="' + e + '" disabled><label class="' + o.options.classPrefix + 'captions-selector-label"for="' + e + '">' + n + " (loading)</label></li>"
            }, checkForTracks: function () {
                var e = this, t = !1;
                if (e.options.hideCaptionsButtonWhenEmpty) {
                    for (var n = 0, o = e.tracks.length; n < o; n++) {
                        var i = e.tracks[n].kind;
                        if (("subtitles" === i || "captions" === i) && e.tracks[n].isLoaded) {
                            t = !0;
                            break
                        }
                    }
                    e.captionsButton.style.display = t ? "" : "none", e.setControlsSize()
                }
            }, displayCaptions: function () {
                if (void 0 !== this.tracks) {
                    var e = this, t = e.selectedTrack;
                    if (null !== t && t.isLoaded) {
                        var n = e.searchTrackPosition(t.entries, e.media.currentTime);
                        if (n > -1) return e.captionsText.innerHTML = function (e) {
                            var t = i.default.createElement("div");
                            t.innerHTML = e;
                            for (var n = t.getElementsByTagName("script"), o = n.length; o--;) n[o].remove();
                            for (var r = t.getElementsByTagName("*"), a = 0, s = r.length; a < s; a++) for (var l = r[a].attributes, d = Array.prototype.slice.call(l), u = 0, c = d.length; u < c; u++) d[u].name.startsWith("on") || d[u].value.startsWith("javascript") ? r[a].remove() : "style" === d[u].name && r[a].removeAttribute(d[u].name);
                            return t.innerHTML
                        }(t.entries[n].text), e.captionsText.className = e.options.classPrefix + "captions-text " + (t.entries[n].identifier || ""), e.captions.style.display = "", void (e.captions.style.height = "0px");
                        e.captions.style.display = "none"
                    } else e.captions.style.display = "none"
                }
            }, setupSlides: function (e) {
                var t = this;
                t.slides = e, t.slides.entries.imgs = [t.slides.entries.length], t.showSlide(0)
            }, showSlide: function (e) {
                var t = this, n = this;
                if (void 0 !== n.tracks && void 0 !== n.slidesContainer) {
                    var o = n.slides.entries[e].text, r = n.slides.entries[e].imgs;
                    if (void 0 === r || void 0 === r.fadeIn) {
                        var a = i.default.createElement("img");
                        a.src = o, a.addEventListener("load", function () {
                            var e = t, o = (0, c.siblings)(e, function (e) {
                                return o(e)
                            });
                            e.style.display = "none", n.slidesContainer.innerHTML += e.innerHTML, (0, c.fadeIn)(n.slidesContainer.querySelector(a));
                            for (var i = 0, r = o.length; i < r; i++) (0, c.fadeOut)(o[i], 400)
                        }), n.slides.entries[e].imgs = r = a
                    } else if (!(0, c.visible)(r)) {
                        var s = (0, c.siblings)(self, function (e) {
                            return s(e)
                        });
                        (0, c.fadeIn)(n.slidesContainer.querySelector(r));
                        for (var l = 0, d = s.length; l < d; l++) (0, c.fadeOut)(s[l])
                    }
                }
            }, displaySlides: function () {
                var e = this;
                if (void 0 !== this.slides) {
                    var t = e.slides, n = e.searchTrackPosition(t.entries, e.media.currentTime);
                    n > -1 && e.showSlide(n)
                }
            }, drawChapters: function (e) {
                var t = this, n = e.entries.length;
                if (n) {
                    t.chaptersButton.querySelector("ul").innerHTML = "";
                    for (var o = 0; o < n; o++) t.chaptersButton.querySelector("ul").innerHTML += '<li class="' + t.options.classPrefix + 'chapters-selector-list-item" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false"><input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" name="' + t.id + '_chapters" id="' + t.id + "_chapters_" + o + '" value="' + e.entries[o].start + '" disabled><label class="' + t.options.classPrefix + 'chapters-selector-label"for="' + t.id + "_chapters_" + o + '">' + e.entries[o].text + "</label></li>";
                    for (var i = t.chaptersButton.querySelectorAll('input[type="radio"]'), r = t.chaptersButton.querySelectorAll("." + t.options.classPrefix + "chapters-selector-label"), a = 0, s = i.length; a < s; a++) i[a].disabled = !1, i[a].checked = !1, i[a].addEventListener("click", function (e) {
                        var n = this, o = t.chaptersButton.querySelectorAll("li"), i = (0, c.siblings)(n, function (e) {
                            return (0, c.hasClass)(e, t.options.classPrefix + "chapters-selector-label")
                        })[0];
                        n.checked = !0, n.parentNode.setAttribute("aria-checked", !0), (0, c.addClass)(i, t.options.classPrefix + "chapters-selected"), (0, c.removeClass)(t.chaptersButton.querySelector("." + t.options.classPrefix + "chapters-selected"), t.options.classPrefix + "chapters-selected");
                        for (var r = 0, a = o.length; r < a; r++) o[r].setAttribute("aria-checked", !1);
                        void 0 === (e.keyCode || e.which) && setTimeout(function () {
                            t.getElement(t.container).focus()
                        }, 500), t.media.setCurrentTime(parseFloat(n.value)), t.media.paused && t.media.play()
                    });
                    for (var l = 0, d = r.length; l < d; l++) r[l].addEventListener("click", function (e) {
                        var t = (0, c.siblings)(this, function (e) {
                            return "INPUT" === e.tagName
                        })[0], n = (0, u.createEvent)("click", t);
                        t.dispatchEvent(n), e.preventDefault()
                    })
                }
            }, searchTrackPosition: function (e, t) {
                for (var n = 0, o = e.length - 1, i = void 0, r = void 0, a = void 0; n <= o;) {
                    if (i = n + o >> 1, r = e[i].start, a = e[i].stop, t >= r && t < a) return i;
                    r < t ? n = i + 1 : r > t && (o = i - 1)
                }
                return -1
            }
        }), r.default.language = {
            codes: {
                af: "mejs.afrikaans",
                sq: "mejs.albanian",
                ar: "mejs.arabic",
                be: "mejs.belarusian",
                bg: "mejs.bulgarian",
                ca: "mejs.catalan",
                zh: "mejs.chinese",
                "zh-cn": "mejs.chinese-simplified",
                "zh-tw": "mejs.chines-traditional",
                hr: "mejs.croatian",
                cs: "mejs.czech",
                da: "mejs.danish",
                nl: "mejs.dutch",
                en: "mejs.english",
                et: "mejs.estonian",
                fl: "mejs.filipino",
                fi: "mejs.finnish",
                fr: "mejs.french",
                gl: "mejs.galician",
                de: "mejs.german",
                el: "mejs.greek",
                ht: "mejs.haitian-creole",
                iw: "mejs.hebrew",
                hi: "mejs.hindi",
                hu: "mejs.hungarian",
                is: "mejs.icelandic",
                id: "mejs.indonesian",
                ga: "mejs.irish",
                it: "mejs.italian",
                ja: "mejs.japanese",
                ko: "mejs.korean",
                lv: "mejs.latvian",
                lt: "mejs.lithuanian",
                mk: "mejs.macedonian",
                ms: "mejs.malay",
                mt: "mejs.maltese",
                no: "mejs.norwegian",
                fa: "mejs.persian",
                pl: "mejs.polish",
                pt: "mejs.portuguese",
                ro: "mejs.romanian",
                ru: "mejs.russian",
                sr: "mejs.serbian",
                sk: "mejs.slovak",
                sl: "mejs.slovenian",
                es: "mejs.spanish",
                sw: "mejs.swahili",
                sv: "mejs.swedish",
                tl: "mejs.tagalog",
                th: "mejs.thai",
                tr: "mejs.turkish",
                uk: "mejs.ukrainian",
                vi: "mejs.vietnamese",
                cy: "mejs.welsh",
                yi: "mejs.yiddish"
            }
        }, r.default.TrackFormatParser = {
            webvtt: {
                pattern: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
                parse: function (e) {
                    for (var t = e.split(/\r?\n/), n = [], o = void 0, i = void 0, r = void 0, a = 0, s = t.length; a < s; a++) {
                        if ((o = this.pattern.exec(t[a])) && a < t.length) {
                            for (a - 1 >= 0 && "" !== t[a - 1] && (r = t[a - 1]), i = t[++a], a++; "" !== t[a] && a < t.length;) i = i + "\n" + t[a], a++;
                            i = i.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), n.push({
                                identifier: r,
                                start: 0 === (0, d.convertSMPTEtoSeconds)(o[1]) ? .2 : (0, d.convertSMPTEtoSeconds)(o[1]),
                                stop: (0, d.convertSMPTEtoSeconds)(o[3]),
                                text: i,
                                settings: o[5]
                            })
                        }
                        r = ""
                    }
                    return n
                }
            }, dfxp: {
                parse: function (e) {
                    var t = (e = $(e).filter("tt")).firstChild, n = t.querySelectorAll("p"),
                        o = e.getElementById("" + t.attr("style")), i = [], r = void 0;
                    if (o.length) {
                        o.removeAttribute("id");
                        var a = o.attributes;
                        if (a.length) {
                            r = {};
                            for (var s = 0, l = a.length; s < l; s++) r[a[s].name.split(":")[1]] = a[s].value
                        }
                    }
                    for (var u = 0, c = n.length; u < c; u++) {
                        var f = void 0, p = {start: null, stop: null, style: null, text: null};
                        if (n.eq(u).attr("begin") && (p.start = (0, d.convertSMPTEtoSeconds)(n.eq(u).attr("begin"))), !p.start && n.eq(u - 1).attr("end") && (p.start = (0, d.convertSMPTEtoSeconds)(n.eq(u - 1).attr("end"))), n.eq(u).attr("end") && (p.stop = (0, d.convertSMPTEtoSeconds)(n.eq(u).attr("end"))), !p.stop && n.eq(u + 1).attr("begin") && (p.stop = (0, d.convertSMPTEtoSeconds)(n.eq(u + 1).attr("begin"))), r) {
                            f = "";
                            for (var m in r) f += m + ":" + r[m] + ";"
                        }
                        f && (p.style = f), 0 === p.start && (p.start = .2), p.text = n.eq(u).innerHTML.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), i.push(p)
                    }
                    return i
                }
            }
        }
    }, {16: 16, 2: 2, 26: 26, 27: 27, 30: 30, 5: 5, 7: 7}], 14: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = e(16), a = o(r), s = o(e(5)), l = e(25), d = e(27), u = e(26);
        Object.assign(r.config, {
            muteText: null,
            unmuteText: null,
            allyVolumeControlText: null,
            hideVolumeOnTouchDevices: !0,
            audioVolume: "horizontal",
            videoVolume: "vertical",
            startVolume: .8
        }), Object.assign(a.default.prototype, {
            buildvolume: function (e, t, n, o) {
                if (!l.IS_ANDROID && !l.IS_IOS || !this.options.hideVolumeOnTouchDevices) {
                    var a = this, c = a.isVideo ? a.options.videoVolume : a.options.audioVolume,
                        f = (0, d.isString)(a.options.muteText) ? a.options.muteText : s.default.t("mejs.mute"),
                        p = (0, d.isString)(a.options.unmuteText) ? a.options.unmuteText : s.default.t("mejs.unmute"),
                        m = (0, d.isString)(a.options.allyVolumeControlText) ? a.options.allyVolumeControlText : s.default.t("mejs.volume-help-text"),
                        h = i.default.createElement("div");
                    if (h.className = a.options.classPrefix + "button " + a.options.classPrefix + "volume-button " + a.options.classPrefix + "mute", h.innerHTML = "horizontal" === c ? '<button type="button" aria-controls="' + a.id + '" title="' + f + '" aria-label="' + f + '" tabindex="0"></button>' : '<button type="button" aria-controls="' + a.id + '" title="' + f + '" aria-label="' + f + '" tabindex="0"></button><a href="javascript:void(0);" class="' + a.options.classPrefix + 'volume-slider" aria-label="' + s.default.t("mejs.volume-slider") + '" aria-valuemin="0" aria-valuemax="100" role="slider" aria-orientation="vertical"><span class="' + a.options.classPrefix + 'offscreen">' + m + '</span><div class="' + a.options.classPrefix + 'volume-total"><div class="' + a.options.classPrefix + 'volume-current"></div><div class="' + a.options.classPrefix + 'volume-handle"></div></div></a>', a.addControlElement(h, "volume"), a.options.keyActions.push({
                        keys: [38],
                        action: function (e) {
                            var t = e.getElement(e.container).querySelector("." + r.config.classPrefix + "volume-slider");
                            (t || e.getElement(e.container).querySelector("." + r.config.classPrefix + "volume-slider").matches(":focus")) && (t.style.display = "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                            var n = Math.min(e.volume + .1, 1);
                            e.setVolume(n), n > 0 && e.setMuted(!1)
                        }
                    }, {
                        keys: [40], action: function (e) {
                            var t = e.getElement(e.container).querySelector("." + r.config.classPrefix + "volume-slider");
                            t && (t.style.display = "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                            var n = Math.max(e.volume - .1, 0);
                            e.setVolume(n), n <= .1 && e.setMuted(!0)
                        }
                    }, {
                        keys: [77], action: function (e) {
                            e.getElement(e.container).querySelector("." + r.config.classPrefix + "volume-slider").style.display = "block", e.isVideo && (e.showControls(), e.startControlsTimer()), e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
                        }
                    }), "horizontal" === c) {
                        var v = i.default.createElement("a");
                        v.className = a.options.classPrefix + "horizontal-volume-slider", v.href = "javascript:void(0);", v.setAttribute("aria-label", s.default.t("mejs.volume-slider")), v.setAttribute("aria-valuemin", 0), v.setAttribute("aria-valuemax", 100), v.setAttribute("role", "slider"), v.innerHTML += '<span class="' + a.options.classPrefix + 'offscreen">' + m + '</span><div class="' + a.options.classPrefix + 'horizontal-volume-total"><div class="' + a.options.classPrefix + 'horizontal-volume-current"></div><div class="' + a.options.classPrefix + 'horizontal-volume-handle"></div></div>', h.parentNode.insertBefore(v, h.nextSibling)
                    }
                    var g = !1, y = !1, E = !1, b = function () {
                            var e = Math.floor(100 * o.volume);
                            S.setAttribute("aria-valuenow", e), S.setAttribute("aria-valuetext", e + "%")
                        },
                        S = "vertical" === c ? a.getElement(a.container).querySelector("." + a.options.classPrefix + "volume-slider") : a.getElement(a.container).querySelector("." + a.options.classPrefix + "horizontal-volume-slider"),
                        x = "vertical" === c ? a.getElement(a.container).querySelector("." + a.options.classPrefix + "volume-total") : a.getElement(a.container).querySelector("." + a.options.classPrefix + "horizontal-volume-total"),
                        w = "vertical" === c ? a.getElement(a.container).querySelector("." + a.options.classPrefix + "volume-current") : a.getElement(a.container).querySelector("." + a.options.classPrefix + "horizontal-volume-current"),
                        P = "vertical" === c ? a.getElement(a.container).querySelector("." + a.options.classPrefix + "volume-handle") : a.getElement(a.container).querySelector("." + a.options.classPrefix + "horizontal-volume-handle"),
                        T = function (e) {
                            if (null !== e && !isNaN(e) && void 0 !== e) {
                                if (e = Math.max(0, e), 0 === (e = Math.min(e, 1))) {
                                    (0, u.removeClass)(h, a.options.classPrefix + "mute"), (0, u.addClass)(h, a.options.classPrefix + "unmute");
                                    var t = h.firstElementChild;
                                    t.setAttribute("title", p), t.setAttribute("aria-label", p)
                                } else {
                                    (0, u.removeClass)(h, a.options.classPrefix + "unmute"), (0, u.addClass)(h, a.options.classPrefix + "mute");
                                    var n = h.firstElementChild;
                                    n.setAttribute("title", f), n.setAttribute("aria-label", f)
                                }
                                var o = 100 * e + "%", i = getComputedStyle(P);
                                "vertical" === c ? (w.style.bottom = 0, w.style.height = o, P.style.bottom = o, P.style.marginBottom = -parseFloat(i.height) / 2 + "px") : (w.style.left = 0, w.style.width = o, P.style.left = o, P.style.marginLeft = -parseFloat(i.width) / 2 + "px")
                            }
                        }, C = function (e) {
                            var t = (0, u.offset)(x), n = getComputedStyle(x);
                            E = !0;
                            var o = null;
                            if ("vertical" === c) {
                                var i = parseFloat(n.height);
                                if (o = (i - (e.pageY - t.top)) / i, 0 === t.top || 0 === t.left) return
                            } else {
                                var r = parseFloat(n.width);
                                o = (e.pageX - t.left) / r
                            }
                            o = Math.max(0, o), o = Math.min(o, 1), T(o), a.setMuted(0 === o), a.setVolume(o), e.preventDefault(), e.stopPropagation()
                        }, k = function () {
                            a.muted ? (T(0), (0, u.removeClass)(h, a.options.classPrefix + "mute"), (0, u.addClass)(h, a.options.classPrefix + "unmute")) : (T(o.volume), (0, u.removeClass)(h, a.options.classPrefix + "unmute"), (0, u.addClass)(h, a.options.classPrefix + "mute"))
                        };
                    e.getElement(e.container).addEventListener("keydown", function (e) {
                        !!e.target.closest("." + a.options.classPrefix + "container") || "vertical" !== c || (S.style.display = "none")
                    }), h.addEventListener("mouseenter", function (e) {
                        e.target === h && (S.style.display = "block", y = !0, e.preventDefault(), e.stopPropagation())
                    }), h.addEventListener("focusin", function () {
                        S.style.display = "block", y = !0
                    }), h.addEventListener("focusout", function (e) {
                        e.relatedTarget && (!e.relatedTarget || e.relatedTarget.matches("." + a.options.classPrefix + "volume-slider")) || "vertical" !== c || (S.style.display = "none")
                    }), h.addEventListener("mouseleave", function () {
                        y = !1, g || "vertical" !== c || (S.style.display = "none")
                    }), h.addEventListener("focusout", function () {
                        y = !1
                    }), h.addEventListener("keydown", function (e) {
                        if (a.options.keyActions.length) {
                            var t = e.which || e.keyCode || 0, n = o.volume;
                            switch (t) {
                                case 38:
                                    n = Math.min(n + .1, 1);
                                    break;
                                case 40:
                                    n = Math.max(0, n - .1);
                                    break;
                                default:
                                    return !0
                            }
                            g = !1, T(n), o.setVolume(n), e.preventDefault(), e.stopPropagation()
                        }
                    }), h.querySelector("button").addEventListener("click", function () {
                        o.setMuted(!o.muted);
                        var e = (0, d.createEvent)("volumechange", o);
                        o.dispatchEvent(e)
                    }), S.addEventListener("dragstart", function () {
                        return !1
                    }), S.addEventListener("mouseover", function () {
                        y = !0
                    }), S.addEventListener("focusin", function () {
                        S.style.display = "block", y = !0
                    }), S.addEventListener("focusout", function () {
                        y = !1, g || "vertical" !== c || (S.style.display = "none")
                    }), S.addEventListener("mousedown", function (e) {
                        C(e), a.globalBind("mousemove.vol", function (e) {
                            var t = e.target;
                            g && (t === S || t.closest("vertical" === c ? "." + a.options.classPrefix + "volume-slider" : "." + a.options.classPrefix + "horizontal-volume-slider")) && C(e)
                        }), a.globalBind("mouseup.vol", function () {
                            g = !1, y || "vertical" !== c || (S.style.display = "none")
                        }), g = !0, e.preventDefault(), e.stopPropagation()
                    }), o.addEventListener("volumechange", function (e) {
                        g || k(), b()
                    });
                    var _ = !1;
                    o.addEventListener("rendererready", function () {
                        E || setTimeout(function () {
                            _ = !0, (0 === e.options.startVolume || o.originalNode.muted) && (o.setMuted(!0), e.options.startVolume = 0), o.setVolume(e.options.startVolume), a.setControlsSize()
                        }, 250)
                    }), o.addEventListener("loadedmetadata", function () {
                        setTimeout(function () {
                            E || _ || ((0 === e.options.startVolume || o.originalNode.muted) && (o.setMuted(!0), e.options.startVolume = 0), o.setVolume(e.options.startVolume), a.setControlsSize()), _ = !1
                        }, 250)
                    }), (0 === e.options.startVolume || o.originalNode.muted) && (o.setMuted(!0), e.options.startVolume = 0, k()), a.getElement(a.container).addEventListener("controlsresize", function () {
                        k()
                    })
                }
            }
        })
    }, {16: 16, 2: 2, 25: 25, 26: 26, 27: 27, 5: 5}], 15: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        n.EN = {
            "mejs.plural-form": 1,
            "mejs.download-file": "Download File",
            "mejs.install-flash": "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/",
            "mejs.fullscreen": "Fullscreen",
            "mejs.play": "Play",
            "mejs.pause": "Pause",
            "mejs.time-slider": "Time Slider",
            "mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",
            "mejs.live-broadcast": "Live Broadcast",
            "mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
            "mejs.unmute": "Unmute",
            "mejs.mute": "Mute",
            "mejs.volume-slider": "Volume Slider",
            "mejs.video-player": "Video Player",
            "mejs.audio-player": "Audio Player",
            "mejs.captions-subtitles": "Captions/Subtitles",
            "mejs.captions-chapters": "Chapters",
            "mejs.none": "None",
            "mejs.afrikaans": "Afrikaans",
            "mejs.albanian": "Albanian",
            "mejs.arabic": "Arabic",
            "mejs.belarusian": "Belarusian",
            "mejs.bulgarian": "Bulgarian",
            "mejs.catalan": "Catalan",
            "mejs.chinese": "Chinese",
            "mejs.chinese-simplified": "Chinese (Simplified)",
            "mejs.chinese-traditional": "Chinese (Traditional)",
            "mejs.croatian": "Croatian",
            "mejs.czech": "Czech",
            "mejs.danish": "Danish",
            "mejs.dutch": "Dutch",
            "mejs.english": "English",
            "mejs.estonian": "Estonian",
            "mejs.filipino": "Filipino",
            "mejs.finnish": "Finnish",
            "mejs.french": "French",
            "mejs.galician": "Galician",
            "mejs.german": "German",
            "mejs.greek": "Greek",
            "mejs.haitian-creole": "Haitian Creole",
            "mejs.hebrew": "Hebrew",
            "mejs.hindi": "Hindi",
            "mejs.hungarian": "Hungarian",
            "mejs.icelandic": "Icelandic",
            "mejs.indonesian": "Indonesian",
            "mejs.irish": "Irish",
            "mejs.italian": "Italian",
            "mejs.japanese": "Japanese",
            "mejs.korean": "Korean",
            "mejs.latvian": "Latvian",
            "mejs.lithuanian": "Lithuanian",
            "mejs.macedonian": "Macedonian",
            "mejs.malay": "Malay",
            "mejs.maltese": "Maltese",
            "mejs.norwegian": "Norwegian",
            "mejs.persian": "Persian",
            "mejs.polish": "Polish",
            "mejs.portuguese": "Portuguese",
            "mejs.romanian": "Romanian",
            "mejs.russian": "Russian",
            "mejs.serbian": "Serbian",
            "mejs.slovak": "Slovak",
            "mejs.slovenian": "Slovenian",
            "mejs.spanish": "Spanish",
            "mejs.swahili": "Swahili",
            "mejs.swedish": "Swedish",
            "mejs.tagalog": "Tagalog",
            "mejs.thai": "Thai",
            "mejs.turkish": "Turkish",
            "mejs.ukrainian": "Ukrainian",
            "mejs.vietnamese": "Vietnamese",
            "mejs.welsh": "Welsh",
            "mejs.yiddish": "Yiddish"
        }
    }, {}], 16: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.config = void 0;
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, a = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }

                return function (t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(), s = o(e(3)), l = o(e(2)), d = o(e(7)), u = o(e(6)), c = o(e(17)), f = o(e(5)), p = e(25), m = e(27),
            h = e(30), v = e(28), g = function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }(e(26));
        d.default.mepIndex = 0, d.default.players = {};
        var y = n.config = {
            poster: "",
            showPosterWhenEnded: !1,
            showPosterWhenPaused: !1,
            defaultVideoWidth: 480,
            defaultVideoHeight: 270,
            videoWidth: -1,
            videoHeight: -1,
            defaultAudioWidth: 400,
            defaultAudioHeight: 40,
            defaultSeekBackwardInterval: function (e) {
                return .05 * e.getDuration()
            },
            defaultSeekForwardInterval: function (e) {
                return .05 * e.getDuration()
            },
            setDimensions: !0,
            audioWidth: -1,
            audioHeight: -1,
            loop: !1,
            autoRewind: !0,
            enableAutosize: !0,
            timeFormat: "",
            alwaysShowHours: !1,
            showTimecodeFrameCount: !1,
            framesPerSecond: 25,
            alwaysShowControls: !1,
            hideVideoControlsOnLoad: !1,
            hideVideoControlsOnPause: !1,
            clickToPlayPause: !0,
            controlsTimeoutDefault: 1500,
            controlsTimeoutMouseEnter: 2500,
            controlsTimeoutMouseLeave: 1e3,
            iPadUseNativeControls: !1,
            iPhoneUseNativeControls: !1,
            AndroidUseNativeControls: !1,
            features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
            useDefaultControls: !1,
            isVideo: !0,
            stretching: "auto",
            classPrefix: "mejs__",
            enableKeyboard: !0,
            pauseOtherPlayers: !0,
            secondsDecimalLength: 0,
            customError: null,
            keyActions: [{
                keys: [32, 179], action: function (e) {
                    p.IS_FIREFOX || (e.paused || e.ended ? e.play() : e.pause())
                }
            }]
        };
        d.default.MepDefaults = y;
        var E = function () {
            function e(t, n) {
                i(this, e);
                var o = this, r = "string" == typeof t ? l.default.getElementById(t) : t;
                if (!(o instanceof e)) return new e(r, n);
                if (o.node = o.media = r, o.node) {
                    if (o.media.player) return o.media.player;
                    if (o.hasFocus = !1, o.controlsAreVisible = !0, o.controlsEnabled = !0, o.controlsTimer = null, o.currentMediaTime = 0, o.proxy = null, void 0 === n) {
                        var a = o.node.getAttribute("data-mejsoptions");
                        n = a ? JSON.parse(a) : {}
                    }
                    return o.options = Object.assign({}, y, n), o.options.loop && !o.media.getAttribute("loop") ? (o.media.loop = !0, o.node.loop = !0) : o.media.loop && (o.options.loop = !0), o.options.timeFormat || (o.options.timeFormat = "mm:ss", o.options.alwaysShowHours && (o.options.timeFormat = "hh:mm:ss"), o.options.showTimecodeFrameCount && (o.options.timeFormat += ":ff")), (0, h.calculateTimeFormat)(0, o.options, o.options.framesPerSecond || 25), o.id = "mep_" + d.default.mepIndex++, d.default.players[o.id] = o, o.init(), o
                }
            }

            return a(e, [{
                key: "getElement", value: function (e) {
                    return e
                }
            }, {
                key: "init", value: function () {
                    var e = this, t = Object.assign({}, e.options, {
                        success: function (t, n) {
                            e._meReady(t, n)
                        }, error: function (t) {
                            e._handleError(t)
                        }
                    }), n = e.node.tagName.toLowerCase();
                    if (e.isDynamic = "audio" !== n && "video" !== n && "iframe" !== n, e.isVideo = e.isDynamic ? e.options.isVideo : "audio" !== n && e.options.isVideo, e.mediaFiles = null, e.trackFiles = null, p.IS_IPAD && e.options.iPadUseNativeControls || p.IS_IPHONE && e.options.iPhoneUseNativeControls) e.node.setAttribute("controls", !0), p.IS_IPAD && e.node.getAttribute("autoplay") && e.play(); else if (!e.isVideo && (e.isVideo || !e.options.features.length && !e.options.useDefaultControls) || p.IS_ANDROID && e.options.AndroidUseNativeControls) e.isVideo || e.options.features.length || e.options.useDefaultControls || (e.node.style.display = "none"); else {
                        e.node.removeAttribute("controls");
                        var o = e.isVideo ? f.default.t("mejs.video-player") : f.default.t("mejs.audio-player"),
                            i = l.default.createElement("span");
                        if (i.className = e.options.classPrefix + "offscreen", i.innerText = o, e.media.parentNode.insertBefore(i, e.media), e.container = l.default.createElement("div"), e.getElement(e.container).id = e.id, e.getElement(e.container).className = e.options.classPrefix + "container " + e.options.classPrefix + "container-keyboard-inactive " + e.media.className, e.getElement(e.container).tabIndex = 0, e.getElement(e.container).setAttribute("role", "application"), e.getElement(e.container).setAttribute("aria-label", o), e.getElement(e.container).innerHTML = '<div class="' + e.options.classPrefix + 'inner"><div class="' + e.options.classPrefix + 'mediaelement"></div><div class="' + e.options.classPrefix + 'layers"></div><div class="' + e.options.classPrefix + 'controls"></div></div>', e.getElement(e.container).addEventListener("focus", function (t) {
                            if (!e.controlsAreVisible && !e.hasFocus && e.controlsEnabled) {
                                e.showControls(!0);
                                var n = (0, m.isNodeAfter)(t.relatedTarget, e.getElement(e.container)) ? "." + e.options.classPrefix + "controls ." + e.options.classPrefix + "button:last-child > button" : "." + e.options.classPrefix + "playpause-button > button";
                                e.getElement(e.container).querySelector(n).focus()
                            }
                        }), e.node.parentNode.insertBefore(e.getElement(e.container), e.node), e.options.features.length || e.options.useDefaultControls || (e.getElement(e.container).style.background = "transparent", e.getElement(e.container).querySelector("." + e.options.classPrefix + "controls").style.display = "none"), e.isVideo && "fill" === e.options.stretching && !g.hasClass(e.getElement(e.container).parentNode, e.options.classPrefix + "fill-container")) {
                            e.outerContainer = e.media.parentNode;
                            var r = l.default.createElement("div");
                            r.className = e.options.classPrefix + "fill-container", e.getElement(e.container).parentNode.insertBefore(r, e.getElement(e.container)), r.appendChild(e.getElement(e.container))
                        }
                        if (p.IS_ANDROID && g.addClass(e.getElement(e.container), e.options.classPrefix + "android"), p.IS_IOS && g.addClass(e.getElement(e.container), e.options.classPrefix + "ios"), p.IS_IPAD && g.addClass(e.getElement(e.container), e.options.classPrefix + "ipad"), p.IS_IPHONE && g.addClass(e.getElement(e.container), e.options.classPrefix + "iphone"), g.addClass(e.getElement(e.container), e.isVideo ? e.options.classPrefix + "video" : e.options.classPrefix + "audio"), p.IS_SAFARI && !p.IS_IOS) {
                            g.addClass(e.getElement(e.container), e.options.classPrefix + "hide-cues");
                            for (var a = e.node.cloneNode(), s = e.node.children, c = [], h = [], y = 0, E = s.length; y < E; y++) {
                                var b = s[y];
                                !function () {
                                    switch (b.tagName.toLowerCase()) {
                                        case"source":
                                            var e = {};
                                            Array.prototype.slice.call(b.attributes).forEach(function (t) {
                                                e[t.name] = t.value
                                            }), e.type = (0, v.formatType)(e.src, e.type), c.push(e);
                                            break;
                                        case"track":
                                            b.mode = "hidden", h.push(b);
                                            break;
                                        default:
                                            a.appendChild(b)
                                    }
                                }()
                            }
                            e.node.remove(), e.node = e.media = a, c.length && (e.mediaFiles = c), h.length && (e.trackFiles = h)
                        }
                        e.getElement(e.container).querySelector("." + e.options.classPrefix + "mediaelement").appendChild(e.node), e.media.player = e, e.controls = e.getElement(e.container).querySelector("." + e.options.classPrefix + "controls"), e.layers = e.getElement(e.container).querySelector("." + e.options.classPrefix + "layers");
                        var S = e.isVideo ? "video" : "audio", x = S.substring(0, 1).toUpperCase() + S.substring(1);
                        e.options[S + "Width"] > 0 || e.options[S + "Width"].toString().indexOf("%") > -1 ? e.width = e.options[S + "Width"] : "" !== e.node.style.width && null !== e.node.style.width ? e.width = e.node.style.width : e.node.getAttribute("width") ? e.width = e.node.getAttribute("width") : e.width = e.options["default" + x + "Width"], e.options[S + "Height"] > 0 || e.options[S + "Height"].toString().indexOf("%") > -1 ? e.height = e.options[S + "Height"] : "" !== e.node.style.height && null !== e.node.style.height ? e.height = e.node.style.height : e.node.getAttribute("height") ? e.height = e.node.getAttribute("height") : e.height = e.options["default" + x + "Height"], e.initialAspectRatio = e.height >= e.width ? e.width / e.height : e.height / e.width, e.setPlayerSize(e.width, e.height), t.pluginWidth = e.width, t.pluginHeight = e.height
                    }
                    if (d.default.MepDefaults = t, new u.default(e.media, t, e.mediaFiles), void 0 !== e.getElement(e.container) && e.options.features.length && e.controlsAreVisible && !e.options.hideVideoControlsOnLoad) {
                        var w = (0, m.createEvent)("controlsshown", e.getElement(e.container));
                        e.getElement(e.container).dispatchEvent(w)
                    }
                }
            }, {
                key: "showControls", value: function (e) {
                    var t = this;
                    if (e = void 0 === e || e, !t.controlsAreVisible && t.isVideo) {
                        if (e) !function () {
                            g.fadeIn(t.getElement(t.controls), 200, function () {
                                g.removeClass(t.getElement(t.controls), t.options.classPrefix + "offscreen");
                                var e = (0, m.createEvent)("controlsshown", t.getElement(t.container));
                                t.getElement(t.container).dispatchEvent(e)
                            });
                            for (var e = t.getElement(t.container).querySelectorAll("." + t.options.classPrefix + "control"), n = 0, o = e.length; n < o; n++) !function (n, o) {
                                g.fadeIn(e[n], 200, function () {
                                    g.removeClass(e[n], t.options.classPrefix + "offscreen")
                                })
                            }(n)
                        }(); else {
                            g.removeClass(t.getElement(t.controls), t.options.classPrefix + "offscreen"), t.getElement(t.controls).style.display = "", t.getElement(t.controls).style.opacity = 1;
                            for (var n = t.getElement(t.container).querySelectorAll("." + t.options.classPrefix + "control"), o = 0, i = n.length; o < i; o++) g.removeClass(n[o], t.options.classPrefix + "offscreen"), n[o].style.display = "";
                            var r = (0, m.createEvent)("controlsshown", t.getElement(t.container));
                            t.getElement(t.container).dispatchEvent(r)
                        }
                        t.controlsAreVisible = !0, t.setControlsSize()
                    }
                }
            }, {
                key: "hideControls", value: function (e, t) {
                    var n = this;
                    if (e = void 0 === e || e, !0 === t || !(!n.controlsAreVisible || n.options.alwaysShowControls || n.paused && 4 === n.readyState && (!n.options.hideVideoControlsOnLoad && n.currentTime <= 0 || !n.options.hideVideoControlsOnPause && n.currentTime > 0) || n.isVideo && !n.options.hideVideoControlsOnLoad && !n.readyState || n.ended)) {
                        if (e) !function () {
                            g.fadeOut(n.getElement(n.controls), 200, function () {
                                g.addClass(n.getElement(n.controls), n.options.classPrefix + "offscreen"), n.getElement(n.controls).style.display = "";
                                var e = (0, m.createEvent)("controlshidden", n.getElement(n.container));
                                n.getElement(n.container).dispatchEvent(e)
                            });
                            for (var e = n.getElement(n.container).querySelectorAll("." + n.options.classPrefix + "control"), t = 0, o = e.length; t < o; t++) !function (t, o) {
                                g.fadeOut(e[t], 200, function () {
                                    g.addClass(e[t], n.options.classPrefix + "offscreen"), e[t].style.display = ""
                                })
                            }(t)
                        }(); else {
                            g.addClass(n.getElement(n.controls), n.options.classPrefix + "offscreen"), n.getElement(n.controls).style.display = "", n.getElement(n.controls).style.opacity = 0;
                            for (var o = n.getElement(n.container).querySelectorAll("." + n.options.classPrefix + "control"), i = 0, r = o.length; i < r; i++) g.addClass(o[i], n.options.classPrefix + "offscreen"), o[i].style.display = "";
                            var a = (0, m.createEvent)("controlshidden", n.getElement(n.container));
                            n.getElement(n.container).dispatchEvent(a)
                        }
                        n.controlsAreVisible = !1
                    }
                }
            }, {
                key: "startControlsTimer", value: function (e) {
                    var t = this;
                    e = void 0 !== e ? e : t.options.controlsTimeoutDefault, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function () {
                        t.hideControls(), t.killControlsTimer("hide")
                    }, e)
                }
            }, {
                key: "killControlsTimer", value: function () {
                    var e = this;
                    null !== e.controlsTimer && (clearTimeout(e.controlsTimer), delete e.controlsTimer, e.controlsTimer = null)
                }
            }, {
                key: "disableControls", value: function () {
                    var e = this;
                    e.killControlsTimer(), e.controlsEnabled = !1, e.hideControls(!1, !0)
                }
            }, {
                key: "enableControls", value: function () {
                    var e = this;
                    e.controlsEnabled = !0, e.showControls(!1)
                }
            }, {
                key: "_setDefaultPlayer", value: function () {
                    var e = this;
                    e.proxy && e.proxy.pause(), e.proxy = new c.default(e), e.media.addEventListener("loadedmetadata", function () {
                        e.getCurrentTime() > 0 && e.currentMediaTime > 0 && (e.setCurrentTime(e.currentMediaTime), p.IS_IOS || p.IS_ANDROID || e.play())
                    })
                }
            }, {
                key: "_meReady", value: function (e, t) {
                    var n = this, o = t.getAttribute("autoplay"), i = !(void 0 === o || null === o || "false" === o),
                        r = null !== e.rendererName && /(native|html5)/i.test(n.media.rendererName);
                    if (n.getElement(n.controls) && n.enableControls(), n.getElement(n.container) && n.getElement(n.container).querySelector("." + n.options.classPrefix + "overlay-play") && (n.getElement(n.container).querySelector("." + n.options.classPrefix + "overlay-play").style.display = ""), !n.created) {
                        if (n.created = !0, n.media = e, n.domNode = t, !(p.IS_ANDROID && n.options.AndroidUseNativeControls || p.IS_IPAD && n.options.iPadUseNativeControls || p.IS_IPHONE && n.options.iPhoneUseNativeControls)) {
                            if (!n.isVideo && !n.options.features.length && !n.options.useDefaultControls) return i && r && n.play(), void (n.options.success && ("string" == typeof n.options.success ? s.default[n.options.success](n.media, n.domNode, n) : n.options.success(n.media, n.domNode, n)));
                            if (n.featurePosition = {}, n._setDefaultPlayer(), n.buildposter(n, n.getElement(n.controls), n.getElement(n.layers), n.media), n.buildkeyboard(n, n.getElement(n.controls), n.getElement(n.layers), n.media), n.buildoverlays(n, n.getElement(n.controls), n.getElement(n.layers), n.media), n.options.useDefaultControls) {
                                var a = ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"];
                                n.options.features = a.concat(n.options.features.filter(function (e) {
                                    return -1 === a.indexOf(e)
                                }))
                            }
                            n.buildfeatures(n, n.getElement(n.controls), n.getElement(n.layers), n.media);
                            var u = (0, m.createEvent)("controlsready", n.getElement(n.container));
                            n.getElement(n.container).dispatchEvent(u), n.setPlayerSize(n.width, n.height), n.setControlsSize(), n.isVideo && (n.clickToPlayPauseCallback = function () {
                                if (n.options.clickToPlayPause) {
                                    var e = n.getElement(n.container).querySelector("." + n.options.classPrefix + "overlay-button"),
                                        t = e.getAttribute("aria-pressed");
                                    n.paused && t ? n.pause() : n.paused ? n.play() : n.pause(), e.setAttribute("aria-pressed", !t), n.getElement(n.container).focus()
                                }
                            }, n.createIframeLayer(), n.media.addEventListener("click", n.clickToPlayPauseCallback), !p.IS_ANDROID && !p.IS_IOS || n.options.alwaysShowControls ? (n.getElement(n.container).addEventListener("mouseenter", function () {
                                n.controlsEnabled && (n.options.alwaysShowControls || (n.killControlsTimer("enter"), n.showControls(), n.startControlsTimer(n.options.controlsTimeoutMouseEnter)))
                            }), n.getElement(n.container).addEventListener("mousemove", function () {
                                n.controlsEnabled && (n.controlsAreVisible || n.showControls(), n.options.alwaysShowControls || n.startControlsTimer(n.options.controlsTimeoutMouseEnter))
                            }), n.getElement(n.container).addEventListener("mouseleave", function () {
                                n.controlsEnabled && (n.paused || n.options.alwaysShowControls || n.startControlsTimer(n.options.controlsTimeoutMouseLeave))
                            })) : n.node.addEventListener("touchstart", function () {
                                n.controlsAreVisible ? n.hideControls(!1) : n.controlsEnabled && n.showControls(!1)
                            }, !!p.SUPPORT_PASSIVE_EVENT && {passive: !0}), n.options.hideVideoControlsOnLoad && n.hideControls(!1), n.options.enableAutosize && n.media.addEventListener("loadedmetadata", function (e) {
                                var t = void 0 !== e ? e.detail.target || e.target : n.media;
                                n.options.videoHeight <= 0 && !n.domNode.getAttribute("height") && !n.domNode.style.height && null !== t && !isNaN(t.videoHeight) && (n.setPlayerSize(t.videoWidth, t.videoHeight), n.setControlsSize(), n.media.setSize(t.videoWidth, t.videoHeight))
                            })), n.media.addEventListener("play", function () {
                                n.hasFocus = !0;
                                for (var e in d.default.players) if (d.default.players.hasOwnProperty(e)) {
                                    var t = d.default.players[e];
                                    t.id === n.id || !n.options.pauseOtherPlayers || t.paused || t.ended || (t.pause(), t.hasFocus = !1)
                                }
                                p.IS_ANDROID || p.IS_IOS || n.options.alwaysShowControls || !n.isVideo || n.hideControls()
                            }), n.media.addEventListener("ended", function () {
                                if (n.options.autoRewind) try {
                                    n.setCurrentTime(0), setTimeout(function () {
                                        var e = n.getElement(n.container).querySelector("." + n.options.classPrefix + "overlay-loading");
                                        e && e.parentNode && (e.parentNode.style.display = "none")
                                    }, 20)
                                } catch (e) {
                                }
                                "function" == typeof n.media.renderer.stop ? n.media.renderer.stop() : n.pause(), n.setProgressRail && n.setProgressRail(), n.setCurrentRail && n.setCurrentRail(), n.options.loop ? n.play() : !n.options.alwaysShowControls && n.controlsEnabled && n.showControls()
                            }), n.media.addEventListener("loadedmetadata", function () {
                                (0, h.calculateTimeFormat)(n.getDuration(), n.options, n.options.framesPerSecond || 25), n.updateDuration && n.updateDuration(), n.updateCurrent && n.updateCurrent(), n.isFullScreen || (n.setPlayerSize(n.width, n.height), n.setControlsSize())
                            });
                            var c = null;
                            n.media.addEventListener("timeupdate", function () {
                                isNaN(n.getDuration()) || c === n.getDuration() || (c = n.getDuration(), (0, h.calculateTimeFormat)(c, n.options, n.options.framesPerSecond || 25), n.updateDuration && n.updateDuration(), n.updateCurrent && n.updateCurrent(), n.setControlsSize())
                            }), n.getElement(n.container).addEventListener("click", function (e) {
                                g.addClass(e.currentTarget, n.options.classPrefix + "container-keyboard-inactive")
                            }), n.getElement(n.container).addEventListener("focusin", function (e) {
                                g.removeClass(e.currentTarget, n.options.classPrefix + "container-keyboard-inactive"), !n.isVideo || p.IS_ANDROID || p.IS_IOS || !n.controlsEnabled || n.options.alwaysShowControls || (n.killControlsTimer("enter"), n.showControls(), n.startControlsTimer(n.options.controlsTimeoutMouseEnter))
                            }), n.getElement(n.container).addEventListener("focusout", function (e) {
                                setTimeout(function () {
                                    e.relatedTarget && n.keyboardAction && !e.relatedTarget.closest("." + n.options.classPrefix + "container") && (n.keyboardAction = !1, !n.isVideo || n.options.alwaysShowControls || n.paused || n.startControlsTimer(n.options.controlsTimeoutMouseLeave))
                                }, 0)
                            }), setTimeout(function () {
                                n.setPlayerSize(n.width, n.height), n.setControlsSize()
                            }, 0), n.globalResizeCallback = function () {
                                n.isFullScreen || p.HAS_TRUE_NATIVE_FULLSCREEN && l.default.webkitIsFullScreen || n.setPlayerSize(n.width, n.height), n.setControlsSize()
                            }, n.globalBind("resize", n.globalResizeCallback)
                        }
                        i && r && n.play(), n.options.success && ("string" == typeof n.options.success ? s.default[n.options.success](n.media, n.domNode, n) : n.options.success(n.media, n.domNode, n))
                    }
                }
            }, {
                key: "_handleError", value: function (e, t, n) {
                    var o = this,
                        i = o.getElement(o.layers).querySelector("." + o.options.classPrefix + "overlay-play");
                    i && (i.style.display = "none"), o.options.error && o.options.error(e, t, n), o.getElement(o.container).querySelector("." + o.options.classPrefix + "cannotplay") && o.getElement(o.container).querySelector("." + o.options.classPrefix + "cannotplay").remove();
                    var r = l.default.createElement("div");
                    r.className = o.options.classPrefix + "cannotplay", r.style.width = "100%", r.style.height = "100%";
                    var a = "function" == typeof o.options.customError ? o.options.customError(o.media, o.media.originalNode) : o.options.customError,
                        s = "";
                    if (!a) {
                        var u = o.media.originalNode.getAttribute("poster");
                        if (u && (s = '<img src="' + u + '" alt="' + d.default.i18n.t("mejs.download-file") + '">'), e.message && (a = "<p>" + e.message + "</p>"), e.urls) for (var c = 0, f = e.urls.length; c < f; c++) {
                            var p = e.urls[c];
                            a += '<a href="' + p.src + '" data-type="' + p.type + '"><span>' + d.default.i18n.t("mejs.download-file") + ": " + p.src + "</span></a>"
                        }
                    }
                    a && o.getElement(o.layers).querySelector("." + o.options.classPrefix + "overlay-error") && (r.innerHTML = a, o.getElement(o.layers).querySelector("." + o.options.classPrefix + "overlay-error").innerHTML = "" + s + r.outerHTML, o.getElement(o.layers).querySelector("." + o.options.classPrefix + "overlay-error").parentNode.style.display = "block"), o.controlsEnabled && o.disableControls()
                }
            }, {
                key: "setPlayerSize", value: function (e, t) {
                    var n = this;
                    if (!n.options.setDimensions) return !1;
                    switch (void 0 !== e && (n.width = e), void 0 !== t && (n.height = t), n.options.stretching) {
                        case"fill":
                            n.isVideo ? n.setFillMode() : n.setDimensions(n.width, n.height);
                            break;
                        case"responsive":
                            n.setResponsiveMode();
                            break;
                        case"none":
                            n.setDimensions(n.width, n.height);
                            break;
                        default:
                            !0 === n.hasFluidMode() ? n.setResponsiveMode() : n.setDimensions(n.width, n.height)
                    }
                }
            }, {
                key: "hasFluidMode", value: function () {
                    var e = this;
                    return -1 !== e.height.toString().indexOf("%") || e.node && e.node.style.maxWidth && "none" !== e.node.style.maxWidth && e.node.style.maxWidth !== e.width || e.node && e.node.currentStyle && "100%" === e.node.currentStyle.maxWidth
                }
            }, {
                key: "setResponsiveMode", value: function () {
                    var e = this, t = function () {
                            for (var t = void 0, n = e.getElement(e.container); n;) {
                                try {
                                    if (p.IS_FIREFOX && "html" === n.tagName.toLowerCase() && s.default.self !== s.default.top && null !== s.default.frameElement) return s.default.frameElement;
                                    t = n.parentElement
                                } catch (e) {
                                    t = n.parentElement
                                }
                                if (t && g.visible(t)) return t;
                                n = t
                            }
                            return null
                        }(), n = t ? getComputedStyle(t, null) : getComputedStyle(l.default.body, null),
                        o = e.isVideo ? e.node.videoWidth && e.node.videoWidth > 0 ? e.node.videoWidth : e.node.getAttribute("width") ? e.node.getAttribute("width") : e.options.defaultVideoWidth : e.options.defaultAudioWidth,
                        i = e.isVideo ? e.node.videoHeight && e.node.videoHeight > 0 ? e.node.videoHeight : e.node.getAttribute("height") ? e.node.getAttribute("height") : e.options.defaultVideoHeight : e.options.defaultAudioHeight,
                        r = function () {
                            var t = 1;
                            return e.isVideo ? (t = e.node.videoWidth && e.node.videoWidth > 0 && e.node.videoHeight && e.node.videoHeight > 0 ? e.height >= e.width ? e.node.videoWidth / e.node.videoHeight : e.node.videoHeight / e.node.videoWidth : e.initialAspectRatio, (isNaN(t) || t < .01 || t > 100) && (t = 1), t) : t
                        }(), a = parseFloat(n.height), d = void 0, u = parseFloat(n.width);
                    if (d = e.isVideo ? "100%" === e.height ? parseFloat(u * i / o, 10) : e.height >= e.width ? parseFloat(u / r, 10) : parseFloat(u * r, 10) : i, isNaN(d) && (d = a), e.getElement(e.container).parentNode.length > 0 && "body" === e.getElement(e.container).parentNode.tagName.toLowerCase() && (u = s.default.innerWidth || l.default.documentElement.clientWidth || l.default.body.clientWidth, d = s.default.innerHeight || l.default.documentElement.clientHeight || l.default.body.clientHeight), d && u) {
                        e.getElement(e.container).style.width = u + "px", e.getElement(e.container).style.height = d + "px", e.node.style.width = "100%", e.node.style.height = "100%", e.isVideo && e.media.setSize && e.media.setSize(u, d);
                        for (var c = e.getElement(e.layers).children, f = 0, m = c.length; f < m; f++) c[f].style.width = "100%", c[f].style.height = "100%"
                    }
                }
            }, {
                key: "setFillMode", value: function () {
                    var e = this, t = s.default.self !== s.default.top && null !== s.default.frameElement,
                        n = function () {
                            for (var t = void 0, n = e.getElement(e.container); n;) {
                                try {
                                    if (p.IS_FIREFOX && "html" === n.tagName.toLowerCase() && s.default.self !== s.default.top && null !== s.default.frameElement) return s.default.frameElement;
                                    t = n.parentElement
                                } catch (e) {
                                    t = n.parentElement
                                }
                                if (t && g.visible(t)) return t;
                                n = t
                            }
                            return null
                        }(), o = n ? getComputedStyle(n, null) : getComputedStyle(l.default.body, null);
                    "none" !== e.node.style.height && e.node.style.height !== e.height && (e.node.style.height = "auto"), "none" !== e.node.style.maxWidth && e.node.style.maxWidth !== e.width && (e.node.style.maxWidth = "none"), "none" !== e.node.style.maxHeight && e.node.style.maxHeight !== e.height && (e.node.style.maxHeight = "none"), e.node.currentStyle && ("100%" === e.node.currentStyle.height && (e.node.currentStyle.height = "auto"), "100%" === e.node.currentStyle.maxWidth && (e.node.currentStyle.maxWidth = "none"), "100%" === e.node.currentStyle.maxHeight && (e.node.currentStyle.maxHeight = "none")), t || parseFloat(o.width) || (n.style.width = e.media.offsetWidth + "px"), t || parseFloat(o.height) || (n.style.height = e.media.offsetHeight + "px"), o = getComputedStyle(n);
                    var i = parseFloat(o.width), r = parseFloat(o.height);
                    e.setDimensions("100%", "100%");
                    var a = e.getElement(e.container).querySelector("." + e.options.classPrefix + "poster>img");
                    a && (a.style.display = "");
                    for (var d = e.getElement(e.container).querySelectorAll("object, embed, iframe, video"), u = e.height, c = e.width, f = i, m = u * i / c, h = c * r / u, v = r, y = h > i == !1, E = y ? Math.floor(f) : Math.floor(h), b = y ? Math.floor(m) : Math.floor(v), S = y ? i + "px" : E + "px", x = y ? b + "px" : r + "px", w = 0, P = d.length; w < P; w++) d[w].style.height = x, d[w].style.width = S, e.media.setSize && e.media.setSize(S, x), d[w].style.marginLeft = Math.floor((i - E) / 2) + "px", d[w].style.marginTop = 0
                }
            }, {
                key: "setDimensions", value: function (e, t) {
                    var n = this;
                    e = (0, m.isString)(e) && e.indexOf("%") > -1 ? e : parseFloat(e) + "px", t = (0, m.isString)(t) && t.indexOf("%") > -1 ? t : parseFloat(t) + "px", n.getElement(n.container).style.width = e, n.getElement(n.container).style.height = t;
                    for (var o = n.getElement(n.layers).children, i = 0, r = o.length; i < r; i++) o[i].style.width = e, o[i].style.height = t
                }
            }, {
                key: "setControlsSize", value: function () {
                    var e = this;
                    if (g.visible(e.getElement(e.container))) if (e.rail && g.visible(e.rail)) {
                        for (var t = e.total ? getComputedStyle(e.total, null) : null, n = t ? parseFloat(t.marginLeft) + parseFloat(t.marginRight) : 0, o = getComputedStyle(e.rail), i = parseFloat(o.marginLeft) + parseFloat(o.marginRight), r = 0, a = g.siblings(e.rail, function (t) {
                            return t !== e.rail
                        }), s = a.length, l = 0; l < s; l++) r += a[l].offsetWidth;
                        r += n + (0 === n ? 2 * i : i) + 1, e.getElement(e.container).style.minWidth = r + "px";
                        var d = (0, m.createEvent)("controlsresize", e.getElement(e.container));
                        e.getElement(e.container).dispatchEvent(d)
                    } else {
                        for (var u = e.getElement(e.controls).children, c = 0, f = 0, p = u.length; f < p; f++) c += u[f].offsetWidth;
                        e.getElement(e.container).style.minWidth = c + "px"
                    }
                }
            }, {
                key: "addControlElement", value: function (e, t) {
                    var n = this;
                    if (void 0 !== n.featurePosition[t]) {
                        var o = n.getElement(n.controls).children[n.featurePosition[t] - 1];
                        o.parentNode.insertBefore(e, o.nextSibling)
                    } else {
                        n.getElement(n.controls).appendChild(e);
                        for (var i = n.getElement(n.controls).children, r = 0, a = i.length; r < a; r++) if (e === i[r]) {
                            n.featurePosition[t] = r;
                            break
                        }
                    }
                }
            }, {
                key: "createIframeLayer", value: function () {
                    var e = this;
                    if (e.isVideo && null !== e.media.rendererName && e.media.rendererName.indexOf("iframe") > -1 && !l.default.getElementById(e.media.id + "-iframe-overlay")) {
                        var t = l.default.createElement("div"),
                            n = l.default.getElementById(e.media.id + "_" + e.media.rendererName);
                        t.id = e.media.id + "-iframe-overlay", t.className = e.options.classPrefix + "iframe-overlay", t.addEventListener("click", function (t) {
                            e.options.clickToPlayPause && (e.paused ? e.play() : e.pause(), t.preventDefault(), t.stopPropagation())
                        }), n.parentNode.insertBefore(t, n)
                    }
                }
            }, {
                key: "resetSize", value: function () {
                    var e = this;
                    setTimeout(function () {
                        e.setPlayerSize(e.width, e.height), e.setControlsSize()
                    }, 50)
                }
            }, {
                key: "setPoster", value: function (e) {
                    var t = this;
                    if (t.getElement(t.container)) {
                        var n = t.getElement(t.container).querySelector("." + t.options.classPrefix + "poster");
                        n || ((n = l.default.createElement("div")).className = t.options.classPrefix + "poster " + t.options.classPrefix + "layer", t.getElement(t.layers).appendChild(n));
                        var o = n.querySelector("img");
                        !o && e && ((o = l.default.createElement("img")).className = t.options.classPrefix + "poster-img", o.width = "100%", o.height = "100%", n.style.display = "", n.appendChild(o)), e ? (o.setAttribute("src", e), n.style.backgroundImage = 'url("' + e + '")', n.style.display = "") : o ? (n.style.backgroundImage = "none", n.style.display = "none", o.remove()) : n.style.display = "none"
                    } else (p.IS_IPAD && t.options.iPadUseNativeControls || p.IS_IPHONE && t.options.iPhoneUseNativeControls || p.IS_ANDROID && t.options.AndroidUseNativeControls) && (t.media.originalNode.poster = e)
                }
            }, {
                key: "changeSkin", value: function (e) {
                    var t = this;
                    t.getElement(t.container).className = t.options.classPrefix + "container " + e, t.setPlayerSize(t.width, t.height), t.setControlsSize()
                }
            }, {
                key: "globalBind", value: function (e, t) {
                    var n = this, o = n.node ? n.node.ownerDocument : l.default;
                    if ((e = (0, m.splitEvents)(e, n.id)).d) for (var i = e.d.split(" "), r = 0, a = i.length; r < a; r++) i[r].split(".").reduce(function (e, n) {
                        return o.addEventListener(n, t, !1), n
                    }, "");
                    if (e.w) for (var d = e.w.split(" "), u = 0, c = d.length; u < c; u++) d[u].split(".").reduce(function (e, n) {
                        return s.default.addEventListener(n, t, !1), n
                    }, "")
                }
            }, {
                key: "globalUnbind", value: function (e, t) {
                    var n = this, o = n.node ? n.node.ownerDocument : l.default;
                    if ((e = (0, m.splitEvents)(e, n.id)).d) for (var i = e.d.split(" "), r = 0, a = i.length; r < a; r++) i[r].split(".").reduce(function (e, n) {
                        return o.removeEventListener(n, t, !1), n
                    }, "");
                    if (e.w) for (var d = e.w.split(" "), u = 0, c = d.length; u < c; u++) d[u].split(".").reduce(function (e, n) {
                        return s.default.removeEventListener(n, t, !1), n
                    }, "")
                }
            }, {
                key: "buildfeatures", value: function (e, t, n, o) {
                    for (var i = this, r = 0, a = i.options.features.length; r < a; r++) {
                        var s = i.options.features[r];
                        if (i["build" + s]) try {
                            i["build" + s](e, t, n, o)
                        } catch (e) {
                            console.error("error building " + s, e)
                        }
                    }
                }
            }, {
                key: "buildposter", value: function (e, t, n, o) {
                    var i = this, r = l.default.createElement("div");
                    r.className = i.options.classPrefix + "poster " + i.options.classPrefix + "layer", n.appendChild(r);
                    var a = o.originalNode.getAttribute("poster");
                    "" !== e.options.poster && (a && p.IS_IOS && o.originalNode.removeAttribute("poster"), a = e.options.poster), a ? i.setPoster(a) : null !== i.media.renderer && "function" == typeof i.media.renderer.getPosterUrl ? i.setPoster(i.media.renderer.getPosterUrl()) : r.style.display = "none", o.addEventListener("play", function () {
                        r.style.display = "none"
                    }), o.addEventListener("playing", function () {
                        r.style.display = "none"
                    }), e.options.showPosterWhenEnded && e.options.autoRewind && o.addEventListener("ended", function () {
                        r.style.display = ""
                    }), o.addEventListener("error", function () {
                        r.style.display = "none"
                    }), e.options.showPosterWhenPaused && o.addEventListener("pause", function () {
                        e.ended || (r.style.display = "")
                    })
                }
            }, {
                key: "buildoverlays", value: function (e, t, n, o) {
                    if (e.isVideo) {
                        var i = this, r = l.default.createElement("div"), a = l.default.createElement("div"),
                            s = l.default.createElement("div");
                        r.style.display = "none", r.className = i.options.classPrefix + "overlay " + i.options.classPrefix + "layer", r.innerHTML = '<div class="' + i.options.classPrefix + 'overlay-loading"><span class="' + i.options.classPrefix + 'overlay-loading-bg-img"></span></div>', n.appendChild(r), a.style.display = "none", a.className = i.options.classPrefix + "overlay " + i.options.classPrefix + "layer", a.innerHTML = '<div class="' + i.options.classPrefix + 'overlay-error"></div>', n.appendChild(a), s.className = i.options.classPrefix + "overlay " + i.options.classPrefix + "layer " + i.options.classPrefix + "overlay-play", s.innerHTML = '<div class="' + i.options.classPrefix + 'overlay-button" role="button" tabindex="0" aria-label="' + f.default.t("mejs.play") + '" aria-pressed="false"></div>', s.addEventListener("click", function () {
                            if (i.options.clickToPlayPause) {
                                var e = i.getElement(i.container).querySelector("." + i.options.classPrefix + "overlay-button"),
                                    t = e.getAttribute("aria-pressed");
                                i.paused ? i.play() : i.pause(), e.setAttribute("aria-pressed", !!t), i.getElement(i.container).focus()
                            }
                        }), s.addEventListener("keydown", function (e) {
                            var t = e.keyCode || e.which || 0;
                            if (13 === t || p.IS_FIREFOX && 32 === t) {
                                var n = (0, m.createEvent)("click", s);
                                return s.dispatchEvent(n), !1
                            }
                        }), n.appendChild(s), null !== i.media.rendererName && (/(youtube|facebook)/i.test(i.media.rendererName) && !(i.media.originalNode.getAttribute("poster") || e.options.poster || "function" == typeof i.media.renderer.getPosterUrl && i.media.renderer.getPosterUrl()) || p.IS_STOCK_ANDROID || i.media.originalNode.getAttribute("autoplay")) && (s.style.display = "none");
                        var d = !1;
                        o.addEventListener("play", function () {
                            s.style.display = "none", r.style.display = "none", a.style.display = "none", d = !1
                        }), o.addEventListener("playing", function () {
                            s.style.display = "none", r.style.display = "none", a.style.display = "none", d = !1
                        }), o.addEventListener("seeking", function () {
                            s.style.display = "none", r.style.display = "", d = !1
                        }), o.addEventListener("seeked", function () {
                            s.style.display = i.paused && !p.IS_STOCK_ANDROID ? "" : "none", r.style.display = "none", d = !1
                        }), o.addEventListener("pause", function () {
                            r.style.display = "none", p.IS_STOCK_ANDROID || d || (s.style.display = ""), d = !1
                        }), o.addEventListener("waiting", function () {
                            r.style.display = "", d = !1
                        }), o.addEventListener("loadeddata", function () {
                            r.style.display = "", p.IS_ANDROID && (o.canplayTimeout = setTimeout(function () {
                                if (l.default.createEvent) {
                                    var e = l.default.createEvent("HTMLEvents");
                                    return e.initEvent("canplay", !0, !0), o.dispatchEvent(e)
                                }
                            }, 300)), d = !1
                        }), o.addEventListener("canplay", function () {
                            r.style.display = "none", clearTimeout(o.canplayTimeout), d = !1
                        }), o.addEventListener("error", function (e) {
                            i._handleError(e, i.media, i.node), r.style.display = "none", s.style.display = "none", d = !0
                        }), o.addEventListener("loadedmetadata", function () {
                            i.controlsEnabled || i.enableControls()
                        }), o.addEventListener("keydown", function (t) {
                            i.onkeydown(e, o, t), d = !1
                        })
                    }
                }
            }, {
                key: "buildkeyboard", value: function (e, t, n, o) {
                    var i = this;
                    i.getElement(i.container).addEventListener("keydown", function () {
                        i.keyboardAction = !0
                    }), i.globalKeydownCallback = function (t) {
                        var n = l.default.activeElement.closest("." + i.options.classPrefix + "container"),
                            r = i.media.closest("." + i.options.classPrefix + "container");
                        return i.hasFocus = !(!n || !r || n.id !== r.id), i.onkeydown(e, o, t)
                    }, i.globalClickCallback = function (e) {
                        i.hasFocus = !!e.target.closest("." + i.options.classPrefix + "container")
                    }, i.globalBind("keydown", i.globalKeydownCallback), i.globalBind("click", i.globalClickCallback)
                }
            }, {
                key: "onkeydown", value: function (e, t, n) {
                    if (e.hasFocus && e.options.enableKeyboard) for (var o = 0, i = e.options.keyActions.length; o < i; o++) for (var r = e.options.keyActions[o], a = 0, s = r.keys.length; a < s; a++) if (n.keyCode === r.keys[a]) return r.action(e, t, n.keyCode, n), n.preventDefault(), void n.stopPropagation();
                    return !0
                }
            }, {
                key: "play", value: function () {
                    this.proxy.play()
                }
            }, {
                key: "pause", value: function () {
                    this.proxy.pause()
                }
            }, {
                key: "load", value: function () {
                    this.proxy.load()
                }
            }, {
                key: "setCurrentTime", value: function (e) {
                    this.proxy.setCurrentTime(e)
                }
            }, {
                key: "getCurrentTime", value: function () {
                    return this.proxy.currentTime
                }
            }, {
                key: "getDuration", value: function () {
                    return this.proxy.duration
                }
            }, {
                key: "setVolume", value: function (e) {
                    this.proxy.volume = e
                }
            }, {
                key: "getVolume", value: function () {
                    return this.proxy.getVolume()
                }
            }, {
                key: "setMuted", value: function (e) {
                    this.proxy.setMuted(e)
                }
            }, {
                key: "setSrc", value: function (e) {
                    this.controlsEnabled || this.enableControls(), this.proxy.setSrc(e)
                }
            }, {
                key: "getSrc", value: function () {
                    return this.proxy.getSrc()
                }
            }, {
                key: "canPlayType", value: function (e) {
                    return this.proxy.canPlayType(e)
                }
            }, {
                key: "remove", value: function () {
                    var e = this, t = e.media.rendererName, n = e.media.originalNode.src;
                    for (var o in e.options.features) {
                        var i = e.options.features[o];
                        if (e["clean" + i]) try {
                            e["clean" + i](e, e.getElement(e.layers), e.getElement(e.controls), e.media)
                        } catch (e) {
                            console.error("error cleaning " + i, e)
                        }
                    }
                    var a = e.node.getAttribute("width"), s = e.node.getAttribute("height");
                    a ? -1 === a.indexOf("%") && (a += "px") : a = "auto", s ? -1 === s.indexOf("%") && (s += "px") : s = "auto", e.node.style.width = a, e.node.style.height = s, e.setPlayerSize(0, 0), e.isDynamic ? e.getElement(e.container).parentNode.insertBefore(e.node, e.getElement(e.container)) : function () {
                        e.node.setAttribute("controls", !0), e.node.setAttribute("id", e.node.getAttribute("id").replace("_" + t, "").replace("_from_mejs", ""));
                        var o = e.getElement(e.container).querySelector("." + e.options.classPrefix + "poster>img");
                        o && e.node.setAttribute("poster", o.src), delete e.node.autoplay, "" !== e.media.canPlayType((0, v.getTypeFromFile)(n)) && e.node.setAttribute("src", n), ~t.indexOf("iframe") && l.default.getElementById(e.media.id + "-iframe-overlay").remove();
                        var i = e.node.cloneNode();
                        if (i.style.display = "", e.getElement(e.container).parentNode.insertBefore(i, e.getElement(e.container)), e.node.remove(), e.mediaFiles) for (var r = 0, a = e.mediaFiles.length; r < a; r++) {
                            var s = l.default.createElement("source");
                            s.setAttribute("src", e.mediaFiles[r].src), s.setAttribute("type", e.mediaFiles[r].type), i.appendChild(s)
                        }
                        if (e.trackFiles) for (var d = 0, u = e.trackFiles.length; d < u; d++) !function (t, n) {
                            var o = e.trackFiles[t], r = l.default.createElement("track");
                            r.kind = o.kind, r.label = o.label, r.srclang = o.srclang, r.src = o.src, i.appendChild(r), r.addEventListener("load", function () {
                                this.mode = "showing", i.textTracks[t].mode = "showing"
                            })
                        }(d);
                        delete e.node, delete e.mediaFiles, delete e.trackFiles
                    }(), "function" == typeof e.media.renderer.destroy && e.media.renderer.destroy(), delete d.default.players[e.id], "object" === r(e.getElement(e.container)) && (e.getElement(e.container).parentNode.querySelector("." + e.options.classPrefix + "offscreen").remove(), e.getElement(e.container).remove()), e.globalUnbind("resize", e.globalResizeCallback), e.globalUnbind("keydown", e.globalKeydownCallback), e.globalUnbind("click", e.globalClickCallback), delete e.media.player
                }
            }, {
                key: "paused", get: function () {
                    return this.proxy.paused
                }
            }, {
                key: "muted", get: function () {
                    return this.proxy.muted
                }, set: function (e) {
                    this.setMuted(e)
                }
            }, {
                key: "ended", get: function () {
                    return this.proxy.ended
                }
            }, {
                key: "readyState", get: function () {
                    return this.proxy.readyState
                }
            }, {
                key: "currentTime", set: function (e) {
                    this.setCurrentTime(e)
                }, get: function () {
                    return this.getCurrentTime()
                }
            }, {
                key: "duration", get: function () {
                    return this.getDuration()
                }
            }, {
                key: "volume", set: function (e) {
                    this.setVolume(e)
                }, get: function () {
                    return this.getVolume()
                }
            }, {
                key: "src", set: function (e) {
                    this.setSrc(e)
                }, get: function () {
                    return this.getSrc()
                }
            }]), e
        }();
        s.default.MediaElementPlayer = E, d.default.MediaElementPlayer = E, n.default = E
    }, {17: 17, 2: 2, 25: 25, 26: 26, 27: 27, 28: 28, 3: 3, 30: 30, 5: 5, 6: 6, 7: 7}], 17: [function (e, t, n) {
        "use strict";

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(n, "__esModule", {value: !0});
        var i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(), r = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(3)), a = function () {
            function e(t) {
                return o(this, e), this.media = t.media, this.isVideo = t.isVideo, this.classPrefix = t.options.classPrefix, this.createIframeLayer = function () {
                    return t.createIframeLayer()
                }, this.setPoster = function (e) {
                    return t.setPoster(e)
                }, this
            }

            return i(e, [{
                key: "play", value: function () {
                    this.media.play()
                }
            }, {
                key: "pause", value: function () {
                    this.media.pause()
                }
            }, {
                key: "load", value: function () {
                    var e = this;
                    e.isLoaded || e.media.load(), e.isLoaded = !0
                }
            }, {
                key: "setCurrentTime", value: function (e) {
                    this.media.setCurrentTime(e)
                }
            }, {
                key: "getCurrentTime", value: function () {
                    return this.media.currentTime
                }
            }, {
                key: "getDuration", value: function () {
                    return this.media.getDuration()
                }
            }, {
                key: "setVolume", value: function (e) {
                    this.media.setVolume(e)
                }
            }, {
                key: "getVolume", value: function () {
                    return this.media.getVolume()
                }
            }, {
                key: "setMuted", value: function (e) {
                    this.media.setMuted(e)
                }
            }, {
                key: "setSrc", value: function (e) {
                    var t = this, n = document.getElementById(t.media.id + "-iframe-overlay");
                    n && n.remove(), t.media.setSrc(e), t.createIframeLayer(), null !== t.media.renderer && "function" == typeof t.media.renderer.getPosterUrl && t.setPoster(t.media.renderer.getPosterUrl())
                }
            }, {
                key: "getSrc", value: function () {
                    return this.media.getSrc()
                }
            }, {
                key: "canPlayType", value: function (e) {
                    return this.media.canPlayType(e)
                }
            }, {
                key: "paused", get: function () {
                    return this.media.paused
                }
            }, {
                key: "muted", set: function (e) {
                    this.setMuted(e)
                }, get: function () {
                    return this.media.muted
                }
            }, {
                key: "ended", get: function () {
                    return this.media.ended
                }
            }, {
                key: "readyState", get: function () {
                    return this.media.readyState
                }
            }, {
                key: "currentTime", set: function (e) {
                    this.setCurrentTime(e)
                }, get: function () {
                    return this.getCurrentTime()
                }
            }, {
                key: "duration", get: function () {
                    return this.getDuration()
                }
            }, {
                key: "volume", set: function (e) {
                    this.setVolume(e)
                }, get: function () {
                    return this.getVolume()
                }
            }, {
                key: "src", set: function (e) {
                    this.setSrc(e)
                }, get: function () {
                    return this.getSrc()
                }
            }]), e
        }();
        n.default = a, r.default.DefaultPlayer = a
    }, {3: 3}], 18: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(3)), r = o(e(7)), a = o(e(16));
        "undefined" != typeof jQuery ? r.default.$ = i.default.jQuery = i.default.$ = jQuery : "undefined" != typeof Zepto ? r.default.$ = i.default.Zepto = i.default.$ = Zepto : "undefined" != typeof ender && (r.default.$ = i.default.ender = i.default.$ = ender), function (e) {
            void 0 !== e && (e.fn.mediaelementplayer = function (t) {
                return !1 === t ? this.each(function () {
                    var t = e(this).data("mediaelementplayer");
                    t && t.remove(), e(this).removeData("mediaelementplayer")
                }) : this.each(function () {
                    e(this).data("mediaelementplayer", new a.default(this, t))
                }), this
            }, e(document).ready(function () {
                e("." + r.default.MepDefaults.classPrefix + "player").mediaelementplayer()
            }))
        }(r.default.$)
    }, {16: 16, 3: 3, 7: 7}], 19: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = o(e(3)), a = o(e(7)), s = e(8), l = e(27), d = e(28), u = e(25), c = e(26), f = {
            promise: null, load: function (e) {
                return "undefined" != typeof dashjs ? f.promise = new Promise(function (e) {
                    e()
                }).then(function () {
                    f._createPlayer(e)
                }) : (e.options.path = "string" == typeof e.options.path ? e.options.path : "https://cdn.dashjs.org/latest/dash.all.min.js", f.promise = f.promise || (0, c.loadScript)(e.options.path), f.promise.then(function () {
                    f._createPlayer(e)
                })), f.promise
            }, _createPlayer: function (e) {
                var t = dashjs.MediaPlayer().create();
                return r.default["__ready__" + e.id](t), t
            }
        }, p = {
            name: "native_dash",
            options: {
                prefix: "native_dash",
                dash: {path: "https://cdn.dashjs.org/latest/dash.all.min.js", debug: !1, drm: {}, robustnessLevel: ""}
            },
            canPlayType: function (e) {
                return u.HAS_MSE && ["application/dash+xml"].indexOf(e.toLowerCase()) > -1
            },
            create: function (e, t, n) {
                var o = e.originalNode, d = e.id + "_" + t.prefix, u = o.autoplay, c = o.children, p = null, m = null;
                o.removeAttribute("type");
                for (var h = 0, v = c.length; h < v; h++) c[h].removeAttribute("type");
                p = o.cloneNode(!0), t = Object.assign(t, e.options);
                for (var g = a.default.html5media.properties, y = a.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function (e) {
                    return "error" !== e
                }), E = function (t) {
                    var n = (0, l.createEvent)(t.type, e);
                    e.dispatchEvent(n)
                }, b = 0, S = g.length; b < S; b++) !function (e) {
                    var n = "" + e.substring(0, 1).toUpperCase() + e.substring(1);
                    p["get" + n] = function () {
                        return null !== m ? p[e] : null
                    }, p["set" + n] = function (n) {
                        if (-1 === a.default.html5media.readOnlyProperties.indexOf(e)) if ("src" === e) {
                            var o = "object" === (void 0 === n ? "undefined" : i(n)) && n.src ? n.src : n;
                            if (p[e] = o, null !== m) {
                                m.reset();
                                for (var r = 0, s = y.length; r < s; r++) p.removeEventListener(y[r], E);
                                m = f._createPlayer({
                                    options: t.dash,
                                    id: d
                                }), n && "object" === (void 0 === n ? "undefined" : i(n)) && "object" === i(n.drm) && (m.setProtectionData(n.drm), (0, l.isString)(t.dash.robustnessLevel) && t.dash.robustnessLevel && m.getProtectionController().setRobustnessLevel(t.dash.robustnessLevel)), m.attachSource(o), u && m.play()
                            }
                        } else p[e] = n
                    }
                }(g[b]);
                if (r.default["__ready__" + d] = function (n) {
                    e.dashPlayer = m = n;
                    for (var o = dashjs.MediaPlayer.events, r = 0, s = y.length; r < s; r++) !function (e) {
                        "loadedmetadata" === e && (m.getDebug().setLogToBrowserConsole(t.dash.debug), m.initialize(), m.setScheduleWhilePaused(!1), m.setFastSwitchEnabled(!0), m.attachView(p), m.setAutoPlay(!1), "object" !== i(t.dash.drm) || a.default.Utils.isObjectEmpty(t.dash.drm) || (m.setProtectionData(t.dash.drm), (0, l.isString)(t.dash.robustnessLevel) && t.dash.robustnessLevel && m.getProtectionController().setRobustnessLevel(t.dash.robustnessLevel)), m.attachSource(p.getSrc())), p.addEventListener(e, E)
                    }(y[r]);
                    var d = function (t) {
                        if ("error" === t.type.toLowerCase()) e.generateError(t.message, p.src), console.error(t); else {
                            var n = (0, l.createEvent)(t.type, e);
                            n.data = t, e.dispatchEvent(n)
                        }
                    };
                    for (var u in o) o.hasOwnProperty(u) && m.on(o[u], function (e) {
                        return d(e)
                    })
                }, n && n.length > 0) for (var x = 0, w = n.length; x < w; x++) if (s.renderer.renderers[t.prefix].canPlayType(n[x].type)) {
                    p.setAttribute("src", n[x].src), void 0 !== n[x].drm && (t.dash.drm = n[x].drm);
                    break
                }
                p.setAttribute("id", d), o.parentNode.insertBefore(p, o), o.autoplay = !1, o.style.display = "none", p.setSize = function (e, t) {
                    return p.style.width = e + "px", p.style.height = t + "px", p
                }, p.hide = function () {
                    return p.pause(), p.style.display = "none", p
                }, p.show = function () {
                    return p.style.display = "", p
                }, p.destroy = function () {
                    null !== m && m.reset()
                };
                var P = (0, l.createEvent)("rendererready", p);
                return e.dispatchEvent(P), e.promises.push(f.load({options: t.dash, id: d})), p
            }
        };
        d.typeChecks.push(function (e) {
            return ~e.toLowerCase().indexOf(".mpd") ? "application/dash+xml" : null
        }), s.renderer.add(p)
    }, {25: 25, 26: 26, 27: 27, 28: 28, 3: 3, 7: 7, 8: 8}], 20: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.PluginDetector = void 0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, r = o(e(3)), a = o(e(2)), s = o(e(7)), l = o(e(5)), d = e(8), u = e(27), c = e(25), f = e(28),
            p = n.PluginDetector = {
                plugins: [], hasPluginVersion: function (e, t) {
                    var n = p.plugins[e];
                    return t[1] = t[1] || 0, t[2] = t[2] || 0, n[0] > t[0] || n[0] === t[0] && n[1] > t[1] || n[0] === t[0] && n[1] === t[1] && n[2] >= t[2]
                }, addPlugin: function (e, t, n, o, i) {
                    p.plugins[e] = p.detectPlugin(t, n, o, i)
                }, detectPlugin: function (e, t, n, o) {
                    var a = [0, 0, 0], s = void 0, l = void 0;
                    if (null !== c.NAV.plugins && void 0 !== c.NAV.plugins && "object" === i(c.NAV.plugins[e])) {
                        if ((s = c.NAV.plugins[e].description) && (void 0 === c.NAV.mimeTypes || !c.NAV.mimeTypes[t] || c.NAV.mimeTypes[t].enabledPlugin)) for (var d = 0, u = (a = s.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".")).length; d < u; d++) a[d] = parseInt(a[d].match(/\d+/), 10)
                    } else if (void 0 !== r.default.ActiveXObject) try {
                        (l = new ActiveXObject(n)) && (a = o(l))
                    } catch (e) {
                    }
                    return a
                }
            };
        p.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (e) {
            var t = [], n = e.GetVariable("$version");
            return n && (n = n.split(" ")[1].split(","), t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)]), t
        });
        var m = {
            create: function (e, t, n) {
                var o = {}, i = !1;
                o.options = t, o.id = e.id + "_" + o.options.prefix, o.mediaElement = e, o.flashState = {}, o.flashApi = null, o.flashApiStack = [];
                for (var p = s.default.html5media.properties, m = 0, h = p.length; m < h; m++) !function (e) {
                    o.flashState[e] = null;
                    var t = "" + e.substring(0, 1).toUpperCase() + e.substring(1);
                    o["get" + t] = function () {
                        if (null !== o.flashApi) {
                            if ("function" == typeof o.flashApi["get_" + e]) {
                                var t = o.flashApi["get_" + e]();
                                return "buffered" === e ? {
                                    start: function () {
                                        return 0
                                    }, end: function () {
                                        return t
                                    }, length: 1
                                } : t
                            }
                            return null
                        }
                        return null
                    }, o["set" + t] = function (t) {
                        if ("src" === e && (t = (0, f.absolutizeUrl)(t)), null !== o.flashApi && void 0 !== o.flashApi["set_" + e]) try {
                            o.flashApi["set_" + e](t)
                        } catch (e) {
                        } else o.flashApiStack.push({type: "set", propName: e, value: t})
                    }
                }(p[m]);
                var v = s.default.html5media.methods;
                v.push("stop");
                for (var g = 0, y = v.length; g < y; g++) !function (e) {
                    o[e] = function () {
                        if (i) if (null !== o.flashApi) {
                            if (o.flashApi["fire_" + e]) try {
                                o.flashApi["fire_" + e]()
                            } catch (e) {
                            }
                        } else o.flashApiStack.push({type: "call", methodName: e})
                    }
                }(v[g]);
                for (var E = ["rendererready"], b = 0, S = E.length; b < S; b++) {
                    var x = (0, u.createEvent)(E[b], o);
                    e.dispatchEvent(x)
                }
                r.default["__ready__" + o.id] = function () {
                    if (o.flashReady = !0, o.flashApi = a.default.getElementById("__" + o.id), o.flashApiStack.length) for (var e = 0, t = o.flashApiStack.length; e < t; e++) {
                        var n = o.flashApiStack[e];
                        if ("set" === n.type) {
                            var i = n.propName, r = "" + i.substring(0, 1).toUpperCase() + i.substring(1);
                            o["set" + r](n.value)
                        } else "call" === n.type && o[n.methodName]()
                    }
                }, r.default["__event__" + o.id] = function (e, t) {
                    var n = (0, u.createEvent)(e, o);
                    if (t) try {
                        n.data = JSON.parse(t), n.details.data = JSON.parse(t)
                    } catch (e) {
                        n.message = t
                    }
                    o.mediaElement.dispatchEvent(n)
                }, o.flashWrapper = a.default.createElement("div"), -1 === ["always", "sameDomain"].indexOf(o.options.shimScriptAccess) && (o.options.shimScriptAccess = "sameDomain");
                var w = e.originalNode.autoplay,
                    P = ["uid=" + o.id, "autoplay=" + w, "allowScriptAccess=" + o.options.shimScriptAccess, "preload=" + (e.originalNode.getAttribute("preload") || "")],
                    T = null !== e.originalNode && "video" === e.originalNode.tagName.toLowerCase(),
                    C = T ? e.originalNode.height : 1, k = T ? e.originalNode.width : 1;
                e.originalNode.getAttribute("src") && P.push("src=" + e.originalNode.getAttribute("src")), !0 === o.options.enablePseudoStreaming && (P.push("pseudostreamstart=" + o.options.pseudoStreamingStartQueryParam), P.push("pseudostreamtype=" + o.options.pseudoStreamingType)), o.options.streamDelimiter && P.push("streamdelimiter=" + encodeURIComponent(o.options.streamDelimiter)), o.options.proxyType && P.push("proxytype=" + o.options.proxyType), e.appendChild(o.flashWrapper), e.originalNode.style.display = "none";
                var _ = [];
                if (c.IS_IE || c.IS_EDGE) {
                    var N = a.default.createElement("div");
                    o.flashWrapper.appendChild(N), _ = c.IS_EDGE ? ['type="application/x-shockwave-flash"', 'data="' + o.options.pluginPath + o.options.filename + '"', 'id="__' + o.id + '"', 'width="' + k + '"', 'height="' + C + "'\""] : ['classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', 'codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"', 'id="__' + o.id + '"', 'width="' + k + '"', 'height="' + C + '"'], T || _.push('style="clip: rect(0 0 0 0); position: absolute;"'), N.outerHTML = "<object " + _.join(" ") + '><param name="movie" value="' + o.options.pluginPath + o.options.filename + "?x=" + new Date + '" /><param name="flashvars" value="' + P.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + o.options.shimScriptAccess + '" /><param name="allowFullScreen" value="true" /><div>' + l.default.t("mejs.install-flash") + "</div></object>"
                } else _ = ['id="__' + o.id + '"', 'name="__' + o.id + '"', 'play="true"', 'loop="false"', 'quality="high"', 'bgcolor="#000000"', 'wmode="transparent"', 'allowScriptAccess="' + o.options.shimScriptAccess + '"', 'allowFullScreen="true"', 'type="application/x-shockwave-flash"', 'pluginspage="//www.macromedia.com/go/getflashplayer"', 'src="' + o.options.pluginPath + o.options.filename + '"', 'flashvars="' + P.join("&") + '"'], T ? (_.push('width="' + k + '"'), _.push('height="' + C + '"')) : _.push('style="position: fixed; left: -9999em; top: -9999em;"'), o.flashWrapper.innerHTML = "<embed " + _.join(" ") + ">";
                if (o.flashNode = o.flashWrapper.lastChild, o.hide = function () {
                    i = !1, T && (o.flashNode.style.display = "none")
                }, o.show = function () {
                    i = !0, T && (o.flashNode.style.display = "")
                }, o.setSize = function (e, t) {
                    o.flashNode.style.width = e + "px", o.flashNode.style.height = t + "px", null !== o.flashApi && "function" == typeof o.flashApi.fire_setSize && o.flashApi.fire_setSize(e, t)
                }, o.destroy = function () {
                    o.flashNode.remove()
                }, n && n.length > 0) for (var A = 0, L = n.length; A < L; A++) if (d.renderer.renderers[t.prefix].canPlayType(n[A].type)) {
                    o.setSrc(n[A].src);
                    break
                }
                return o
            }
        };
        if (p.hasPluginVersion("flash", [10, 0, 0])) {
            f.typeChecks.push(function (e) {
                return (e = e.toLowerCase()).startsWith("rtmp") ? ~e.indexOf(".mp3") ? "audio/rtmp" : "video/rtmp" : /\.og(a|g)/i.test(e) ? "audio/ogg" : ~e.indexOf(".m3u8") ? "application/x-mpegURL" : ~e.indexOf(".mpd") ? "application/dash+xml" : ~e.indexOf(".flv") ? "video/flv" : null
            });
            var h = {
                name: "flash_video",
                options: {
                    prefix: "flash_video",
                    filename: "mediaelement-flash-video.swf",
                    enablePseudoStreaming: !1,
                    pseudoStreamingStartQueryParam: "start",
                    pseudoStreamingType: "byte",
                    proxyType: "",
                    streamDelimiter: ""
                },
                canPlayType: function (e) {
                    return ~["video/mp4", "video/rtmp", "audio/rtmp", "rtmp/mp4", "audio/mp4", "video/flv", "video/x-flv"].indexOf(e.toLowerCase())
                },
                create: m.create
            };
            d.renderer.add(h);
            var v = {
                name: "flash_hls",
                options: {prefix: "flash_hls", filename: "mediaelement-flash-video-hls.swf"},
                canPlayType: function (e) {
                    return ~["application/x-mpegurl", "application/vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(e.toLowerCase())
                },
                create: m.create
            };
            d.renderer.add(v);
            var g = {
                name: "flash_dash",
                options: {prefix: "flash_dash", filename: "mediaelement-flash-video-mdash.swf"},
                canPlayType: function (e) {
                    return ~["application/dash+xml"].indexOf(e.toLowerCase())
                },
                create: m.create
            };
            d.renderer.add(g);
            var y = {
                name: "flash_audio",
                options: {prefix: "flash_audio", filename: "mediaelement-flash-audio.swf"},
                canPlayType: function (e) {
                    return ~["audio/mp3"].indexOf(e.toLowerCase())
                },
                create: m.create
            };
            d.renderer.add(y);
            var E = {
                name: "flash_audio_ogg",
                options: {prefix: "flash_audio_ogg", filename: "mediaelement-flash-audio-ogg.swf"},
                canPlayType: function (e) {
                    return ~["audio/ogg", "audio/oga", "audio/ogv"].indexOf(e.toLowerCase())
                },
                create: m.create
            };
            d.renderer.add(E)
        }
    }, {2: 2, 25: 25, 27: 27, 28: 28, 3: 3, 5: 5, 7: 7, 8: 8}], 21: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = o(e(3)), a = o(e(7)), s = e(8), l = e(27), d = e(25), u = e(28), c = e(26), f = {
            promise: null, load: function (e) {
                return "undefined" != typeof flvjs ? f.promise = new Promise(function (e) {
                    e()
                }).then(function () {
                    f._createPlayer(e)
                }) : (e.options.path = "string" == typeof e.options.path ? e.options.path : "https://cdn.jsdelivr.net/npm/flv.js@latest", f.promise = f.promise || (0, c.loadScript)(e.options.path), f.promise.then(function () {
                    f._createPlayer(e)
                })), f.promise
            }, _createPlayer: function (e) {
                flvjs.LoggingControl.enableDebug = e.options.debug, flvjs.LoggingControl.enableVerbose = e.options.debug;
                var t = flvjs.createPlayer(e.options, e.configs);
                return r.default["__ready__" + e.id](t), t
            }
        }, p = {
            name: "native_flv",
            options: {
                prefix: "native_flv",
                flv: {path: "https://cdn.jsdelivr.net/npm/flv.js@latest", cors: !0, debug: !1}
            },
            canPlayType: function (e) {
                return d.HAS_MSE && ["video/x-flv", "video/flv"].indexOf(e.toLowerCase()) > -1
            },
            create: function (e, t, n) {
                var o = e.originalNode, d = e.id + "_" + t.prefix, u = null, c = null;
                u = o.cloneNode(!0), t = Object.assign(t, e.options);
                for (var p = a.default.html5media.properties, m = a.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function (e) {
                    return "error" !== e
                }), h = function (t) {
                    var n = (0, l.createEvent)(t.type, e);
                    e.dispatchEvent(n)
                }, v = 0, g = p.length; v < g; v++) !function (e) {
                    var n = "" + e.substring(0, 1).toUpperCase() + e.substring(1);
                    u["get" + n] = function () {
                        return null !== c ? u[e] : null
                    }, u["set" + n] = function (n) {
                        if (-1 === a.default.html5media.readOnlyProperties.indexOf(e)) if ("src" === e) {
                            if (u[e] = "object" === (void 0 === n ? "undefined" : i(n)) && n.src ? n.src : n, null !== c) {
                                var o = {};
                                o.type = "flv", o.url = n, o.cors = t.flv.cors, o.debug = t.flv.debug, o.path = t.flv.path;
                                var r = t.flv.configs;
                                c.destroy();
                                for (var s = 0, l = m.length; s < l; s++) u.removeEventListener(m[s], h);
                                (c = f._createPlayer({options: o, configs: r, id: d})).attachMediaElement(u), c.load()
                            }
                        } else u[e] = n
                    }
                }(p[v]);
                if (r.default["__ready__" + d] = function (t) {
                    e.flvPlayer = c = t;
                    for (var n = flvjs.Events, o = 0, i = m.length; o < i; o++) !function (e) {
                        "loadedmetadata" === e && (c.unload(), c.detachMediaElement(), c.attachMediaElement(u), c.load()), u.addEventListener(e, h)
                    }(m[o]);
                    var r = function (t, n) {
                        if ("error" === t) {
                            var o = n[0] + ": " + n[1] + " " + n[2].msg;
                            e.generateError(o, u.src)
                        } else {
                            var i = (0, l.createEvent)(t, e);
                            i.data = n, e.dispatchEvent(i)
                        }
                    };
                    for (var a in n) !function (e) {
                        n.hasOwnProperty(e) && c.on(n[e], function () {
                            for (var t = arguments.length, o = Array(t), i = 0; i < t; i++) o[i] = arguments[i];
                            return r(n[e], o)
                        })
                    }(a)
                }, n && n.length > 0) for (var y = 0, E = n.length; y < E; y++) if (s.renderer.renderers[t.prefix].canPlayType(n[y].type)) {
                    u.setAttribute("src", n[y].src);
                    break
                }
                u.setAttribute("id", d), o.parentNode.insertBefore(u, o), o.autoplay = !1, o.style.display = "none";
                var b = {};
                b.type = "flv", b.url = u.src, b.cors = t.flv.cors, b.debug = t.flv.debug, b.path = t.flv.path;
                var S = t.flv.configs;
                u.setSize = function (e, t) {
                    return u.style.width = e + "px", u.style.height = t + "px", u
                }, u.hide = function () {
                    return null !== c && c.pause(), u.style.display = "none", u
                }, u.show = function () {
                    return u.style.display = "", u
                }, u.destroy = function () {
                    null !== c && c.destroy()
                };
                var x = (0, l.createEvent)("rendererready", u);
                return e.dispatchEvent(x), e.promises.push(f.load({options: b, configs: S, id: d})), u
            }
        };
        u.typeChecks.push(function (e) {
            return ~e.toLowerCase().indexOf(".flv") ? "video/flv" : null
        }), s.renderer.add(p)
    }, {25: 25, 26: 26, 27: 27, 28: 28, 3: 3, 7: 7, 8: 8}], 22: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = o(e(3)), a = o(e(7)), s = e(8), l = e(27), d = e(25), u = e(28), c = e(26), f = {
            promise: null, load: function (e) {
                return "undefined" != typeof Hls ? f.promise = new Promise(function (e) {
                    e()
                }).then(function () {
                    f._createPlayer(e)
                }) : (e.options.path = "string" == typeof e.options.path ? e.options.path : "https://cdn.jsdelivr.net/npm/hls.js@latest", f.promise = f.promise || (0, c.loadScript)(e.options.path), f.promise.then(function () {
                    f._createPlayer(e)
                })), f.promise
            }, _createPlayer: function (e) {
                var t = new Hls(e.options);
                return r.default["__ready__" + e.id](t), t
            }
        }, p = {
            name: "native_hls",
            options: {
                prefix: "native_hls",
                hls: {path: "https://cdn.jsdelivr.net/npm/hls.js@latest", autoStartLoad: !1, debug: !1}
            },
            canPlayType: function (e) {
                return d.HAS_MSE && ["application/x-mpegurl", "application/vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(e.toLowerCase()) > -1
            },
            create: function (e, t, n) {
                var o = e.originalNode, d = e.id + "_" + t.prefix, u = o.getAttribute("preload"), c = o.autoplay,
                    p = null, m = null, h = 0, v = n.length;
                m = o.cloneNode(!0), (t = Object.assign(t, e.options)).hls.autoStartLoad = u && "none" !== u || c;
                for (var g = a.default.html5media.properties, y = a.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function (e) {
                    return "error" !== e
                }), E = function (t) {
                    var n = (0, l.createEvent)(t.type, e);
                    e.dispatchEvent(n)
                }, b = 0, S = g.length; b < S; b++) !function (e) {
                    var n = "" + e.substring(0, 1).toUpperCase() + e.substring(1);
                    m["get" + n] = function () {
                        return null !== p ? m[e] : null
                    }, m["set" + n] = function (n) {
                        if (-1 === a.default.html5media.readOnlyProperties.indexOf(e)) if ("src" === e) {
                            if (m[e] = "object" === (void 0 === n ? "undefined" : i(n)) && n.src ? n.src : n, null !== p) {
                                p.destroy();
                                for (var o = 0, r = y.length; o < r; o++) m.removeEventListener(y[o], E);
                                (p = f._createPlayer({options: t.hls, id: d})).loadSource(n), p.attachMedia(m)
                            }
                        } else m[e] = n
                    }
                }(g[b]);
                if (r.default["__ready__" + d] = function (t) {
                    e.hlsPlayer = p = t;
                    for (var o = Hls.Events, i = 0, r = y.length; i < r; i++) !function (t) {
                        if ("loadedmetadata" === t) {
                            var n = e.originalNode.src;
                            p.detachMedia(), p.loadSource(n), p.attachMedia(m)
                        }
                        m.addEventListener(t, E)
                    }(y[i]);
                    var a = void 0, s = void 0, d = function (t, o) {
                        if ("hlsError" === t) {
                            if (console.warn(o), (o = o[1]).fatal) switch (o.type) {
                                case"mediaError":
                                    var i = (new Date).getTime();
                                    if (!a || i - a > 3e3) a = (new Date).getTime(), p.recoverMediaError(); else if (!s || i - s > 3e3) s = (new Date).getTime(), console.warn("Attempting to swap Audio Codec and recover from media error"), p.swapAudioCodec(), p.recoverMediaError(); else {
                                        var r = "Cannot recover, last media error recovery failed";
                                        e.generateError(r, m.src), console.error(r)
                                    }
                                    break;
                                case"networkError":
                                    if ("manifestLoadError" === o.details) if (h < v && void 0 !== n[h + 1]) m.setSrc(n[h++].src), m.load(), m.play(); else {
                                        e.generateError("Network error", n), console.error("Network error")
                                    } else {
                                        e.generateError("Network error", n), console.error("Network error")
                                    }
                                    break;
                                default:
                                    p.destroy()
                            }
                        } else {
                            var d = (0, l.createEvent)(t, e);
                            d.data = o, e.dispatchEvent(d)
                        }
                    };
                    for (var u in o) !function (e) {
                        o.hasOwnProperty(e) && p.on(o[e], function () {
                            for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                            return d(o[e], n)
                        })
                    }(u)
                }, v > 0) for (; h < v; h++) if (s.renderer.renderers[t.prefix].canPlayType(n[h].type)) {
                    m.setAttribute("src", n[h].src);
                    break
                }
                "auto" === u || c || (m.addEventListener("play", function () {
                    null !== p && p.startLoad()
                }), m.addEventListener("pause", function () {
                    null !== p && p.stopLoad()
                })), m.setAttribute("id", d), o.parentNode.insertBefore(m, o), o.autoplay = !1, o.style.display = "none", m.setSize = function (e, t) {
                    return m.style.width = e + "px", m.style.height = t + "px", m
                }, m.hide = function () {
                    return m.pause(), m.style.display = "none", m
                }, m.show = function () {
                    return m.style.display = "", m
                }, m.destroy = function () {
                    null !== p && (p.stopLoad(), p.destroy())
                };
                var x = (0, l.createEvent)("rendererready", m);
                return e.dispatchEvent(x), e.promises.push(f.load({options: t.hls, id: d})), m
            }
        };
        u.typeChecks.push(function (e) {
            return ~e.toLowerCase().indexOf(".m3u8") ? "application/x-mpegURL" : null
        }), s.renderer.add(p)
    }, {25: 25, 26: 26, 27: 27, 28: 28, 3: 3, 7: 7, 8: 8}], 23: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(3)), r = o(e(2)), a = o(e(7)), s = e(8), l = e(27), d = e(25), u = {
            name: "html5", options: {prefix: "html5"}, canPlayType: function (e) {
                var t = r.default.createElement("video");
                return d.IS_ANDROID && /\/mp(3|4)$/i.test(e) || ~["application/x-mpegurl", "vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(e.toLowerCase()) && d.SUPPORTS_NATIVE_HLS ? "yes" : t.canPlayType ? t.canPlayType(e.toLowerCase()).replace(/no/, "") : ""
            }, create: function (e, t, n) {
                var o = e.id + "_" + t.prefix, i = !1, d = null;
                void 0 === e.originalNode || null === e.originalNode ? (d = r.default.createElement("audio"), e.appendChild(d)) : d = e.originalNode, d.setAttribute("id", o);
                for (var u = a.default.html5media.properties, c = 0, f = u.length; c < f; c++) !function (e) {
                    var t = "" + e.substring(0, 1).toUpperCase() + e.substring(1);
                    d["get" + t] = function () {
                        return d[e]
                    }, d["set" + t] = function (t) {
                        -1 === a.default.html5media.readOnlyProperties.indexOf(e) && (d[e] = t)
                    }
                }(u[c]);
                for (var p = a.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function (e) {
                    return "error" !== e
                }), m = 0, h = p.length; m < h; m++) !function (t) {
                    d.addEventListener(t, function (t) {
                        if (i) {
                            var n = (0, l.createEvent)(t.type, t.target);
                            e.dispatchEvent(n)
                        }
                    })
                }(p[m]);
                d.setSize = function (e, t) {
                    return d.style.width = e + "px", d.style.height = t + "px", d
                }, d.hide = function () {
                    return i = !1, d.style.display = "none", d
                }, d.show = function () {
                    return i = !0, d.style.display = "", d
                };
                var v = 0, g = n.length;
                if (g > 0) for (; v < g; v++) if (s.renderer.renderers[t.prefix].canPlayType(n[v].type)) {
                    d.setAttribute("src", n[v].src);
                    break
                }
                d.addEventListener("error", function (t) {
                    4 === t.target.error.code && i && (v < g && void 0 !== n[v + 1] ? (d.src = n[v++].src, d.load(), d.play()) : e.generateError("Media error: Format(s) not supported or source(s) not found", n))
                });
                var y = (0, l.createEvent)("rendererready", d);
                return e.dispatchEvent(y), d
            }
        };
        i.default.HtmlMediaElement = a.default.HtmlMediaElement = u, s.renderer.add(u)
    }, {2: 2, 25: 25, 27: 27, 3: 3, 7: 7, 8: 8}], 24: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(3)), r = o(e(2)), a = o(e(7)), s = e(8), l = e(27), d = e(28), u = e(26), c = {
            isIframeStarted: !1, isIframeLoaded: !1, iframeQueue: [], enqueueIframe: function (e) {
                c.isLoaded = "undefined" != typeof YT && YT.loaded, c.isLoaded ? c.createIframe(e) : (c.loadIframeApi(), c.iframeQueue.push(e))
            }, loadIframeApi: function () {
                c.isIframeStarted || ((0, u.loadScript)("https://www.youtube.com/player_api"), c.isIframeStarted = !0)
            }, iFrameReady: function () {
                for (c.isLoaded = !0, c.isIframeLoaded = !0; c.iframeQueue.length > 0;) {
                    var e = c.iframeQueue.pop();
                    c.createIframe(e)
                }
            }, createIframe: function (e) {
                return new YT.Player(e.containerId, e)
            }, getYouTubeId: function (e) {
                var t = "";
                return e.indexOf("?") > 0 ? "" === (t = c.getYouTubeIdFromParam(e)) && (t = c.getYouTubeIdFromUrl(e)) : t = c.getYouTubeIdFromUrl(e), (t = t.substring(t.lastIndexOf("/") + 1).split("?"))[0]
            }, getYouTubeIdFromParam: function (e) {
                if (void 0 === e || null === e || !e.trim().length) return null;
                for (var t = e.split("?")[1].split("&"), n = "", o = 0, i = t.length; o < i; o++) {
                    var r = t[o].split("=");
                    if ("v" === r[0]) {
                        n = r[1];
                        break
                    }
                }
                return n
            }, getYouTubeIdFromUrl: function (e) {
                return void 0 !== e && null !== e && e.trim().length ? (e = e.split("?")[0]).substring(e.lastIndexOf("/") + 1) : null
            }, getYouTubeNoCookieUrl: function (e) {
                if (void 0 === e || null === e || !e.trim().length || -1 === e.indexOf("//www.youtube")) return e;
                var t = e.split("/");
                return t[2] = t[2].replace(".com", "-nocookie.com"), t.join("/")
            }
        }, f = {
            name: "youtube_iframe",
            options: {
                prefix: "youtube_iframe",
                youtube: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    end: 0,
                    loop: 0,
                    modestbranding: 0,
                    playsinline: 0,
                    rel: 0,
                    showinfo: 0,
                    start: 0,
                    iv_load_policy: 3,
                    nocookie: !1,
                    imageQuality: null
                }
            },
            canPlayType: function (e) {
                return ~["video/youtube", "video/x-youtube"].indexOf(e.toLowerCase())
            },
            create: function (e, t, n) {
                var o = {}, s = [], d = null, u = !0, f = !1, p = null, m = 1;
                o.options = t, o.id = e.id + "_" + t.prefix, o.mediaElement = e;
                for (var h = a.default.html5media.properties, v = 0, g = h.length; v < g; v++) !function (t) {
                    var n = "" + t.substring(0, 1).toUpperCase() + t.substring(1);
                    o["get" + n] = function () {
                        if (null !== d) {
                            switch (t) {
                                case"currentTime":
                                    return d.getCurrentTime();
                                case"duration":
                                    return d.getDuration();
                                case"volume":
                                    return m = d.getVolume() / 100;
                                case"paused":
                                    return u;
                                case"ended":
                                    return f;
                                case"muted":
                                    return d.isMuted();
                                case"buffered":
                                    var e = d.getVideoLoadedFraction(), n = d.getDuration();
                                    return {
                                        start: function () {
                                            return 0
                                        }, end: function () {
                                            return e * n
                                        }, length: 1
                                    };
                                case"src":
                                    return d.getVideoUrl();
                                case"readyState":
                                    return 4
                            }
                            return null
                        }
                        return null
                    }, o["set" + n] = function (n) {
                        if (null !== d) switch (t) {
                            case"src":
                                var i = "string" == typeof n ? n : n[0].src, r = c.getYouTubeId(i);
                                e.originalNode.autoplay ? d.loadVideoById(r) : d.cueVideoById(r);
                                break;
                            case"currentTime":
                                d.seekTo(n);
                                break;
                            case"muted":
                                n ? d.mute() : d.unMute(), setTimeout(function () {
                                    var t = (0, l.createEvent)("volumechange", o);
                                    e.dispatchEvent(t)
                                }, 50);
                                break;
                            case"volume":
                                m = n, d.setVolume(100 * n), setTimeout(function () {
                                    var t = (0, l.createEvent)("volumechange", o);
                                    e.dispatchEvent(t)
                                }, 50);
                                break;
                            case"readyState":
                                var a = (0, l.createEvent)("canplay", o);
                                e.dispatchEvent(a)
                        } else s.push({type: "set", propName: t, value: n})
                    }
                }(h[v]);
                for (var y = a.default.html5media.methods, E = 0, b = y.length; E < b; E++) !function (e) {
                    o[e] = function () {
                        if (null !== d) switch (e) {
                            case"play":
                                return u = !1, d.playVideo();
                            case"pause":
                                return u = !0, d.pauseVideo();
                            case"load":
                                return null
                        } else s.push({type: "call", methodName: e})
                    }
                }(y[E]);
                var S = function (t) {
                    var o = "";
                    switch (t.data) {
                        case 2:
                            o = "The request contains an invalid parameter value. Verify that video ID has 11 characters and that contains no invalid characters, such as exclamation points or asterisks.";
                            break;
                        case 5:
                            o = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
                            break;
                        case 100:
                            o = "The video requested was not found. Either video has been removed or has been marked as private.";
                            break;
                        case 101:
                        case 105:
                            o = "The owner of the requested video does not allow it to be played in embedded players.";
                            break;
                        default:
                            o = "Unknown error."
                    }
                    e.generateError("Code " + t.data + ": " + o, n)
                }, x = r.default.createElement("div");
                x.id = o.id, o.options.youtube.nocookie && (e.originalNode.src = c.getYouTubeNoCookieUrl(n[0].src)), e.originalNode.parentNode.insertBefore(x, e.originalNode), e.originalNode.style.display = "none";
                var w = "audio" === e.originalNode.tagName.toLowerCase(), P = w ? "1" : e.originalNode.height,
                    T = w ? "1" : e.originalNode.width, C = c.getYouTubeId(n[0].src), k = {
                        id: o.id,
                        containerId: x.id,
                        videoId: C,
                        height: P,
                        width: T,
                        playerVars: Object.assign({
                            controls: 0,
                            rel: 0,
                            disablekb: 1,
                            showinfo: 0,
                            modestbranding: 0,
                            html5: 1,
                            iv_load_policy: 3
                        }, o.options.youtube),
                        origin: i.default.location.host,
                        events: {
                            onReady: function (t) {
                                if (e.youTubeApi = d = t.target, e.youTubeState = {
                                    paused: !0,
                                    ended: !1
                                }, s.length) for (var n = 0, i = s.length; n < i; n++) {
                                    var r = s[n];
                                    if ("set" === r.type) {
                                        var a = r.propName, u = "" + a.substring(0, 1).toUpperCase() + a.substring(1);
                                        o["set" + u](r.value)
                                    } else "call" === r.type && o[r.methodName]()
                                }
                                p = d.getIframe(), e.originalNode.muted && d.mute();
                                for (var c = ["mouseover", "mouseout"], f = 0, m = c.length; f < m; f++) p.addEventListener(c[f], function (t) {
                                    var n = (0, l.createEvent)(t.type, o);
                                    e.dispatchEvent(n)
                                }, !1);
                                for (var h = ["rendererready", "loadedmetadata", "loadeddata", "canplay"], v = 0, g = h.length; v < g; v++) {
                                    var y = (0, l.createEvent)(h[v], o);
                                    e.dispatchEvent(y)
                                }
                            }, onStateChange: function (t) {
                                var n = [];
                                switch (t.data) {
                                    case-1:
                                        n = ["loadedmetadata"], u = !0, f = !1;
                                        break;
                                    case 0:
                                        n = ["ended"], u = !1, f = !o.options.youtube.loop, o.options.youtube.loop || o.stopInterval();
                                        break;
                                    case 1:
                                        n = ["play", "playing"], u = !1, f = !1, o.startInterval();
                                        break;
                                    case 2:
                                        n = ["pause"], u = !0, f = !1, o.stopInterval();
                                        break;
                                    case 3:
                                        n = ["progress"], f = !1;
                                        break;
                                    case 5:
                                        n = ["loadeddata", "loadedmetadata", "canplay"], u = !0, f = !1
                                }
                                for (var i = 0, r = n.length; i < r; i++) {
                                    var a = (0, l.createEvent)(n[i], o);
                                    e.dispatchEvent(a)
                                }
                            }, onError: function (e) {
                                return S(e)
                            }
                        }
                    };
                return (w || e.originalNode.hasAttribute("playsinline")) && (k.playerVars.playsinline = 1), e.originalNode.controls && (k.playerVars.controls = 1), e.originalNode.autoplay && (k.playerVars.autoplay = 1), e.originalNode.loop && (k.playerVars.loop = 1), (k.playerVars.loop && 1 === parseInt(k.playerVars.loop, 10) || e.originalNode.src.indexOf("loop=") > -1) && !k.playerVars.playlist && -1 === e.originalNode.src.indexOf("playlist=") && (k.playerVars.playlist = c.getYouTubeId(e.originalNode.src)), c.enqueueIframe(k), o.onEvent = function (t, n, o) {
                    null !== o && void 0 !== o && (e.youTubeState = o)
                }, o.setSize = function (e, t) {
                    null !== d && d.setSize(e, t)
                }, o.hide = function () {
                    o.stopInterval(), o.pause(), p && (p.style.display = "none")
                }, o.show = function () {
                    p && (p.style.display = "")
                }, o.destroy = function () {
                    d.destroy()
                }, o.interval = null, o.startInterval = function () {
                    o.interval = setInterval(function () {
                        var t = (0, l.createEvent)("timeupdate", o);
                        e.dispatchEvent(t)
                    }, 250)
                }, o.stopInterval = function () {
                    o.interval && clearInterval(o.interval)
                }, o.getPosterUrl = function () {
                    var n = t.youtube.imageQuality,
                        o = ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"],
                        i = c.getYouTubeId(e.originalNode.src);
                    return n && o.indexOf(n) > -1 && i ? "https://img.youtube.com/vi/" + i + "/" + n + ".jpg" : ""
                }, o
            }
        };
        i.default.onYouTubePlayerAPIReady = function () {
            c.iFrameReady()
        }, d.typeChecks.push(function (e) {
            return /\/\/(www\.youtube|youtu\.?be)/i.test(e) ? "video/x-youtube" : null
        }), s.renderer.add(f)
    }, {2: 2, 26: 26, 27: 27, 28: 28, 3: 3, 7: 7, 8: 8}], 25: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.cancelFullScreen = n.requestFullScreen = n.isFullScreen = n.FULLSCREEN_EVENT_NAME = n.HAS_NATIVE_FULLSCREEN_ENABLED = n.HAS_TRUE_NATIVE_FULLSCREEN = n.HAS_IOS_FULLSCREEN = n.HAS_MS_NATIVE_FULLSCREEN = n.HAS_MOZ_NATIVE_FULLSCREEN = n.HAS_WEBKIT_NATIVE_FULLSCREEN = n.HAS_NATIVE_FULLSCREEN = n.SUPPORTS_NATIVE_HLS = n.SUPPORT_PASSIVE_EVENT = n.SUPPORT_POINTER_EVENTS = n.HAS_MSE = n.IS_STOCK_ANDROID = n.IS_SAFARI = n.IS_FIREFOX = n.IS_CHROME = n.IS_EDGE = n.IS_IE = n.IS_ANDROID = n.IS_IOS = n.IS_IPOD = n.IS_IPHONE = n.IS_IPAD = n.UA = n.NAV = void 0;
        for (var i = o(e(3)), r = o(e(2)), a = o(e(7)), s = n.NAV = i.default.navigator, l = n.UA = s.userAgent.toLowerCase(), d = n.IS_IPAD = /ipad/i.test(l) && !i.default.MSStream, u = n.IS_IPHONE = /iphone/i.test(l) && !i.default.MSStream, c = n.IS_IPOD = /ipod/i.test(l) && !i.default.MSStream, f = (n.IS_IOS = /ipad|iphone|ipod/i.test(l) && !i.default.MSStream, n.IS_ANDROID = /android/i.test(l)), p = n.IS_IE = /(trident|microsoft)/i.test(s.appName), m = (n.IS_EDGE = "msLaunchUri" in s && !("documentMode" in r.default)), h = n.IS_CHROME = /chrome/i.test(l), v = n.IS_FIREFOX = /firefox/i.test(l), g = n.IS_SAFARI = /safari/i.test(l) && !h, y = n.IS_STOCK_ANDROID = /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(l), E = (n.HAS_MSE = "MediaSource" in i.default), b = n.SUPPORT_POINTER_EVENTS = function () {
            var e = r.default.createElement("x"), t = r.default.documentElement, n = i.default.getComputedStyle;
            if (!("pointerEvents" in e.style)) return !1;
            e.style.pointerEvents = "auto", e.style.pointerEvents = "x", t.appendChild(e);
            var o = n && "auto" === n(e, "").pointerEvents;
            return e.remove(), !!o
        }(), S = n.SUPPORT_PASSIVE_EVENT = function () {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                i.default.addEventListener("test", null, t)
            } catch (e) {
            }
            return e
        }(), x = ["source", "track", "audio", "video"], w = void 0, P = 0, T = x.length; P < T; P++) w = r.default.createElement(x[P]);
        var C = n.SUPPORTS_NATIVE_HLS = g || f && (h || y) || p && /edge/i.test(l),
            k = void 0 !== w.webkitEnterFullscreen, _ = void 0 !== w.requestFullscreen;
        k && /mac os x 10_5/i.test(l) && (_ = !1, k = !1);
        var N = void 0 !== w.webkitRequestFullScreen, A = void 0 !== w.mozRequestFullScreen,
            L = void 0 !== w.msRequestFullscreen, F = N || A || L, j = F, I = "", M = void 0, O = void 0, D = void 0;
        A ? j = r.default.mozFullScreenEnabled : L && (j = r.default.msFullscreenEnabled), h && (k = !1), F && (N ? I = "webkitfullscreenchange" : A ? I = "mozfullscreenchange" : L && (I = "MSFullscreenChange"), n.isFullScreen = M = function () {
            return A ? r.default.mozFullScreen : N ? r.default.webkitIsFullScreen : L ? null !== r.default.msFullscreenElement : void 0
        }, n.requestFullScreen = O = function (e) {
            N ? e.webkitRequestFullScreen() : A ? e.mozRequestFullScreen() : L && e.msRequestFullscreen()
        }, n.cancelFullScreen = D = function () {
            N ? r.default.webkitCancelFullScreen() : A ? r.default.mozCancelFullScreen() : L && r.default.msExitFullscreen()
        });
        var V = n.HAS_NATIVE_FULLSCREEN = _, R = n.HAS_WEBKIT_NATIVE_FULLSCREEN = N,
            H = n.HAS_MOZ_NATIVE_FULLSCREEN = A, U = n.HAS_MS_NATIVE_FULLSCREEN = L, q = n.HAS_IOS_FULLSCREEN = k,
            B = n.HAS_TRUE_NATIVE_FULLSCREEN = F, z = n.HAS_NATIVE_FULLSCREEN_ENABLED = j,
            W = n.FULLSCREEN_EVENT_NAME = I;
        n.isFullScreen = M, n.requestFullScreen = O, n.cancelFullScreen = D, a.default.Features = a.default.Features || {}, a.default.Features.isiPad = d, a.default.Features.isiPod = c, a.default.Features.isiPhone = u, a.default.Features.isiOS = a.default.Features.isiPhone || a.default.Features.isiPad, a.default.Features.isAndroid = f, a.default.Features.isIE = p, a.default.Features.isEdge = m, a.default.Features.isChrome = h, a.default.Features.isFirefox = v, a.default.Features.isSafari = g, a.default.Features.isStockAndroid = y, a.default.Features.hasMSE = E, a.default.Features.supportsNativeHLS = C, a.default.Features.supportsPointerEvents = b, a.default.Features.supportsPassiveEvent = S, a.default.Features.hasiOSFullScreen = q, a.default.Features.hasNativeFullscreen = V, a.default.Features.hasWebkitNativeFullScreen = R, a.default.Features.hasMozNativeFullScreen = H, a.default.Features.hasMsNativeFullScreen = U, a.default.Features.hasTrueNativeFullScreen = B, a.default.Features.nativeFullScreenEnabled = z, a.default.Features.fullScreenEventName = W, a.default.Features.isFullScreen = M, a.default.Features.requestFullScreen = O, a.default.Features.cancelFullScreen = D
    }, {2: 2, 3: 3, 7: 7}], 26: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function i(e) {
            return new Promise(function (t, n) {
                var o = p.default.createElement("script");
                o.src = e, o.async = !0, o.onload = function () {
                    o.remove(), t()
                }, o.onerror = function () {
                    o.remove(), n()
                }, p.default.head.appendChild(o)
            })
        }

        function r(e) {
            var t = e.getBoundingClientRect(), n = f.default.pageXOffset || p.default.documentElement.scrollLeft,
                o = f.default.pageYOffset || p.default.documentElement.scrollTop;
            return {top: t.top + o, left: t.left + n}
        }

        function a(e, t) {
            y(e, t) ? b(e, t) : E(e, t)
        }

        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 400, n = arguments[2];
            e.style.opacity || (e.style.opacity = 1);
            var o = null;
            f.default.requestAnimationFrame(function i(r) {
                var a = r - (o = o || r), s = parseFloat(1 - a / t, 2);
                e.style.opacity = s < 0 ? 0 : s, a > t ? n && "function" == typeof n && n() : f.default.requestAnimationFrame(i)
            })
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 400, n = arguments[2];
            e.style.opacity || (e.style.opacity = 0);
            var o = null;
            f.default.requestAnimationFrame(function i(r) {
                var a = r - (o = o || r), s = parseFloat(a / t, 2);
                e.style.opacity = s > 1 ? 1 : s, a > t ? n && "function" == typeof n && n() : f.default.requestAnimationFrame(i)
            })
        }

        function d(e, t) {
            var n = [];
            e = e.parentNode.firstChild;
            do {
                t && !t(e) || n.push(e)
            } while (e = e.nextSibling);
            return n
        }

        function u(e) {
            return void 0 !== e.getClientRects && "function" === e.getClientRects ? !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) : !(!e.offsetWidth && !e.offsetHeight)
        }

        function c(e, t, n, o) {
            var i = f.default.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                r = "application/x-www-form-urlencoded; charset=UTF-8", a = !1, s = "*/".concat("*");
            switch (t) {
                case"text":
                    r = "text/plain";
                    break;
                case"json":
                    r = "application/json, text/javascript";
                    break;
                case"html":
                    r = "text/html";
                    break;
                case"xml":
                    r = "application/xml, text/xml"
            }
            "application/x-www-form-urlencoded" !== r && (s = r + ", */*; q=0.01"), i && (i.open("GET", e, !0), i.setRequestHeader("Accept", s), i.onreadystatechange = function () {
                if (!a && 4 === i.readyState) if (200 === i.status) {
                    a = !0;
                    var e = void 0;
                    switch (t) {
                        case"json":
                            e = JSON.parse(i.responseText);
                            break;
                        case"xml":
                            e = i.responseXML;
                            break;
                        default:
                            e = i.responseText
                    }
                    n(e)
                } else "function" == typeof o && o(i.status)
            }, i.send())
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.removeClass = n.addClass = n.hasClass = void 0, n.loadScript = i, n.offset = r, n.toggleClass = a, n.fadeOut = s, n.fadeIn = l, n.siblings = d, n.visible = u, n.ajax = c;
        var f = o(e(3)), p = o(e(2)), m = o(e(7)), h = void 0, v = void 0, g = void 0;
        "classList" in p.default.documentElement ? (h = function (e, t) {
            return void 0 !== e.classList && e.classList.contains(t)
        }, v = function (e, t) {
            return e.classList.add(t)
        }, g = function (e, t) {
            return e.classList.remove(t)
        }) : (h = function (e, t) {
            return new RegExp("\\b" + t + "\\b").test(e.className)
        }, v = function (e, t) {
            y(e, t) || (e.className += " " + t)
        }, g = function (e, t) {
            e.className = e.className.replace(new RegExp("\\b" + t + "\\b", "g"), "")
        });
        var y = n.hasClass = h, E = n.addClass = v, b = n.removeClass = g;
        m.default.Utils = m.default.Utils || {}, m.default.Utils.offset = r, m.default.Utils.hasClass = y, m.default.Utils.addClass = E, m.default.Utils.removeClass = b, m.default.Utils.toggleClass = a, m.default.Utils.fadeIn = l, m.default.Utils.fadeOut = s, m.default.Utils.siblings = d, m.default.Utils.visible = u, m.default.Utils.ajax = c, m.default.Utils.loadScript = i
    }, {2: 2, 3: 3, 7: 7}], 27: [function (e, t, n) {
        "use strict";

        function o(e) {
            if ("string" != typeof e) throw new Error("Argument passed must be a string");
            var t = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"};
            return e.replace(/[&<>"]/g, function (e) {
                return t[e]
            })
        }

        function i(e, t) {
            var n = this, o = arguments, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if ("function" != typeof e) throw new Error("First argument must be a function");
            if ("number" != typeof t) throw new Error("Second argument must be a numeric value");
            var r = void 0;
            return function () {
                var a = n, s = o, l = i && !r;
                clearTimeout(r), r = setTimeout(function () {
                    r = null, i || e.apply(a, s)
                }, t), l && e.apply(a, s)
            }
        }

        function r(e) {
            return Object.getOwnPropertyNames(e).length <= 0
        }

        function a(e, t) {
            var n = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/,
                o = {d: [], w: []};
            return (e || "").split(" ").forEach(function (e) {
                var i = e + (t ? "." + t : "");
                i.startsWith(".") ? (o.d.push(i), o.w.push(i)) : o[n.test(e) ? "w" : "d"].push(i)
            }), o.d = o.d.join(" "), o.w = o.w.join(" "), o
        }

        function s(e, t) {
            if ("string" != typeof e) throw new Error("Event name must be a string");
            var n = e.match(/([a-z]+\.([a-z]+))/i), o = {target: t};
            return null !== n && (e = n[1], o.namespace = n[2]), new window.CustomEvent(e, {detail: o})
        }

        function l(e, t) {
            return !!(e && t && 2 & e.compareDocumentPosition(t))
        }

        function d(e) {
            return "string" == typeof e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.escapeHTML = o, n.debounce = i, n.isObjectEmpty = r, n.splitEvents = a, n.createEvent = s, n.isNodeAfter = l, n.isString = d;
        var u = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(7));
        u.default.Utils = u.default.Utils || {}, u.default.Utils.escapeHTML = o, u.default.Utils.debounce = i, u.default.Utils.isObjectEmpty = r, u.default.Utils.splitEvents = a, u.default.Utils.createEvent = s, u.default.Utils.isNodeAfter = l, u.default.Utils.isString = d
    }, {7: 7}], 28: [function (e, t, n) {
        "use strict";

        function o(e) {
            if ("string" != typeof e) throw new Error("`url` argument must be a string");
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + (0, u.escapeHTML)(e) + '">x</a>', t.firstChild.href
        }

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return e && !t ? a(e) : t
        }

        function r(e) {
            if ("string" != typeof e) throw new Error("`type` argument must be a string");
            return e && e.indexOf(";") > -1 ? e.substr(0, e.indexOf(";")) : e
        }

        function a(e) {
            if ("string" != typeof e) throw new Error("`url` argument must be a string");
            for (var t = 0, n = c.length; t < n; t++) {
                var o = c[t](e);
                if (o) return o
            }
            var i = l(s(e)), r = "video/mp4";
            return i && (~["mp4", "m4v", "ogg", "ogv", "webm", "flv", "mpeg", "mov"].indexOf(i) ? r = "video/" + i : ~["mp3", "oga", "wav", "mid", "midi"].indexOf(i) && (r = "audio/" + i)), r
        }

        function s(e) {
            if ("string" != typeof e) throw new Error("`url` argument must be a string");
            var t = e.split("?")[0].split("\\").pop().split("/").pop();
            return ~t.indexOf(".") ? t.substring(t.lastIndexOf(".") + 1) : ""
        }

        function l(e) {
            if ("string" != typeof e) throw new Error("`extension` argument must be a string");
            switch (e) {
                case"mp4":
                case"m4v":
                    return "mp4";
                case"webm":
                case"webma":
                case"webmv":
                    return "webm";
                case"ogg":
                case"oga":
                case"ogv":
                    return "ogg";
                default:
                    return e
            }
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.typeChecks = void 0, n.absolutizeUrl = o, n.formatType = i, n.getMimeFromType = r, n.getTypeFromFile = a, n.getExtension = s, n.normalizeExtension = l;
        var d = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(7)), u = e(27), c = n.typeChecks = [];
        d.default.Utils = d.default.Utils || {}, d.default.Utils.typeChecks = c, d.default.Utils.absolutizeUrl = o, d.default.Utils.formatType = i, d.default.Utils.getMimeFromType = r, d.default.Utils.getTypeFromFile = a, d.default.Utils.getExtension = s, d.default.Utils.normalizeExtension = l
    }, {27: 27, 7: 7}], 29: [function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var i = o(e(2)), r = o(e(4));
        if ([Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (e) {
            e.hasOwnProperty("remove") || Object.defineProperty(e, "remove", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function () {
                    this.parentNode.removeChild(this)
                }
            })
        }), function () {
            function e(e, t) {
                t = t || {bubbles: !1, cancelable: !1, detail: void 0};
                var n = i.default.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            }

            if ("function" == typeof window.CustomEvent) return !1;
            e.prototype = window.Event.prototype, window.CustomEvent = e
        }(), "function" != typeof Object.assign && (Object.assign = function (e) {
            if (null === e || void 0 === e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), n = 1, o = arguments.length; n < o; n++) {
                var i = arguments[n];
                if (null !== i) for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            return t
        }), String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
            return t = t || 0, this.substr(t, e.length) === e
        }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length - 1; --n >= 0 && t.item(n) !== this;) ;
            return n > -1
        }), window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
            var t = (this.document || this.ownerDocument).querySelectorAll(e), n = void 0, o = this;
            do {
                for (n = t.length; --n >= 0 && t.item(n) !== o;) ;
            } while (n < 0 && (o = o.parentElement));
            return o
        }), function () {
            for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
                var n = (new Date).getTime(), o = Math.max(0, 16 - (n - e)), i = window.setTimeout(function () {
                    t(n + o)
                }, o);
                return e = n + o, i
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                clearTimeout(e)
            })
        }(), /firefox/i.test(navigator.userAgent)) {
            var a = window.getComputedStyle;
            window.getComputedStyle = function (e, t) {
                var n = a(e, t);
                return null === n ? {
                    getPropertyValue: function () {
                    }
                } : n
            }
        }
        window.Promise || (window.Promise = r.default), function (e) {
            e && e.prototype && null === e.prototype.children && Object.defineProperty(e.prototype, "children", {
                get: function () {
                    for (var e = 0, t = void 0, n = this.childNodes, o = []; t = n[e++];) 1 === t.nodeType && o.push(t);
                    return o
                }
            })
        }(window.Node || window.Element)
    }, {2: 2, 4: 4}], 30: [function (e, t, n) {
        "use strict";

        function o() {
            return !((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 25) % 1 == 0)
        }

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 25,
                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "hh:mm:ss";
            e = !e || "number" != typeof e || e < 0 ? 0 : e;
            var s = Math.round(.066666 * i), l = Math.round(i), d = 24 * Math.round(3600 * i), u = Math.round(600 * i),
                c = o(i) ? ";" : ":", f = void 0, p = void 0, m = void 0, h = void 0, v = Math.round(e * i);
            if (o(i)) {
                v < 0 && (v = d + v);
                var g = (v %= d) % u;
                v += 9 * s * Math.floor(v / u), g > s && (v += s * Math.floor((g - s) / Math.round(60 * l - s)));
                var y = Math.floor(v / l);
                f = Math.floor(Math.floor(y / 60) / 60), p = Math.floor(y / 60) % 60, m = n ? y % 60 : Math.floor(v / l % 60).toFixed(r)
            } else f = Math.floor(e / 3600) % 24, p = Math.floor(e / 60) % 60, m = n ? Math.floor(e % 60) : Math.floor(e % 60).toFixed(r);
            f = f <= 0 ? 0 : f, p = p <= 0 ? 0 : p, m = 60 === (m = m <= 0 ? 0 : m) ? 0 : m, p = 60 === p ? 0 : p;
            for (var E = a.split(":"), b = {}, S = 0, x = E.length; S < x; ++S) {
                for (var w = "", P = 0, T = E[S].length; P < T; P++) w.indexOf(E[S][P]) < 0 && (w += E[S][P]);
                ~["f", "s", "m", "h"].indexOf(w) && (b[w] = E[S].length)
            }
            var C = t || f > 0 ? (f < 10 && b.h > 1 ? "0" + f : f) + ":" : "";
            return C += (p < 10 && b.m > 1 ? "0" + p : p) + ":", C += "" + (m < 10 && b.s > 1 ? "0" + m : m), n && (C += (h = (h = (v % l).toFixed(0)) <= 0 ? 0 : h) < 10 && b.f ? c + "0" + h : "" + c + h), C
        }

        function r(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 25;
            if ("string" != typeof e) throw new TypeError("Time must be a string");
            if (e.indexOf(";") > 0 && (e = e.replace(";", ":")), !/\d{2}(\:\d{2}){0,3}/i.test(e)) throw new TypeError("Time code must have the format `00:00:00`");
            var n = e.split(":"), i = void 0, r = 0, a = 0, s = 0, l = 0, d = 0, u = Math.round(.066666 * t),
                c = Math.round(t), f = 3600 * c, p = 60 * c;
            switch (n.length) {
                default:
                case 1:
                    s = parseInt(n[0], 10);
                    break;
                case 2:
                    a = parseInt(n[0], 10), s = parseInt(n[1], 10);
                    break;
                case 3:
                    r = parseInt(n[0], 10), a = parseInt(n[1], 10), s = parseInt(n[2], 10);
                    break;
                case 4:
                    r = parseInt(n[0], 10), a = parseInt(n[1], 10), s = parseInt(n[2], 10), l = parseInt(n[3], 10)
            }
            return i = o(t) ? f * r + p * a + c * s + l - u * ((d = 60 * r + a) - Math.floor(d / 10)) : (f * r + p * a + t * s + l) / t, parseFloat(i.toFixed(3))
        }

        function a(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 25;
            e = !e || "number" != typeof e || e < 0 ? 0 : e;
            for (var o = Math.floor(e / 3600) % 24, i = Math.floor(e / 60) % 60, r = Math.floor(e % 60), a = [[Math.floor((e % 1 * n).toFixed(3)), "f"], [r, "s"], [i, "m"], [o, "h"]], s = t.timeFormat, l = s[1] === s[0], d = l ? 2 : 1, u = s.length < d ? s[d] : ":", c = s[0], f = !1, p = 0, m = a.length; p < m; p++) if (~s.indexOf(a[p][1])) f = !0; else if (f) {
                for (var h = !1, v = p; v < m; v++) if (a[v][0] > 0) {
                    h = !0;
                    break
                }
                if (!h) break;
                l || (s = c + s), s = a[p][1] + u + s, l && (s = a[p][1] + s), c = a[p][1]
            }
            t.timeFormat = s
        }

        function s(e) {
            if ("string" != typeof e) throw new TypeError("Argument must be a string value");
            for (var t = ~(e = e.replace(",", ".")).indexOf(".") ? e.split(".")[1].length : 0, n = 0, o = 1, i = 0, r = (e = e.split(":").reverse()).length; i < r; i++) o = 1, i > 0 && (o = Math.pow(60, i)), n += Number(e[i]) * o;
            return Number(n.toFixed(t))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.isDropFrame = o, n.secondsToTimeCode = i, n.timeCodeToSeconds = r, n.calculateTimeFormat = a, n.convertSMPTEtoSeconds = s;
        var l = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e(7));
        l.default.Utils = l.default.Utils || {}, l.default.Utils.secondsToTimeCode = i, l.default.Utils.timeCodeToSeconds = r, l.default.Utils.calculateTimeFormat = a, l.default.Utils.convertSMPTEtoSeconds = s
    }, {7: 7}]
}, {}, [29, 6, 5, 15, 23, 20, 19, 21, 22, 24, 16, 18, 17, 9, 10, 11, 12, 13, 14]);
