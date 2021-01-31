const express = require('express');
const pg = require('pg')
const app = express()
const helpers = require('../helpers/dataHandling')
const pool = new pg.Pool(
  {
    user: 'readonly',
    host: 'work-samples-db.cx4wctygygyq.us-east-1.rds.amazonaws.com',
    database: 'work_samples',
    password: 'w2UIO@#bg532!',
    port: 5432,
  }
)

const queryHandler = (req, res, next) => {
  console.log(req.originalUrl)
  pool.query(req.sqlQuery).then((r) => {
    if (!req.originalUrl.includes('poi')) {
      for (var item of r.rows) {
        item.date = helpers.timeConverter(item.date)
      }
    }
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/events/hourly', (req, res, next) => {
  console.log(req.query.id)
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  console.log(Boolean(req.query.poi))
  if (req.query.poi && req.query.poi === 'true') {
    req.sqlQuery = `
    SELECT date, hour, events, public.poi.poi_id
    FROM (public.hourly_events
    INNER JOIN public.poi ON public.hourly_events.poi_id=public.poi.poi_id)
    ORDER BY hourly_events.date, hourly_events,hour
    LIMIT 168;
  `
  }
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  if (req.query.poi && req.query.poi === 'true') {
    req.sqlQuery = `
    SELECT date, SUM(events) AS events, public.poi.poi_id
    FROM (public.hourly_events
    INNER JOIN public.poi ON public.hourly_events.poi_id=public.poi.poi_id)
    GROUP BY poi.poi_id,hourly_events.date
    ORDER BY poi.poi_id,hourly_events.date
    LIMIT 7;
  `
  }
  return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  if (req.query.poi && req.query.poi === 'true') {
    req.sqlQuery = `
    SELECT public.hourly_stats.date, public.hourly_stats.hour, public.hourly_stats.impressions, public.hourly_stats.clicks, public.hourly_stats.revenue
    FROM (public.hourly_stats
    INNER JOIN public.poi ON public.hourly_stats.poi_id=public.poi.poi_id)
    GROUP BY poi.poi_id, hourly_stats.date,hourly_stats.hour
    ORDER BY poi.poi_id, hourly_stats.date,hourly_stats.hour
    LIMIT 168;
  `
  }
  return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  if (req.query.poi && req.query.poi === 'true') {
    req.sqlQuery = `
    SELECT public.hourly_stats.date,
        SUM(public.hourly_stats.impressions) AS impressions,
        SUM(public.hourly_stats.clicks) AS clicks,
        SUM(public.hourly_stats.revenue) AS revenue,
        public.poi.poi_id
    FROM (public.hourly_stats
    INNER JOIN public.poi ON public.hourly_stats.poi_id=public.poi.poi_id)
    GROUP BY poi.poi_id, hourly_stats.date
    ORDER BY poi.poi_id, public.hourly_stats.date
    LIMIT 168;
  `
  }
  return next()
}, queryHandler)

app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

module.exports = app