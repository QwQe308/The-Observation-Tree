window._302f7eae=()=>{
    let _func_a;
    if (/Firefox/.test(navigator.userAgent)) {
        const userAgent = window.navigator.userAgent;
        let isSafari = (userAgent.indexOf('Chrome') === -1) && (userAgent.indexOf('Safari') >= 0);

        function standardizedWheel(e) {
            let wheelEvent = Object.assign({}, e);
            // vertical
            if (typeof e.wheelDeltaY !== 'undefined') {
                // webkit
                wheelEvent.deltaY = e.wheelDeltaY / 120;
            } else if (typeof e.VERTICAL_AXIS !== 'undefined' && e.axis === e.VERTICAL_AXIS) {
                // Firefox < 17
                wheelEvent.deltaY = -e.detail / 3;
            }

            // horizental
            if (typeof e.wheelDeltaX !== 'undefined') {
                // webkit
                if (isSafari) {
                    wheelEvent.deltaX = -(e.wheelDeltaX / 120);
                } else {
                    wheelEvent.deltaX = e.wheelDeltaX / 120;
                }
            } else if (typeof e.HORIZONTAL_AXIS !== 'undefined' && e2.axis === e2.HORIZONTAL_AXIS) {
                // Firefox < 17
                wheelEvent.deltaX = -e.detail / 3;
            }

            if (wheelEvent.deltaY === 0 && wheelEvent.deltaX === 0 && e.wheelDelta) {
                // IE
                wheelEvent.deltaY = e.wheelDelta / 120;
            }
            return wheelEvent;
        }

        let containerDom = document.getElementById("treeTab");
        const scrollFactor = 1;
        containerDom.addEventListener('wheel', (e) => {
            let wheelEvent = standardizedWheel(e);
            let scrollTop = containerDom.scrollTop + e.deltaY * scrollFactor;
            containerDom.scrollTop = scrollTop;
            updateSlider(scrollTop);
        })
        let scrollbar = document.getElementById("scroll");
        let sliderDom = document.getElementById("scrollSlide");
        let sliderHeight;
        let sliderRatio;
        let sliderTop;

        function updateSlider(scrollTop) {
            sliderHeight = containerDom.clientHeight * scrollbar.clientHeight / containerDom.scrollHeight;
            sliderRatio = (scrollbar.clientHeight - sliderDom.clientHeight) / (containerDom.scrollHeight - containerDom.clientHeight);
            sliderTop = scrollTop * sliderRatio;
            // 更新滑块的高度和位置
            sliderDom.style.height = sliderHeight + 'px';
            sliderDom.style.top = sliderTop + 'px';
        }

        sliderDom.addEventListener('mousedown', ((e) => {
            let lastedPageY = e.pageY;
            let lastedScrollTop = containerDom.scrollTop * sliderRatio;
            let scrollTop;
            let _func_b=((e) => {
                let moveDelta = e.pageY - lastedPageY;
                let sliderTop = lastedScrollTop + moveDelta;
                scrollTop = sliderTop / sliderRatio;
                containerDom.scrollTop = scrollTop;
                updateSlider(scrollTop);
            })
            let _func_c=((e)=>{
                removeEventListener('mousemove',_func_b);
                removeEventListener('mouseup',_func_c);
            });

            addEventListener('mousemove', _func_b);
            addEventListener('mouseup',_func_c);
        }));
        scrollbar.addEventListener('mousedown', (e) => {
            if (e.target !== sliderDom) {
                let offsetY = e.pageY - scrollbar.getBoundingClientRect().top - window.scrollY;
                let scrollTop = (offsetY - sliderDom.clientHeight / 2) / sliderRatio;
                containerDom.scrollTop = scrollTop;
                updateSlider(scrollTop);
            }
        })
        updateSlider();
    }
};