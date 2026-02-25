try {
    $token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBoYXBweWZsb3dlcnMubG9jYWwiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzE5MjA3OTAsImV4cCI6MTc3MTkyNDM5MH0.UxksUjEZ9PPMQ6f2NjWF4UA8mZK-36-x91WUU9lxZNQ"
    $headers = @{ "Authorization" = "Bearer $token" }
    $resp = Invoke-WebRequest -Uri "http://localhost:8080/api/admin/plants" -Headers $headers -ErrorAction Stop
    "Status: " + $resp.StatusCode | Out-File -FilePath "verify_resp.txt" -Encoding ascii
    $resp.Content | Out-File -FilePath "verify_content.txt" -Encoding ascii
} catch {
    $_.Exception.Message | Out-File -FilePath "verify_error.txt" -Encoding ascii
}
