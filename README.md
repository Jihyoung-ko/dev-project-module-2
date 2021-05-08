# iStock

## Description

iStock is a web application that allows you to search and follow companies in the stock market. The user can create a favourites list, and track their performance day to day.

## User stories (MVP)

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

The application will have 3 sections: Homepage, Profile and My list

1. **Homepage** - As a user I want to be able to access the homepage so that I can see a list of the companies as well as the last traded stock price. Every company has a button to add to your favourites list. If you're not logged in and you try to add a company to the list, the page will redirect you to the **Log in** page.
2. **Log in** - As a user I want to be able to log in on the webpage so that I can see my list of companies. If I'm not signed up, I can click a button that will redirect me to the **Sign up** page
3. **Sign up** - As a user I want to sign up on the webpage so that I can add companies to my list and see the list.
4. **Log out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
5. **My list of companies** - As a user I want to be able to see my list of favourite companies as well as remove any company that I'm no longer interested in. For every company added, as a user I will be able to adjust the number of shares for every company in my portfolio.

## Backlog / Nice to have

- Connect the application to the Yahoo Finance API to obtain the companies' data including the stock's description, last price and market capitalization
- Include the companies' historic price chart in a thumbnail in the **Home page** and **My list of companies**

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |

| Home            | GET    | /                             | See the main page                                |                                       |                 |

| Home            | POST    | /                             | Add a new company to my list                            |                                       |                 |

| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |

| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |

| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |

| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /login        |

| My list         | GET   | /list                       | Retrieve my list of companies                                  | {user, list of company ID's, number of stocks}                      |       |

| My list         | POST   | /list                       | Remove a company from my list                                  | {user, list of company ID's}                      |       |

| My list         | POST   | /list                       | Update the number stocks I own for each company in my list                              | {user, list of company ID's}                      |       |

## Models

```jsx
// User model

{
	email: String,

	hashedPassword: String,
}

// Company model
{

    	ticker: String,

	name: String,

	description: String

    	marketCap: Number,

	lastPrice: Number,
}

// Portfolio
{

	userId: String,

	tickerId: String,

	nShares: Number,

}

// Historic Prices (NTH)

{

	tickerId: String,

	date: Date,

	lastPrice: Number,

}

```

## Links

### Github kanban

[Link  to  my  project](https://www.notion.so/User-Authentication-8f2a79c3a57148d897e9fe7a4122c363?p=d1e1526083ae44488cdbd4053c352dd5&showMoveTo=true)

### Github repository

[Link  Repo](https://www.notion.so/User-Authentication-8f2a79c3a57148d897e9fe7a4122c363?p=d1e1526083ae44488cdbd4053c352dd5&showMoveTo=true)

### Project deploy

[Link  Deploy](https://www.notion.so/User-Authentication-8f2a79c3a57148d897e9fe7a4122c363?p=d1e1526083ae44488cdbd4053c352dd5&showMoveTo=true)

### Wireframes

[InVision  with  Wireframes](https://www.notion.so/User-Authentication-8f2a79c3a57148d897e9fe7a4122c363?p=d1e1526083ae44488cdbd4053c352dd5&showMoveTo=true)

### Slides

URls for the project presentation

[Link  Slides.com](https://www.notion.so/User-Authentication-8f2a79c3a57148d897e9fe7a4122c363?p=d1e1526083ae44488cdbd4053c352dd5&showMoveTo=true