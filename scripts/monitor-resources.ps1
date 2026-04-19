$ProcessName = "node"
$Interval = 5 # seconds
$OutFile = "resource-audit-log.txt"

Write-Output "Monitoring $ProcessName processes every $Interval seconds..." | Out-File $OutFile
Write-Output "Timestamp, PID, WorkingSet_MB, CPU_Percent" | Out-File $OutFile -Append

while ($true) {
    $Timestamp = Get-Date -Format "HH:mm:ss"
    $Processes = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
    
    if ($Processes) {
        foreach ($P in $Processes) {
            $WS = [math]::Round($P.WorkingSet64 / 1MB, 2)
            $CPU = [math]::Round((Get-Counter "\Process($($P.ProcessName)*)\% Processor Time").CounterSamples.CookedValue, 2)
            Write-Output "$Timestamp, $($P.Id), $WS, $CPU" | Out-File $OutFile -Append
        }
    } else {
        Write-Output "$Timestamp, No node processes found" | Out-File $OutFile -Append
    }
    
    Start-Sleep -Seconds $Interval
}
