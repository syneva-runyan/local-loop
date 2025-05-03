# Getting Started with Local Loop

This app contains code for both the marketing website and the functional app prototype for Local Loop.

## New Location Onboarding

To onboard a new tour location, you'll need a place id from Google Places - https://developers.google.com/maps/documentation/places/web-service/place-id
The place id allows you to fetch photos from google maps. Having the ID on hand means we save an API call required to get it.

You'll also need to add an entry to the funFacts.js file so the facts can be shown during the long itinerary creation loading state.
