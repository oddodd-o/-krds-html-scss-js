/* ** 윈도우 사이즈 체크 (반응형) ** */
let winSize;
function winSizeSet() {
	const brekpoint = 1024;
	if (window.innerWidth >= brekpoint) {
		winSize = 'pc';
	}
	else {
		winSize = 'mob';
	}
}

/* layer tab */
function layerTab() {
	const layerTabArea = document.querySelectorAll('.tab-area.layer');

	/* 탭 접근성 텍스트 세팅 */
	const tabAccText = document.createTextNode(' 선택됨');
	const tabAccTag = document.createElement('i');
	tabAccTag.setAttribute('class', 'sr-only created');
	tabAccTag.appendChild(tabAccText);

	layerTabArea.forEach(e => {
		const layerTabEle = e.querySelectorAll('.tab > ul > li');
		const tabPanel = e.querySelectorAll('.tab-conts');

		function tab() {
			layerTabEle.forEach(ele => {
				const control = ele.getAttribute('aria-controls');
				const selectedTabPanel = document.getElementById(control);

				if (ele.classList.contains('active')) {
					//선택됨 텍스트 추가
					ele.querySelector('button').append(tabAccTag);
				}

				ele.addEventListener('click', () => {
					layerTabInitial(); //레이어탭 초기화

					ele.classList.add('active');
					ele.querySelector('button').append(tabAccTag); //선택됨 텍스트 추가
					ele.setAttribute('aria-selected', 'true');
					selectedTabPanel.classList.add('active');
				});
			});
		}

		//레이어탭 초기화
		function layerTabInitial() {
			layerTabEle.forEach(ele => {
				ele.classList.remove('active');
				ele.setAttribute('aria-selected', 'false');
				//ele.removeAttribute('style');
				if (ele.classList.contains('active')) {
					const text = ele.querySelector('.sr-only.created');
					ele.querySelector('button').removeChild(text);
				}
			});
			tabPanel.forEach(ele => {
				ele.classList.remove('active');
				//ele.removeAttribute('style');
			})
		}
		tab();
	});
}

/*** * DATEPICKER * ***/
/* ** datepicker ** */
const dateInput = document.querySelectorAll('.form-btn-datepicker');
const kds_datepicker = {
	init: () => {
		kds_datepicker.open();
		kds_datepicker.selValue();
		kds_datepicker.closeDatepicker();
		kds_datepicker.closeSingle();
	},
	tblHeightSet: () => { //datepicker table th, td height 세팅
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const datepickerEl = e.querySelector('.datepicker-tbl');
			const cell = datepickerEl.querySelectorAll('th, td');
			cell.forEach(ele => {
				const w = ele.clientWidth + 4; //윗간격 4px 추가
				const wResult = w.toFixed(2); //소수점 2자리에서 반올림됨
				ele.setAttribute('style', 'height:' + wResult + 'px');
			});
		});
	},
	contsHeightSet: () => { //datepicker contents layer height 세팅
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const body = e.querySelector('.datepicker-body');
			const bodyConts = e.querySelectorAll('.datepicker-conts');
			bodyConts.forEach(ele => {
				let contsHeight;
				if (ele.classList.contains('active')) {
					if (ele.classList.contains('datepicker-tbl-wrap')) {
						if (e.classList.contains('range')) {
							contsHeight = ele.querySelector('.datepicker-tbl').offsetHeight + ele.querySelector('.datepicker-btn-wrap').offsetHeight;
						} else {
							contsHeight = ele.querySelector('.datepicker-tbl').offsetHeight;
						}
					} else {
						contsHeight = '316';
					}
					body.setAttribute('style', 'height: '+ contsHeight +'px');
				}
			});
		});
	},
	open: () => { //datepicker 열기
		dateInput.forEach(e => {
			const cal = e.closest('.datepicker-conts').querySelector('.datepicker-area');
			const colConts = cal.querySelector('.datepicker-wrap');
			e.addEventListener('click', () => {
				kds_datepicker.close();

				cal.classList.add('active');
				colConts.setAttribute('tabindex', '0');
				colConts.setAttribute('aria-hidden', 'false');

				const activeLayer = cal.querySelector('.datepicker-tbl-wrap');
				activeLayer.classList.add('active');
				activeLayer.setAttribute('tabindex', '0');
				activeLayer.setAttribute('aria-hidden', 'false');

				kds_datepicker.tblHeightSet();
				kds_datepicker.contsHeightSet();

				setTimeout(() => {
					colConts.focus();
				}, 50);
			});
		});
	},
	close: () => { //datepicker 닫기
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const colConts = e.querySelector('.datepicker-wrap');
			e.classList.remove('active');
			colConts.setAttribute('tabindex', '-1');
			colConts.setAttribute('aria-hidden', 'true');
		});
	},
	contentsInitialize: () => {
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const bodyConts = e.querySelectorAll('.datepicker-conts');
			bodyConts.forEach(ele => {
				ele.classList.remove('active');
				ele.setAttribute('tabindex', '-1');
				ele.setAttribute('aria-hidden', 'true');
			});
		});
	},
	selValue: () => {
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const changeCalBtn = e.querySelectorAll('.datepicker-conts .sel .btn');
			const setBtn = e.querySelectorAll('.datepicker-btn-wrap .btn');

			const yearBtn = e.querySelector('.btn-cal-switch.year');
			const monBtn = e.querySelector('.btn-cal-switch.month');

			let activeLayer;
			yearBtn.addEventListener('click', () => { //년도 레이어 활성화
				kds_datepicker.contentsInitialize();
				activeLayer = e.querySelector('.datepicker-year-wrap');
				activeLayer.classList.add('active');
				activeLayer.setAttribute('tabindex', '0');
				activeLayer.setAttribute('aria-hidden', 'false');
				setTimeout(() => {
					activeLayer.focus();
				}, 50);
				kds_datepicker.contsHeightSet();
			});
			monBtn.addEventListener('click', () => { //월 레이어 활성화
				kds_datepicker.contentsInitialize();
				activeLayer = e.querySelector('.datepicker-mon-wrap');
				activeLayer.classList.add('active');
				activeLayer.setAttribute('tabindex', '0');
				activeLayer.setAttribute('aria-hidden', 'false');
				setTimeout(() => {
					activeLayer.focus();
				}, 50);
				kds_datepicker.contsHeightSet();
			});
			setBtn.forEach(ele => { //확인 취소버튼 클릭하면 datepicker 닫힘
				ele.addEventListener('click', () => {
					kds_datepicker.close();
				});
			});
			changeCalBtn.forEach(ele => { //년도 또는 월 선택하면 캘린더 레이어 활성화
				ele.addEventListener('click', () => {
					kds_datepicker.contentsInitialize();
					activeLayer = e.querySelector('.datepicker-tbl-wrap');
					activeLayer.classList.add('active');
					activeLayer.setAttribute('tabindex', '0');
					activeLayer.setAttribute('aria-hidden', 'false');
					setTimeout(() => {
						activeLayer.focus();
					}, 50);
					kds_datepicker.contsHeightSet();
				});
			});
		});
	},
	closeDatepicker: () => {
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const bodyConts = e.querySelectorAll('.datepicker-conts');
			let lastElement;
			bodyConts.forEach(ele => {
				if (ele.classList.contains('datepicker-tbl-wrap')) {
					if (e.classList.contains('range')) {
						lastElement = ele.querySelector('.datepicker-btn-wrap > .btn:last-child');
					} else {
						lastElement = ele.querySelector('.datepicker-tbl tbody tr:last-child > td:last-child .btn-set-date');
					}
				} else {
					lastElement = ele.querySelector('.sel > li:last-child > .btn');
				}
				lastElement.addEventListener('blur', () => {
					kds_datepicker.close();
				});
			});
		});
	},
	closeSingle: () => {
		const cal = document.querySelectorAll('.datepicker-area');
		cal.forEach(e => {
			const colConts = e.querySelector('.datepicker-wrap');

			if (colConts.classList.contains('single')) {
				const calBtn = colConts.querySelectorAll('.datepicker-tbl .btn-set-date');
				calBtn.forEach(ele => {
					ele.addEventListener('click', () => {
						kds_datepicker.close();
					});
				});
			}
		});
	}
}
document.addEventListener('click', (e) => {
	if(!e.target.closest(".datepicker-conts")) {
		kds_datepicker.close();
	};
});

/*** * accordion * ***/
const $accordionBtn = document.querySelectorAll('.btn-accordion');
const kds_accordion = {
	init: () => {
		kds_accordion.expand();
	},
	expand: () => {
		$accordionBtn.forEach(e => {
			const $wrapper = e.closest('.accordion');
			const $wrapAll = $wrapper.querySelectorAll('.accordion-item');
			const $wrap = e.closest('.accordion-item');

			e.addEventListener('click', () => {
				if (!$wrap.classList.contains('active')) {
					$wrapAll.forEach(ele => {
						ele.classList.remove('active');
						ele.querySelector('.btn-accordion').classList.remove('active');
					});

					$wrap.classList.add('active');
					e.classList.add('active');
				}
				else {
					$wrap.classList.remove('active');
					e.classList.remove('active');
				}
			});

		});
	},
}

/*** * modal * ***/
const $modalTrigger = document.querySelectorAll('.open-modal');
const $modalCloseTrigger = document.querySelectorAll('.close-modal');
const $kds_body = document.querySelector('body');
const kds_modal = {
	init: () => {
		kds_modal.open();
		kds_modal.close();
	},
	open: () => {
		$modalTrigger.forEach(e => {
			e.addEventListener('click', ele => {
				const id = e.getAttribute('data-target');

				e.classList.add('modal-opened');
				e.setAttribute('tabindex', '-1');

				kds_modal.modalOpen(id);
				ele.preventDefault();
			});
		});
	},
	modalOpen: (id) => {
		const $idVal = document.getElementById(id);
		const $dialog = $idVal.querySelector('.modal-content');
		const $modalBack = $idVal.querySelector('.modal-back');
		const $modalOpened = document.querySelectorAll('.modal.in:not(.sample)');
		const $modalOpenedLen = $modalOpened.length + 1;
		$kds_body.classList.add('scroll-no');
		$idVal.setAttribute('aria-hidden', 'false');
		$modalBack.classList.add('in');
		$idVal.classList.add('shown');
		setTimeout(() => {
			$idVal.classList.add('in');
		},150);

		//열린 팝업창 포커스
		$dialog.setAttribute('tabindex', '0');

		//모달 여러개 열린경우 마지막 열린 모달 z-index높게
		if ($modalOpenedLen > 1){
			const openedLen = $modalOpenedLen;
			const zIndexNew = 1010 + openedLen;
			$idVal.setAttribute('style', 'z-index: ' + zIndexNew);
		}

		//레이어 진입 시 포커스
		setTimeout(() => {
			$dialog.focus();
		},350);
	},
	close: () => {
		$modalCloseTrigger.forEach(e => {
			e.addEventListener('click', ele => {
				const id = e.closest('.modal').getAttribute('id');
				kds_modal.modalClose(id);
			});
			e.addEventListener('keydown', ele => { //닫기버튼에서 탭 키 누르면 모달 내 첫번쨰 포커스로 키보드 이동
				if (e.classList.contains('btn-close')) {
					const keyCode = ele.keyCode || ele.which;
					if (!ele.shiftKey && keyCode == 9) {
						e.closest('.modal-content').focus();// 첫번째 링크로 이동
						ele.preventDefault();
					}
				}
			});
		});
	},
	modalClose: (id) => {
		const $idVal = document.getElementById(id);
		const $dialog = $idVal.querySelector('.modal-content');
		const $modalOpened = document.querySelectorAll('.modal.in:not(.sample)');
		const $modalOpenedLen = $modalOpened.length;
		if ($modalOpenedLen < 2) {
			$kds_body.classList.remove('scroll-no');
		}

		$idVal.setAttribute('aria-hidden', 'true');
		$idVal.classList.remove('in');

		$dialog.removeAttribute('tabindex');

		setTimeout(() => {
			$idVal.classList.remove('shown');
		},150);

		//모달 창 연 버튼에 class 삭제 및 tabindex 0로 조정 (포커스 영역 수정)
		const $triggerBtn = document.querySelector('.modal-opened');
		if ($triggerBtn != null) {
			$triggerBtn.focus();
			$triggerBtn.setAttribute('tabindex', '0');
			$triggerBtn.classList.remove('modal-opened');
		}
	},
}

/*** * tooltip * ***/
const krds_tooltip = {
    init: ()=> {
        krds_tooltip.tooltipEvent();
    },
    tooltipEvent: () => {
        const _toolBtns = document.querySelectorAll(".krds-tooltip-wrap .tool-btn");

        _toolBtns.forEach(($toolBtn) => {
            const _span = document.createElement("span");
            const _txt = document.createTextNode("열기");

            _span.classList.add("sr-only");
            _span.appendChild(_txt);
            
            $toolBtn.innerHTML="";
            $toolBtn.appendChild(_span);

            $toolBtn.addEventListener("click", ($el) => {
                const $parent = $toolBtn.closest(".krds-tooltip-wrap");
                const $closeBtn = $parent.querySelector(".tool-close");
                const $cnt = $parent.querySelector(".tool-in");
                const $srTxt = $el.target.querySelector(".sr-only");
                if($cnt.style.display !== "block") {
                    $cnt.style.display = "block";
                    $cnt.setAttribute("tabindex", 0);
                    $srTxt.textContent = "닫기";
                    krds_tooltip.tooltipResize($parent, $cnt);
                } 
                $closeBtn.addEventListener("click", () => {
                    $srTxt.textContent = "열기";
                    $cnt.style.display = "";
                    $cnt.removeAttribute("tabindex");
                    $toolBtn.focus();
                    krds_tooltip.tooltipResize($parent, $cnt);
                });

                window.addEventListener("resize", () => { 
                    krds_tooltip.tooltipResize($parent, $cnt);
                });
            });
        });
    },
    tooltipResize: ($parent, $cnt) => { 
        if (winSize === 'mob') {
            krds_tooltip.tooltipMob($parent, $cnt);
        } else { 
            krds_tooltip.tooltipPc($cnt);
        }
        window.addEventListener('resize', () => { 
            if (winSize === 'mob') {
                krds_tooltip.tooltipMob($cnt);
            } else { 
                krds_tooltip.tooltipPc($cnt);
            }
        });
    },
    tooltipMob: ($parent, $cnt) => {
        const _offsetL = $parent.offsetLeft - 16;
        const _width = document.body.clientWidth;
        const _offsetR = _width - ($parent.clientWidth + _offsetL) - 32;
        if ($cnt) { 
            $cnt.style.left = `-${_offsetL}px`;
            $cnt.style.right = `-${_offsetR}px`;
        }
    },
    tooltipPc: ($cnt) => { 
        $cnt.style.left = '';
        $cnt.style.right = '';
    },
}

/* ** 도움말 ** */
const helperArea = document.querySelectorAll('.helper-area');
const helperBox = {
	init: () => {
		if (helperArea.length > 0) {  //해당 클래스 존재할떄만 실행
			setTimeout(() => {
				helperBox.paddingSet();
			},50);
			setTimeout(() => {
				helperBox.heightSet();
			},100);
		}
	},
	paddingSet: () => { //영역 세팅
		const bnH = document.querySelector('#header-top').offsetHeight;
		const headerH = document.querySelector('#header').offsetHeight;

		const defaultPadding = bnH + headerH;
		const bnHiddgnPadding = headerH;

		const $wrap = document.querySelector('#wrap');
		const $expandBtn = document.querySelector('.btn-helper.expand');
		const $expandBox = document.querySelector('.helper-wrap');

		const $collapseBtn = document.querySelector('.btn-helper.fold');
		if (document.body.classList.contains('bn-hidden')) { //top banner 안보임
			if ($wrap.classList.contains('scroll-down')) { //header영역 안보임
				$expandBtn.style.marginTop = '0';
				if (winSize == 'pc') {
					$expandBox.style.paddingTop = '0';
					$collapseBtn.style.marginTop = '0';
				} else {
					$expandBox.removeAttribute('style');
					$collapseBtn.removeAttribute('style');
				}
			} else { //header영역 보임
				$expandBtn.style.marginTop = bnHiddgnPadding + 'px';
				if (winSize == 'pc') {
					$expandBox.style.paddingTop = bnHiddgnPadding + 'px';
					$collapseBtn.style.marginTop = bnHiddgnPadding + 'px';
				} else {
					$expandBox.style.paddingTop = '0';
					$collapseBtn.removeAttribute('style');
				}
			}
		} else { //top banner 보임
			$expandBtn.style.marginTop = defaultPadding + 'px';
			if (winSize == 'pc') {
				$expandBox.style.paddingTop = defaultPadding + 'px';
				$collapseBtn.style.marginTop = defaultPadding + 'px';
			} else {
				$expandBox.removeAttribute('style');
				$collapseBtn.removeAttribute('style');
			}
		}

	},
	trigger: () => { //도움말열기 버튼에 추가한 class 삭제
		const btnExec = document.querySelectorAll('.btn-help-exec');
		if (helperArea.length > 0) {
			btnExec.forEach(e => {
				e.classList.remove('btn-help-clicked');
			});
		}
	},
	expand: () => { //도움말버튼 클릭 시 실행
		const btnExec = document.querySelectorAll('.btn-help-exec');
		const target = document.querySelector('.helper-wrap');
		if (helperArea.length > 0) {
			btnExec.forEach(e => {
				e.addEventListener('click', () => {
					helperBox.open();
					helperBox.trigger();
					e.classList.add('btn-help-clicked');
					setTimeout(() => {
						target.focus();
					}, 50);
				});
			});
		}

	},
	collapse: () => { //도움말 접어두기 버튼 클릭 시 실행
		const btn = document.querySelector('.btn-helper.fold');

		if (helperArea.length > 0) {
			btn.addEventListener('click', () => {
				if (winSize == 'mob') {
					document.body.classList.remove('scroll-no');
				}
				helperBox.close();
			});
		}
	},
	open: () => { //도움말 열기
		if (helperArea.length > 0) {  //해당 클래스 존재할떄만 실행
			const target = document.querySelector('.helper-wrap');
			const inner = document.querySelector('#container > .inner');
			const $header = document.querySelector("#header .head-body > .inner");
			const $container = document.querySelector("#container");
			const _width = document.body.clientWidth;
			if (winSize == 'mob') {
				document.body.classList.add('scroll-no');
			}
			target.setAttribute('aria-expanded', 'true');
			target.setAttribute('tabindex', '0');
			document.querySelector('.helper-area').classList.add('expand');

			if (inner.classList.contains('flexible')) { // 화면 사이즈 줄어들면 영역도 줄어들게
				inner.classList.remove('folded');
				$container.classList.remove('help-close');
				$container.classList.add("help-open");
				const _headerL = $header.offsetLeft;
				if( _width > 1024 && _width < 1900  ){
					$container.classList.remove("help-open");
					$container.classList.add("help-open");
					$container.style.paddingRight="";
					$container.style.paddingLeft=`${_headerL+26}px`;
				}

				helperBox.resize($header, $container);
			}
		}
	},
	close: () => { //도움말 접기
		const $header = document.querySelector("#header .head-body > .inner");
		const $container = document.querySelector('#container');
		const target = document.querySelector('.helper-wrap');
		const inner = document.querySelector('#container > .inner');
		const trigger = document.querySelectorAll('.btn-help-clicked');
		const _width = document.body.clientWidth;
		target.setAttribute('aria-expanded', 'false');
		target.removeAttribute('tabindex');
		document.querySelector('.helper-area').classList.remove('expand');

		if (trigger.length > 0) { //버튼 클릭으로 도움말 펼친경우 클릭한 버튼으로 포커스
			trigger[0].focus();
		}

		if (inner.classList.contains('flexible')) { // 도움말 닫히면 컨텐츠 영역 늘리기
			inner.classList.add('folded');
			$container.classList.add("help-close");
			$container.classList.remove("help-open");
			$container.style.paddingLeft=``;
			if ($container.classList.contains('help-close')) {
				$container.style.paddingLight=``;
				$container.style.paddingRight=``;
			} else if (_width > 1900 || _width <= 1024 ) {
				$container.classList.remove("help-open");
				$container.classList.remove("help-close");
			}
			helperBox.resize($header, $container);
		}
	},
	resize: ($header, $container) => {
		window.addEventListener("resize", () => {
			const _headerL = $header.offsetLeft;
			const _width = document.body.clientWidth;
			if ( _width > 1024 && _width < 1900) {
				$container.style.paddingRight="";
				if($container.classList.contains("help-open")) {
					$container.style.paddingLeft=`${_headerL+26}px`;
				}else {
					$container.style.paddingLeft=``;
				}
			} else if ( _width <= 1024 ) {
				$container.style.paddingLeft="";
				$container.style.paddingRight="";
			} else {
				$container.style.paddingLeft= "";
			}
		});
	},
	heightSet: () => {
		const $helperArea = document.querySelector('.helper-area');
		const $expandBox = document.querySelector('.helper-wrap');
		const $contsArea = document.querySelector('.helper-conts-area');
		const helperTitH = document.querySelector('.helper-tit').offsetHeight;

		const contsPt = parseInt(getComputedStyle($expandBox).paddingTop);
		const contsAreaH = window.innerHeight - helperTitH - contsPt;

		$contsArea.style.height = contsAreaH + 'px';

		if (winSize == 'mob') {
			if ($helperArea.classList.contains('expand')) {
				document.body.classList.add('scroll-no');
			}
		} else {
			document.body.classList.remove('scroll-no');
		}

	}
}

/* ** 영역 높이 확장 축소 ** */
function collapseBox() {
	const box = document.querySelectorAll('.conts-expand-area');
	box.forEach(e => {
		const btn = e.querySelector('.btn-conts-expand');
		if (btn != null) {
			btn.addEventListener('click', () => {
				e.classList.toggle('active');
			});
		}
	});
}

/* ** 박스형 체크박스 상태에 따른 디자인 변경 ** */
function chkBox() {
	const box = document.querySelectorAll('.chk-group-wrap');
	box.forEach(e => {
		const boxList = e.querySelectorAll('li');
		boxList.forEach(ele => {
			ele.removeAttribute('class');
			const thisList = ele.closest('li');
			const checkbox = ele.querySelector('input[type=checkbox]');
			if (checkbox != null) {
				const is_disabled = checkbox.disabled;
				let is_checked = checkbox.checked;

				if (is_disabled == true) {
					thisList.classList.add('disabled');
				}
				else {
					if (is_checked == true) {
						thisList.classList.add('checked');
					}
				}

				checkbox.addEventListener('click', () => {
					if (is_checked == true) {
						thisList.classList.remove('checked');
						is_checked = false;
					} else {
						thisList.classList.add('checked');
						is_checked = true;
					}
				});
			}

			const rdo = ele.querySelector('input[type=radio]');
			if (rdo != null) {
				const is_disabled = rdo.disabled;
				let is_checked = rdo.checked;

				if (is_disabled == true) {
					thisList.classList.add('disabled');
				}
				else {
					if (is_checked == true) {
						thisList.classList.add('checked');
					}
				}

				rdo.addEventListener('click', (e) => {
					const rdoGroup = rdo.closest('.chk-group-wrap');
					const rdoLi = rdoGroup.querySelectorAll('li');
					let is_checked2 = e.checked;
					rdoLi.forEach(ele => {
						ele.classList.remove('checked');
						is_checked2 = false;
					});
					if (is_checked2 == true) {
						thisList.classList.remove('checked');
						is_checked2 = false;
					} else {
						thisList.classList.add('checked');
						is_checked2 = true;
					}
				});
			}

		});
	});
}

/* ** 스크롤 값 체크 ** */
let scrollY = window.scrollY;
let scrollH = document.body.scrollHeight;
function scrollVal() {
	scrollY = window.scrollY;
	scrollH = document.body.scrollHeight;
}

/* ** 스크롤 네비게이션 ** */
const winHeight = window.innerHeight;
const quickIndicators = document.querySelectorAll('.quick-list');

const quickNav = {
	init: () => {
		if (quickIndicators.length > 0) { //해당 클래스 존재할떄만 실행
			quickNav.linkNav();
		}
	},
	reset: () => { //초기화
		quickIndicators.forEach(e => {
			const locationList = e.querySelectorAll('a');
			locationList.forEach(ele => {
				ele.classList.remove('active');
			});
		});
	},
	linkNav: () => { //퀵 네비게이션 클릭 시 스크롤 이동
		quickIndicators.forEach(e => {
			const locationList = e.querySelectorAll('a');
			locationList.forEach(ele => {
				const target = document.querySelector(ele.getAttribute('href'));
				const offsetY = target.getBoundingClientRect().top + scrollY;

				ele.addEventListener('click', (ev) => {
					ev.preventDefault();

					window.scrollTo({
						left: 0,
						top: offsetY,
						behavior: 'smooth',
					});
				});
			});
		});
	},
	navHighlight: () => { //페이지 스크롤 시 퀵 네비게이션 해당메뉴 active
		if (quickIndicators.length > 0) {
			const sectionArea = document.querySelectorAll('.section-link');
			const topHeight = Math.ceil(winHeight / 5);
			const firstSecTop = document.querySelectorAll('.scroll-check .section-link')[0].offsetTop;
			sectionArea.forEach(current => {
				const sectionHeight = current.offsetHeight;
				const sectionTop = current.offsetTop - topHeight;
				const sectionId = current.getAttribute("id");
				if (scrollY <= firstSecTop) { //스크롤이 첫번째 섹션보다 위에 있으면 맨 위 네비 active
					document.querySelector(".conts-area > .quick-nav-area .quick-list li:first-of-type a").classList.add("active");
				}
				else if (scrollY + winHeight >= scrollH) { //스크롤이 맨 하단에 있으면 맨 아래 네비 active
					quickNav.reset();
					document.querySelector(".conts-area > .quick-nav-area .quick-list li:last-of-type a").classList.add("active");
				}
				else {
					if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { //스크롤이 해당 섹션
						document.querySelector(".conts-area > .quick-nav-area a[href*=" + sectionId + "]").classList.add("active");
					} else {
						document.querySelector(".conts-area > .quick-nav-area a[href*=" + sectionId + "]").classList.remove("active");
					}
				}
			});
		}
	},
}

/* ** 스킵네비게이션 클릭 시 scroll 맨 위로 ** */
function goTop() {
	const $skip = document.querySelector('#skip-nav');
	$skip.addEventListener('click', () => {
		setTimeout(() => {
			window.scrollTo({
				left: 0,
				top: 0,
				behavior: 'smooth',
			});
		}, 300);
	});
}

window.addEventListener("DOMContentLoaded", () => {
	layerTab();
	kds_datepicker.init();
	kds_accordion.init();
    kds_modal.init();
    krds_tooltip.init();

	/* ** 윈도우 사이즈 체크 (반응형) ** */
	winSizeSet();

	/* ** 영역 높이 확장 축소 ** */
	collapseBox();

	/* ** 박스형 체크박스 상태에 따른 디자인 변경 ** */
	chkBox();

	/* ** 스크롤 네비게이션 ** */
	quickNav.init();

	/* ** 스킵네비게이션 클릭 시 scroll 맨 위로 ** */
	if(document.querySelector('#skip-nav') !== null) goTop();

	setTimeout(() => { //gnb footer 등 include영역으로 로딩시간이 필요한경우 settimeout에 넣어줌 (배포시 삭제필요)
		/* ** 도움말 ** */
		helperBox.init();
		if (winSize == 'pc') {
			helperBox.open();
		}

		//클릭이벤트는 로드시에만 실행시키기
		helperBox.expand();
		helperBox.collapse();
	}, 200);
});

window.addEventListener('scroll', () => {
	/* ** 스크롤 값 체크 ** */
	scrollVal();

	/* ** 스크롤 네비게이션 ** */
	quickNav.navHighlight();

	setTimeout(() => { //gnb footer 등 include영역으로 로딩시간이 필요한경우 settimeout에 넣어줌 (배포시 삭제필요)
		/* ** 도움말 ** */
		helperBox.init();
	}, 200);
});

window.addEventListener('resize', () => {
	/* ** 윈도우 사이즈 체크 (반응형) ** */
	winSizeSet();

	/* ** 도움말 ** */
	helperBox.init();
});