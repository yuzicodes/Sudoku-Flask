import sys
sys.dont_write_bytecode = True

from flask import Flask, render_template, jsonify, request
from sudoku import generate
from sudoku import solver
app = Flask(__name__,static_folder="static")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/generate")
def gene_api():
    grid = generate()
    return jsonify(grid)

@app.route("/api/solve", methods=['POST'])
def solve_api():
    grid = request.get_json().get("grid")
    return jsonify(solver(grid))

if __name__ == '__main__':
    app.run(debug=False)