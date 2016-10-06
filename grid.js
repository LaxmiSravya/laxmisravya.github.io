var w; //The Game grid window.

var user;

var grid = [
	/* Initial White checker positions */
	{x:1, y:0, occupied:"checker-white", king:false},
	{x:3, y:0, occupied:"checker-white", king:false},
	{x:5, y:0, occupied:"checker-white", king:false},
	{x:7, y:0, occupied:"checker-white", king:false},
	{x:0, y:1, occupied:"checker-white", king:false},
	{x:2, y:1, occupied:"checker-white", king:false},
	{x:4, y:1, occupied:"checker-white", king:false},
	{x:6, y:1, occupied:"checker-white", king:false},
	{x:1, y:2, occupied:"checker-white", king:false},
	{x:3, y:2, occupied:"checker-white", king:false},
	{x:5, y:2, occupied:"checker-white", king:false},
	{x:7, y:2, occupied:"checker-white", king:false},

	/* Initial empty positions */
	{x:0, y:3, occupied:"", king:false},
	{x:2, y:3, occupied:"", king:false},
	{x:4, y:3, occupied:"", king:false},
	{x:6, y:3, occupied:"", king:false},
	{x:1, y:4, occupied:"", king:false},
	{x:3, y:4, occupied:"", king:false},
	{x:5, y:4, occupied:"", king:false},
	{x:7, y:4, occupied:"", king:false},

	/* Initial Black checker positions */
	{x:0, y:5, occupied:"checker-black", king:false},
	{x:2, y:5, occupied:"checker-black", king:false},
	{x:4, y:5, occupied:"checker-black", king:false},
	{x:6, y:5, occupied:"checker-black", king:false},
	{x:1, y:6, occupied:"checker-black", king:false},
	{x:3, y:6, occupied:"checker-black", king:false},
	{x:5, y:6, occupied:"checker-black", king:false},
	{x:7, y:6, occupied:"checker-black", king:false},
	{x:0, y:7, occupied:"checker-black", king:false},
	{x:2, y:7, occupied:"checker-black", king:false},
	{x:4, y:7, occupied:"checker-black", king:false},
	{x:6, y:7, occupied:"checker-black", king:false}
];

var selected = {occupied:"", x:0, y:0, king:false};
var turn = 'white';
var white;
var black;

function grid_load()
{
	print_Grid();
	addEvents();
	checkers = document.getElementById('checkers');
	checkers.style.position = "relative";
}

function print_Grid()
{
	var board = document.getElementById('gridgame');
	var html = "<table class='grid'>";

	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == 0 || grid[i].x == 1)
		{
			html += "<tr>";
		}
		if (grid[i].x%2 == 1)
		{
			html += "<td class='orangecell'></td>";
		}

		html += "<td class='creamcell'><div id=" + grid[i].occupied + "></div></td>";

		if (grid[i].x%2 == 0 && grid[i].x != 7)
		{
			html += "<td class='orangecell'></td>";
		}
		if (grid[i].x == 6)
		{
			html += "</tr>";
		}
		if (grid[i].x == 7)
		{
			html += "</tr>";
		}
	}

	html += "</table>";
	board.innerHTML = html;
}

function setName(color, playername)
{
	var outer = document.getElementById(color + 'player');
	var playername = document.getElementById(color + 'name').value;
	if (playername != '')
	{
		outer.innerHTML = '<h4 id='+color+'>' + playername + '</h4>';
	}
	else {
		alert('Please enter the '+color+' player name');
	}
	

	switch(color)
	{
		case 'white':
			white = playername;
			break;
		case 'black':
			black = playername;
			break;

	}
}
//reset button function
function reset()
{
	location.reload(true);
}
function whiteQuit() {
	var whitePlayerName = document.getElementById('white').innerHTML;
	var blackPlayerName = document.getElementById('black').innerHTML;
	alert(whitePlayerName +' surrendered, '+ blackPlayerName +' wins!');
	location.reload(true);
}
function blackQuit() {
	var whitePlayerName = document.getElementById('white').innerHTML;
	var blackPlayerName = document.getElementById('black').innerHTML;
	alert(blackPlayerName +' surrendered, '+ whitePlayerName +' wins!');
	location.reload(true);
}

function addEvents()
{
	var gridDiv = document.getElementById('gridgame');
	var tds = gridDiv.getElementsByTagName('td');

	for (var i = 0; i < tds.length; i++)
	{
		tds[i].onclick = move_Piece;
	}
}

function move_Piece()
{
	cell = this;
	x = cell.cellIndex;
	y = cell.parentNode.rowIndex;
	gridPiece = getGridPiece(x, y);
	
	if (selected.occupied == "" && gridPiece && gridPiece.occupied.indexOf(turn) != -1)
	{
		selected.occupied = gridPiece.occupied;
		selected.king = gridPiece.king;
		selected.x = x;
		selected.y = y;
		gridPiece.occupied = "";

		cell.innerHTML = "<div id=''></div>";
		cell.onclick = move_Piece;
	}
	else if (selected.occupied.indexOf('white') != -1)
	{
		if (y == 7)
		{
			selected.king = true;
			selected.occupied = 'king-white';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridPiece.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = move_Piece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'black';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y+2) && (getGridPiece(x, y).occupied == ""))
		{
			jumped = getGridPiece(x+1, y-1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'black';
				game_Finished();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridPiece.occupied == ""))
		{
			jumped = getGridPiece(x-1, y-1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'black';
				game_Finished();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;

			cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
			cell.onclick = move_Piece;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridPiece.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = move_Piece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'black';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y-2) && (getGridPiece(x, y).occupied == "") && selected.king)
		{
			jumped = getGridPiece(x+1, y+1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'black';
				game_Finished();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridPiece.occupied == "") && selected.king)
		{
			jumped = getGridPiece(x-1, y+1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'black';
				game_Finished();
			}
		}
	}
	else if (selected.occupied.indexOf('black') != -1)
	{
		if (y == 0)
		{
			selected.king = true;
			selected.occupied = 'king-black';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridPiece.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = move_Piece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'white';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y-2) && (getGridPiece(x, y).occupied == ""))
		{
			jumped = getGridPiece(x+1, y+1);
			if (jumped.occupied.indexOf('black') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				game_Finished();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridPiece.occupied == ""))
		{
			jumped = getGridPiece(x-1, y+1);
			if (jumped.occupied.indexOf('black') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				game_Finished();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;

			cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
			cell.onclick = move_Piece;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridPiece.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = move_Piece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'white';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y+2) && (getGridPiece(x, y).occupied == "") && selected.king)
		{
			jumped = getGridPiece(x+1, y-1);
			if (jumped.occupied.indexOf('black') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				game_Finished();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridPiece.occupied == "") && selected.king)
		{
			jumped = getGridPiece(x-1, y-1);
			if (jumped.occupied.indexOf('black') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = move_Piece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = move_Piece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				game_Finished();
			}
		}
	}
}

function game_Finished()
{
	var white_exists = false;
	var black_exists = false;
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].occupied == 'checker-white' || grid[i].occupied == 'king-white')
		{
			white_exists = true;
		}
		else if (grid[i].occupied == 'checker-black' || grid[i].occupied == 'king-black')
		{
			black_exists = true;
		}
	}

	if (!white_exists)
	{
		alert('Black Wins!');
		location.reload(true);
	}
	else if (!black_exists)
	{
		alert('White Wins!');
		location.reload(true);
	}

	return false;
}

function getGridPiece(x, y)
{
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == x && grid[i].y == y)
		{
			return grid[i];
		}
	}
}

function getGridCell(x, y)
{
	var board = document.getElementById('gridgame');
	var gridTable = board.getElementsByTagName('table');
	return gridTable[0].rows[y].cells[x];
}

function openGrid()
{
	var width = 700;
	var height = 800;
	var x = screen.availWidth/2 - width/2;
	var y = screen.availHeight/2 - height/2;
	w = window.open("grid.html", "Checkers", "width=" + width + ", height=" + height + ", status=yes, resizable=yes, left=" + x + ", top=" + y);
}

function closeGrid()
{
	w.close();
}

