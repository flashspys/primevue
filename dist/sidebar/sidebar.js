this.primevue = this.primevue || {};
this.primevue.sidebar = (function (FocusTrap, Portal, Ripple, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Sidebar',
        inheritAttrs: false,
        emits: ['update:visible', 'show', 'hide'],
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'left'
            },
            baseZIndex: {
                type: Number,
                default: 0
            },
            autoZIndex: {
                type: Boolean,
                default: true
            },
            dismissable: {
                type: Boolean,
                default: true
            },
            showCloseIcon: {
                type: Boolean,
                default: true
            },
            closeIcon: {
                type: String,
                default: 'pi pi-times'
            },
            modal: {
                type: Boolean,
                default: true
            }
        },
        mask: null,
        maskClickListener: null,
        container: null,
        content: null,
        headerContainer: null,
        closeButton: null,
        beforeUnmount() {
            this.destroyModal();

            if (this.container && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.container);
            }

            this.container = null;
        },
        methods: {
            hide() {
                this.$emit('update:visible', false);
            },
            onEnter(el) {
                this.$emit('show');

                if (this.autoZIndex) {
                    utils.ZIndexUtils.set('modal', el, this.baseZIndex || this.$primevue.config.zIndex.modal);
                }

                this.focus();

                if (this.modal && !this.fullScreen) {
                    this.enableModality();
                }
            },
            onLeave() {
                this.$emit('hide');

                if (this.modal && !this.fullScreen) {
                    this.disableModality();
                }
            },
            onAfterLeave(el) {
                if (this.autoZIndex) {
                    utils.ZIndexUtils.clear(el);
                }
            },
            focus() {
                const findFocusableElement = (container) => {
                    return container.querySelector('[autofocus]');
                };

                let focusTarget = this.$slots.default && findFocusableElement(this.content);

                if (!focusTarget) {
                    focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);

                    if (!focusTarget) {
                        focusTarget = findFocusableElement(this.container);
                    }
                }

                focusTarget && focusTarget.focus();
            },
            enableModality() {
                if (!this.mask) {
                    this.mask = document.createElement('div');
                    this.mask.setAttribute('class', 'p-sidebar-mask p-component-overlay p-component-overlay-enter');
                    this.mask.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);

                    if (this.dismissable) {
                        this.bindMaskClickListener();
                    }

                    document.body.appendChild(this.mask);
                    utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
                }
            },
            disableModality() {
                if (this.mask) {
                    utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
                    this.mask.addEventListener('animationend', () => {
                        this.destroyModal();
                    });
                }
            },
            bindMaskClickListener() {
                if (!this.maskClickListener) {
                    this.maskClickListener = () => {
                        this.hide();
                    };

                    this.mask.addEventListener('click', this.maskClickListener);
                }
            },
            onKeydown(event) {
                if (event.code === 'Escape') {
                    this.hide();
                }
            },
            unbindMaskClickListener() {
                if (this.maskClickListener) {
                    this.mask.removeEventListener('click', this.maskClickListener);
                    this.maskClickListener = null;
                }
            },
            destroyModal() {
                if (this.mask) {
                    this.unbindMaskClickListener();
                    document.body.removeChild(this.mask);
                    utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                    this.mask = null;
                }
            },
            containerRef(el) {
                this.container = el;
            },
            contentRef(el) {
                this.content = el;
            },
            headerContainerRef(el) {
                this.headerContainer = el;
            },
            closeButtonRef(el) {
                this.closeButton = el;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-sidebar p-component p-sidebar-' + this.position,
                    {
                        'p-sidebar-active': this.visible,
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            fullScreen() {
                return this.position === 'full';
            },
            closeAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
            }
        },
        directives: {
            focustrap: FocusTrap__default["default"],
            ripple: Ripple__default["default"]
        },
        components: {
            Portal: Portal__default["default"]
        }
    };

    const _hoisted_1 = ["aria-modal"];
    const _hoisted_2 = {
      key: 0,
      class: "p-sidebar-header-content"
    };
    const _hoisted_3 = ["aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_ripple = vue.resolveDirective("ripple");
      const _directive_focustrap = vue.resolveDirective("focustrap");

      return (vue.openBlock(), vue.createBlock(_component_Portal, null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.Transition, {
            name: "p-sidebar",
            onEnter: $options.onEnter,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave,
            appear: ""
          }, {
            default: vue.withCtx(() => [
              ($props.visible)
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                    key: 0,
                    ref: $options.containerRef,
                    class: $options.containerClass,
                    role: "complementary",
                    "aria-modal": $props.modal,
                    onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
                  }, _ctx.$attrs), [
                    vue.createElementVNode("div", {
                      ref: $options.headerContainerRef,
                      class: "p-sidebar-header"
                    }, [
                      (_ctx.$slots.header)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                            vue.renderSlot(_ctx.$slots, "header")
                          ]))
                        : vue.createCommentVNode("", true),
                      ($props.showCloseIcon)
                        ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
                            key: 1,
                            ref: $options.closeButtonRef,
                            autofocus: "",
                            type: "button",
                            class: "p-sidebar-close p-sidebar-icon p-link",
                            "aria-label": $options.closeAriaLabel,
                            onClick: _cache[0] || (_cache[0] = (...args) => ($options.hide && $options.hide(...args)))
                          }, [
                            vue.createElementVNode("span", {
                              class: vue.normalizeClass(['p-sidebar-close-icon', $props.closeIcon])
                            }, null, 2)
                          ], 8, _hoisted_3)), [
                            [_directive_ripple]
                          ])
                        : vue.createCommentVNode("", true)
                    ], 512),
                    vue.createElementVNode("div", {
                      ref: $options.contentRef,
                      class: "p-sidebar-content"
                    }, [
                      vue.renderSlot(_ctx.$slots, "default")
                    ], 512)
                  ], 16, _hoisted_1)), [
                    [_directive_focustrap]
                  ])
                : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["onEnter", "onLeave", "onAfterLeave"])
        ]),
        _: 3
      }))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-sidebar {\n    position: fixed;\n    -webkit-transition: -webkit-transform 0.3s;\n    transition: -webkit-transform 0.3s;\n    transition: transform 0.3s;\n    transition: transform 0.3s, -webkit-transform 0.3s;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.p-sidebar-content {\n    position: relative;\n    overflow-y: auto;\n}\n.p-sidebar-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.p-sidebar-icon {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    position: relative;\n    overflow: hidden;\n}\n.p-sidebar-left {\n    top: 0;\n    left: 0;\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-right {\n    top: 0;\n    right: 0;\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-top {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 10rem;\n}\n.p-sidebar-bottom {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 10rem;\n}\n.p-sidebar-full {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    -webkit-transition: none;\n    transition: none;\n}\n.p-sidebar-left.p-sidebar-enter-from,\n.p-sidebar-left.p-sidebar-leave-to {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n}\n.p-sidebar-right.p-sidebar-enter-from,\n.p-sidebar-right.p-sidebar-leave-to {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n}\n.p-sidebar-top.p-sidebar-enter-from,\n.p-sidebar-top.p-sidebar-leave-to {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%);\n}\n.p-sidebar-bottom.p-sidebar-enter-from,\n.p-sidebar-bottom.p-sidebar-leave-to {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n}\n.p-sidebar-full.p-sidebar-enter-from,\n.p-sidebar-full.p-sidebar-leave-to {\n    opacity: 0;\n}\n.p-sidebar-full.p-sidebar-enter-active,\n.p-sidebar-full.p-sidebar-leave-active {\n    -webkit-transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.p-sidebar-left.p-sidebar-sm,\n.p-sidebar-right.p-sidebar-sm {\n    width: 20rem;\n}\n.p-sidebar-left.p-sidebar-md,\n.p-sidebar-right.p-sidebar-md {\n    width: 40rem;\n}\n.p-sidebar-left.p-sidebar-lg,\n.p-sidebar-right.p-sidebar-lg {\n    width: 60rem;\n}\n.p-sidebar-top.p-sidebar-sm,\n.p-sidebar-bottom.p-sidebar-sm {\n    height: 10rem;\n}\n.p-sidebar-top.p-sidebar-md,\n.p-sidebar-bottom.p-sidebar-md {\n    height: 20rem;\n}\n.p-sidebar-top.p-sidebar-lg,\n.p-sidebar-bottom.p-sidebar-lg {\n    height: 30rem;\n}\n@media screen and (max-width: 64em) {\n.p-sidebar-left.p-sidebar-lg,\n    .p-sidebar-left.p-sidebar-md,\n    .p-sidebar-right.p-sidebar-lg,\n    .p-sidebar-right.p-sidebar-md {\n        width: 20rem;\n}\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.focustrap, primevue.portal, primevue.ripple, primevue.utils, Vue);
