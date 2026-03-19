$ErrorActionPreference = "Stop"

$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "Building project for production..."
cmd.exe /c "npm run build"
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

Write-Host "Navigating to dist directory..."
Set-Location -Path "dist"

Write-Host "Initializing local git repository..."
& "C:\Program Files\Git\cmd\git.exe" init
& "C:\Program Files\Git\cmd\git.exe" config user.email "deploy@example.com"
& "C:\Program Files\Git\cmd\git.exe" config user.name "Auto Deploy"
& "C:\Program Files\Git\cmd\git.exe" add -A
& "C:\Program Files\Git\cmd\git.exe" commit -m "Deploy to GitHub Pages"

Write-Host "Pushing to gh-pages branch..."
& "C:\Program Files\Git\cmd\git.exe" push -f "https://github.com/GujjalaManikanta/simple-book-shelf.git" HEAD:gh-pages

Write-Host "Deployment script finished."
Set-Location -Path ".."
