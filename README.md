# social_networking_site

A social networking site for musician bloggers.

## DOCUMENT OBJECTIVES:

The purpose of this document is to provide detailed documentation for my teachers, Joseph and Antoinette, and myself that clearly defines the work that I will perform and what I will accomplish within the scope of this project. Any requirement which falls outside the specifications in this document will be considered “Out of Scope” and may require reprioritization or removal of other features to implement.

This document takes precedence over any other documentation provided regarding scope of work.

## SCOPE OF WORK FEATURE DETAILS:

### General Description:

I want a web application that allows for its users to create a blog and allow them to subscribe to other users' blogs. This application will feature registration and login forms for users, a user page with customizable information and a personal blog, a newsfeed page, and a search bar.

###Data Sourcing:

The features in this Scope are dependent upon data for each search result. The information for each result will be linked to Mongo database. All content for results referred to in this Scope, including but not limited to photo locations, title, and gender, will be stored and accessed in Mongo database.

### FEATURES:

The features included in this Scope comprise the web application's user interface.
* Login and Registration Forms
* User Profile Page
* Newsfeed Page
* Search Bar
  * Results list

#### Login and Registration Forms

When a user that is not logged in navigates to the root url of the application, there will be button which will direct the user to the login form where the user will be able to login with a current user account. On successful submission of the login form, the user will be directed to their User Profile Page. There will also be a button which will direct the user to the user registration form where the user will be able to register as a new user. On successful submission of the registration form, their profile will be stored in the database and they will be redirected to the login form.

##### Interface

Unless logged in, these buttons will always be located in the nav bar at the top right of the page. If the user is logged in, a logout button will replace them.

#### User Profile Page

Upon login the User will be directed to the User Profile Page. This page will display their information as supplied from the database as well as their personal blog. They will have the option to edit their own profile information. If a user navigates to an other user's page, the other user's information will be displayed and the current user will be unable to edit the other user's information, but they will be able to post and comment on that user's personal blog.

###### Interface

The User Profile Page will consist of a nav bar at the top of the window with the search bar and logout or login/register buttons at the right of the nav bar. Directly below that will be a stock background cover photo that will dominate the upper half of the page and a default placeholder for a head shot photo along with that user's name. Bellow the cover photo, any personal information that the page's user has provided will be displayed. This will include but will not be limited to what instruments the user plays, the city they live in, any genres they might be interested in, and a summary of their music career.

#### Newsfeed Page

On the Newsfeed page, all of the posts and comments from the user's subscriptions will be displayed. The user will be able to post on this page, which will post to their page, as well as comment on other users' posts.

#### Search Bar

The search bar will be located at the top of the page as a part of the nav bar. Searches will allow searching by name or username. The results list will include any users that match the search entry. Clicking on a result will redirect the user to the User Profile Page with the corresponding user's information displayed.

## Project Milestones
| Milestones                                    | Date      |
| ----------------------------------------------|-----------|
| Begin Work on the application                 | 1/4/2016  |
| Complete functionality for User Page          | 1/5/2016  |
| Complete functionality for search bar         | 1/7/2016  |
| Complete functionality for newsfeed page      | 1/12/2016 |
| Design and style website with Bootstrap & CSS | 1/13/2016 |
| Browser Testing                               | 1/14/2016 |
| Final Touches and Project Completion          | 1/15/2016 |

## Browser
Application will fully support only the below listed browsers and QA will test only in the following browsers and versions. All browsers or versions not listed below are considered out of scope.

| Browser Name                  | Version        |
| ------------------------------|----------------|
| Google Chrome                 | 47 or higher   |
| Mozilla Firefox               | 40 or higher   |

## Stretch Goals
* Make the entire site with responsive design to display nicely on mobile devices.
* Have the profile pictures of all users display next to their posts and comments

## Source Code
The source code will be available for all to see at https://github.com/ADourgarian/social_networking_site
