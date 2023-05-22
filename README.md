# e-comm-team-techsmith-fn

## Maintainability

[![Maintainability](https://api.codeclimate.com/v1/badges/5758ec3353e0560c2e43/maintainability)](https://codeclimate.com/github/atlp-rwanda/e-comm-team-techsmith-fn/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5758ec3353e0560c2e43/test_coverage)](https://codeclimate.com/github/atlp-rwanda/e-comm-team-techsmith-fn/test_coverage)

"Shop with ease and confidence - Your ultimate online shopping destination!"

# Description

This Techsmiths' project is dealing with the frontend of an ecommerce project which has three types of users; a buyer, a seller and an admin. The app has a login functionality, products,a cart for buyer,notifications,a public chat, orders, sales; it has a dashboard according to what role the user has.
An admin can manage all users ; changing roles and making a user as active or inactive. A seller should see all products that belong to him/her and can make a product as either available or not available A buyer should be able to see all available products on the homepage add items to their cart, wish for a product, and track his/her orders.


## Setup

### Dependencies

Make sure the node version you are running is `v-18` and above.

Make sure you have the following dependencies installed:

"react": "^18.2.0",
"react-dom": "^18.2.0",
"sass": "^1.62.1"

### Getting Started

Follow these steps to set up the Techsmith Frontend codebase locally:

1. Clone the repository:

git clone `https://github.com/atlp-rwanda/e-comm-team-techsmith-fn.git`

2. Go to folder and install dependencies:
`cd e-comm-team-techsmith-fn`

3. Install dependencies:
`npm install`

### Run The Service

To run the Techsmith Frontend service locally, follow these steps:

1. Start the development server:
`npm run dev`

2. Open your browser and visit `http://localhost:5173/` to see the application running.

## Linking GitHub With PivotalTracker 

The repository have been linked with the project's pivot tracker for:

Monitoring task completion
Status of the task accepted by pivotal tracker are in a :unstarted , started, finished, delivered, rejected, accepted.
Commit message should start with the status of the task i.e:
- git commit -m "[ delivers #storyId ] add more content"
- git commit -m "[ finishes #storyId ] add more content"

The status is automatically updated on the pivotalTracker 
The PR being merged, closed or not merged is marked on the pivotalTracker.


## Testing

To ensure that the code is set up correctly, follow these steps to run the tests:

1. Run the test suite:

`npm test`

2. Verify that all tests pass successfully.
3. Unit testing on this app is setup using the following dependencies
  "jest": "^29.5.0",


## Deployment

To update the Techsmith Frontend codebase, follow these steps:

1. Push your changes to the `develop` branch of the repository.
2. The deployment process will be triggered automatically, updating the deployed application.
3. You can find the deployed application by visiting `https://e-comm-team-techsmith-fn.vercel.app/`

For any inquiries or feedback, please reach out to our team at `https://atlp-workspace.slack.com/archives/C04K7P2AA5D`.

