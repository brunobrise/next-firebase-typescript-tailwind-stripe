# Next + Firebase + Typescript + Tailwind + Stripe starter

Re-usable example project with the following technology stack.

- Next.js
- Firebase
- Typescript
- Tailwind
- Stripe

This was made using the [fantastic video](https://www.youtube.com/watch?v=P0Udy2Gi7n8) + [write-up](https://blog.jarrodwatts.com/set-up-subscription-payments-with-stripe-using-firebase-and-nextjs) by [Jarrod Watts](https://blog.jarrodwatts.com/).

This example includes **ONE** subscription option (premium).

## Prep Work

- Register for Firebase incl.
  - Create a project and a web app (to collect your credentials)
  - Upgrade to Blaze plan and **set up a billing alert**
  - Install the `Run Subscription Payments with Stripe` extension
    - During setup configuration, rename `Customer details and subscriptions collection` from `customers` -> `users`
- Register for Stripe
  - Ensure you've entered a business name for your new Stripe account
  - Create a new Restricted Key (Dashboard > Developers > API Keys > + Create restricted key)
    - Write access
      - Checkout sessions
      - Customers
      - Customer portal
    - Read access
      - Subscriptions
      - Plans

## Usage

1. Rename `.env.local.example` to `.env.local` and populate with your app credentials and Stripe keys
2. Set up your preferred authentication providers within Firebase, and make corresponding buttons (refer to `/components/Login.tsx`)
3. Set your Firestore Database rules as follows:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;

      match /checkout_sessions/{id} {
        allow read, write: if request.auth.uid == uid;
      }
      match /subscriptions/{id} {
        allow read: if request.auth.uid == uid;
      }
    }

    match /products/{id} {
      allow read: if true;

      match /prices/{id} {
        allow read: if true;
      }

      match /tax_rates/{id} {
        allow read: if true;
      }
    }
  }
}
```

4. Set up a Stripe webhook
1. Retrieve the URL of your extension’s function (within Firebase, navigate to Extensions, click Manage on `Run Subscription Payments with Stripe` and then "How this extension works". It's roughly halfway down the page.)
1. Go back to the Stripe website. Stripe Dashboard > Developers > Webhooks > + Add endpoint
   - Endpoint URL is from above step
   - Events to send:
     - product.created
     - product.updated
     - product.deleted
     - price.created
     - price.updated
     - price.deleted
     - checkout.session.completed
     - customer.subscription.created
     - customer.subscription.updated
     - customer.subscription.deleted
     - tax_rate.created
     - tax_rate.updated
     - invoice.paid
     - invoice.payment_succeeded
     - invoice.payment_failed
     - invoice.upcoming
     - invoice.marked_uncollectible
     - invoice.payment_action_required
   - Grab the `Signing secret`
1. Go back to the Firebase extension > Extension configuration > `Reconfigure extension`
1. Replace the `Stripe webhook secret` value with the `Signing secret` created above
1. Create some products in stripe. Stripe Dashboard > Products.
   - Under "Product information" expand the Additional options. Click **+ Add metadata**.
     - Key: `firebaseRole`
     - Value: A logical name based on the product. E.g. `premium`
   - This identifier in Stripe will be passed to our Firestore so we can see what plan a user is on. This lets us [control access with custom claims and security rules](https://firebase.google.com/docs/auth/admin/custom-claims#:~:text=Control%20Access%20with%20Custom%20Claims%20and%20Security%20Rules,-Table%20of%20contents&text=The%20Firebase%20Admin%20SDK%20supports,access%20control%2C%20in%20Firebase%20apps.)
1. Add your product price ID to `/stripe/createCheckoutSession.ts` replacing the placeholder `price_XXX`

## How Stripe checkout works

1. Stripe creates a new Firestore document during the checkout process (or rather, updates our user's document)
2. Adds the checkout session ID to the document
3. Navigates the user to the checkout session using the ID from Firestore (this logic is in `stripe/createCheckoutSession.ts`)
