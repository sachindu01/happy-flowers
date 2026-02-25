try {
    $token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBoYXBweWZsb3dlcnMubG9jYWwiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzE5MjExODcsImV4cCI6MTc3MTkyNDc4N30.v9C32EG3NtoGU1889xvECYgz3cZ1LXqFZtga2PAByt4"
    $headers = @{ "Authorization" = "Bearer $token" }
    
    "Checking Auth..." | Out-File -FilePath "check_auth_resp.txt" -Encoding ascii
    $resp1 = Invoke-WebRequest -Uri "http://localhost:8080/api/admin/check-auth" -Headers $headers -ErrorAction Stop
    $resp1.Content | Out-File -FilePath "check_auth_resp.txt" -Append -Encoding ascii
    
    "`nChecking Plants..." | Out-File -FilePath "check_plants_resp.txt" -Encoding ascii
    $resp2 = Invoke-WebRequest -Uri "http://localhost:8080/api/admin/plants" -Headers $headers -ErrorAction Stop
    "Status: " + $resp2.StatusCode | Out-File -FilePath "check_plants_resp.txt" -Append -Encoding ascii
} catch {
    $_.Exception.Message | Out-File -FilePath "verify_error.txt" -Encoding ascii
    if ($_.Exception.Response) {
        $_.Exception.Response.StatusCode.Value__ | Out-File -FilePath "verify_error_status.txt" -Encoding ascii
    }
}
