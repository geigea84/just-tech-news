# just-tech-news

Notes:
homepage.handlebars
<!--14.1.6 referencing updates to serialize array of data:
This will momentarily break the template again, because 
the template was set up to receive an object with an 
id property, title property, and so on. 
Now the only property it has access to is the posts array. 
Fortunately, Handlebars.js has built-in helpers that 
will allow you to perform minimal logic like looping 
over an array.
Note the use of {{#each}} to begin the loop and {{/each}} 
to define where it ends. Any HTML code in between (e.g., 
the <li> element) will be repeated for every item in posts.-->
