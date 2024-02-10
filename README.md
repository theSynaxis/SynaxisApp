# Synaxis App

A full stack app for Orthodox Christians.

## The App

The Synaxis App, at this time, is a simple quote app built in React.js.

## API

Our API is consumed internally using tRPC, but is also externally exposed as a REST API for other future projects and other developers.

## Tech Stack

The Synaxis App is a React.js app built using the T3 stack, NextWP, and WordPress.
Our project is divided into three parts: The App, the API, and the site.
The App and the API are built with the T3 stack.
The website is made with NextWP and WordPress.

The UI was designed using Figma.

### T3 Stack

The [T3 Stack](https://create.t3.gg/) is an opinionated template for building a full stack, type safe web application.

Our stack includes:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Drizzle](https://orm.drizzle.team)

The T3 stack comes pre-configured for Typescript. This is the opinionated part of the stack.

For our API, we are using https://github.com/jlalmes/trpc-openapi/tree/master for externally exposing a REST API along with our internally consumed tRCP API.

We are using a Postgres Database.

### NextWP and WordPress

Our project includes a headless WordPress website.
The CMS is hosted on a subdomain. This gives us an easy and familiar interface to manage the content of the marketing website.
This content is accessed via the WordPress REST API using NextWP.

[NextWP](https://nextwp.org) is a library built on the WP REST API and Next.js App Router that streamlines the process of building super fast Headless WordPress sites with Next.js.

## Style Guide

Our comprehensive style guide can be found here: [Style Guide](/docs/style-guide/).

### Deployment

Our app is deployed on Vercel.
