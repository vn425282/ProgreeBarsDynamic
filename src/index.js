import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const Utils = require('./js/utils');
const utils = new Utils();
const endPoint = 'https://pb-api.herokuapp.com/bars';
var limit = 180;
var data;

document.addEventListener('DOMContentLoaded', function (event) {
    var req = utils.httpRequest(endPoint, 'GET');
    if (req.status == 200) {
        data = JSON.parse(req.responseText);
        limit = data.limit;
        console.log(data, limit);

        var elMaxVal = utils.getEl('max-value');
        elMaxVal.textContent = 'Max Value is ' + limit;
        // drawing elements
        utils.drawProcessBars(data.bars, limit);
        utils.drawSelector(data.bars);
        utils.drawButtons(data.buttons);
    } else {
        // APIs error based on status code
        alert('APIs error, please reload to try again !!!')
    }
})