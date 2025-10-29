# SYSTEM_DESIGN

## Part 3 — System Design & Architecture (Summary)

---

## 1) Scalability — How to handle 1 billion rows

**Backend**

* Use a scalable datastore: PostgreSQL with partitioning or a distributed NoSQL (e.g., Cassandra / MongoDB) depending on access patterns.
* Precompute and persist aggregates (min, max, mean, count) instead of computing on every request.
* Server-side pagination and limit/offset or keyset pagination for large result sets.
* Use a read replica pattern for heavy read workloads.
* Cache hot queries or precomputed results in Redis.
* Batch/stream processing for ETL (e.g., Spark, Airflow jobs) to refresh aggregates.

**Frontend**

* Virtualize large tables (react-window / react-virtualized) to render only visible rows.
* Use infinite scroll or paged UI with small page sizes (5–20 rows) for demo realism.
* Debounce search input to reduce request rate.

**Infrastructure**

* Run multiple API instances behind a load balancer (ELB, nginx).
* Horizontal scale stateless services; scale DB with read replicas or sharding when needed.
* Serve static assets via a CDN (CloudFront / Cloudflare).

---

## 2) Performance Optimization

**Backend**

* Cache common queries and precomputed stats in Redis.
* Add database indexes on searchable fields (city_name).
* Avoid full table scans; use keyset pagination where appropriate.
* Use async request handling / worker queues for heavy computations.

**Frontend**

* useMemo / React.memo to avoid unnecessary re-renders.
* Code-splitting and lazy loading for non-critical UI.
* Debounce user inputs (search) to reduce API calls.

**Network**

* Enable gzip/Brotli compression.
* Prefer HTTP/2 for multiplexing where supported.
* Consider request batching for multiple small calls.

---

## 3) Production Deployment

**Infrastructure & Runtime**

* Cloud provider: AWS/GCP/Azure.
* Containerize services with Docker.
* Use orchestration (Kubernetes / ECS) for scaling and rolling deploys.
* Separate environments: dev → staging → prod.

**CI/CD**

* Automated pipelines: linting, unit tests, integration tests, build, deploy to staging, deploy to prod.
* Use feature branches and PRs with automated checks.

**Monitoring & Observability**

* Centralized logs (ELK / CloudWatch).
* Error tracking (Sentry).
* Metrics and dashboards (Prometheus + Grafana or cloud equivalent).

**Security**

* Serve over HTTPS (TLS).
* Input validation and sanitization on backend.
* Rate limiting and optional authentication for APIs.

---

## 4) Data Quality

**Validation**

* Validate records at ingestion: format, numeric ranges (temperature sanity checks), and required fields.
* Reject or quarantine malformed records for manual review.

**Logging & Monitoring**

* Log invalid rows and maintain counters/metrics for missing values, duplicates, and outliers.
* Set alerts for anomaly thresholds (sudden spike in invalid data or impossible values).

**Recovery & Governance**

* Retry logic for transient failures.
* Maintain raw data snapshots and an audit trail to trace and fix upstream issues.
* Provide data-cleaning jobs to normalize and deduplicate periodically.

---

## Talking Points / Trade-offs (one-liners)

* Precomputing aggregates greatly speeds reads but requires ETL pipelines and storage for derived data.
* Caching reduces latency but introduces cache invalidation complexity.
* Virtualized UI provides great UX for large lists but hides complexity (implementing pagination + virtualization is best).
* For a novice role, focus on clear design choices: caching + pagination + simple indices; mention more advanced scaling as future steps.

---

> Note: I pretty much tried to discuss things from my experience, some of these I am still giving a thought
