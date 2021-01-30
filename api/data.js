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
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
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
  return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
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
  return next()
}, queryHandler)
app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)
app.get('/poi_list', (req, res, next) => {
  req.sqlQuery = `
    SELECT name, poi_id
    FROM public.poi;
  `
  return next()
}, queryHandler)
app.get('/events/hourlypoi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/dailypoi', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    WHERE public.hourly_events.poi_id = ${req.query.id}
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)


module.exports = app