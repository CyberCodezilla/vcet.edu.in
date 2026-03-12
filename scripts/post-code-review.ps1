$body = Get-Content "wiki\Code-Review.md" -Raw
$body | gh issue create --repo CyberCodezilla/vcet.edu.in `
  --title "[Code Review] Full codebase audit — 32 issues (5 Critical, 8 High, 12 Medium, 9 Low)" `
  --label "critical,high,medium,low,security,tech-debt" `
  --body-file - 2>&1
