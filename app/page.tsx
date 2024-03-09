/* NOTES:

//
// ROUTING & NAVIGATION
// https://youtu.be/ZVnjOPwW4ZA?t=790
//

We *can* use an anchor <a> tag, but it's not ideal because
// whenever a new page is loaded, all of the website's
// resources are re-downloaded (css, font, js, etc. files) --
// which isn't ideal for fast, real-world applications

e.g.:   <a href="/users">Users</a>

// 
// CLIENT VS. SERVER COMPONENTS
// https://youtu.be/ZVnjOPwW4ZA?t=1105
//

Rather than re-downloading all the repetitive parts based on
// user interaction (e.g., with top & side nav bars), we
// only want to replace the content area, which can be
// achieved with the "Link" component in Next.js -- as
// defined in the "next\link" library

e.g.:   <Link href="/users">Users</Link>

With this implementation, we're only downloading the new conent
// assocaited with the Users page, not re-downloading everything
// which is called "Client-Side Navigation" ("CSR"), as opposed
// to "Server-Side Navigation" ("SSR") where components are
// rendered on the server

With CSR, we have to bundle all of our app's components and send
// them to the client for rendering, so as the application grows,
// so too does the bundle size, which increases the memory requirements
// of the client so all the components can be loaded -- making this
// approach resource-heavy (or resource-intensive)

Additionally, because SEO bots cannot execute JS code, they can't
// render/view components delivered with CSR, like a web browser could

Plus, any sensitive data contained in our components or their dependencies
// (e.g., API keys) will be exposed to the client with CSR

In contrast, by rendinering our components on the server, we can 
// overcome all of these issues: we only send the essential components
// to the client, preventing our bundle from becoming unnecessarily large

Additionally, because the server handles most of the rendering, 
// the resource requirements for the client are much less

Because the actual rendering is done on the server and thus the actual 
// content is sent to the client, SEOs are able to crawl the data

Plus, sensitive data like API keys can be kept on the server

However, with SSR we lose interactivity because server-side components
// i.e., components that are rendered on the server -- cannot do things
// like listen to browser events (click, submit, change, etc.); access
// browser APIs like local storage; maintain state; or use effects;
// rather, these functionalities are only availble in *client* components

Because of this, real-world applications often utilize a mixture of
// client- *AND* server-side components; as a rule of thumb, we should
// default to SS and only use CS when absolutely necessary 

As an example, an application that allows users to view & filter products
// and add them to their cart might have the following components:
// NavBar, SideBar, ProductList, ProductCard, Pagination, and Footer

With a standard React app, all of these would be bundled/packaged
// and send to the client for rendering

With Next, we can keep all of the components on the server, thus
// minimizing the bundle size -- with the exception of the component
// where users can add products to their cart (which requires us to
// handle the click event of a button)

We *could* move the entire component that will be interacted with on
// the client side (e.g., ProductCard) -- but we can actually keep the
// component on the server and do most of the rendering there, and just
// extract the smallest necessary component (e.g., "Add to Cart" button)

All components in the "app" folder are SS by default

Because folders without a "page" file aren't publicly accessible, we can
// co-locate our project files and other building blocks with our pages
// (perfectly fine to put them next to each other)

//
// DATA FETCHING
// https://youtu.be/ZVnjOPwW4ZA?t=1640
//

Data can be fetched on either the client side or the server side

Fetching data on the client side is usually done with a "state hook"
// (i.e., "useState()") to declare a state variable, and an "effect hook"
// (i.e., "useEffect()") to execute a function when the state changes
// (that last line was auto-filled with AI -- what I was going to write is:)
// (i.e., "useEffect()") to call the back end, get the data, and
// put it into our state variable

In his full React course, he talks about how React Query is a better
// alternative to manually using the state & effect hooks

However, either approach has the limitations discussed previously -- and,
// additionally, there is always an extra roundtrip to the back-end/server

When a React application loads, first the browser downloads the HTML template
// along with the CSS & JS files from the back end; then, it sends an *extra*
// request to fetch data from the back end (i.e., an extra roundtrip)

We can fetch data in our server components to get rid of all these problems

Here we'll use JSON Placeholder to to put some dummy data into our application;
// JSONPlaceholder.typicode.com is a fake API to create dummy data

Hop to "app/users/page.tsx"


*/

import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello, World!</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}

// // // // // // // // // // // // // // // // //

/* ORIGINAL CONTENT (boilerplate from Next/Vercel):
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
*/
