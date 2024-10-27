/* 모바일 : 전체메뉴 */
const mobGnb = {
    target: {
        header       : "#header",
        gnbOpen      : "#m-gnb-open",
        gnbWrap      : ".m-gnb-wrap",
        gnbIn        : ".m-gnb-wrap .m-gnb-in",
        gnbBody      : ".m-gnb-wrap .m-gnb-body",
        gnbMenu      : ".m-gnb-wrap .menu-wrap .mn",
        gnbMenuHori  : ".m-gnb-wrap .menu-hori",
        gnbClose     : ".m-gnb-wrap .ico-close",
        gnbAnchor    : ".m-gnb-menu .submenu-wrap .dl",
        gnbTopScroll : ".m-gnb-wrap .m-gnb-top-scroll",
    },
    init: () => {
        const $mGnbBtn = document.querySelector(mobGnb.target.gnbOpen);
        const $mGnb = document.querySelector(mobGnb.target.gnbWrap);
        const $mGnbCloseBtn = $mGnb.querySelector(mobGnb.target.gnbClose);
        const $mGnbBody = $mGnb.querySelector(mobGnb.target.gnbBody);

        mobGnb.anchor();
        $mGnb.setAttribute("aria-hidden", "true");
        $mGnbBtn.addEventListener("click", mobGnb.open);
        $mGnbCloseBtn.addEventListener("click", mobGnb.close);
        $mGnbBody.addEventListener("scroll", mobGnb.anchorScroll);
    },
    open: () => { 
        const $header = document.querySelector(mobGnb.target.header);
        const $mGnb = document.querySelector(mobGnb.target.gnbWrap);
        const $mGnbIn = document.querySelector(mobGnb.target.gnbIn);

        $header.style.zIndex="1000";
        $mGnb.setAttribute("aria-hidden", "false");
        $mGnb.classList.add("is-open");
        $mGnbIn.setAttribute("tabindex", 0);
        $mGnbIn.focus();
        document.body.classList.add("is-m-gnb");
    },
    close: () => {
        const $body = document.body;
        const $header = document.querySelector(mobGnb.target.header);
        const $mGnb = document.querySelector(mobGnb.target.gnbWrap);
        const $mGnbBtn = document.querySelector(mobGnb.target.gnbOpen);
        const $mGnbIn = document.querySelector(mobGnb.target.gnbIn);
       
        $mGnb.classList.remove("is-open");
        $mGnb.classList.add("is-close");
        $mGnbIn.removeAttribute("tabindex");
        $mGnb.setAttribute("aria-hidden", "true");
        $body.classList.remove("is-m-gnb");
        $mGnbBtn.focus();
        
        setTimeout(()=>{
            $mGnb.classList.remove("is-close");
            $header.style.zIndex="";
        },500);
    },
    anchormenuReset: () => {
        const $mGnbMenu = document.querySelectorAll(mobGnb.target.gnbMenu);

        $mGnbMenu.forEach($menu => {
            $menu.classList.remove("active");
        });
    },
    anchor: () => { 
        const $mGnb = document.querySelector(mobGnb.target.gnbWrap);
        const $mGnbMenus = $mGnb.querySelectorAll(mobGnb.target.gnbMenu);
        const $mGnbAnchors = $mGnb.querySelectorAll(mobGnb.target.gnbAnchor);
        $mGnbMenus[0].classList.add("active");

        $mGnbAnchors.forEach($item => {
            const _depth4s = $item.querySelectorAll(".is-depth4");
            if(_depth4s.length > 0) {
                _depth4s.forEach(($el) => {
                    $el.addEventListener("click", ($btn) => {
                        const $target = $btn.target.nextElementSibling;
                        const $btnPrev = $target.querySelector(".ico-prev");
                        const $btnClose = $target.querySelector(".ico-close");
                        
                        $target.style.display = "block"; 
                        setTimeout(function(){
                            $target.classList.add("is-open");
                        }, 0);
                        $btnPrev.focus();
                        $btnPrev.addEventListener("click", ($prev) => {
                            depth4Close()
                        });
                        $btnClose.addEventListener("click", ($prev) => {
                            depth4Close()
                        });

                        function depth4Close() {
                            $target.classList.remove("is-open");
                            $btn.target.focus();
                            setTimeout(function(){
                                $target.style.display = ""; 
                            }, 400);
                        }
                    });
                });
            }
        });
    },
    anchorScroll: () => {
        const $mGnb = document.querySelector(mobGnb.target.gnbWrap);
        const $mGnbIn = $mGnb.querySelector(mobGnb.target.gnbIn);
        const $mGnbMenuHori = $mGnb.querySelector(mobGnb.target.gnbMenuHori);
        const $mGnbBody = $mGnb.querySelector(mobGnb.target.gnbBody);
        const $mGnbAnchors = $mGnb.querySelectorAll(mobGnb.target.gnbAnchor);
        const $mGnbTopScroll = $mGnb.querySelector(mobGnb.target.gnbTopScroll);
        const _scrollTop = $mGnbBody.scrollTop;
        const _scrollH = $mGnbBody.scrollHeight;
        const _bodyH = $mGnbBody.clientHeight;
        
        $mGnbAnchors.forEach($item => {
            const _id = $item.getAttribute("id");
            const $mn = $mGnb.querySelector(`[href="#${_id}"]`);
            const _offset = $item.offsetTop;
            if (_scrollTop >= _offset || _bodyH + _scrollTop >= _scrollH) { 
                mobGnb.anchormenuReset();
                $mn.classList.add("active");
                if($mGnbTopScroll) {
                    const $mGnbMenuHoriUl = $mGnbMenuHori.querySelector(".ul");
                    const _offsetLeft = $mn.offsetLeft;
                    $mGnbBody.addEventListener('scrollend', () => {
                        $mGnbMenuHoriUl.scrollLeft = _offsetLeft;
                    });
                }
            } 
        });

        //gnb type2
        if($mGnbTopScroll) {
            let _lastBodyScrollY = 0;
            $mGnbBody.addEventListener('scroll', (e) => {
                const _bodyScrollY =  e.target.scrollTop;
                if (_bodyScrollY > 0) {
                    const _mGnbMenuScrollH = $mGnbTopScroll.scrollHeight; 
                    $mGnbTopScroll.style.height = `${_mGnbMenuScrollH}px`;
                    $mGnbTopScroll.style.transition = "ease-out .4s";
                    $mGnbIn.classList.add("is-active");
                } else if (_bodyScrollY < 50 && _bodyScrollY < _lastBodyScrollY) {
                    $mGnbTopScroll.style.height = "";
                    $mGnbTopScroll.style.transition = "ease-out .4s .2s";
                    setTimeout(() => { 
                        $mGnbIn.classList.remove("is-active"); 
                    }, 600);
                } 
                _lastBodyScrollY = _bodyScrollY;
            });
        }
    },
}

/* 웹 : 전체메뉴 */
const pcGnb = {
    target: {
        gnbArea : ".head-gnb",
        gnbWrap : ".w-gnb-wrap",
        gnbMenu : ".head-gnb .gnb .mn",
        gnbMenuAct : ".head-gnb .gnb .mn.active",
        gnbSubMenu : ".head-gnb .gnb .sm",
        gnbSubMenuAct: ".head-gnb .gnb .sm.active",
        gnbSubIn : ".head-gnb .gnb .submenu-in",
        gnbDim : ".w-gnb-dim",
    },
    init : () => {
        const $body = document.body;
        const $gnbDim = document.createElement("div");

        $gnbDim.classList.add("w-gnb-dim");
        $gnbDim.style.display="none";
        $body.appendChild($gnbDim);

        pcGnb.open();
        pcGnb.lnb();
    },
    open: () => {
        const $gnbMns = document.querySelectorAll(pcGnb.target.gnbMenu);
        const $gnbSms = document.querySelectorAll(pcGnb.target.gnbSubMenu);
        const $gnbSmsAct = document.querySelectorAll(pcGnb.target.gnbSubMenuAct);
        const $gnbDim = document.querySelector(pcGnb.target.gnbDim);

        $gnbMns.forEach($menu => {
            const $srDiv = document.createElement("span");
            const $srTxt = document.createTextNode("열기");
            $srDiv.classList.add("sr-only");
            $srDiv.appendChild($srTxt);
            $menu.appendChild($srDiv);
                        
            if($gnbSmsAct.length > 0) {
                $gnbSmsAct.forEach($act => {
                    const _id = $act.getAttribute("data-id");
                    const $smAct = document.getElementById(_id);
                    $smAct.classList.add("active");
                });
            }

            if($menu.nextElementSibling === null) $menu.classList.add("mn-link");

            $menu.addEventListener("click", ($item) => {
                if(!$item.target.classList.contains("active") && $item.target.nextElementSibling !== null) {
                    pcGnb.menuReset();
                    $item.target.classList.add("active");
                    $item.target.nextElementSibling.classList.add("is-open");
                    $item.target.querySelector(".sr-only").innerText ="닫기";
                    $gnbDim.style.display="block";
                    document.body.classList.add("is-w-gnb");
                    comLayout.scrollbar.open();
                }else {
                    pcGnb.menuReset();
                    pcGnb.close();
                    $item.target.querySelector(".sr-only").innerText ="열기";
                }
            });
        });

        if($gnbSms.length > 0) {
            $gnbSms.forEach($sub => {
                $sub.addEventListener("click", (e) => {
                    const $smChildrens = e.target.closest("ul").querySelectorAll(".sm");
                    [...$smChildrens].forEach($sm => {
                        $sm.classList.remove("active");
                    });
                    e.target.classList.add("active");
                    
                    var _id = e.target.getAttribute("data-id");
                    if(_id) {
                        const $target = document.getElementById(_id);
                        const $childrens = $target.closest(".submenu-wrap").children;
    
                        [...$childrens].forEach($in => {
                            $in.classList.remove("active");
                        });
    
                        $target.classList.add("active");
                    }
                });
            });
        }
        
        $gnbDim.addEventListener("click", () => {
            pcGnb.close();
        });

        window.addEventListener("keyup", (e) => {
            if(!e.target.closest(".head-gnb")) {
                pcGnb.close();
            } 
        });
    },
    close:() => {
        const $gnbLayer = document.querySelector(pcGnb.target.gnbWrap);
        const $gnbDim = document.querySelector(pcGnb.target.gnbDim);
        $gnbLayer.classList.remove("is-open");
        $gnbDim.style.display="none";
        
        pcGnb.menuReset();
        document.body.classList.remove("is-w-gnb");
        comLayout.scrollbar.close();
    },
    menuReset: () => {
        const $gnbMn = document.querySelectorAll(pcGnb.target.gnbMenu);
        const $gnbWrap = document.querySelectorAll(pcGnb.target.gnbWrap);
        
        $gnbMn.forEach(($item) => {
            $item.classList.remove("active");
        });

        $gnbWrap.forEach(($item) => {
            $item.classList.remove("is-open");
        });
    },
    lnb: () => {
        const $lnb = document.querySelector(".left-menu");
        
        if($lnb !== null) {
            const $depth4s = $lnb.querySelectorAll(".sub-ul .is-depth4");
            $depth4s.forEach(($menu) => {
                $menu.addEventListener("click", ($el) => {
                    $target = $el.target.nextElementSibling;
                    $targetPrev = $target.querySelector(".depth4-tit");
                    $targetLast = $target.querySelector(".depth4-ul li:last-child a");
                    $target.style.display = "block";
                    setTimeout(function(){
                        $target.classList.add("is-open");
                    },0);
                    $targetPrev.focus();
                    $targetPrev.addEventListener("click", ($prev) => {
                        lnbClose();
                    });
                    $target.addEventListener("keydown", function(e){
                        $targetLast.onblur = function() {
                            if (e.key === 'Tab' && !e.shiftKey) {
                                lnbClose();
                            }
                        }
                    });
                    $targetPrev.addEventListener("keydown", function(e){
                        e.target.onblur = function() {
                            if (e.key === 'Tab' && e.shiftKey) {
                                lnbClose();
                            }
                        }
                    });
                    function lnbClose() {
                        $target.classList.remove("is-open");
                        $el.target.focus();
                        setTimeout(function(){
                            $target.style.display = "";
                        }, 400);
                    }
                });
            });
        }
    },
}

/* 공통 : 레이아웃 */
const comLayout = {
    target: {
        headerTop : document.querySelector("#header-top"),
        header : document.querySelector("#header"),
        container : "#container",
        footer : "#footer",
    },
    init : () => {
        comLayout.scroll();
        comLayout.headerEvent ();
        window.addEventListener('resize', () => {
            comLayout.headerEvent();
        });
    },
    isTarget: ()=> {
        const $isGnbm = document.querySelector("#header");
        const _value = ($isGnbm.length) ? true : false;

        return _value;
    },
    scroll:  () => {
        let _lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const $wrap = document.querySelector("#wrap");
            const _conOffsetTop= document.querySelector("#container").offsetTop;
            const _scrollY =  window.scrollY;
            const _scrollDown = _scrollY > _lastScrollY;
            const _scrollUp = _scrollY < _lastScrollY;
            if (_scrollY > _conOffsetTop + 50 && _scrollDown) {
                $wrap.classList.add("scroll-down");
                $wrap.classList.remove("scroll-up");
            } else if (_scrollY > _conOffsetTop + 50 && _scrollUp) {
                $wrap.classList.add("scroll-up");
                $wrap.classList.remove("scroll-down");
            } else {
                $wrap.classList.remove("scroll-down", "scroll-up");
            }
            _lastScrollY = _scrollY;
        });
    },
    headerEvent : () => {
        const $header = document.querySelector("#header");
        const _headerH = document.querySelector("#header .header-in").clientHeight;

        $header.style.height = `${_headerH + 1}px`;
    },
    scrollbar : {
        open : () => {
            const _hasScrollY = document.body.scrollHeight > window.innerHeight;
            if(_hasScrollY) document.body.classList.add("hasScrollY");
        },
        close : () => {
            document.body.classList.remove("hasScrollY");
        },
    },
}

/* 공통 : 패턴 */
const common = {
    target: {
        header : document.querySelector("#header"),
        container : "#container",
        footer : "#footer",
        prefix : "krds",
    },
    device: {
        isMob : 1024,
    },
    init: ()=> {
        common.dropEvent ();
        common.toggleEvent();
        common.accordianEvent.init();
        const $links = document.querySelectorAll("a");
        $links.forEach($link => {
            const _href = $link.getAttribute( 'href' );
            $link.addEventListener("click", (el) => {
                if(_href === "#") el.preventDefault();
            });
        });
    },    
    dropEvent: () => {
        const _dropBtns = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-btn`);

        _dropBtns.forEach(($dropBtn) => {
            const _span = document.createElement("span");
            const _txt = document.createTextNode("열기");
            _span.classList.add("sr-only");
            _span.appendChild(_txt);
            
            $dropBtn.appendChild(_span);

            $dropBtn.addEventListener("click", ($el) => {
                const $menu = $el.target.nextElementSibling;
                const $srTxt = $el.target.querySelector(".sr-only");
                if($menu.style.display !== "block") {
                    common.dropClose();
                    $menu.style.display = "block"
                    $el.target.classList.add("active");
                    $srTxt.textContent = "닫기";
                } else { 
                    common.dropClose();
                    $srTxt.textContent = "열기";
                }
            });
        });

        document.addEventListener("click", ($e) => {
            if(!$e.target.closest(`.${common.target.prefix}-drop-wrap`)) common.dropClose();
        });
    },
    dropClose: () => {
        const _dropBtns = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-btn`);
        const _dropMenus = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-menu`);
        _dropMenus.forEach(($menu) => {
            $menu.style.display = "";
        });
        _dropBtns.forEach(($btn) => {
            $btn.classList.remove("active");
        });
    },
    popupEvent: ($id) => {
        const $clickBtn = document.activeElement;
        const $header = common.target.header;
        const $openTarget = document.querySelector($id);
        const $openTargetType = $openTarget.getAttribute('data-type');
        const $focusPopupWrap = document.querySelector(`${$id}`);
        const $focusPopup = document.querySelector(`${$id} .popup`);
        const $closeBtn = document.querySelector(`${$id} .popup-close`);

        $openTarget.classList.add("is-open");
        
        document.body.classList.add("scroll-no");
        common.accEvent.open();
        if($openTargetType !== 'bottom' && common.target.header !== null) {
            $header.style.zIndex="1000";
        }

        if($openTargetType == 'full') {
            $openTarget.setAttribute("tabindex", 0);
            $focusPopupWrap.focus();
        } else {
            $focusPopup.setAttribute("tabindex", 0);
            $focusPopup.focus();
        }

        $closeBtn.addEventListener("click", () => {
            $openTarget.classList.remove("is-open");
            $openTarget.classList.add("is-close");
            $focusPopup.removeAttribute("tabindex");
            $clickBtn.focus();

            if (common.target.header !== null) $header.style.zIndex="";
            
            common.accEvent.close();
            setTimeout(() => {
                $openTarget.classList.remove("is-close");
                document.body.classList.remove("scroll-no");
            }, 600);
        });
    },
    accEvent :  {
        open : () => {
            const $container = document.querySelector(common.target.container);
            const $footer = document.querySelector(common.target.footer);
            $container.setAttribute("aria-hidden", "true");
            $footer.setAttribute("aria-hidden", "true");
        },
        close: () => {
            const $container = document.querySelector(common.target.container);
            const $footer = document.querySelector(common.target.footer);
            $container.setAttribute("aria-hidden", "false");
            $footer.setAttribute("aria-hidden", "false");
        },
    },
    toggleEvent : () => {
        const _toggleBtns = document.querySelectorAll(".toggle-btn");
        _toggleBtns.forEach(($toggleBtn) => {
            $toggleBtn.addEventListener("click", ($btnAct) => {
                const $target = $btnAct.target.closest(".toggle-head");
                const $targetBody = $target.nextElementSibling;
                const _targetBodyH = $targetBody.querySelector(".inner").scrollHeight;
                const $srEl = $btnAct.target.querySelector(".sr-only");

                if(!$target.classList.contains("active")) {
                    $srEl.innerText = '닫힘';
                    $target.classList.add("active");
                    $targetBody.classList.add("active");
                    $targetBody.style.height = `${_targetBodyH}px`;
                    window.addEventListener("resize", () => {
                        if($targetBody.classList.contains("active")) {
                            const _targetBodyH = $targetBody.querySelector(".inner").scrollHeight;
                            $targetBody.style.height = `${_targetBodyH }px`;
                        }
                    });
                } else { 
                    $srEl.innerText = '열림';
                    $target.classList.remove("active");
                    $targetBody.classList.remove("active");
                    $targetBody.style.height = '';
                }
                
            })
        });
    },
    accordianEvent : {
        init: () => {
            const _accordians = document.querySelectorAll(".acco-list");
            _accordians.forEach(($parent) => {
                const _accoDataAct = $parent.getAttribute("data-action");
                const _accoAct = _accoDataAct !== null;
                const _lis = $parent.querySelectorAll(".li");
                const _list = [..._lis];
                _list.forEach(($e) => {
                    const $item = $e.closest(".li");
                    const $itemToggle = $e.querySelector(".acco-btn");
                    const $itemSr = $item.querySelector(".acco-btn .sr-only");
                    const $itemBody = $e.querySelector(".acco-body");

                    if($e.classList.contains("active")) common.accordianEvent.open($item);
                    if($parent.classList.contains("is-open")) {
                        common.accordianEvent.open($item);
                    } else {
                        $itemBody.style.display = 'none';
                        $itemSr.textContent = "펼침";
                    }

                    $itemToggle.addEventListener("click", ($el) => {
                        const $menu = $el.target.closest(".li");

                        (!$menu.classList.contains("active")) ? common.accordianEvent.open($menu) : common.accordianEvent.close($menu);
                        if(_accoAct) common.accordianEvent.reset(_list, $menu);
                    });

                     /*** depth4가 있다면, 클릭 시 이벤트(임시적용) ***/
                     const $depth4s = $item.querySelectorAll(".is-depth4");
                     if( $depth4s ){
                       $depth4s.forEach(($btn)=>{
                         $btn.addEventListener('click', function(e){                        
                           const $parentsWrap =  e.target.closest('li').querySelector('.depth4-wrap');
 
                           let lastClickedButton = $parentsWrap.closest('li').querySelector('.is-depth4');
          
                           $parentsWrap.classList.add('is-open');
                           lastClickedButton.setAttribute("aria-expanded", "true");
 
                           const $depth4Title = $parentsWrap.querySelector('.depth4-tit');
                           $depth4Title.focus();
                           $depth4Title.addEventListener('click', (e)=>{
                             e.target.closest('.depth4-wrap').classList.remove('is-open');
                             lastClickedButton.setAttribute("aria-expanded", "false");
 
                           });       
                           $parentsWrap.addEventListener("focusout", (event) => {
                             // 포커스가 서브메뉴 밖으로 나갔는지 확인
                             if (!$parentsWrap.contains(event.relatedTarget)) {
                               $parentsWrap.classList.remove("is-open");
 
                               if (lastClickedButton) {
                                 lastClickedButton.focus();
                               }
                             }
                           });  
 
                         })
                       });
                     }   

                });
            });
        },
        open : ($item) => {
          const $accoBtn = $item.querySelector(".acco-btn");
            const $accoSr = $item.querySelector(".acco-btn .sr-only");
            const $accoBody = $item.querySelector(".acco-body");

            $item.classList.add("active");
            $accoBody.style.display = 'block';
            $accoSr.textContent = "접기";
            $accoBtn.setAttribute("aria-expanded", "true");

            const _accoBodyH = $item.querySelector(".acco-in").scrollHeight;
            $accoBody.style.height = `${_accoBodyH+1}px`;
            setTimeout(() => {
                $accoBody.style.display = 'block';
            },0);
            
        },
        close : ($item) => {
            const $accoBtn = $item.querySelector(".acco-btn");
            const $accoSr = $item.querySelector(".acco-btn .sr-only");
            const $accoBody = $item.querySelector(".acco-body");

            $accoBtn.setAttribute("aria-expanded", "false");
            $accoSr.textContent = "펼침";
            $accoBody.style.height = '';
            $accoBody.style.overflow = '';
            $item.classList.remove("active");
            setTimeout(() => {
                $accoBody.style.display = 'none';
            }, 400);
        },
        reset : (_list, $menu) => {
            _list.forEach(($e) => {
                const $target = $e;
                const $accoSr = $target.querySelector(".acco-btn .sr-only");
                const $accoBody = $target.querySelector(".acco-body");
                if(_list.indexOf($menu) !== _list.indexOf($target)) {
                    $target.classList.remove("active");
                    $accoSr.textContent = "펼침";
                    $accoBody.style.height = '';
                    setTimeout(() => {
                        $accoBody.style.display = 'none';
                    }, 400);
                }
            });
        },
    },
}

//띠배너 스크롤 시 class 추가
function lineBnScroll() {
    const $bn = document.querySelector('#header-top');
    const $bnHeight = $bn.offsetHeight;
    const $body = document.querySelector("body");
    const scrollY = window.scrollY;
    if ($bn) {
        $body.classList.add('bn-hidden');
        if (scrollY <= $bnHeight) {
            $body.classList.remove('bn-hidden');
        }
    }
}

// tobe 임시 적용
/*** * krds_pcGnb 웹 수정 * ***/
const krds_pcGnb = {
  init() {
    const gnbMenu = document.querySelector(".krds-gnb .gnb-menu");
    if (!gnbMenu) return;

    // gnb 속성설정
    gnbMenu.setAttribute("aria-label", "메인 메뉴");
    gnbMenu.setAttribute("role", "menubar");

    // li 요소 role 초기화
    gnbMenu.querySelectorAll("li").forEach((li) => li.setAttribute("role", "none"));

    // backdrop 설정
    this.backdrop = document.querySelector(".gnb-backdrop") || this.createBackdrop();

    // trigger 설정 및 이벤트 등록
    const mainTriggers = gnbMenu.querySelectorAll(".gnb-main-trigger");
    const subTriggers = gnbMenu.querySelectorAll(".gnb-sub-trigger");
    mainTriggers.forEach((mainTrigger) => this.setupMainTrigger(mainTrigger));

    this.addEvent(mainTriggers, subTriggers);
    this.addKeyboardNavigation(mainTriggers);
  },
  setupMainTrigger(mainTrigger) {
    const toggleWrap = mainTrigger.nextElementSibling;
    if (toggleWrap) {
      const uniqueIdx = `gnb-main-menu-${Math.random().toString(36).substring(2, 9)}`;
      mainTrigger.setAttribute("role", "menuitem");
      mainTrigger.setAttribute("aria-controls", uniqueIdx);
      mainTrigger.setAttribute("aria-expanded", "false");
      mainTrigger.setAttribute("aria-haspopup", "true");
      toggleWrap.setAttribute("id", uniqueIdx);
      toggleWrap.setAttribute("role", "menu");

      const mainList = toggleWrap.querySelector(".gnb-main-list");
      if (mainList?.getAttribute("data-has-submenu") === "true") {
        const subTriggers = mainList.querySelectorAll(".gnb-sub-trigger");
        if (subTriggers.length > 0) {
          subTriggers[0].classList.add("active");
          subTriggers[0].nextElementSibling?.classList.add("active");
        }
        subTriggers.forEach((subTrigger) => this.setupSubTrigger(subTrigger));
      }
    }
  },
  setupSubTrigger(subTrigger) {
    const hasMenu = subTrigger.nextElementSibling;
    if (hasMenu) {
      const uniqueIdx = `gnb-sub-menu-${Math.random().toString(36).substring(2, 9)}`;
      subTrigger.setAttribute("role", "menuitem");
      subTrigger.setAttribute("aria-controls", uniqueIdx);
      subTrigger.setAttribute("aria-expanded", "false");
      subTrigger.setAttribute("aria-haspopup", "true");
      hasMenu.setAttribute("role", "menu");
      hasMenu.setAttribute("id", uniqueIdx);
    }
  },
  toggleMainMenu(mainTrigger) {
    this.menuReset();
    const isActive = mainTrigger.classList.contains("active");
    if (!isActive && mainTrigger.nextElementSibling) {
      mainTrigger.setAttribute("aria-expanded", "true");
      mainTrigger.classList.add("active");
      mainTrigger.nextElementSibling.classList.add("is-open");
      this.toggleBackdrop(true);
      this.scrollbar(true);
      this.adjustSubMenuHeight(mainTrigger.nextElementSibling.querySelector(".gnb-main-list"));
    } else {
      this.close();
    }
  },
  toggleSubMenu(subTrigger) {
    const otherSubTriggers = subTrigger.closest("ul").querySelectorAll(".gnb-sub-trigger");
    otherSubTriggers.forEach((trigger) => {
      trigger.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      trigger.nextElementSibling?.classList.remove("active");
    });
    subTrigger.classList.add("active");
    subTrigger.setAttribute("aria-expanded", "true");
    subTrigger.nextElementSibling?.classList.add("active");
    this.adjustSubMenuHeight(subTrigger.closest(".gnb-main-list"));
  },
  createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("gnb-backdrop");
    backdrop.style.display = "none";
    document.body.appendChild(backdrop);
    return backdrop;
  },
  toggleBackdrop(isOpen) {
    this.backdrop.style.display = isOpen ? "block" : "none";
    document.body.classList.toggle("is-gnb-web", isOpen);
  },
  adjustSubMenuHeight(target) {
    const activeSubList = target.querySelector(".gnb-sub-list.active");
    const height = activeSubList?.scrollHeight || 0;
    target.style.minHeight = `${height}px`;
  },
  scrollbar(hasScroll) {
    const condition = hasScroll === "open" ? document.body.scrollHeight > window.innerHeight : hasScroll;
    document.body.classList.toggle("hasScrollY", condition);
  },
  menuReset() {
    document.querySelectorAll(".krds-gnb .gnb-main-trigger:not(.is-link)").forEach((mainTrigger) => {
      mainTrigger.classList.remove("active");
      mainTrigger.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".krds-gnb .gnb-toggle-wrap").forEach((toggleWrap) => {
      toggleWrap.classList.remove("is-open");
    });
  },
  close() {
    this.toggleBackdrop(false);
    this.menuReset();
    this.scrollbar(false);
  },
  addEvent(mainTriggers, subTriggers) {
    this.backdrop.addEventListener("click", () => this.close());
    window.addEventListener("keyup", (event) => {
      if (event.code === "Escape" || !event.target.closest(".krds-gnb")) {
        this.close();
      }
    });
    mainTriggers.forEach((mainTrigger) => {
      mainTrigger.addEventListener("click", () => this.toggleMainMenu(mainTrigger));
    });
    subTriggers.forEach((subTrigger) => {
      subTrigger.addEventListener("click", () => this.toggleSubMenu(subTrigger));
    });
  },
  addKeyboardNavigation(mainTriggers) {
    const focusMenuItem = (element) => {
      if (element) {
        element.focus();
      }
    };
    const findFocusableElement = (element, direction) => {
      const sibling = direction === "next" ? "nextElementSibling" : "previousElementSibling";
      const parent = element.closest("li")?.[sibling];
      return parent ? parent.querySelector("[data-trigger]") : null;
    };
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      if (target.getAttribute("data-trigger")) {
        switch (event.key) {
          case "Home":
            event.preventDefault();
            focusMenuItem(mainTriggers[0]);
            break;
          case "End":
            event.preventDefault();
            focusMenuItem(mainTriggers[mainTriggers.length - 1]);
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            const nextElement = findFocusableElement(target, "next");
            focusMenuItem(nextElement);
            break;
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            const previousElement = findFocusableElement(target, "prev");
            focusMenuItem(previousElement);
            break;
          default:
            break;
        }
      }
    });
  },
};
  
/*** * krds_moGnb 모바일 수정 * ***/
const krds_moGnb = {
  init() {
    const mobileGnb = document.querySelector(".krds-gnb-mobile");
    if (!mobileGnb) return;

    mobileGnb.setAttribute("aria-hidden", "true");

    // 접근성 임시
    // tab으로 설정
    const tabList = document.querySelector(".gnb-menu");
    tabList.setAttribute("role", "tablist");
    const tabs = document.querySelectorAll(".menu-wrap .gnb-main-trigger");
    tabs.forEach((item, idx) => {
      item.setAttribute("role", "tab");
      item.setAttribute("aria-selected", "false");
      item.setAttribute("aria-controls", item.getAttribute("href").substring(1));
      item.setAttribute("id", `tab-${idx}`);
    });
    const tabPanels = document.querySelectorAll(".submenu-wrap .gnb-sub-list");
    tabPanels.forEach((item, idx) => {
      item.setAttribute("role", "tabpanel");
      item.setAttribute("aria-labelledby", `tab-${idx}`);
    });

    this.addEvent(mobileGnb);
  },
  addEvent(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const closeGnb = mobileGnb.querySelector("#close-nav");

    openGnb.addEventListener("click", () => this.open(mobileGnb));
    closeGnb.addEventListener("click", () => this.close(mobileGnb));
    this.anchorScroll(mobileGnb);
    this.anchor(mobileGnb);
  },
  open(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const header = document.querySelector("#header");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");

    openGnb.setAttribute("aria-expanded", "true");

    header.style.zIndex = "1000";
    mobileGnb.setAttribute("aria-hidden", "false");
    mobileGnb.classList.add("is-backdrop");
    mobileGnb.classList.add("is-open");
    navContainer.setAttribute("tabindex", 0);
    document.body.classList.add("is-gnb-mobile");

    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      navContainer.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);
    });
    // focusTrap 임시
    this.focusTrap(mobileGnb);
  },
  close(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const header = document.querySelector("#header");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");

    openGnb.setAttribute("aria-expanded", "false");

    mobileGnb.classList.remove("is-open");
    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      header.style.zIndex = "";
      navContainer.removeAttribute("tabindex");
      mobileGnb.classList.remove("is-backdrop");
      mobileGnb.setAttribute("aria-hidden", "ture");
      document.body.classList.remove("is-gnb-mobile");
      openGnb.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);
    });
  },
  anchorScroll(mobileGnb) {
    const gnbBody = mobileGnb.querySelector(".gnb-body");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");
    const headerTabArea = mobileGnb.querySelector(".gnb-tab-nav");
    const headerTabMenu = headerTabArea?.querySelector(".menu-wrap");

    gnbBody.addEventListener("scroll", () => {
      const scrollTop = gnbBody.scrollTop;
      const scrollHeight = gnbBody.scrollHeight;
      const bodyHeight = gnbBody.clientHeight;

      navItems.forEach((item) => {
        const id = item.getAttribute("id");
        const menuLink = mobileGnb.querySelector(`[href="#${id}"]`);
        const offset = item.offsetTop;
        if (scrollTop >= offset || bodyHeight + scrollTop >= scrollHeight) {
          this.anchormenuReset();
          menuLink.classList.add("active");
          // 접근성 임시
          menuLink.setAttribute("aria-selected", "true");
          if (headerTabArea) {
            const headerTabMenuUl = headerTabMenu.querySelector("ul");
            gnbBody.addEventListener("scrollend", () => {
              headerTabMenuUl.scrollLeft = menuLink.offsetLeft;
            });
          }
        }
      });

      this.handleTopScroll(headerTabArea, navContainer, gnbBody);
    });
  },
  handleTopScroll(headerTabArea, navContainer, gnbBody) {
    let lastBodyScrollY = 0;

    if (!headerTabArea) return; // 요소가 없을 경우 함수 종료

    gnbBody.addEventListener("scroll", (e) => {
      const bodyScrollY = e.target.scrollTop;

      if (bodyScrollY > 0) {
        headerTabArea.style.height = `${headerTabArea.scrollHeight}px`;
        headerTabArea.style.transition = "ease-out .4s";
        navContainer.classList.add("is-active");
      } else if (bodyScrollY < 50 && bodyScrollY < lastBodyScrollY) {
        headerTabArea.style.height = "";
        headerTabArea.style.transition = "ease-out .4s .2s";
        setTimeout(() => {
          navContainer.classList.remove("is-active");
        }, 600);
      }

      lastBodyScrollY = bodyScrollY;
    });
  },
  anchor(mobileGnb) {
    const menuItems = mobileGnb.querySelectorAll(".menu-wrap .gnb-main-trigger");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");

    menuItems[0].classList.add("active");
    // 접근성 임시
    menuItems[0].setAttribute("aria-selected", "true");

    navItems.forEach((item) => {
      const depth4Items = item.querySelectorAll(".is-depth4");
      if (depth4Items.length > 0) {
        depth4Items.forEach((el) => {
          el.addEventListener("click", (event) => this.handleDepth4Click(event, el));
        });
      }
    });
  },
  handleDepth4Click(event) {
    const target = event.target.nextElementSibling;
    const prevButton = target.querySelector(".trigger-prev");
    const closeButton = target.querySelector(".trigger-close");

    target.style.display = "block";
    setTimeout(() => {
      target.classList.add("is-open");
    }, 0);
    prevButton.focus();

    const depth4Close = () => {
      target.classList.remove("is-open");
      event.target.focus();
      setTimeout(() => {
        target.style.display = "";
      }, 400);
    };

    prevButton.addEventListener("click", depth4Close);
    closeButton.addEventListener("click", depth4Close);
  },
  anchormenuReset() {
    document.querySelectorAll(".krds-gnb-mobile .menu-wrap .gnb-main-trigger").forEach((menu) => {
      menu.classList.remove("active");
      // 접근성 임시
      menu.setAttribute("aria-selected", "false");
    });
  },
  focusTrap(mobileGnb) {
    const focusableElements = mobileGnb.querySelectorAll('a, button, [tabindex="0"], input, textarea, select');

    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // 포커스 순환
    const handleFocusTrap = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    };

    firstFocusableElement.addEventListener("keydown", handleFocusTrap);
    lastFocusableElement.addEventListener("keydown", handleFocusTrap);

    // 모달 오픈 후 첫 초점 역방향 제어
    mobileGnb.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey && document.activeElement === mobileGnb) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    });
  },
};

window.addEventListener("DOMContentLoaded", () => {
    if(comLayout.target.header !== null) {
        setTimeout(() => {
            // mobGnb.init();
            // pcGnb.init();
			      krds_pcGnb.init();
			      krds_moGnb.init();
            comLayout.init();
        }, 100);
    }
});

window.addEventListener("load", () => {
    setTimeout(() => {
        common.init();
    }, 100);

    if (comLayout.target.headerTop !== null) { 
        setTimeout(() => {
            lineBnScroll();
        }, 200);
    }
});

window.addEventListener('scroll', () => {
    if (comLayout.target.headerTop !== null) { 
        setTimeout(() => {
            lineBnScroll();
        }, 200);
    }
});