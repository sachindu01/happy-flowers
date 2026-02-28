---
description: how to deploy changes to production (EC2 at happyflowers.duckdns.org)
---

## Deploying to Production

### Step 1 — Push your changes to GitHub (local machine)
```bash
git add .
git commit -m "describe your change"
git push
```

### Step 2 — SSH into EC2
```bash
ssh -i "$HOME\Downloads\happy-flowers-key.pem" ubuntu@98.84.163.83
```

> **Note:** If the EC2 was restarted, its IP may have changed. Update DuckDNS:
> ```bash
> curl "https://www.duckdns.org/update?domains=happyflowers&token=0f2f69bd-546f-4b57-9a6e-11fd6a4d7f75&ip=$(curl -s ifconfig.me)"
> ```

### Step 3 — Pull latest code on EC2
```bash
cd ~/happy-flowers
git fetch origin
git reset --hard origin/deploy/docker-production
```

### Step 4 — Rebuild only what changed

| What changed | Command |
|---|---|
| Frontend (React/JSX/CSS) | `docker compose up -d --build frontend` |
| Backend (Java/Spring Boot) | `docker compose up -d --build backend` |
| Both frontend and backend | `docker compose up -d --build` |
| Only docker-compose.yml or .env | `docker compose up -d` |

### Step 5 — Verify the site
Open https://happyflowers.duckdns.org and check it's working.

---

## Useful Commands

```bash
# View live logs
docker compose logs -f backend
docker compose logs -f frontend

# Check container status
docker compose ps

# Restart everything without rebuilding
docker compose restart

# Full restart (stop + start all)
docker compose down && docker compose up -d
```

---

## Important Notes

- The EC2 has its own `.env` file (not in git). If you add new environment variables,
  set them manually on the EC2:
  ```bash
  nano ~/happy-flowers/.env
  ```
- SSL certificates are at `/etc/letsencrypt/` on the EC2 host (mounted into the frontend container).
- Certbot auto-renews certs monthly via cron. If HTTPS breaks, run: `sudo certbot renew`
- Backend rebuild takes ~2–3 min (Maven). Frontend is ~30 seconds.
