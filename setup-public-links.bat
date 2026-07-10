@echo off
setlocal
cd /d "%~dp0public"
for %%D in (sites themes profiles modules core cdn-cgi) do (
  if not exist "%%D" (
    mklink /J "%%D" "..\..\%%D" >nul
  )
)
echo Static asset junctions created in next-app\public
