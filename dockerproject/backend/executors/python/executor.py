from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')
    try:
        # Enregistre le code reçu dans un fichier temporaire
        with open('/tmp/code.py', 'w') as f:
            f.write(code)

        # Exécute le code
        result = subprocess.run(['python3', '/tmp/code.py'], capture_output=True, text=True)

        # Retourne le résultat sous forme de JSON
        return jsonify({
            'stdout': result.stdout.strip(),
            'stderr': result.stderr.strip(),
            'returncode': result.returncode
        })
    except Exception as e:
        return jsonify(error=str(e)), 500
    finally:
        # Supprime le fichier temporaire
        if os.path.exists('/tmp/code.py'):
            os.remove('/tmp/code.py')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
