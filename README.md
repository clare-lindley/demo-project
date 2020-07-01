#### What is it?
A REST API sandbox to help me demo my knowledge and skills. At the moment the 2 streams of work are User resource CRUD and [JWT Authentication](https://jwt.io/introduction/)

#### How to run

#### Below I have listed anywhere where I have expressed an opinion or preference, where I think it needs an explanation.
Why REST? Because I haven’t learned GraphQL yet :P (and I also don’t need the additional flexibility of GraphQL right now. I’ll create a separate project to learn and explore the capabilities).

Why Users as resources? Couldn’t you be a bit more original? Because that required the least amount of effort dreaming up a data model! Over time, it may change. 

Express as the framework - purely out of familiarity to enable me to get something up and running quickly. Is it the best thing for a REST API? I don’t know, it certainly isn’t designed solely for that purpose. I’m looking into Restify, I might move it to that http://restify.com/ 

MongoDB as a datastore - simply because this was the easiest to install on my Macbook Air natively (and which was faster than having to a get an alternative up and running in the cloud or in a container locally. Mongo just allowed me to get going quicker). 

I made a decision that the id for the User model should be converted from a MongoDB ObjectId to a String to make it easier to work with and pass as a request parameter: https://docs.mongodb.com/manual/reference/method/ObjectId.toString/ (Another note on id fields, I decided that it was not worth the trouble to set up auto-incrementing id’s in MongoDB and am accepting the ‘pain’ of noisy URLs with longer IDs in them. Is this a decision that can easily be reversed down the line, no - 
but I am OK with this as the resources are only ever accessed programmatically and not via a UI so the URLs do not necessarily need to look pretty.

I favour const over let to signify that an identifier declared with const cannot be reassigned (I was looking for guidance on this decision, and I made it after reading this article on the subject by Eric Elliot, I am a big fan of his JavaScript writing and I trust his opinion: https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75)

The convention I have established for the order of includes at the top of files is: include 3rd party in A-Z order first, then a line break, then modules and variables created by myself after that in A-Z order.

    
#### Below I have listed obvious improvements - things you will definitely spot that I am aware of which are in the backlog

#### Here are some other ideas for improvements and interesting tech which is on my radar
