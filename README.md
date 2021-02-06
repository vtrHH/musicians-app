
# Models:

## Get-together:

User
Offer
Comment

## Additionally for Group Feature:

Group (similar purpose as user)
Bandpost (same as in Get-together offer)
Comment (same as in Get-together)
Song (Upload?)

# Routes Get-together:

METHOD  PATH                PAGE                DESCRIPTION

GET     /                   Home                Landing Page // Display offers for different categories after sign up or Login

++++++ Offers +++++++

GET     /offer/create       Create new offer    Displays offer create form --> router done
POST    /offer/create       Create new offer    Add offer to database --> router done

GET     /offer/:id          Single offer        displays offer --> router done

GET     /offer/:id/update   Update offer        display offer updating form
POST    /offer/:id/update   Update offer        updates offer in database

GET     /offer/:id/delete   Delete offer        display delete confirmation
POST    /offer/:id/delete   Delete offer        deletes offer in database

POST    /offer/:id/comment  Comment offer       handles comment form submission

GET     /error              Error               Displays error message

++++++ Profile +++++++

GET /user/:id Single user profile Displays user profile

GET /user/:id/update Update user display user updating form
POST /user/:id/update Update user updates user in database

GET /error Error Displays error message


# Description of content

## Home (Landing Page):

Sign up
Login
Intro about what the site is about

## Home (after Login / Sign up):

offers
Watch own profile
Button to create new offer
Button to display registered bands
Evtl Search-Function for offers
Logout

## Create new offer:

Form to fill
Button submit

## Single offer:

offer details
button update
Button dele

## Update offer:

Form to fill
Button submit

## Delete offer:

Button „Are you sure you want to delete“
