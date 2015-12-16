# social_networking_site
  A social networking site for musicians and bands in the twin cities area.

## DOCUMENT OBJECTIVES:					
  The purpose of this document is to provide detailed documentation for my teachers, Joseph and Antoinette,
  and myself that clearly defines the work that I will perform and what I will accomplish within the scope of this project.
  Any requirement which falls outside the specifications in this document will be considered “Out of Scope” and 
  may require reprioritization or removal of other features to implement.
  
  This document takes precedence over any other documentation provided regarding scope of work. 

## SCOPE OF WORK FEATURE DETAILS:
### General Description:
  I want a web application that allows for its users to create personalized web pages for themselves and for their bands.
  This application will feature registration and login forms for users and bands, a user page with 
  customizable information, a band page with customizable information, and a search bar.

###Data Sourcing: 
  The features in this Scope are dependent upon data for each search result. The information for
  each result will be linked to Mongo database. All content for results referred to in this Scope, 
  including but not limited photos, title, and gender, will be stored and accessed in Mongo database.

### FEATURES:
  The features included in this Scope comprise the web application's user interface.
  * Login and Registration Forms
  * User Profile Page (Editable)
  * Band Profile Page (Editable)
  * Search Bar
    * Results list

#### Login and Registration Forms
  When a user that is not logged in navigates to the root url of the application, there will be button which
  will direct the user to the login form where the user will be able to login with a current user account.
  On successful submition of the login form, the user will be directed to their User Profile Page.
  There will also be a button which will direct the user to the user registration form where
  the user will be able to register as a new user. On successful submition of the registration form, their profile
  will be stored in the database and they will be redirected to the login form.
#### User Profile Page (Editable)
  Upon login the User will be directed to the User Profile Page. This page will display their information as supplied
  from the database. They will have the option to edit their own information. If a user navigates to an other user's page,
  the other user's information will be displayed and the current user will be unable to edit the other user's information.
#### Band Profile Page
  A user that is logged in will have the option to create a Band Profile Page. While this page will be similar to the
  User Profile Page, several people may have a shared ability to edit the information on this page. If a user navigates to a
  Band Profile Page that does not belong to that Band Profile Page, the user will be able to view that band's information,
  but not edit it.
#### Search Bar
  The search bar will be located at the top of the page. Searches will allow searching by name and bandname.
  The results list will include any users or bands that meet that match the search entry. Clicking on a result
  will redirect the user to the User Profile Page or Band Profile Page with the corresponding users information displayed.

## Project Milestones
| Milestones                                    | Date      |
| ----------------------------------------------|-----------|
| Begin Work on the application                 | 1/4/2016  |
| Complete functionality for User Page          | 1/5/2016  |
| Complete functionality for search bar         | 1/7/2016  |
| Complete functionality for Band Page          | 1/12/2016 |
| Design and style website with Bootstrap & CSS | 1/13/2016 |
| Browser Testing                               | 1/14/2016 |
| Final Touches and Project Completion          | 1/15/2016 |

## Browser 
  Application will fully support only the below listed browsers and QA will test only in the following
  browsers and versions. All browsers or versions not listed below are considered out of scope.
  
| Browser Name                  | Version        |
| ------------------------------|----------------|
| Google Chrome                 | 47 or higher   |
| Mozilla Firefox               | 40 or higher   |

