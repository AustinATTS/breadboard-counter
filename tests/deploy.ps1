param(
    [string]$Server = "odoo-testing",
    [string]$User = "root",
    [string]$ModuleName = "breadboard_core"
)

$LocalModule = Join-Path $PSScriptRoot "..\$ModuleName"
$RemotePath = "/opt/custom-addons/$ModuleName"

Write-Host "Removing old module..."

ssh "$User@$Server" "rm -rf $RemotePath"

Write-Host "Uploading new module..."

scp -r $LocalModule "${User}@${Server}:/opt/custom-addons/"

Write-Host "Fixing permissions"

ssh "$User@$Server" "chmod -R 755 /opt/custom-addons/$ModuleName"

Write-Host "Restarting Odoo..."

ssh "$User@$Server" "systemctl restart odoo-testing"

Write-Host "Checking service status..."

ssh "$User@$Server" "systemctl is-active odoo-testing"

Write-Host "Deployment complete."