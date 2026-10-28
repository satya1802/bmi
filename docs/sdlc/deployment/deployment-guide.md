# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| CDN / Edge Cache | Amazon CloudFront | AWS managed edge | Global edge caching, absorbs traffic spikes automatically | dev |
| SPA Host + Health API | FastAPI 0.115 container (ECS Fargate) | Python 3.12 / Uvicorn | Auto-scaling on request count, scales to near-zero at low traffic | dev |
| Reserved Database | Amazon RDS for PostgreSQL 16 | PostgreSQL 16 | Single small instance, idle; reserved for future use | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_CDN___Edge_Cache["CDN / Edge Cache<br/>Amazon CloudFront"]
  n_SPA_Host___Health_API["SPA Host + Health API<br/>FastAPI 0.115 container (ECS Fargate)"]
  n_Reserved_Database["Reserved Database<br/>Amazon RDS for PostgreSQL 16"]
  n_CDN___Edge_Cache -->|"HTTPS"| n_SPA_Host___Health_API
  n_SPA_Host___Health_API -->|"TLS/PostgreSQL"| n_Reserved_Database
```
<!-- sdlc:auto:end topology -->
