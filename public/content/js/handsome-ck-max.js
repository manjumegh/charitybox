function addCommasToNumber(e) {
    e += "";
    var t = e.split("."),
        n = t[0],
        r = t.length > 1 ? "." + t[1] : "",
        i = /(\d+)(\d{3})/;
    while (i.test(n)) n = n.replace(i, "$1,$2");
    return n + r
}
function getDocHeight() {
    var e = document;
    return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
}
function pulseAnimation() {
    var e = .5,
        t = 1150,
        n = 850;
    window.pulse_image.animate({
        opacity: e
    }, t, function () {
        window.pulse_image.animate({
            opacity: 1
        }, n, function () {
            window.pulse_continue_loop && pulseAnimation()
        })
    })
}(function (e, t, n, r) {
    var i, s, o = 1;
    s = {
        animationSpeed: 500,
        animationEasing: "linear",
        curtainClass: "curtain",
        curtainLeftClass: "left",
        curtainRightClass: "right",
        curtainElement: "div",
        inactiveShowElement: ".site-name",
        inactiveDisplay: "block",
        activeShowElement: ".site-tagline"
    };
    i = {
        init: function (t) {
            t && e.extend(s, t);
            return this.each(function () {
                i.addCurtains(e(this));
                i.setWidths(e(this));
                i.bindEvents(e(this))
            })
        },
        bindEvents: function (n) {
            n.hover(function () {
                o = 2;
                i.closeCurtains(n, function () {
                    n.find(s.inactiveShowElement).css({
                        display: "none"
                    });
                    i.openCurtains(n)
                })
            }, function () {
                o = 1;
                i.closeCurtains(n, function () {
                    n.find(s.inactiveShowElement).css({
                        display: s.inactiveDisplay
                    });
                    i.openCurtains(n)
                })
            });
            e(t).resize(function () {
                i.setWidths(n)
            })
        },
        closeCurtains: function (e, t) {
            typeof t != "function" && (t = function () {});
            e.find("." + s.curtainClass).stop().dequeue().animate({
                width: i.getActiveWidth(e) + "px"
            }, s.animationSpeed, s.animationEasing, t)
        },
        openCurtains: function (e, t) {
            typeof t != "function" && (t = function () {});
            o === 1 ? e.find("." + s.curtainClass).stop().dequeue().animate({
                width: i.getInactiveWidthAlt(e) + "px"
            }, s.animationSpeed, s.animationEasing, t) : e.find("." + s.curtainClass).stop().dequeue().animate({
                width: i.getInactiveWidth(e) + "px"
            }, s.animationSpeed, s.animationEasing, t)
        },
        setWidths: function (e) {
            e.find("." + s.curtainClass).width(i.getInactiveWidthAlt(e))
        },
        addCurtains: function (e) {
            if (e.find("." + s.curtainClass).length >= 2) return;
            e.find("." + s.curtainClass + "." + s.curtainLeftClass).length === 0 && e.append("<" + s.curtainElement + ' class="' + s.curtainClass + " " + s.curtainLeftClass + '"></' + s.curtainElement + ">");
            e.find("." + s.curtainClass + "." + s.curtainRightClass).length === 0 && e.append("<" + s.curtainElement + ' class="' + s.curtainClass + " " + s.curtainRightClass + '"></' + s.curtainElement + ">")
        },
        getActiveWidth: function (e) {
            var t = e.outerWidth(),
                n = Math.ceil(t / 2);
            return n > 0 ? n : 0
        },
        getInactiveWidth: function (e) {
            var t = e.outerWidth(),
                n = Math.ceil(t / 2),
                r = i.getMaxShowElement(e),
                s = Math.ceil(r / 2),
                o = n - s;
            return o > 0 ? o : 0
        },
        getInactiveWidthAlt: function (e) {
            var t = e.outerWidth(),
                n = Math.ceil(t / 2),
                r = e.find(s.inactiveShowElement).width(),
                i = Math.ceil(r / 2),
                o = n - i;
            return o > 0 ? o : 0
        },
        getMaxShowElement: function (e) {
            var t = e.find(s.inactiveShowElement).outerWidth(),
                n = e.find(s.activeShowElement).outerWidth();
            return n > t ? n : t
        }
    };
    e.fn.kcurtains = function (t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return i.init.apply(this, arguments);
        e("Method " + t + " does not exist on jQuery.kcurtains")
    }
})(jQuery, window, document);
(function (e, t, n, r) {
    var i, s;
    s = {
        animationSpeed: 2e3,
        scrollBump: 0
    };
    i = {
        init: function (t) {
            t && e.extend(s, t);
            return this.each(function () {
                i.bindEvents(e(this))
            })
        },
        bindEvents: function (t) {
            t.on("click", 'a[href^="#"]', function (t) {
                t.preventDefault();
                var n = e(this).attr("href");
                if (e(n).length > 0 && n !== "#") {
                    var r = n.replace(/^\#/ig, ""),
                        i = e("#" + r).offset().top;
                    e("html, body").animate({
                        scrollTop: i
                    }, s.animationSpeed, "swing")
                }
            });

            t.on("click", '.cta-button', function(){
                _gaq.push(["_trackEvent", "Most Recent Work", "CTA Clicked"]);
            });

            var screenSizes = [320, 480, 768, 1024, 1280, 1440, 1600],
                screenSizesLength = screenSizes.length,
                screenSizesState = screenSizes.length;
            
            $(window).on('resize', function(){
                var windowW = parseInt($(window).width(), 10);
                $(screenSizes).each(function(k, v){
                    if (k !== screenSizesLength && windowW > v && windowW < screenSizes[k+1] && screenSizesState !== k) {
                        var sign = (screenSizesState > k) ? 'less' : 'more',
                            message = sign + ' than ' + screenSizes[k];
                        _gaq.push(["_trackEvent", "Browser resize", "Resize to", message]);
                        screenSizesState = k;
                    }
                })
            });
        },
        getElemPos: function (e) {
            var t = 0,
                n = 0;
            if (e === r) return {
                x: t,
                y: n
            };
            t = e.offset().left;
            n = e.offset().top;
            return {
                x: t,
                y: n
            }
        }
    };
    e.fn.ksmooth = function (t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return i.init.apply(this, arguments);
        e("Method " + t + " does not exist on jQuery.ksmooth")
    }
})(jQuery, window, document);
(function (e) {
    function i(e, t) {
        if (e.originalEvent.touches.length > 1) return;
        e.preventDefault();
        var n = e.originalEvent.changedTouches[0],
            r = document.createEvent("MouseEvents");
        r.initMouseEvent(t, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null);
        e.target.dispatchEvent(r)
    }
    e.support.touch = "ontouchend" in document;
    if (!e.support.touch) return;
    var t = e.ui.mouse.prototype,
        n = t._mouseInit,
        r;
    t._touchStart = function (e) {
        var t = this;
        if (r || !t._mouseCapture(e.originalEvent.changedTouches[0])) return;
        r = !0;
        t._touchMoved = !1;
        i(e, "mouseover");
        i(e, "mousemove");
        i(e, "mousedown")
    };
    t._touchMove = function (e) {
        if (!r) return;
        this._touchMoved = !0;
        i(e, "mousemove")
    };
    t._touchEnd = function (e) {
        if (!r) return;
        i(e, "mouseup");
        i(e, "mouseout");
        this._touchMoved || i(e, "click");
        r = !1
    };
    t._mouseInit = function () {
        var t = this;
        t.element.bind("touchstart", e.proxy(t, "_touchStart")).bind("touchmove", e.proxy(t, "_touchMove")).bind("touchend", e.proxy(t, "_touchEnd"));
        n.call(t)
    }
})(jQuery);
(function (e, t, n, r) {
    var i, s;
    s = {
        activeClass: "active",
        adjustY: 0,
        adjustX: 0,
        animationInSpeed: "normal",
        animationOutSpeed: 1,
        dataContent: "tooltip",
        dataClass: "tooltip-class",
        defaultClass: "tooltip",
        inDelay: 300,
        idSuffix: "",
        idPrefix: "tooltip-",
        inactiveClass: "inactive",
        outDelay: 1
    };
    i = {
        init: function (t) {
            t && e.extend(s, t);
            return this.each(function (t) {
                i.createTooltip(e(this), t);
                i.bindEvents(e(this), t)
            })
        },
        bindEvents: function (t, n) {
            var o = t.data(s.dataClass) !== r && t.data(s.dataClass) !== "" ? t.data(s.dataClass) : s.defaultClass,
                u = "." + o + "#" + s.idPrefix + n + s.idSuffix;
            t.hover(function () {
                var n = e(u);
                i.setTooltipPosition(t, u);
                n.fadeIn(100)
            }, function () {
                var t = e(u);
                t.fadeOut(10)
            })
        },
        createTooltip: function (t, n) {
            var o = t.data(s.dataContent),
                u = t.data(s.dataClass) !== r && t.data(s.dataClass) !== "" ? t.data(s.dataClass) : s.defaultClass,
                a = s.idPrefix + n + s.idSuffix;
            u += " " + s.inactiveClass;
            e("body").append('<div id="' + a + '" class="' + u + '">' + o + "</html>");
            i.setTooltipPosition(t, "#" + a)
        },
        getElemPosition: function (e) {
            var t = 0,
                n = 0;
            e = e[0];
            if (e.offsetParent) do {
                t += e.offsetLeft;
                n += e.offsetTop
            } while (e = e.offsetParent);
            return {
                x: t,
                y: n
            }
        },
        setTooltipPosition: function (t, n) {
            var r = i.getElemPosition(t),
                o = s.adjustY,
                u = s.adjustX,
                a = 0,
                f = 0,
                l = e(n);
            a = r.x + (t.outerWidth() / 2 - l.outerWidth() / 2) + u;
            f = r.y + t.outerHeight() + o;
            l.css({
                left: a + "px",
                top: f + "px",
                position: "absolute"
            })
        }
    };
    e.fn.ktooltip = function (t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return i.init.apply(this, arguments);
        e("Method " + t + " does not exist on jQuery.ktooltip")
    }
})(jQuery, window, document);
(function (e, t, n, r) {
    var i, s;
    s = {
        animationSpeed: 600,
        animationEasing: "linear",
        childElements: ".child",
        zoomElement: "img",
        zoomRadius: 10,
        onMouseOverCallback: function () {},
        onMouseOutCallback: function () {}
    };
    i = {
        init: function (t) {
            t && e.extend(s, t);
            return this.each(function () {
                i.bindEvents(e(this))
            })
        },
        bindEvents: function (n) {
            n.hover(function () {
                var t = e(this).siblings(),
                    n = {}, r = i.getDimensions(e(this)),
                    o = s.zoomRadius,
                    u = r.width + 2 * o,
                    a = r.height + 2 * o;
                n = {
                    width: u + "px",
                    height: a + "px",
                    left: "-" + o + "px",
                    top: "-" + o + "px"
                };
                t.find(".work-item-hover").stop().animate({
                    opacity: .4
                }, s.animationSpeed);
                s.onMouseOverCallback.call(this, e(this))
            }, function () {
                var t = {}, n = e(this).siblings(),
                    r = i.getDimensions(e(this)),
                    o = r.width,
                    u = r.height;
                t = {
                    width: o + "px",
                    height: u + "px",
                    left: "0px",
                    top: "0px"
                };
                n.find(".work-item-hover").stop().animate({
                    opacity: 0
                }, s.animationSpeed);
                s.onMouseOutCallback.call(this, e(this))
            });
            e(t).resize(function () {
                n.find("img").removeAttr("style")
            })
        },
        getDimensions: function (e) {
            var t = e.outerWidth(),
                n = e.outerHeight();
            return {
                width: t,
                height: n
            }
        }
    };
    e.fn.hoverZoomFade = function (t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return i.init.apply(this, arguments);
        e("Method " + t + " does not exist on jQuery.hoverZoomFade")
    }
})(jQuery, window, document);
(function (e) {
    e.fn.equalizeCols = function () {
        var t = 0,
            n = e.browser.msie && e.browser.version < 7 ? "1%" : "auto";
        return this.css("height", n).each(function () {
            t = Math.max(t, this.offsetHeight)
        }).css("height", t).each(function () {
            var n = this.offsetHeight;
            n > t && e(this).css("height", t - (n - t))
        })
    }
})(jQuery);
(function (e) {
    function n(t) {
        var n = {
            center: "50%",
            left: "0%",
            right: "100%",
            top: "0%",
            bottom: "100%"
        }, r = t.split(/ /),
            i = function (e) {
                var t = (n[r[e]] || r[e] || "50%").match(/^([+-]=)?([+-]?\d+(\.\d*)?)(.*)$/);
                r[e] = [t[1], parseFloat(t[2]), t[4] || "px"]
            };
        if (r.length == 1 && e.inArray(r[0], ["top", "bottom"]) > -1) {
            r[1] = r[0];
            r[0] = "50%"
        }
        i(0);
        i(1);
        return r
    }
    var t = "bgPos";
    e.fx.step.backgroundPosition = e.fx.step["background-position"] = function (r) {
        if (!r.set) {
            var i = e(r.elem),
                s = i.data(t);
            i.css("backgroundPosition", s);
            r.start = n(s);
            r.end = n(e.fn.jquery >= "1.6" ? r.end : r.options.curAnim.backgroundPosition || r.options.curAnim["background-position"]);
            for (var o = 0; o < r.end.length; o++) r.end[o][0] && (r.end[o][1] = r.start[o][1] + (r.end[o][0] == "-=" ? -1 : 1) * r.end[o][1]);
            r.set = !0
        }
        e(r.elem).css("background-position", r.pos * (r.end[0][1] - r.start[0][1]) + r.start[0][1] + r.end[0][2] + " " + (r.pos * (r.end[1][1] - r.start[1][1]) + r.start[1][1] + r.end[1][2]))
    };
    e.fn.animate = function (e) {
        return function (n, r, i, s) {
            (n.backgroundPosition || n["background-position"]) && this.data(t, this.css("backgroundPosition") || "center");
            return e.apply(this, [n, r, i, s])
        }
    }(e.fn.animate)
})(jQuery);
(function (e) {
    e.fn.fitText = function (t, n) {
        var r = t || 1,
            i = e.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, n);
        return this.each(function () {
            var t = e(this),
                n = function () {
                    t.css("font-size", Math.max(Math.min(t.width() / (r * 10), parseFloat(i.maxFontSize)), parseFloat(i.minFontSize)))
                };
            n();
            e(window).on("resize", n)
        })
    }
})(jQuery);
(function (e, t, n, r) {
    var i, s;
    s = {
        animationDistance: 10,
        animationEasing: "swing",
        animationSpeed: 1e3,
        itemDelay: 500,
        itemSelector: ".hide-from-preloader",
        toggleAttribute: "opacity"
    };
    i = {
        init: function (t) {
            t && e.extend(s, t);
            return this.each(function () {
                i.applyPreStyles(e(this));
                i.animateElements(e(this))
            })
        },
        animateElements: function (t) {
            t.find(s.itemSelector).each(function () {
                var t = e(this);
                setTimeout(function () {
                    t.animate({
                        opacity: 1,
                        left: "+=" + s.animationDistance + "px"
                    }, s.animationSpeed, s.animationEasing, function () {})
                }, s.itemDelay)
            })
        },
        applyPreStyles: function (t) {
            t.find(s.itemSelector).each(function () {
                var t = e(this),
                    n = t.css("position"),
                    r = t.css("left"),
                    i = t.css("right");
                n === "static" && (n = "relative");
                r === "auto" && i === "auto" ? r = 0 - s.animationDistance : r = parseInt(r, 10) - s.animationDistance;
                t.css({
                    position: n,
                    left: r + "px"
                })
            })
        }
    };
    e.fn.loadingEffects = function (t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return i.init.apply(this, arguments);
        e("Method " + t + " does not exist on jQuery.loadingEffects")
    }
})(jQuery, window, document);
var _gaq = _gaq || [],
    isMobile = /iPhone|iPod|iPad|Android|BlackBerry/.test(navigator.userAgent);
if ($.browser.msie) {
    var browserVersion = parseInt($.browser.version, 10);
    $("html").removeClass("no-js").addClass("js ie ie" + browserVersion)
} else $("html").removeClass("no-js").addClass("js not-ie");
try {
    window.opera || document.execCommand("BackgroundImageCache", !1, !0)
} catch (err) {}
String.prototype.cleanLabel = function () {
    return this.replace(/\W/g, "")
};
var Handsome = Handsome || {};
$(function () {
    Handsome.PrimaryNavItems.init();
    Handsome.SecondaryNavItems.init();
    $(".logo").kcurtains({
        animationSpeed: 300,
        animationEasing: "linear"
    });
    Handsome.ContactForm.init();
    Handsome.WorkItems.init();
    Handsome.TeamMembers.init();
    Handsome.Footer.init();
    Handsome.Buttons.init();
    Handsome.FollowSocial.init();
    Handsome.SingleWork.init();
    $("body").ksmooth({
        animationSpeed: 2e3
    })
});
$(window).load(function () {
    isMobile || Handsome.HeroInteraction.init()
});
Handsome.PrimaryNavItems = {
    settings: {
        animationSpeed: 400,
        selector: ".primary-nav-item",
        repositionThreshhold: 960
    },
    init: function () {
        if ($(Handsome.PrimaryNavItems.settings.selector).length === 0) return;
        Handsome.PrimaryNavItems.bindEvents()
    },
    bindEvents: function () {
        Handsome.PrimaryNavItems.onWindowResize();
        $(window).bind("resize orientationchange", function () {
            Handsome.PrimaryNavItems.onWindowResize()
        });
        $(Handsome.PrimaryNavItems.settings.selector).hover(function () {
            var e = $(this).find(".dotted-hover");
            e.stop().animate({
                opacity: 1
            }, Handsome.PrimaryNavItems.settings.animationSpeed, "linear")
        }, function () {
            var e = $(this).find(".dotted-hover");
            e.stop().animate({
                opacity: 0
            }, Handsome.PrimaryNavItems.settings.animationSpeed, "linear")
        })
    },
    onWindowResize: function () {
        var e = $(window).outerWidth();
        if (e >= Handsome.PrimaryNavItems.settings.repositionThreshhold) {
            $(Handsome.PrimaryNavItems.settings.selector).removeAttr("style");
            return
        }
        if ($("#hero").length === 0 || $(Handsome.PrimaryNavItems.settings.selector).css("display") === "none") return;
        $(Handsome.PrimaryNavItems.settings.selector).fitText(1.8);
        $(Handsome.PrimaryNavItems.settings.selector).each(function () {
            var e = $(this).width(),
                t = $(this).height(),
                n = $(this).children(".primary-nav-item-wrapper").outerHeight(),
                r = 0,
                i = 0,
                s = $("#hero").outerHeight() + $("#hero").offset().top;
            t > e ? e = t : e > t && (t = e);
            r = parseInt((t - n) / 2, 10);
            i = n + r * 2;
            s -= i / 2;
            $(this).css({
                "padding-top": r + "px",
                "padding-bottom": r + "px",
                top: s + "px"
            });
            $("#contact").css({
                "padding-top": i / 2 + 5 + "px"
            });
            $("#work").css({
                "margin-top": i / 2 + 56 + "px"
            })
        })
    }
};
Handsome.SecondaryNavItems = {
    settings: {
        animationSpeed: "normal",
        selector: ".secondary-nav-item",
        repositionThreshhold: 960
    },
    init: function () {
        if ($(Handsome.SecondaryNavItems.settings.selector).length === 0) return;
        Handsome.SecondaryNavItems.bindEvents()
    },
    bindEvents: function () {
        if (!isMobile) {
            window.pulse_image = $(".secondary-nav-trigger");
            window.pulse_continue_loop = !0;
            pulseAnimation()
        }
        $(".secondary-nav-trigger").mouseover(function () {
            $(".secondary-nav-trigger-wrapper").animate({
                opacity: 0
            }, "slow", "linear", function () {
                $(this).css("display", "none")
            });
            $(".secondary-nav-wrapper").animate({
                opacity: 1
            }, "slow", "linear");
            window.pulse_continue_loop = !1
        });
        $(Handsome.SecondaryNavItems.settings.selector).hover(function () {
            var e = $(this).find(".dotted-hover");
            e.stop().animate({
                opacity: 1
            }, Handsome.SecondaryNavItems.settings.animationSpeed, "linear")
        }, function () {
            var e = $(this).find(".dotted-hover");
            e.stop().animate({
                opacity: 0
            }, Handsome.SecondaryNavItems.settings.animationSpeed, "linear")
        })
    }
};
Handsome.Buttons = {
    settings: {},
    init: function () {
        $("#contact button, #contact input.btn, #site-footer .btn").hover(function () {
            $(this).stop(!0, !1).animate({
                backgroundPosition: "left top",
                color: "#383838"
            }, 200, "swing")
        }, function () {
            $(this).stop(!0, !1).animate({
                backgroundPosition: "right top",
                color: "#e0e0e0"
            }, 200, "swing")
        })
    }
};
Handsome.ContactForm = {
    settings: {
        formSlideSpeed: 1e3
    },
    init: function () {
        if ($("section#contact").length === 0) return;
        Handsome.ContactForm.bindEvents();
        Handsome.ContactForm.budgetSelector();
    },
    bindEvents: function () {
        $("#contact .toggle-contact").click(function (e) {
            e.preventDefault();
            Handsome.ContactForm.closeForm()
        });
        $('a[href="#contact"]').click(function (e) {
            e.preventDefault();
            Handsome.ContactForm.showForm()
        });
        $("html").live("click", function () {
            $("body").hasClass("show-contact-form") && Handsome.ContactForm.closeForm()
        });
        $("#contact .wpcf7-submit").live("click", function () {
            _gaq.push(["_trackEvent", "Contact Form", "Submit", "Submit"])
        });
        var e = window.location.hash;
        e === "#contact" && $('a[href="#contact"]').trigger("click")
    },
    showForm: function () {
        $("#contact").slideDown(Handsome.ContactForm.settings.formSlideSpeed, "swing", function () {
            $("#contact input:first").focus()
        });
        _gaq.push(["_trackEvent", "Contact Form", "Open", "Open"])
    },
    closeForm: function () {
        $("#contact").slideUp(Handsome.ContactForm.settings.formSlideSpeed, "swing", function () {});
        _gaq.push(["_trackEvent", "Contact Form", "Close", "Close"])
    },
    budgetSelector: function () {
        if ($("#budget-slider").length === 0) return;

        var stepsSlider = [50, 100, 150, 300, 600];
        $("#budget-slider").slider({
            range: "max",
            min: 0,
            max: stepsSlider.length - 1,
            value: 0,
            step: 1,
            slide: function (e, t) {
                var dollarValue = "$" + addCommasToNumber(stepsSlider[t.value] * 1000);
                $("#contact-project-budget").attr("value", dollarValue);
                $("#project-budget-amount").empty().append(dollarValue);
                _gaq.push(["_trackEvent", "Contact Form", "Budget Selector", "Set $" + addCommasToNumber(dollarValue)])
            }
        });

        var defaultSliderValue = $("#budget-slider").slider("value"),
            defaultDollarValue = "$" + addCommasToNumber((stepsSlider[defaultSliderValue] * 1000));
        $("#contact-project-budget").attr("value", defaultDollarValue);
        $("#project-budget-amount").empty().append(defaultDollarValue);
    }
};
Handsome.WorkItems = {
    init: function () {
        if ($("section#work").length === 0) return;
        Handsome.WorkItems.hoverZoom();
        Handsome.WorkItems.tooltips();
        $(".contact-card span").fitText(2.6);
        $(".contact-card span").equalizeCols();
        $(".cta-button span").fitText(3);
        $(".cta-button span").equalizeCols();
        $(window).resize(function () {
            $(".contact-card span").equalizeCols();
            $(".cta-button span").equalizeCols();
        })
    },
    tooltips: function () {
        $(".work-item[data-tooltip]").ktooltip({
            idPrefix: "work-item-tooltip-"
        })
    },
    hoverZoom: function () {
        $(".work-item").hoverZoomFade({
            animationSpeed: 300,
            animationEasing: "linear",
            childElements: ".work-item",
            zoomElement: "img",
            zoomRadius: 3,
            onMouseOverCallback: function (e) {
                if (e.hasClass("contact-card")) {
                    e.find(".inactive-state").stop().animate({
                        opacity: 0
                    }, 300, "linear");
                    e.find(".active-state").stop().animate({
                        opacity: 1
                    }, 300, "linear")
                } else if (e.hasClass("cta-button")) {
                    e.find(".inactive-state").stop().animate({
                        opacity: 0
                    }, 300, "linear");
                    e.find(".active-state").stop().animate({
                        opacity: 1
                    }, 300, "linear")
                }
            },
            onMouseOutCallback: function (e) {
                if (e.hasClass("contact-card")) {
                    e.find(".inactive-state").stop().animate({
                        opacity: 1
                    }, 300, "linear");
                    e.find(".active-state").stop().animate({
                        opacity: 0
                    }, 300, "linear")
                } else if (e.hasClass("cta-button")) {
                    e.find(".inactive-state").stop().animate({
                        opacity: 1
                    }, 300, "linear");
                    e.find(".active-state").stop().animate({
                        opacity: 0
                    }, 300, "linear")
                }
            }
        })
    }
};
Handsome.TeamMembers = {
    init: function () {
        if ($("section#team").length === 0) return;
        Handsome.TeamMembers.hoverZoom();
        Handsome.TeamMembers.tooltips()
    },
    tooltips: function () {
        $(".team-member[data-tooltip]").ktooltip({
            idPrefix: "team-member-tooltip-"
        })
    },
    hoverZoom: function () {
        $(".team-member").hoverZoomFade({
            animationSpeed: 300,
            animationEasing: "linear",
            childElements: ".team-member",
            zoomElement: "img",
            zoomRadius: 3
        })
    }
};
Handsome.FollowSocial = {
    init: function () {
        if ($("#follow-social").length === 0) return;
        Handsome.FollowSocial.bindEvents();
        Handsome.FollowSocial.reposition()
    },
    bindEvents: function () {
        $(".follow-sm-icon").hover(function () {
            $(this).find(".follow-sm-icon-wrapper").stop(!0, !1).animate({
                top: "0px"
            }, 300);
            $(this).find(".follow-sm-icon-wrapper .light").stop(!0, !1).animate({
                opacity: 0
            }, 300)
        }, function () {
            $(this).find(".follow-sm-icon-wrapper").stop(!0, !1).animate({
                top: "5px"
            }, 300);
            $(this).find(".follow-sm-icon-wrapper .light").stop(!0, !1).animate({
                opacity: 1
            }, 300)
        });
        $(window).resize(function () {
            Handsome.FollowSocial.reposition();
            var e = $(document).width();
            if (e < 960) {
                $("nav#follow-social").css({
                    display: "none"
                });
                $('a[href="#follow"]').attr("href", "#footer-right");
                $('.primary-nav-item[href="#following"]').find(".primary-nav-item-wrapper").css({
                    display: "block",
                    opacity: 1
                })
            } else $('a[href="#footer-right"]').attr("href", "#follow")
        });
        $('.primary-nav-item[href="#following"]').click(function (e) {
            e.preventDefault();
            var t = $("body").innerWidth();
            if (t > 970) {
                $(this).find(".primary-nav-item-wrapper").fadeOut(500);
                $("nav#follow-social").fadeIn(500)
            } else {
                var n = $("#site-footer .footer-right .footer-module").offset().top - 45;
                $("html, body").animate({
                    scrollTop: n
                }, 1e3, "linear")
            }
        });
        $('.secondary-nav-item[href="#following"]').click(function (e) {
            e.preventDefault();
            var t = $(this).attr("href");
            if (t !== "#") {
                var n = $("body").innerWidth();
                if (n > 970) {
                    var r = $('.primary-nav-item[href="#following"]').offset().top - getDocHeight() / 2;
                    $("html, body").animate({
                        scrollTop: r
                    }, 1e3, "linear", function () {
                        $('.primary-nav-item[href="#following"]').find(".primary-nav-item-wrapper").fadeOut(500);
                        $("nav#follow-social").fadeIn(500)
                    })
                } else {
                    var i = $("#site-footer .footer-right .footer-module").offset().top - 45;
                    $("html, body").animate({
                        scrollTop: i
                    }, 1e3, "linear")
                }
            }
        })
    },
    reposition: function () {
        var e = $("#follow-social").outerWidth(),
            t = $(document).width(),
            n = t * .75 - e / 2 - 5;
        $("#follow-social").css("left", n + "px")
    }
};
Handsome.Footer = {
    init: function () {
        Handsome.Footer.bindEvents();
        Handsome.Footer.tooltips()
    },
    bindEvents: function () {
        $(".tweet").hover(function () {
            var e = $(this),
                t = e.find(".tweet-actions a");
            t.stop(!0, !0).fadeIn("normal")
        }, function () {
            var e = $(this),
                t = e.find(".tweet-actions a");
            t.stop(!0, !0).fadeOut("normal")
        });
        $("#site-footer .bowtie a").hover(function () {
            $(this).stop().animate({
                opacity: 1
            }, 300)
        }, function () {
            $(this).stop().animate({
                opacity: .5
            }, 300)
        });
        $(".mailto-top").click(function () {
            $("#site-footer .bowtie a").trigger("click")
        });
        $("#site-footer .sm-icon").hover(function () {
            $(this).stop(!0, !1).animate({
                backgroundPosition: "left top"
            }, 400);
            $(this).find(".light").stop(!0, !1).animate({
                opacity: 0
            }, 400)
        }, function () {
            $(this).stop(!0, !1).animate({
                backgroundPosition: "right top"
            }, 400);
            $(this).find(".light").stop(!0, !1).animate({
                opacity: 1
            }, 400)
        })
    },
    tooltips: function () {
        $("#site-footer .sm-icon[data-tooltip]").ktooltip({
            adjustY: -1,
            idPrefix: "sm-footer-tooltip-",
            defaultClass: "sm-tooltip"
        })
    }
};
Handsome.SingleWork = {
    init: function () {
        if (!$("body").hasClass("single-work")) return;
        Handsome.SingleWork.setImageDimensions();
        $("#work-footer-next").hover(function () {
            $(this).find(".next-item-arrow").stop(!0, !1).animate({
                marginLeft: "-1px"
            }, 500, "swing")
        }, function () {
            $(this).find(".next-item-arrow").stop(!0, !1).animate({
                marginLeft: "-16px"
            }, 500, "swing")
        });
        $("#work-footer-contact").hover(function () {
            $(this).find(".inactive-state").stop(!0, !1).animate({
                opacity: 0
            }, 500, "swing");
            $(this).find(".active-state").stop(!0, !1).animate({
                opacity: 1
            }, 500, "swing")
        }, function () {
            $(this).find(".inactive-state").stop(!0, !1).animate({
                opacity: 1
            }, 500, "swing");
            $(this).find(".active-state").stop(!0, !1).animate({
                opacity: 0
            }, 500, "swing")
        })
    },
    setImageDimensions: function () {
        var e = 1244;
        $("#page-content img.size-full").each(function () {
            var t = $(this).outerWidth(),
                n = t / e * 100;
            $(this).hasClass("bigger") ? $(this).css({
                width: n * 1.5 + "%",
                maxWidth: t + "px"
            }) : $(this).css({
                width: n + "%"
            })
        })
    }
};
Handsome.HeroInteraction = {
    init: function () {
        var e = 10,
            t = 6,
            n = $(".parallax-layer-1"),
            r = $(".parallax-layer-2"),
            i = {
                left: n.css("left"),
                bottom: n.css("bottom"),
                width: n.width(),
                height: n.height(),
                marginLeft: n.css("marginLeft"),
                marginRight: n.css("marginRight")
            }, s = {
                left: r.css("left"),
                bottom: r.css("bottom"),
                width: r.width(),
                height: r.height(),
                marginLeft: r.css("marginLeft"),
                marginRight: r.css("marginRight")
            }, o = {
                width: $("#hero").width(),
                height: $("#hero").height()
            }, u = .5,
            a = .5;
        $("#hero").mousemove(function (e) {
            u = e.pageX / o.width;
            a = e.pageY / o.height - .125
        });
        var f = 1;
        setInterval(function () {
            if (f) {
                var e, r, s, l, c, h, p, d = parseFloat(n.css("bottom")) - parseFloat(i.bottom),
                    v = parseFloat(n.height()),
                    m = parseFloat(n.width()),
                    g = parseFloat(n.css("left"));
                if (a < .5) {
                    e = (.5 - a) * o.height * .1;
                    p = .02
                } else {
                    e = 0;
                    p = (1 / a - 1) * .02
                }
                h = i.height + i.height * p;
                c = i.width + i.width * p;
                l = -(c - i.width) / 2;
                r = (e - d) / t;
                s = d + r;
                var y = (h - v) / t,
                    b = v + y,
                    w = (c - m) / t,
                    E = m + w,
                    S = (l - g) / t,
                    x = g + S;
                n.css({
                    bottom: parseFloat(i.bottom) + s,
                    left: parseFloat(i.left) + x,
                    width: E,
                    height: b
                });
                var T = parseFloat(n.css("marginLeft")),
                    N = parseFloat(i.marginLeft) + (u - .5) * 100 * -1,
                    C = (N - T) / t,
                    k = T + C;
                n.css({
                    marginLeft: k
                })
            }
        }, e);
        $(window).scroll(function () {
            $(window).scrollTop() > 400 ? f = 0 : f = 1
        })
    }
};
