# VAYU-SENTINEL
### Physics-informed, weather-coupled air-quality forecasting for Delhi–NCR

> **Problem focus:** SIH26082 — Air Pollution–Weather Coupled Forecasting System (Delhi NCR Focus)  
> **Theme:** Clean & Green Technology  
> **Primary target:** Hourly PM₂.₅ forecasting  
> **Intended horizon:** T+1 through T+72 hours  
> **Project status:** Research and engineering prototype. Historical V1 results exist in project notes; the full 72-horizon V3/FALCON training run was previously recorded as not executed. Check the current repository, artefacts, and evaluation reports before claiming a horizon is trained or production-ready.

## Contents
1. [Overview](#1-overview)
2. [Problem statement](#2-problem-statement)
3. [Objectives and scope](#3-objectives-and-scope)
4. [Project generations](#4-project-generations)
5. [Architecture](#5-architecture)
6. [Data sources](#6-data-sources)
7. [Forecast methodology](#7-forecast-methodology)
8. [Feature engineering](#8-feature-engineering)
9. [ML model design](#9-ml-model-design)
10. [Spatial and physics-informed research](#10-spatial-and-physics-informed-research)
11. [Forecast outputs](#11-forecast-outputs)
12. [Evaluation and reported results](#12-evaluation-and-reported-results)
13. [Causality and leakage controls](#13-causality-and-leakage-controls)
14. [Software stack](#14-software-stack)
15. [Repository structure](#15-repository-structure)
16. [Local setup](#16-local-setup)
17. [Training workflow](#17-training-workflow)
18. [API and dashboard](#18-api-and-dashboard)
19. [Testing and release gates](#19-testing-and-release-gates)
20. [Limitations and status](#20-limitations-and-status)
21. [Roadmap](#21-roadmap)
22. [Responsible use](#22-responsible-use)
23. [Glossary](#23-glossary)
24. [References](#24-references)

---

## 1. Overview

**VAYU-SENTINEL** is a research-led air-quality forecasting system intended to combine historical pollution observations with meteorological conditions and regional context to estimate how PM₂.₅ may evolve over the next several hours and days.

Delhi–NCR pollution is affected by more than local emissions. Wind, humidity, atmospheric mixing, boundary-layer dynamics, seasonal patterns, regional transport, and episodic fire activity can all influence observed concentrations. VAYU-SENTINEL aims to make these factors usable in a traceable forecasting pipeline.

The intended system includes data ingestion, quality control, time alignment, causality-aware feature engineering, horizon-specific model training, baseline comparisons, forecast metadata, uncertainty research, an API, and a dashboard/WebGIS interface.

### At a glance

| Item | Description |
|---|---|
| Problem | Air pollution–weather coupled forecasting |
| Region | Delhi–NCR |
| Primary target | PM₂.₅ concentration |
| Historical foundation | CPCB observations; V1 notes describe 2009–2024 |
| Weather context | Historical/reanalysis and forecast-time weather, depending on generation |
| Fire/aerosol context | FIRMS, GFAS, and CAMS where integrated |
| V1 model | HistGradientBoosting |
| Expanded direction | Direct horizon models, spatial-temporal graph learning, residual correction, calibrated uncertainty |
| Intended forecast | Hourly T+1 through T+72 |
| Serving concept | FastAPI + dashboard/WebGIS |
| Readiness | Research prototype; validate each release and horizon separately |

## 2. Problem statement

Monitoring stations report observed air quality, but decision support also needs estimates of what may happen next. A useful forecasting system must deal with:

- **Temporal variation:** hourly, weekly, and seasonal pollution patterns.
- **Meteorological dependence:** wind, humidity, mixing, stagnation, and boundary-layer height.
- **Regional transport:** pollution can be transported into Delhi–NCR from outside a station's immediate area.
- **Incomplete observations:** station coverage and data quality vary.
- **Different forecast difficulty:** T+1 is not equivalent to T+48 or T+72.
- **Uncertainty:** a forecast is an estimate, not a sensor reading.
- **Evaluation risk:** random splits can leak temporal information and overstate performance.

The objective is to build an auditable pipeline in which input availability, forecast horizon, model version, validation design, and known limitations are explicit.

## 3. Objectives and scope

### Objectives
- Forecast hourly PM₂.₅ at multiple lead times.
- Use meteorological inputs instead of treating pollution as a purely autoregressive series.
- Preserve forecast-time causality.
- Compare models with persistence and climatology baselines.
- Make data freshness, missingness, and quality flags visible.
- Explore spatial-neighbour and wind-aware regional context.
- Investigate physics-informed reduced-order features and calibrated uncertainty.
- Expose forecast outputs through a documented API and dashboard.

### In scope
- Delhi–NCR PM₂.₅ forecasting.
- Hourly multi-horizon prediction.
- Historical pollution/weather processing.
- Spatial context where supported by data.
- Chronological validation, baseline comparisons, and per-horizon metrics.
- Research prototypes for graph learning, residual correction, and uncertainty estimation.

### Non-goals
- Replacing CPCB monitoring or official AQI reporting.
- Claiming a complete chemistry-transport simulator.
- Claiming source attribution from predictive correlation alone.
- Claiming operational 72-hour performance just because 72 horizons are part of the design.
- Providing medical, legal, or regulatory advice.

## 4. Project generations

Keep results tied to the generation and exact experiment that produced them. These generations are related, but their datasets and metrics must not be casually combined.

### VAYU-SENTINEL V1 — empirical baseline

Recorded project notes describe:
- CPCB historical data spanning 2009–2024.
- Approximately 2.6 million rows and about 43 stations in one dataset summary.
- Chronological split: training 2009–2022, validation 2023, test 2024.
- Explicitly explored horizons: T+1, T+6, T+12, and T+24.
- HistGradientBoosting as a model family.
- FastAPI/dashboard integration direction.

See [Evaluation and reported results](#12-evaluation-and-reported-results). Reproduce these historical scores using the matching artefact before treating them as a current release benchmark.

### VAYU-SENTINEL V2 — causality-aware multi-horizon design

V2 expanded the architecture toward hourly forecasts from T+1 through T+72. The recorded design includes direct horizon-specific models named along the lines of `model_h01` through `model_h72`, weather forecasts, historical observations, spatial-neighbour features, fire/aerosol context where available, and a serving/dashboard layer.

**A 72-model design does not prove all 72 models have been trained, evaluated, calibrated, or deployed.** Maintain an explicit status for every horizon.

### VAYU-SETU — physics-informed reduced-order direction

VAYU-SETU has been used for the related physics-informed emulator direction in the same SIH problem space. Project notes describe:
- A Delhi–NCR grid of approximately 21 × 23 cells at nominal ~4 km resolution.
- A 72-hour forecast target.
- CPCB observations, GFS meteorological forcing, NASA FIRMS fire information, and CAMS aerosol-related inputs.
- Reduced-order coupling concepts involving PM₂.₅, aerosol optical depth (AOD), radiative effects, and planetary boundary-layer height (PBLH).
- Temporal/spatial graph learning, XGBoost residual correction, and conformal uncertainty calibration as research/model components.
- FastAPI and WebGIS-style delivery.

These are architecture and research notes, not proof that every coupling, data feed, model, or evaluation is fully implemented and validated. Label each component as implemented, experimental, or planned.

### Peregrine Falcon / V3 / Stoop engine direction

Later notes describe a unified multi-horizon architecture referred to as `Peregrine Falcon.V1`, with the ML engine called the **Stoop engine**. The V3/FALCON training notes include a specific snapshot:
- Python 3.14.7 in one environment.
- `falcon_features.parquet` around 764 MB.
- 1,906,261 train rows, 344,970 validation rows, and 364,395 test rows.
- 42 stations and 195 columns for that feature dataset.
- CPU-only PyTorch.
- A four-horizon baseline recorded R² around 0.923 at T+1 and 0.669 at T+12.
- The full 72-horizon training run was explicitly recorded as **not executed** at that time.

These values refer to a particular snapshot. Do not merge its row/station counts with V1's approximately 2.6M-row/43-station description as if they were the same dataset. Check the current branch and logs before stating current status.

## 5. Architecture

### Logical pipeline

```text
CPCB observations ───────────┐
Historical/reanalysis weather ├──> Ingestion + source manifests
NWP forecast fields ─────────┤
Fire / aerosol context ──────┘
                                  |
                                  v
                     Quality control + normalisation
                                  |
                                  v
                      Time alignment + causal features
                                  |
                                  v
                  Station/grid/spatial context features
                                  |
                                  v
                 Horizon-specific model training/inference
                                  |
                                  v
                Baselines + diagnostics + calibration
                                  |
                                  v
                  Forecasts + metadata + quality flags
                           +------+------+
                           |             |
                           v             v
                        FastAPI      Dashboard/WebGIS
```

| Layer | Responsibility |
|---|---|
| Ingestion | Retrieve or load observations, weather, fire, and aerosol data |
| Manifest | Record provider, retrieval time, valid time, units, coverage, and checksums where possible |
| Quality control | Detect invalid ranges, duplicates, gaps, and suspicious readings |
| Time alignment | Align data to a documented timezone and hourly issue/valid timeline |
| Feature engineering | Create lagged, rolling, weather, seasonal, and spatial features without future leakage |
| Training | Fit horizon-specific or documented multi-output model candidates |
| Evaluation | Chronological holdouts, baseline comparisons, per-horizon diagnostics |
| Calibration | Estimate uncertainty only using a documented procedure |
| Serving | Publish forecast, model version, issue time, input freshness, and warnings |
| Visualisation | Show observations separately from forecasts and label data coverage |

## 6. Data sources

Provider availability, product terms, latency, and access methods can change. Preserve source attribution and distinguish historical observations, reanalysis, operational forecasts, satellite-derived context, and modelled products.

| Source | Intended role | Important cautions |
|---|---|---|
| CPCB | Ground observations, especially PM₂.₅ and other pollutants | Station coverage, gaps, units, timestamps, station changes, and access terms |
| ERA5 or another reanalysis | Historical meteorological context | Retrospective reanalysis is not the same as a forecast available at historical issue time |
| GFS | Forecast-time meteorological forcing in the physics-informed direction | Preserve forecast cycle and lead time available at issue time |
| NASA FIRMS | Fire/hotspot detections | Fire detections are not direct PM₂.₅ emissions or concentrations |
| GFAS | Fire-emissions context where integrated | Record product, units, resolution, and availability |
| CAMS | Aerosol/atmospheric-composition context where integrated | Modelled/reanalysis product, not a ground sensor |
| Derived spatial data | Station coordinates, grid mapping, wind-relative neighbours | Document CRS, interpolation assumptions, and coverage |

Record for each dataset: provider/product ID, retrieval time, valid time, forecast initialization and lead time if applicable, timezone, units, spatial resolution, CRS, quality flags, licence/attribution, and a checksum where feasible. Store canonical timestamps consistently (preferably UTC) and convert for display at a documented boundary.

## 7. Forecast methodology

Let \(y_{s,t}\) be observed PM₂.₅ at station or grid cell \(s\) and time \(t\). For a forecast issued at time \(t\):

\[
\hat{y}_{s,t+h}=f_h(X_{s,t})
\]

where \(h\) is lead time in hours, \(X_{s,t}\) contains only inputs available at issue time, and \(f_h\) is a horizon-specific model or a documented multi-output model.

### Direct horizon models

A direct model predicts a specific horizon from issue-time features rather than recursively treating earlier model predictions as observations. Examples:
- `model_h01`: one hour ahead
- `model_h06`: six hours ahead
- `model_h12`: twelve hours ahead
- `model_h24`: one day ahead
- `model_h48`: two days ahead
- `model_h72`: three days ahead

Direct models reduce recursive error propagation, but feature and target alignment must still be tested for leakage.

A forecast record should identify:
- `issue_time`
- `valid_time`
- `horizon_hours`
- `location_id`
- `predicted_pm25` and units
- `model_version`
- `input_data_as_of`
- `quality_flags`
- `uncertainty`, only if appropriately calibrated

## 8. Feature engineering

Features must represent information available at issue time.

### Historical pollution
- Lagged PM₂.₅ values.
- Past-window rolling mean/median/standard deviation/trend.
- Recent observations from neighbouring stations.
- Missingness indicators and time since last valid observation.
- Station identity or validated station representations.

Rolling windows must be shifted so they exclude the target and future values.

### Meteorology
Where available:
- Wind speed/direction and u/v components.
- Temperature, relative humidity, precipitation, pressure.
- Boundary-layer height and stability/mixing proxies.
- Stagnation or ventilation proxies.
- Hour-of-day, weekday, season, and cyclical time encodings.

### Regional/fire context
Potential features, only where integrated and tested:
- Upwind fire detections/emissions indicators.
- Distance-weighted regional fire activity.
- Wind-aligned upstream station values.
- Regional pollutant context and spatial-neighbour summaries.
- Aerosol optical depth or other aerosol indicators.

Maintain a feature registry with `implemented`, `experimental`, or `planned` status. Documentation of a candidate feature is not proof it exists in the current code.

## 9. ML model design

### HistGradientBoosting baseline
The recorded V1 baseline used HistGradientBoosting for tabular pollution/weather features. It can learn nonlinear feature interactions and train practically on CPU, but it does not explicitly represent atmospheric transport or physical conservation.

### Horizon-specific models
The V2 design uses direct models per lead time. Every horizon needs its own target definition, sample count, split dates, feature schema, model artefact, metrics, baseline comparison, and lifecycle status (`planned`, `trained`, `evaluated`, `calibrated`, `deployed`).

### Spatial-temporal graph learning
The VAYU-SETU research direction includes ST-GNN/T-GCN-style models. Nodes can represent stations or grid cells; edges may encode distance or wind-informed relationships. Graph models must be compared against simpler baselines with equivalent data and chronological splits. Graph edges do not prove causal source attribution.

### Residual correction
An XGBoost residual head has been described as a possible correction layer:

\[
\hat{y}_{final}=\hat{y}_{base}+\hat{r}
\]

Train residual models on leakage-safe out-of-fold or validation predictions. In-sample base-model residuals can create misleading gains.

### Physics-informed reduced-order features
The VAYU-SETU direction explores proxies for PM₂.₅, AOD, radiative effects, and PBLH interactions. Such proxies are not a complete chemistry-transport simulation. Document equations, assumptions, units, source data, and ablation results. Use “physics-informed” or “physics-inspired” unless the model actually solves the relevant physical equations.

### Uncertainty
Conformal prediction/quantile intervals are part of the research direction. Document calibration period, method, target coverage, empirical coverage, interval width, and results by horizon. A q90 prediction is not automatically a calibrated 90% prediction interval.

## 10. Spatial and physics-informed research

The VAYU-SETU concept describes a 21 × 23 Delhi–NCR grid at nominal ~4 km resolution. This is a design target, not proof that every cell has independent ground truth.

Clearly distinguish:
- Direct station observations.
- Interpolated/assimilated estimates.
- Model predictions.
- Cells with inadequate input or observation coverage.

Wind-aware graphs may assign more relevance to upwind locations than equally distant downwind locations. Document the use of direction, speed, distance, and lag. Do not present such edges as proof of causal transport.

The aerosol-radiation-boundary-layer relationship varies with aerosol type, humidity, surface conditions, and time. Include reduced-order coupling features only with explicit assumptions and ablation experiments.

## 11. Forecast outputs

Potential outputs:
1. Hourly PM₂.₅ forecasts for validated horizons.
2. Observed history beside forecasts, visually distinguished.
3. Station/grid forecasts where coverage supports them.
4. Weather context and data freshness.
5. Missing-input and low-coverage warnings.
6. Baseline comparisons and model evaluation.
7. Calibrated uncertainty bands where validated.
8. Episode/hotspot alerts only when explicit tested rules exist.

PM₂.₅ concentration is not AQI. If AQI is displayed, use the applicable official CPCB calculation, correct averaging window, and pollutant sub-index rules. Never label raw concentration as AQI.

Illustrative response contract (not a claim that this endpoint exists):

```json
{
  "issue_time": "2026-01-01T00:00:00Z",
  "location_id": "example-station",
  "model_version": "model-h01-v1",
  "forecasts": [
    {
      "horizon_hours": 1,
      "valid_time": "2026-01-01T01:00:00Z",
      "predicted_pm25": null,
      "unit": "ug/m3",
      "quality_flags": ["example-only"]
    }
  ]
}
```

## 12. Evaluation and reported results

Every metric must be tied to a dataset version, target definition, horizon, split dates, baseline, and metric implementation.

### Historical V1 results recorded in project notes

| Horizon | Reported R² | Qualification |
|---|---:|---|
| T+1 | 0.923 | Historical reported result; reproduce using matching artefact |
| T+6 | 0.725 | Historical reported result; reproduce using matching artefact |
| T+12 | 0.669 | Historical reported result; reproduce using matching artefact |
| T+24 | ~0.627 | Historical reported result; verify exact run and split |

A historical note also recorded T+12 MAE around **31.4 µg/m³**. A separate earlier project snapshot reported T+1 R² 0.80, T+6 R² 0.268, and T+12 R² 0.111. These likely refer to different experiment phases or feature/data configurations and must not be combined into one leaderboard.

A V3/FALCON note later recorded a four-horizon baseline with R² around 0.923 at T+1 and 0.669 at T+12. The full 72-horizon training run was marked **not executed** in that note.

### Related VAYU-SETU comparison

A separate VAYU-SETU summary recorded PM₂.₅ RMSE **13.86 µg/m³**, compared with persistence RMSE **39.20 µg/m³**, climatology RMSE **25.40 µg/m³**, and XGBoost-direct RMSE **30.50 µg/m³**.

Do not present these as universal production benchmarks until the exact evaluation data, dates, horizon, sample filtering, station aggregation, and metric script are attached. Keep VAYU-SETU and VAYU-SENTINEL generation results separately labelled unless a reproducible unified experiment establishes comparability. The numbers above are transcribed historical notes, not independently revalidated by this README.

### Metrics and baselines
- MAE: mean absolute error, µg/m³.
- RMSE: root mean squared error, µg/m³.
- R²: coefficient of determination; can be negative.
- Bias/mean error: systematic over- or underprediction.
- Skill versus persistence.
- Skill versus time-of-day/seasonal climatology.
- Interval coverage and width for calibrated uncertainty.

Report scores by horizon, and where sample size permits, by station, season, pollution regime, and input-coverage category. Evaluate all baselines on the same target timestamps and rows.

## 13. Causality and leakage controls

A score is not trustworthy if future information leaks into features.

Required rules:
- Use chronological or rolling-origin splits.
- Fit imputation, scaling, feature selection, and calibration using training/calibration data only.
- End lagged/rolling features at issue time.
- Align targets and split boundaries carefully.
- Use only weather forecast cycles available at the issue time for operational backtests.
- Do not substitute retrospective reanalysis for operational forecasts without labelling the experiment as a reanalysis/upper-bound experiment.
- Prevent future neighbouring-station values from entering features.
- Keep test data out of model selection and calibration.
- Record timezone, daylight/time alignment, duplicate handling, and late-arriving observations.
- Add automated tests that fail if feature timestamps exceed forecast issue time.

Recommended split: older training period, later validation period, separate calibration period if needed, and a final untouched chronological test period. Rolling-origin evaluation helps assess seasonality and changing conditions.

## 14. Software stack

| Area | Technology / direction |
|---|---|
| Language | Python |
| Data processing | NumPy, pandas, PyArrow, SciPy |
| Weather/scientific formats | xarray, cfgrib where needed |
| V1 ML | scikit-learn HistGradientBoosting |
| Advanced ML research | PyTorch / PyTorch Geometric Temporal where implemented |
| Residual correction | XGBoost where implemented |
| API | FastAPI |
| Interface | Dashboard/WebGIS; exact framework depends on release |
| Storage | Parquet for larger feature datasets |
| Tests | pytest and data/model validation tests |
| Reproducibility | Versioned configs, manifests, artefact metadata, evaluation reports |

This list describes technologies across project generations. It does not imply that every item is a dependency of the current branch. The checked-out repository's manifests and lockfiles are authoritative.

## 15. Suggested repository structure

Adapt this outline to the real repository; do not restructure working code just to match an example.

```text
VAYU-SENTINEL/
├── README.md
├── pyproject.toml / requirements.txt
├── configs/
│   ├── data_sources.yaml
│   ├── features.yaml
│   ├── horizons.yaml
│   └── training.yaml
├── data/
│   └── manifests/
├── docs/
│   ├── architecture.md
│   ├── data_dictionary.md
│   ├── evaluation_protocol.md
│   ├── model_registry.md
│   └── limitations.md
├── src/vayu_sentinel/
│   ├── ingestion/
│   ├── quality/
│   ├── alignment/
│   ├── features/
│   ├── models/
│   ├── evaluation/
│   ├── uncertainty/
│   └── serving/
├── scripts/
│   ├── build_dataset.py
│   ├── train.py
│   ├── evaluate.py
│   └── predict.py
├── tests/
└── reports/evaluation/
```

## 16. Local setup

The project has multiple generations and training environments. Use the Python version and install instructions defined by the checked-out branch; do not assume every generation has the same dependencies.

```bash
git clone https://github.com/shriramdawange/SIH26082.git
cd SIH26082
python -m venv .venv
```

Activate the environment:

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

```bash
# Linux/macOS
source .venv/bin/activate
```

Install dependencies using the repository's actual manifest. For example, only if `requirements.txt` exists:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Inspect `pyproject.toml`, lockfiles, scripts, and docs before running training. Some branches may use a different dependency manager or entry point.

### Data and secrets
- Never commit API keys, passwords, or private credentials.
- Respect provider terms, rate limits, and attribution.
- Cache source data with retrieval timestamps and manifests.
- Keep large raw datasets and artefacts out of Git unless repository policy permits them.
- Record provider failures honestly; do not fabricate a successful ingestion.

## 17. Training workflow

1. Audit providers, schemas, licences, timestamps, and units.
2. Ingest data and create source manifests.
3. Validate duplicates, invalid values, missingness, and time alignment.
4. Align inputs to issue times and valid times.
5. Build lagged, weather, seasonal, and spatial features.
6. Create targets for each forecast horizon.
7. Split chronologically into train, validation, calibration (optional), and test.
8. Train persistence/climatology and simple ML baselines.
9. Train candidate models and record configuration, seed, and dependency versions.
10. Evaluate each horizon on a documented holdout.
11. Run automated leakage checks.
12. Calibrate uncertainty only after the model is fixed.
13. Publish metrics, sample counts, split dates, and limitations.
14. Package exact model artefacts and schema.
15. Smoke-test the API, including stale/missing data and unsupported horizons.

Training completion, evaluation, calibration, packaging, and deployment are separate lifecycle states.

## 18. API and dashboard

These are suggested endpoint shapes, not a claim that each route exists in the current branch.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Process health |
| `GET` | `/api/v1/metadata` | Model versions, supported horizons, locations, data status |
| `GET` | `/api/v1/observations` | Available historical observations |
| `GET` | `/api/v1/forecast` | Forecast for location/horizon |
| `GET` | `/api/v1/forecast/{location_id}` | Forecast series |
| `GET` | `/api/v1/quality` | Freshness, coverage, quality flags |
| `GET` | `/api/v1/evaluation` | Published evaluation summary if available |

Document units, timezone, supported horizons, error responses, and the difference between observations and predictions. The dashboard may include an observation/forecast chart, horizon selector, station/grid map, weather context, model metrics, input freshness, uncertainty, and model version. Never render unsupported cells as if they were reliable observations.

## 19. Testing and release gates

### Data tests
- Timestamp parsing and timezone consistency.
- Duplicate station/time handling.
- Unit conversion and plausible ranges.
- Missingness and stale-input behaviour.
- NWP forecast-cycle/valid-time alignment.
- Coordinates and station/grid mapping.

### ML tests
- Target/horizon alignment.
- No future values in lagged/rolling features.
- Chronological split integrity.
- Correct baseline and metric calculations.
- Reproducible inference shape and units.
- Artefact/schema compatibility.
- Missing/out-of-range feature handling.
- Interval coverage if uncertainty is enabled.

### API tests
- Valid and invalid requests.
- Unknown station/location.
- Unsupported horizon.
- Missing artefact and stale inputs.
- Clear errors and safe logging.
- No credentials in responses.

A horizon is **validated** only when its test metrics, baseline comparison, sample count, evaluation period, and leakage checks are recorded. Production release additionally requires packaging, deployment smoke tests, data freshness monitoring, and an operational owner.

## 20. Limitations and status

1. **72-hour readiness is not implied by architecture.** The full V3/FALCON 72-horizon training run was marked not executed in historical notes; check current artefacts.
2. **Historical scores are experiment-specific.** Different snapshots have different metrics; do not combine them without matching data, features, and splits.
3. **Freshness is not guaranteed.** A cached dataset or local run does not prove continuous ingestion.
4. **Station coverage is uneven.** Performance may vary by location, season, and pollution episode.
5. **Reanalysis and forecast inputs differ.** Operational backtests must use data available at issue time.
6. **Fire detections are contextual evidence**, not direct PM₂.₅ measurements.
7. **Reduced-order physics is an approximation**, not a full chemistry-transport model.
8. **Maps can overstate certainty.** Distinguish observation, interpolation, and prediction.
9. **Uncertainty requires calibration.** Do not show confidence bands before empirical coverage testing.
10. **Forecasts are not official advisories.** Operational warnings require validation, monitoring, and review.

Maintain this status table for each release:

| Component | Evidence required | Status to verify |
|---|---|---|
| Data pipeline | Manifest, schema, QC report | Current branch |
| V1 baseline | Reproducible evaluation report | Historical results recorded |
| T+1 model | Artefact + holdout report | Current branch |
| T+2 through T+72 | Per-horizon artefacts/reports | Do not assume complete |
| Weather inputs | Forecast-cycle audit | Current branch |
| Spatial/graph model | Ablations and holdout results | Verify implementation |
| Uncertainty | Calibration/coverage report | Verify implementation |
| API | Contract tests and smoke test | Current branch |
| Live refresh | Monitoring and freshness evidence | Current deployment |
| Production readiness | Release checklist and owner | Not established by this README |

## 21. Roadmap

### Phase 1 — reproducible baseline
- Freeze a dataset manifest.
- Reproduce V1 metrics from matching code/data.
- Verify persistence and climatology baselines.
- Publish per-horizon scores and sample counts.

### Phase 2 — multi-horizon integrity
- Audit feature/target alignment for every horizon.
- Train missing horizon jobs.
- Create a model registry with checksums.
- Automate future-leakage tests.

### Phase 3 — weather and regional context
- Audit forecast-time weather availability.
- Validate fire/aerosol inputs where useful.
- Compare wind-aware features with simpler alternatives.
- Run source/feature ablations.

### Phase 4 — physics-informed research
- Document coupling equations and assumptions.
- Compare reduced-order proxies against data-only baselines.
- Evaluate graph transport representations.
- Use leakage-safe predictions for residual correction.

### Phase 5 — calibrated forecasts and serving
- Evaluate interval calibration by horizon.
- Standardise API metadata and quality flags.
- Add API/dashboard tests and freshness monitoring.
- Define clear stale-data behaviour.

### Phase 6 — deployment readiness
- Define release gates for supported horizons.
- Add deployment smoke tests and rollback instructions.
- Assign operational ownership.
- Publish only capabilities demonstrated by the release.

## 22. Responsible use

VAYU-SENTINEL is a research and decision-support project, not a guaranteed forecast or substitute for official measurements/advisories.

- Refer to official CPCB/CAQM sources for current observations and public guidance.
- Clearly label forecasts, estimates, and derived values.
- Do not claim to identify responsible polluters without a validated attribution method and evidence.
- Communicate missing coverage, stale inputs, and uncertainty.
- Do not use the system as the sole basis for medical, legal, regulatory, or emergency decisions.
- Follow data-provider terms and protect credentials.

## 23. Glossary

| Term | Meaning |
|---|---|
| PM₂.₅ | Fine particulate matter with aerodynamic diameter about 2.5 μm or less |
| AQI | Derived Air Quality Index, not a raw concentration |
| CPCB | Central Pollution Control Board, India |
| NWP | Numerical Weather Prediction |
| GFS | Global Forecast System |
| ERA5 | ECMWF reanalysis dataset |
| CAMS | Copernicus Atmosphere Monitoring Service |
| FIRMS | Fire Information for Resource Management System |
| GFAS | Global Fire Assimilation System |
| AOD | Aerosol Optical Depth |
| PBLH/BLH | Planetary/Atmospheric Boundary-Layer Height |
| T+1 | Forecast one hour after issue time |
| Leakage | Use of information unavailable at forecast issue time |
| HistGradientBoosting | Histogram-based gradient-boosted decision-tree model |
| ST-GNN | Spatial-temporal graph neural network |
| T-GCN | Temporal graph convolutional network |
| XGBoost | Gradient-boosted decision-tree framework |
| Conformal prediction | Framework for prediction intervals/sets under stated assumptions |
| RMSE / MAE | Root Mean Squared Error / Mean Absolute Error |
| R² | Coefficient of determination; may be negative |

## 24. References

Consult current provider documentation and product-specific terms before using or redistributing data.

- **CPCB:** https://cpcb.nic.in/
- **CPCB air-quality portal / SAMEER:** https://airquality.cpcb.gov.in/
- **NOAA Global Forecast System:** https://www.ncei.noaa.gov/products/weather-climate-models/global-forecast
- **ECMWF ERA5:** https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5
- **NASA FIRMS:** https://firms.modaps.eosdis.nasa.gov/
- **Copernicus Atmosphere Monitoring Service:** https://atmosphere.copernicus.eu/
- **Global Fire Assimilation System:** https://www.globalfiredata.org/

Provider access, latency, resolution, licences, and attribution can change. The data manifest and actual ingestion configuration are authoritative for each release.

---

**VAYU-SENTINEL**  
*Air Pollution–Weather Coupled Forecasting System — Delhi NCR Focus*  
**Research. Forecast. Validate. Communicate uncertainty.**

Developed in the Clean & Green Technology problem space associated with SIH26082.

**Documentation maintenance:** Before each release, update the branch/commit, dependency versions, dataset manifests, actual trained horizons, reproducible evaluation reports, provider freshness, API routes, deployment URL (if applicable), and outstanding limitations. Never replace an unverified status with a success claim just to make the documentation look complete.
