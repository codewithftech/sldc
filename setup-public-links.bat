@echo off
setlocal
cd /d "%~dp0"
set "SRC=%~dp0sldc-local"
set "DST=%~dp0public"
for %%D in (sites themes profiles modules core cdn-cgi) do (
  if exist "%SRC%\%%D" (
    echo Copying %%D from sldc-local to public...
    robocopy "%SRC%\%%D" "%DST%\%%D" /E /NFL /NDL /NJH /NJS /nc /ns /np >nul
  ) else (
    echo Warning: %SRC%\%%D not found
  )
)
echo Static assets synced from sldc-local to public
