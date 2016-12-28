var board = [];
var holes = [];
var is_solved = false;

function randomArray() {
    var query = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var matrix = [];
    var key = 0;

    for (var i = 9; i > 0; i--)
    {
        key = parseInt(Math.random() * i);
        matrix.push(query[key]);
        query.splice(key, 1);
    }

    return matrix;
}


function isValid(n)
{
    var i = parseInt(n / 9), j = n % 9;
    var v = board[9 * i + j];
    var query = [0, 0, 0, 3, 3, 3, 6, 6, 6];

    var t, u;
    for (t = 0; t < 9; t++)
    {
        if ((t != i && board[9*t + j] == v) || (t != j && board[9*i + t] == v))
            return false;
    }

    for (t = query[i]; t < query[i] + 3; t++)
    {
        for (u = query[j]; u < query[j] + 3; u++)
        {
            if ((t != i || u != j) && board[9*t + u] == v)
                return false;
        }
    }
    return true;
}


function solve(n)
{
    if (n == 81 && !is_solved)
    {
        is_solved = true;
        return;
    }

    if (board[n] != 0 && !is_solved)
    {
        solve(n + 1);
        return;
    }

    for (var k = 0; k < 9; k++)
    {
        board[n]++;
        if (isValid(n) && !is_solved)
        {
            solve(n + 1);
            if (is_solved)
                break;
        }
    }

    if (!is_solved)
        board[n] = 0;
}


function isDigable(target)
{
    var target_val = board[target];

    for (var j = 1; j < 10; j++)
    {
        if (j == target_val)
            continue;
        board[target] = j;
        if (!isValid(target))
        {
            board[target] = target_val;
            continue;
        }
        var temp = board.concat();
        solve(0);
        board = temp.concat();
        if (is_solved)
        {
            board[target] = target_val;
            break;
        }
    }

    if (j == 10 && !is_solved)
        return true;

    is_solved = false;
    return false;
}


function digHoleEasy()
{
    var i, j, target;
    for (i = 0; i < 9; i++)
    {
        if (i % 2 == 0)
        {
            for (j = 0; j < 9; j += 2)
            {
                target = 9 * i + j;

                if (isDigable(target))
                {
                    board[target] = 0;
                    holes.push(target);
                }
            }
        }
        else
        {
            for (j = 7; j > 0; j -= 2)
            {
                target = 9 * i + j;

                if (isDigable(target))
                {
                    board[target] = 0;
                    holes.push(target);
                }
            }
        }
    }
}


function digHoleMedium()
{
    for (var i = 0; i < 49; i++)
    {
        var target = parseInt(Math.random() * 81);
        if (isDigable(target))
        {
            board[target] = 0;
            holes.push(target);
        }
        else
            i--;
    }
}


function digHoleHard()
{
    var i, j, target;
    for (i = 0; i < 9; i++)
    {
        if (i % 2 == 0)
        {
            for (j = 0; j < 9; j++)
            {
                target = 9 * i + j;

                if (isDigable(target))
                {
                    board[target] = 0;
                    holes.push(target);
                }
            }
        }
        else
        {
            for (j = 8; j > -1; j--)
            {
                target = 9 * i + j;

                if (isDigable(target))
                {
                    board[target] = 0;
                    holes.push(target);
                }
            }
        }
    }
}


function getValidNum(n) {
    var temp = board[n];
    var validNum = [];
    for (var i = 1; i < 10; i++)
    {
        board[n] = i;
        if (isValid(n))
            validNum.push(i);
    }
    board[n] = temp;

    return validNum;
}


function generateSudoku(level)
{
    for (var i = 0; i < 81; i++)
        board[i] = 0;
    holes = [];

    var m1 = randomArray();
    var m2 = randomArray();
    var m3 = randomArray();
    var j, k;
    for (j = 0; j < 3; j++)
    {

        for (k = 0; k < 3; k++)
        {
            board[9*j + k] = m1[3*j + k];
            board[9*(j+3) + (k+3)] = m2[3*j + k];
            board[9*(j+6) + (k+6)] = m3[3*j + k];
        }
    }
    solve(0);

    is_solved = false;

    var dig_hole_func = [digHoleEasy, digHoleMedium, digHoleHard];

    dig_hole_func[level]();
}

