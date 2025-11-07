# More Tech News

 This is another technology news website where users can post, upvote, and comment on links to news articles. This manages objects using JavaScript and translates the code into database schema and queries using SQL.  I created this to demonstrate Object Relational Mapping through the Sequelize ORM library.  

## Table of contents

> - [More Tech News](#more-tech-news)
>   - [Table of contents](#table-of-contents)
>   - [About / Synopsis](#about--synopsis)
>   - [Features](#features)
>   - [Future Development](#future--development)
>   - [Usage](#usage)
>   - [User Story](#user-story)
>   - [Technology](#technology)
>   - [Credits](#credits)
>   - [How to Contribute](#How--to--Contribute)
>   - [Questions](#questions)

## About / Synopsis

This is a tech news website where users can post, upvote, and comment on links to news articles.  
* to update with the new website location: You can find the deployed application [Here](https://more-tech-frozen-tundra-12598.herokuapp.com/).

See a screenshot for the site below:

![Image of the homepage](./public/images/MoreTechNews%20Homepage.JPG)

## Features

The homepage is a feed of the current site and posts.  Click each header to open the post, or otherwise click to open the comments.  You need to log in to create a post or comment.

## Future Development

In the future, I can add the ability to edit the URL for each post, instead of just the title.  I also plan to add preview images of the sites posted.

### Usage

Create an account to make a post, add a comment, or delete your posts/comments.  You can freely browse the content within the site.

![Image of Create Post page](./public/images/CreatePost.JPG)

![Image of Post page with comments](./public/images/MoreTechNews%20Post%20with%20Comments.JPG)

If you want to edit your post, you can do so from your Profile page.

![Edit your post](./public/images/edit-post-1.JPG)
![Edit your post](./public/images/edit-post-2.JPG)
![Edit your post](./public/images/edit-post-3.JPG)

You can also just delete the post from your Profile page.

![Delete your post](./public/images/Delete-post-1.JPG)
![Delete your post](./public/images/Delete-post-2.JPG)

## User Story

As a technology enthusiast, I want to join a community to keep up to date on the latest technology news.

## Technology

Technologies used include:
- Javascript
- Node.js
- Handlebars.js
- Express.js
- Sequelize
- Sessions
- bcrypt

## Tips

I had trouble setting up Heroku after multiple tries.  I fixed the error after using the command "heroku buildpacks:set heroku/nodejs".  To ensure the connection to JawsDB is correct, since my secret is in a file not uploaded to heroku, I add the secret within Heroku in the config vars.

## Credits

- https://sequelize.org/
- https://www.npmjs.com/package/bcrypt
- https://nodejs.org/en/

## How to Contribute

If you would like to contribute to, or if you want to report issues for this project, feel free to contact me through GitHub.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Questions

If you have additional questions, please contact the developer at scarlinj@gmail.com.
