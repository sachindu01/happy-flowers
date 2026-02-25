try {
    $body = @{ email = "admin@happyflowers.local"; password = "admin123" } | ConvertTo-Json
    $resp = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $resp.Content | Out-File -FilePath "login_resp.txt" -Encoding ascii
} catch {
    $_.Exception.Message | Out-File -FilePath "login_error.txt" -Encoding ascii
}
