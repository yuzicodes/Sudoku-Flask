import sys
sys.dont_write_bytecode = True

import requests, json

def generate():
    try:
        sudoku = requests.get("https://sudoku-api.vercel.app/api/dosuku").text
        grid = json.loads(sudoku)["newboard"]["grids"][0]["value"]
        return grid
    except:
        generate()

def empty(grid):
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                return i,j
    return None

def solve(grid,row,column,number):
    for i in range(9):
        if grid[i][column] == number:
            return False
    for i in range(9):
        if grid[row][i] == number:
            return False
        
    row_x = row // 3
    column_y = column // 3
    for i in range(row_x*3,row_x*3+3):
        for j in range(column_y*3,column_y*3+3):
            if grid[i][j] == number:
                return False
    
    return True

def solve_sudoku(board):
    empty_cell = empty(board)
    if not empty_cell:
        return True
    row, col = empty_cell

    for num in range(1, 10):
        if solve(board, row,col,num):
            board[row][col] = num
            if solve_sudoku(board):
                return True

            board[row][col] = 0

    return False

def verify(grid):
    try:
        for i in range(9):
            row_set = set()
            col_set = set()
            
            for j in range(9):
                if grid[i][j] in row_set:
                    return False
                if grid[i][j] != 0:
                    row_set.add(grid[i][j])
                
                if grid[j][i] in col_set:
                    return False
                if grid[j][i] != 0:
                    col_set.add(grid[j][i])

        for box_row in range(0, 9, 3):
            for box_col in range(0, 9, 3):
                subgrid_set = set()
                for i in range(box_row, box_row + 3):
                    for j in range(box_col, box_col + 3):
                        if grid[i][j] in subgrid_set:
                            return False
                        if grid[i][j] != 0:
                            subgrid_set.add(grid[i][j])

        return True
    except Exception:
        return False

def solver(grid):
    solve_sudoku(grid)
    if verify(grid):
        return grid
    else:
        return False