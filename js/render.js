
function createSudoku(level) {
    var table = document.getElementById('board');
    table.innerHTML = '';
    var lastValue;
    var lastGrid;

    var tbody = document.createElement('tbody');

    table.appendChild(tbody);
    generateSudoku(level);
    for (var i = 0; i < 9; i++) {
        tbody.insertRow(i);
        for (var j = 0; j < 9; j++) {
            var cell = tbody.rows[i].insertCell(j);
            var n = 9 * i + j;
            cell.i = i;
            cell.j = j;
            cell.preSet = false;
            cell.hasSetted = false;
            cell.selected = false;
            cell.state = 0;
            cell.numValue = 0;
            if (board[n] != 0) {
                cell.preSet = true;
                cell.style.backgroundColor = '#DACBA0';
                cell.innerHTML = '<a class="preSet">' + board[n] + '</a>';
            }
            else {
                cell.innerHTML = '';
            }

            cell.onmouseover = function () {
                if (!this.preSet && !this.active)
                    this.style.backgroundColor = '#E5E0E0';
            };

            cell.onmouseleave = function () {
                if (!this.preSet && !this.active)
                    if (!this.hasSetted)
                        this.style.backgroundColor = '#C1D87E';
            };

            cell.ongiveup = function () {
                console.log("call ongiveup");
                if (this.active) {
                    console.log("active");
                    if (lastValue !== undefined) {
                        if (lastValue == 0) {
                            lastValue = "";
                        }
                        this.innerHTML = lastValue;
                    }
                    if (this.hasSetted) {
                        this.style.backgroundColor = '#E5E0E0';
                    } else {
                        this.style.backgroundColor = '#C1D87E';
                    }
                }
            };

            cell.onclick = function () {
                if (this.preSet)
                    return;
                this.state++;
                if (this.state < 3)
                {
                    if (this !== lastGrid)
                    {
                        if (typeof lastGrid !== 'undefined')
                            lastGrid.ongiveup(this);
                        lastGrid = this;
                        lastValue = this.numValue;
                    }
                    // this.innerHTML = '';
                    this.active = true;
                    this.style.backgroundColor = '#b7c9c3';

                    var self = this;
                    var ansSelector = document.getElementById('selector-area');   //a new table inside a table grid
                    ansSelector.innerHTML = '';
                    var validNum = getValidNum(9 * this.i + this.j);
                    for (var k = 0; k < 9; k++)
                    {
                        if (validNum.indexOf(k + 1) >= 0)
                        {
                            var option = document.createElement('span');
                            option.setAttribute('class', 'selector');

                            var optionValue = k + 1;
                            if (this.numValue == optionValue)
                                optionValue = 0;

                            option.innerHTML = '<a>' + optionValue + '</a>';
                            option.onclick = (function () {
                                var cuCell = self;
                                var value = optionValue;
                                return function () {
                                    if (value == 0) {
                                        value = '';
                                        cuCell.hasSetted = false;
                                        cuCell.style.backgroundColor = '#C1D87E'
                                    }
                                    else {
                                        cuCell.style.backgroundColor = '#E5E0E0';
                                        cuCell.hasSetted = true;
                                    }
                                    cuCell.innerHTML = value;
                                    cuCell.style.fontSize = '30px';
                                    cuCell.style.color = '#a10000';
                                    cuCell.numValue = value;
                                    lastValue = value;
                                    cuCell.active = false;
                                    cuCell.state++;
                                    board[9 * cuCell.i + cuCell.j] = value;
                                    ansSelector.innerHTML = '';
                                    // logic.fill(cuCell.j, cuCell.i, value);
                                    if (logic.checkComplete()) {
                                        remind.innerHTML = '<h1 class="text-setted">Succeed!</h1>'
                                    }
                                }
                            })();
                            ansSelector.appendChild(option);
                        }
                    }
                }
                else {
                    this.state = 0;
                }
            }
        }
    }
}
