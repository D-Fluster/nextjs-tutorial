/* NOTES:

//
// ROUTING & NAVIGATION
// https://youtu.be/ZVnjOPwW4ZA?t=790
//

Routing in Next.js is based on the file system, such that
// adding this "page.tsx" file makes this folder publicly accessible

The extension can be .js, .jsx, or .tsx -- but it's very
// important to get the casing right (i.e., all lowercase)
// because the routing system in Next.js is based on 
// *convention*, NOT *configuration* 

This file makes the folder recognized as a public & routable 

It should include a React component, which will be rendered
// when the user is at this location -- i.e., "/users" 
// which can be done using the "rafce" shortcut

We can rename this from "page" to really anything -- it will
// not affect the routing, and is just useful for organization

We can navigate here at http://localhost:3000/users

Note that the new "App Router" is different from the old
// "Pages Router" -- in that other files added to this "/users" 
// folder will result in a 404 error and won't work (e.g., adding
// a "test.css" file returns 404 when navigating to
// http://localhost:3000/users/test.css) --
// whereas with the Pages Router, any files added to this
// public folder would also be publicly accessible

Rather, we could add a new folder (e.g., "/users/new"), and
// inside that folder add a new public "page.tsx" file
// and then navigate to http://localhost:3000/users/new

//
// DATA FETCHING
// https://youtu.be/ZVnjOPwW4ZA?t=1640
//

This is a server component; in server components, we can use the
// "fetch()" function -- which is defined in browsers -- in order 
// to send HTTP requets to the back end (??):

fetch("https://jsonplaceholder.typicode.com/users");

Where JSON Placeholder provides free fake API data
// See: https://jsonplaceholder.typicode.com
// (I thought I had this note somewhere else but can't find it)

(??) However, this includes a "promise" -- so we have to "await" it to
// get the response -- which is set up as:

const res = await fetch("https://jsonplaceholder.typicode.com/users");

(??) And because we are using "await", we have to make the component
// asychronous -- i.e., update its construction line to include "async":

const UsersPage = async () => {

With this approach, we don't have to use a state hook, or an effect hook
// with 0 dependencies (?); there's no "ceremony," but rather we just
// need to call "fetch()" and we can get the data, which all happens
// on the server

Then, just after the "fetch" line, we want to call the response ("res")
// that we just defined -- which also contains a "promise" that must be
// "await"ed to get the data, which in this case is our "users" -- 
// and this is set up as:

const users = await res.json();

Next, we'll map these users to a bunch of list items -- exactly like how
// we render them in a React application

Initially, no auto-completion options come up when we type "users." because
// this program doesn't have any information about what's contained in the URL
// so we add an interface of the TypeScript for the properties of "users" that
// we're going to use (for this lesson so far, just "id" & "name" but we can
// include all of the properties from the objects in the placeholder file):

interface User {
  id: number;
  name: string;
}

Additionally, we update the "const users" line to include its type, so that
// instead of "any" we identify it as a "User[]" which then grants us access
// to auto-completion options (i.e., "users.id" and "users.name"), which can
// also help prevent typos:

const users: User[] = await res.json();

Because this rendering is happening on the server, we can see all of this
// data in the HTML file under Dev Tools > Network > users (file name)!

In contrast, CSR methods like React typically print a  blank HTML document,
// then call the back end to fetch the data and finally render the content --
// i.e., there's always another roundtrip to the server, and our data is
// not accessible to search engines for crawling

// 
// CACHING
// https://youtu.be/ZVnjOPwW4ZA?t=2005
//

Fetching in server components has an additional benefit, which is caching;
// where the idea of caching is that data can be stored somehwere where 
// it's faster to access

Data can be retrieved from multiple data sources -- either the memory,
// the file system, or the network -- which are listed in order of
// fastest to slowest "get" time

For this reason, Next.js comes with a built-in data cache -- so whenever we
// use the "fetch" funciton to get some data, it will automatically be
// stored in its data cache, which is based on the file system -- so the
// next time we need the same piece of data (i.e., the next time we click
// the same URL), Next.js will get the data from its data cache within the
// file system, as opposed to re-navigating to an external URL!

We have full control over this caching, which is useful for when we have data
// that will frequently be changed/updated; we can either disable caching
// (for this data only?) or "treat data in cache as fresh" for only a 
// specified period of time

To do so, we can add a second argument to our "fetch()" function call, which
// is an "options" object; within that object, we can (e.g.) set
// "cache = 'no-store'" to always render fresh data for the user:

const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { cache: "no-store" });

Or we can create another "next" object, in which we can specify the
// configuration parameters specific to Next.js -- e.g.,
// "next: { revalidate: 10 }" will tell it to re-cache every 10 seconds;
// i.e., Next.js will run a background job to get fresh data every 10 sec:

const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { next: { revalidate: 10 } });

It's important to note that this caching behavior is *only* implemented in
// the "fetch" function -- so (e.g.) using a third-party library like Axios,
// you won't get this data caching

//
// STATIC & DYNAMIC RENDERING
// https://youtu.be/ZVnjOPwW4ZA?t=2150
// 

Next.js has another performance optimization technique called static rendering,
// or static-side generation; the idea is, if we have pages or components with
// static data, we can have Next.js render them once, when we build our 
// application for production -- so next time those pages/components are needed,
// it will get the payload/content from its cache, which is based on the 
// file system, rather than needing to re-render them

Thus, static rendering is aka "rendering at build time"; in contrast,
// dynamic rendering happens at request time

To visualize the difference, we can add a <p>aragraph element between the
// heading and list as follows:

<p>{new Date().toLocaleTimeString()}</p>

This allows us to see when the page was rendered and, in development mode,
// when we refresh the page the timestamp will update; however, within a
// production app, this timestamp will be static and not re-rendered upon 
// refresh, because Next.js will treat this page as a "static page"

Recall that, by default, whenever we use the "fetch" function, Next.js will
// cache the data -- thus treating it as static/unchanging -- and so, when
// rendering the page, Next.js will see this page has static data and thus
// will be rendered statically at build time

If we instead disabled caching, Next.js will think the data on the page will
// change, so it won't be rendered statically -- but rather, it will be
// rendered at request time 

To start this application in our development server, we run the command 
// "npm run dev" -- but we can instead run "npm run build" to build the
// app for production, and then "npm start" to start the app in production

Upon doing so, all the app routes are shown signified with circle icons, which
// indicates they are rendered statically at build time as HTML -- and we
// can see that the timestamp no longer refreshes as we refresh the page

Note the "/" "Route app" is referred to as the "root"

However, if we change the caching settings back to "cache = 'no-store'" rather
// than "next: { revalidate: 10 }", the "/users" page is now signified with a
// lambda sign, which indicates server-side rendering (i.e., at runtime)

Upon doing so, we can re-run "npm run build" & "npm start" and we'll see that
// refreshing the "/users" page *will* refresh the timestamp!

Now onto styling -- hop to "app/globals.css"

// 
// DAISY UI:
// https://youtu.be/ZVnjOPwW4ZA?t=3300
// 

Using the following shortcut, we can transform our <UL> of users into a <table>;
// within the <table> element, tpye the following and then press Tab:

thead>tr>th*2

This will automatically convert to a <thead> element, inside of which will
// live a <tr> element, and inside of that there will be 2 <th> elements

*/

import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
