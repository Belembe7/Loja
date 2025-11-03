@echo off
cd /d "%~dp0"
echo Ativando ambiente virtual...
call venv\Scripts\activate.bat
echo Iniciando servidor Flask...
python app.py



