# Gateway Adventure API Documentation

This document provides basic usage information for the Gateway Adventure public API endpoints.

## Base URL

`https://gatewaytreks.com/api/v1`

---

## 1. Blogs API

### URL

`https://gatewaytreks.com/api/v1/blogs`

### Method

`GET`

### Values

Returns the available blog data from Gateway Adventure.

Typical response values may include blog-related fields such as:

- Blog ID
- Title
- Slug
- Description or content
- Featured image
- Publication information
- Other blog metadata available in the API response

### How to Use

Send a `GET` request to the endpoint:

```bash
curl -X GET "https://gatewaytreks.com/api/v1/blogs" \
  -H "Accept: application/json"
```

JavaScript example:

```javascript
fetch("https://gatewaytreks.com/api/v1/blogs")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

---

## 2. FAQs API

### URL

`https://gatewaytreks.com/api/v1/faqs`

### Method

`GET`

### Values

Returns the available Frequently Asked Questions (FAQ) data.

Typical response values may include:

- FAQ ID
- Question
- Answer
- Category or related information
- Other FAQ metadata available in the API response

### How to Use

Send a `GET` request to the endpoint:

```bash
curl -X GET "https://gatewaytreks.com/api/v1/faqs" \
  -H "Accept: application/json"
```

JavaScript example:

```javascript
fetch("https://gatewaytreks.com/api/v1/faqs")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

---

## 3. Homepage Sliders API

### URL

`https://gatewaytreks.com/api/v1/homepage-sliders`

### Method

`GET`

### Values

Returns slider/banner data used on the Gateway Adventure homepage.

Typical response values may include:

- Slider ID
- Title
- Subtitle or description
- Image
- Link or call-to-action URL
- Display/order information
- Other slider metadata available in the API response

### How to Use

Send a `GET` request to the endpoint:

```bash
curl -X GET "https://gatewaytreks.com/api/v1/homepage-sliders" \
  -H "Accept: application/json"
```

JavaScript example:

```javascript
fetch("https://gatewaytreks.com/api/v1/homepage-sliders")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

---

## 4. Popular Packages API

### URL

`https://gatewaytreks.com/api/v1/popular-packages`

### Method

`GET`

### Values

Returns trekking, tour, or adventure packages marked as popular.

Typical response values may include:

- Package ID
- Package name/title
- Slug
- Description
- Featured image
- Duration
- Price
- Destination
- Package URL
- Other package metadata available in the API response

### How to Use

Send a `GET` request to the endpoint:

```bash
curl -X GET "https://gatewaytreks.com/api/v1/popular-packages" \
  -H "Accept: application/json"
```

JavaScript example:

```javascript
fetch("https://gatewaytreks.com/api/v1/popular-packages")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

---

## API Summary

| API | URL | Method | Purpose |
| --- | --- | --- | --- |
| Blogs | `https://gatewaytreks.com/api/v1/blogs` | `GET` | Retrieve blog data |
| FAQs | `https://gatewaytreks.com/api/v1/faqs` | `GET` | Retrieve FAQ data |
| Homepage Sliders | `https://gatewaytreks.com/api/v1/homepage-sliders` | `GET` | Retrieve homepage slider data |
| Popular Packages | `https://gatewaytreks.com/api/v1/popular-packages` | `GET` | Retrieve popular package data |

## General Usage

All listed endpoints can be requested using HTTP `GET`.

Recommended request header:

```http
Accept: application/json
```

A typical application flow is:

1. Send a `GET` request to the required API URL.
2. Receive the API response.
3. Parse the returned JSON data.
4. Use the returned values in the website, mobile application, or other frontend system.
5. Handle request errors and empty responses appropriately.

> **Note:** The exact field names and response structure should be determined from the live JSON returned by each endpoint. The values described above are general descriptions and should not be treated as an exact response schema unless verified against the live API.

---

# 5. All Packages API

## URL

`https://gatewaytreks.com/api/v1/allpackages`

## Method

`GET`

## Purpose

Returns a complete package listing dataset together with package filters, pagination, destinations, activities, regions, grades, duration options, sorting options, pricing range, breadcrumb information, and SEO metadata.

This endpoint is suitable for building a complete package listing or package search page on a website, mobile application, or frontend framework.

## Basic Request

```http
GET https://gatewaytreks.com/api/v1/allpackages
```

### cURL

```bash
curl -X GET "https://gatewaytreks.com/api/v1/allpackages" \
  -H "Accept: application/json"
```

### JavaScript

```javascript
fetch("https://gatewaytreks.com/api/v1/allpackages")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

### Axios

```javascript
axios.get("https://gatewaytreks.com/api/v1/allpackages")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Controller Behavior

The Laravel controller collects URL query parameters using:

```php
$queries = $request->query();
```

The controller also applies:

```php
$options = [
    'limit' => 15,
    'order' => 'packages.created_at DESC'
];
```

Therefore the default behavior is:

- 15 packages per page
- newest packages first
- Laravel pagination
- dynamic filters based on available packages

## Query Parameters

| Parameter | Type | Example | Purpose |
| --- | --- | --- | --- |
| `page` | Integer | `2` | Select pagination page |
| `duration` | String | `1 - 7` | Filter packages by duration |
| `lang` | String | `en` | Language selection where supported |
| `sort` | String | `price-lowest` | Sort package results |
| `destination` | Integer/String | `1`, `nepal` | Filter by destination |
| `activity` | Integer/String | `1`, `trekking` | Filter by activity |
| `region` | Integer/String | `1`, `everest-region` | Filter by region |
| `grade` | Integer/String | `2`, `moderate` | Filter by difficulty |
| `min_price` | Number | `500` | Minimum package price |
| `max_price` | Number | `2500` | Maximum package price |

> **Important:** `page`, `duration`, language handling, pagination behavior, and the sorting options are visible in the supplied controller. The exact accepted query parameter names for destination, activity, region, grade, pricing, and sorting depend on the implementation of `getActivePackages()` in the Package Repository. Verify the repository before treating inferred parameter names as a fixed API contract.

## Pagination

Packages are retrieved using:

```php
$packages = $this->packageRepo->getActivePackages(
    $options + array('paginate'=>true),
    $queries
);
```

Default page size:

`15 packages per page`

Examples:

```text
https://gatewaytreks.com/api/v1/allpackages?page=1
```

```text
https://gatewaytreks.com/api/v1/allpackages?page=2
```

Typical Laravel pagination response:

```json
{
  "total": 61,
  "per_page": 15,
  "current_page": 1,
  "last_page": 5,
  "next_page_url": "https://gatewaytreks.com/api/v1/allpackages?page=2",
  "prev_page_url": null,
  "from": 1,
  "to": 15,
  "data": []
}
```

Package records should be read from:

```javascript
response.packages.data
```

## Duration Filter

The controller defines these duration values:

| Value | Display | Meaning |
| --- | --- | --- |
| `1 - 7` | 1 - 7 Days | Trips from 1 to 7 days |
| `8 - 14` | 8 - 14 Days | Trips from 8 to 14 days |
| `15 - 21` | 15 - 21 Days | Trips from 15 to 21 days |
| `above` | 21+ Days | Trips longer than 21 days |

Examples:

```text
https://gatewaytreks.com/api/v1/allpackages?duration=1%20-%207
```

```text
https://gatewaytreks.com/api/v1/allpackages?duration=8%20-%2014
```

```text
https://gatewaytreks.com/api/v1/allpackages?duration=15%20-%2021
```

```text
https://gatewaytreks.com/api/v1/allpackages?duration=above
```

The controller dynamically removes duration options that have no matching packages, so frontend applications can build the duration selector directly from the API response.

## Sorting Options

The controller defines:

```php
$sortOptions = [
    'newest'        => trans('messages.newest first'),
    'oldest'        => trans('messages.oldest first'),
    'price-highest' => trans('messages.highest price'),
    'price-lowest'  => trans('messages.lowest price')
];
```

Supported values:

| Value | Meaning |
| --- | --- |
| `newest` | Newest packages first |
| `oldest` | Oldest packages first |
| `price-highest` | Highest price first |
| `price-lowest` | Lowest price first |

Possible usage:

```text
https://gatewaytreks.com/api/v1/allpackages?sort=newest
```

```text
https://gatewaytreks.com/api/v1/allpackages?sort=price-lowest
```

The controller default order is:

```sql
packages.created_at DESC
```

## Destinations

Destinations are loaded with `active=true` and `hasPackages=true`, ordered alphabetically by localized title.

Typical destination object:

```json
{
  "id": 1,
  "name": "Nepal",
  "title": "Nepal",
  "slug": "nepal",
  "is_active": 1
}
```

Possible filtering pattern:

```text
?destination=1
```

or:

```text
?destination=nepal
```

The exact accepted value depends on the repository implementation.

## Activities

Activities are loaded with `active=true` and `hasPackages=true`.

Typical activity object:

```json
{
  "id": 1,
  "name": "Trekking",
  "title": "Trekking",
  "slug": "trekking",
  "is_active": 1
}
```

Possible usage:

```text
?activity=1
```

or:

```text
?activity=trekking
```

## Regions

Regions are loaded with `active=true` and `hasPackages=true`.

Typical region object:

```json
{
  "id": 1,
  "name": "Everest Region",
  "destination_id": 1,
  "title": "Everest Region",
  "slug": "everest-region",
  "is_active": 1
}
```

Possible usage:

```text
?region=1
```

or:

```text
?region=everest-region
```

## Grade / Difficulty Filter

Grades are ordered by `difficulty_level ASC` and limited to grades having packages.

Typical values:

| Difficulty Level | Grade |
| ---: | --- |
| 1 | Easy |
| 2 | Moderate |
| 3 | Strenuous |
| 4 | Hard |

Typical grade object:

```json
{
  "id": 2,
  "name": "Moderate",
  "title": "Moderate",
  "slug": "moderate",
  "difficulty_level": 2,
  "is_active": 1
}
```

Possible usage:

```text
?grade=2
```

## Pricing

The controller returns:

```php
$pricing = $this->packageRepo->getPriceRange();
```

Typical structure:

```json
{
  "minrange": 0,
  "maxrange": 35500
}
```

Possible filtering pattern:

```text
?min_price=500&max_price=2500
```

> The exact price filter parameter names should be verified inside `getActivePackages()`.

## Language Handling

The controller contains:

```php
if($this->lang_code !='en'){
    $queries['lang'] = $this->lang;
}
```

This indicates multilingual package retrieval is supported.

Possible request:

```text
https://gatewaytreks.com/api/v1/allpackages?lang=en
```

Language may also be controlled by routes, middleware, locale configuration, or other application logic.

## Combining Multiple Filters

Example:

```text
https://gatewaytreks.com/api/v1/allpackages?destination=1&activity=1&duration=8%20-%2014&grade=2&sort=price-lowest&page=1
```

JavaScript example:

```javascript
const params = new URLSearchParams({
  destination: 1,
  activity: 1,
  duration: "8 - 14",
  grade: 2,
  sort: "price-lowest",
  page: 1
});

fetch(`https://gatewaytreks.com/api/v1/allpackages?${params.toString()}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## Response Structure

The controller returns:

```php
return response()->json([
    'destinations'     => $destinations,
    'activities'       => $activities,
    'packages'         => $packages,
    'queries'          => $queries,
    'pkgCount'         => $pkgCount,
    'durations'        => $durations,
    'grades'           => $grades,
    'sortOptions'      => $sortOptions,
    'pricing'          => $pricing,
    'regions'          => $regions,
    'breadcrumbs'      => $breadcrumbs,
    'meta_title'       => $meta_title,
    'meta_description' => $meta_description,
    'meta_keywords'    => $meta_keywords,
], 200);
```

Typical top-level JSON structure:

```json
{
  "destinations": [],
  "activities": [],
  "packages": {},
  "queries": {},
  "pkgCount": 61,
  "durations": {},
  "grades": [],
  "sortOptions": {},
  "pricing": {},
  "regions": [],
  "breadcrumbs": {},
  "meta_title": "",
  "meta_description": "",
  "meta_keywords": ""
}
```

## Response Values

| Response Key | Type | Description |
| --- | --- | --- |
| `destinations` | Array | Active destinations associated with packages |
| `activities` | Array | Active activities associated with packages |
| `packages` | Object | Paginated package result |
| `queries` | Object | Currently applied query parameters |
| `pkgCount` | Integer | Number of matching packages |
| `durations` | Object | Available duration filters |
| `grades` | Array | Available difficulty levels |
| `sortOptions` | Object | Available sorting options |
| `pricing` | Object | Minimum and maximum package prices |
| `regions` | Array | Active regions associated with packages |
| `breadcrumbs` | Object | Breadcrumb information |
| `meta_title` | String | SEO meta title |
| `meta_description` | String | SEO meta description |
| `meta_keywords` | String | SEO meta keywords |

## Package Object Values

A package inside `response.packages.data` may contain:

| Field | Description |
| --- | --- |
| `id` | Package ID |
| `fixed_departure` | Fixed departure setting |
| `activity_id` | Related activity ID |
| `destination_id` | Related destination ID |
| `region_id` | Related region ID |
| `trip_code` | Package trip code |
| `name` | Package name |
| `title` | Package title |
| `slug` | Package URL slug |
| `duration` | Package duration |
| `rating` | Package rating |
| `price` | Package price |
| `grade_id` | Difficulty grade ID |
| `image` | Package image |
| `social_image` | Social sharing image |
| `featured_video_url` | Featured video URL |
| `map_image` | Map image |
| `group_size` | Group size |
| `short_description` | Short package description |
| `description` | Full package description |
| `has_discount` | Whether discount is enabled |
| `discount_amt` | Discount amount |
| `discount_type` | Discount type |
| `discount_msg` | Discount message |
| `meta_title` | Package SEO title |
| `meta_keywords` | Package SEO keywords |
| `meta_description` | Package SEO description |
| `canonical_url` | Canonical URL |
| `show_altitude` | Altitude display setting |
| `has_time` | Time display setting |
| `created_at` | Creation timestamp |
| `updated_at` | Last update timestamp |
| `map_code` | Map or embed code |
| `meals` | Meal information |
| `transportation` | Transportation information |
| `accommodation` | Accommodation information |
| `trip_routes` | Trip route summary |
| `complimentary` | Complimentary services |
| `best_season` | Recommended season |
| `max_altitude` | Maximum altitude |
| `walk_in_hours` | Walking duration or hours |
| `destslug` | Destination slug |
| `destname` | Destination name |
| `actname` | Activity name |
| `actslug` | Activity slug |

## Recommended Frontend Integration

```javascript
async function getPackages(filters = {}) {
  const params = new URLSearchParams(filters);

  const response = await fetch(
    `https://gatewaytreks.com/api/v1/allpackages?${params.toString()}`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load packages");
  }

  return await response.json();
}
```

Usage:

```javascript
const data = await getPackages({ page: 1 });

const packages = data.packages.data;
const destinations = data.destinations;
const activities = data.activities;
const regions = data.regions;
const grades = data.grades;
const durations = data.durations;
const sorting = data.sortOptions;
const pricing = data.pricing;
```

## Recommended Standard API Contract

For a predictable public API, the recommended parameter structure is:

| Parameter | Type | Example / Allowed Values | Required |
| --- | --- | --- | --- |
| `page` | Integer | `1`, `2`, `3` | No |
| `destination` | Integer/String | Destination ID or slug | No |
| `activity` | Integer/String | Activity ID or slug | No |
| `region` | Integer/String | Region ID or slug | No |
| `grade` | Integer/String | Grade ID or slug | No |
| `duration` | String | `1 - 7`, `8 - 14`, `15 - 21`, `above` | No |
| `min_price` | Number | `500` | No |
| `max_price` | Number | `2500` | No |
| `sort` | String | `newest`, `oldest`, `price-highest`, `price-lowest` | No |
| `lang` | String | `en`, supported language code | No |

Example standardized request:

```text
https://gatewaytreks.com/api/v1/allpackages?destination=1&activity=1&region=1&grade=2&duration=8%20-%2014&min_price=500&max_price=2500&sort=price-lowest&page=1
```

## Implementation Note

The supplied controller confirms how the response is assembled, but some exact filtering rules are implemented inside:

```php
$this->packageRepo->getActivePackages()
```

To document every query parameter with complete certainty, inspect the `getActivePackages()` repository function and confirm:

- destination parameter name
- activity parameter name
- region parameter name
- grade parameter name
- price range parameter names
- sorting query name
- search keyword support
- slug versus ID filtering
- any additional filters

Until then, parameters not directly visible in the controller should be treated as implementation-dependent.