# executor_cpp.py
from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')
    try:
        with open('/tmp/code.cpp', 'w') as f:
            f.write(code)

        # Compilation du code C++
        compile_result = subprocess.run(['g++', '/tmp/code.cpp', '-o', '/tmp/code_exec'], capture_output=True, text=True)
        if compile_result.returncode != 0:
            return jsonify({
                'stderr': compile_result.stderr.strip(),
                'returncode': compile_result.returncode
            }), 400

        # Exécution de l'exécutable compilé
        execute_result = subprocess.run(['/tmp/code_exec'], capture_output=True, text=True)

        return jsonify({
            'stdout': execute_result.stdout.strip(),
            'stderr': execute_result.stderr.strip(),
            'returncode': execute_result.returncode
        })
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
