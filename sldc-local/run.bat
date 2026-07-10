@echo off
REM Start a local server for the SLDC development copy.
REM IMPORTANT: The site MUST be opened through this server (http://localhost),
REM NOT by double-clicking index.html. Sliders/carousels use ES module
REM dynamic imports that browsers block on the file:// protocol.
cd /d "%~dp0"
echo.
echo   SLDC local site running at:  http://localhost:8000/
echo   (Press Ctrl+C to stop)
echo.

REM Open the browser to the served URL (not the file).
start "" http://localhost:8000/

REM Try the 'python' launcher, then fall back to the Windows 'py' launcher.
python -m http.server 8000 2>nul
if errorlevel 1 (
  py -m http.server 8000
)
