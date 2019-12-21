

class Utils {
    constructor() { 
    }
    
    httpRequest(address, reqType, asyncProc = null) {
        var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        if (asyncProc) {
            req.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {
                    asyncProc(this);
                } else {
                }
            };
        }
        req.open(reqType, address, !(!asyncProc));
        req.send();
        return req;
    }

    drawProcessBars(bars, max) {
        var rootEl = this.getEl('progress-bars');
        for (var i = 0; i < bars.length; i++) {
            var divCol = this.createCommonElement('div', [{ name: 'class', value: 'col p-2' }]);
            var divChild = this.createCommonElement('div', [{ name: 'class', value: 'progress' }]);
            var divProcessBar = this.createCommonElement('div',
                [
                    { name: 'id', value: 'bar-' + i },
                    { name: 'class', value: 'progress-bar progress-bar-striped progress-bar-animated' },
                    { name: 'role', value: 'progressbar' },
                    { name: 'aria-valuenow', value: bars[i] },
                    { name: 'aria-valuemin', value: 0 },
                    { name: 'aria-valuemax', value: max },
                    { name: 'style', value: 'width: ' + ((bars[i] * 100) / max) + '%' }
                ]);
            var smallValueEl = this.createCommonElement('b',
                [
                    { name: 'id', value: 'bar-percent-' + i },
                    { name: 'class', value: 'justify-content-center d-flex position-absolute w-100 progress-title' },
                ]
            );
            smallValueEl.textContent = Math.round(((bars[i] * 100) / max)) + '%';

            var divCurrentVal = this.createCommonElement('div',
                [
                    { name: 'id', value: 'bar-current-val-' + i },
                    { name: 'class', value: 'col p-2 tag' }
                ]);
            divCurrentVal.textContent = 'Current Value: ' + bars[i];
            divChild.appendChild(divProcessBar);
            divChild.appendChild(smallValueEl);
            divCol.appendChild(divChild);
            divCol.appendChild(divCurrentVal);
            rootEl.appendChild(divCol);
        }
    }

    drawButtons(buttons) {
        buttons = buttons.sort();
        var rootEl = this.getEl('buttons');
        var divParent = this.createCommonElement('div', [{ name: 'class', value: 'row pr-3' }]);
        for (var i = 0; i < buttons.length; i++) {
            var subDiv = this.createCommonElement('div', [{ name: 'class', value: 'col-md-3 col-lg-2 p-2' }]);
            var childButton = this.createCommonElement('button', [
                { name: 'class', value: 'btn btn-block' + (buttons[i] > 0 ? ' btn-primary' : ' btn-warning') },
                { name: 'type', value: 'button' },
                { name: 'value', value: buttons[i] }
            ]);
            childButton.textContent = buttons[i] > 0 ? '+' + buttons[i] : buttons[i];
            // assign event for button
            childButton.onclick = (e) => {
                this.updateValueForBar(this.convertInt(e.target.value));
            };


            divParent.appendChild(subDiv);
            subDiv.appendChild(childButton);
            rootEl.appendChild(divParent);
        }
    }

    updateValueForBar(value) {
        var currentBarPos = this.getEl('selectorCustom').selectedIndex;
        var currentBarEl = this.getEl('bar-' + currentBarPos);
        var valuePercentEl = this.getEl('bar-percent-' + currentBarPos);
        var valueBarEl = this.getEl('bar-current-val-' + currentBarPos);
        var currentVal = currentBarEl.getAttribute('aria-valuenow');
        var maxBarVal = this.convertInt(currentBarEl.getAttribute('aria-valuemax'));
        var calculator = this.convertInt(currentVal) + this.convertInt(value) < 0 ?
            0 : (this.convertInt(currentVal) + this.convertInt(value));
        var curClas = currentBarEl.getAttribute('class');
        var percent = (calculator * 100) / maxBarVal;
        currentBarEl.setAttribute('aria-valuenow', calculator.toString());
        currentBarEl.setAttribute('style', 'width: ' + percent + '%');
        currentBarEl.setAttribute('class', curClas.replace('active', ''));

        if (calculator > maxBarVal) {
            currentBarEl.setAttribute('class', curClas.replace('active', '') + ' active');
        }
        valuePercentEl.textContent = Math.round(percent) + '%';
        valueBarEl.textContent = 'Current Value: ' + calculator;
    }

    drawSelector(bars) {
        var rootEl = this.getEl('select-control');
        var selectorParent = this.createCommonElement('select',
            [
                { name: 'class', value: 'custom-select' },
                { name: 'id', value: 'selectorCustom' }
            ]
        );
        for (var i = 0; i < bars.length; i++) {
            var childOption = this.createCommonElement('option', [{ name: 'value', value: i }]);
            childOption.text = 'Progress Bar ' + (i + 1);
            selectorParent.appendChild(childOption);
        }

        rootEl.appendChild(selectorParent);
    }

    createCommonElement(type, att = []) {
        var el = document.createElement(type);
        for (var i = 0; i < att.length; i++) {
            el.setAttribute(att[i].name, att[i].value);
        }
        return el;
    }

    convertInt(val) {
        return parseInt(val, 10);
    }

    getEl(id) {
        return document.getElementById(id);
    }
}

module.exports = Utils;