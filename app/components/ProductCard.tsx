/* NOTES:

// 
// CLIENT VS. SERVER COMPONENTS
// https://youtu.be/ZVnjOPwW4ZA?t=1105
//

Recall that server-side components cannot have interactivity,
// so they can't handle browser events like <button onClick>

We *could* make this entire component a client component, which
// is done by adding the following string ("directive") as Line 1:

"use client";

This tells the Next.js compiler to include this component/file
// in our JS bundle -- and, if this component is dependent on
// other components, those components will automatically be
// made into public components and added to the JS bundle,
// so the directive doesn't have to be repeated everywhere

However, instead of adding this entire component to the client
// side -- as it could have a lot of complex markup that could
// better be rendered on the server-side (making the site faster
// and more SEO-friendly) -- we could just extract the piece that
// requires interactivity into its own component ("button" here)

We do this by adding an "AddToCart.tsx" file to this same folder:
// i.e., in "app/components/AddToCart.tsx"

*QUESTION* Knowing that adding "use client" in a parent component
// automatically makes all of its dependencies public as well,
// and understanding this solution, does that imply that this
// only flows one way? i.e., that adding "use client" to a child
// does *not* impact the publicness of its parent components?

Seems like yes -- this component will now be fully rendered on the
// server side, except for one "hole" (where the AddToCart component
// is), where React will later inject our client component -- i.e., 
// it will be rendered later on the client side

//
// CSS MODULES
// https://youtu.be/ZVnjOPwW4ZA?t=2572
// 

We import the CSS module for this component:
import styles from "./ProductCard.module.css"

Then, we can call on those styles in the "return" of our function -- e.g.:
<div className={styles.card}>...</div>

However, if we right-click and Inspect this component in our browser,
// we'll see that the <div> has a class of "ProductCard_card_#####"

This project uses a tool called Post-CSS to transform our CSS class
// names into auto-generated names

In the root folder of ths project, we have a folder called 
// "postcss.config.js" which holds 2 plugins -- "tailwindcss"
// and "autoprefixer"; advanced Post-CSS users can provide custom
// configurations in that file, but otherwise they don't need touching

When building our application, Next.js uses Post-CSS to transform our
// class names and generate unique class names that don't class -- 
// which is how CSS modules work

Currently, we've structured it so that the component TSX file and the
// CSS module live in the same general "/components" folder -- but if
// the preference is to not mix a bunch of file types, you can also
// create a subfolder for each component and its CSS module -- e.g.,
// "/components/ProductCard" and hold both the TSX & CSS files therein

We can also use the same technique with CSS modules for *pages* -- i.e.,
// to define styles that are local to a particular page

//
// TAILWIND CSS
// https://youtu.be/ZVnjOPwW4ZA?t=2840
// 

Tailwind is a very popular CSS framework that uses the concept of 
// "utility classes" (e.g., "pt-4" which is short for "padding-top-4")
// See https://tailwindcss.com/

They include a ton of small utility classes, which can be combined to
// style our applications -- though many people have a "love/hate"
// relationship with it, including Mosh!

Expand your job opportunities & upgrade your skills by adding Tailwind
// to your skillset, as a lot of modern projects are built with it

Some *spacing* class categories in Tailwind are:
// "p-[number]", which applies padding all around; higher number = more padding
// "px-[number]" and "py-[number]", which apply padding horizontal (left/right) 
// // or vertical (up/down) padding, respectively
// "pt-#", "pr-#", "pb-#", & "pl-#" for top, right, bottom & left padding, respectively
// with similar classes for margins using "m" instead of "p"

Some *text* class categories in Tailwind are:
// "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", etc.,
// // for text sizes extra-small, small, base/default/medium, large, x-large, etc.
// "text-[color]" and "bg-[color]" for controlling the text and backgrond colors 
// "font-thin", "font-light", "font-normal", "font-medium", "font-bold", etc.,
// // for controlling the text thickness (per AI, also "font-extralight" & "font-semibold")

You can find the default color palette that comes with Tailwind at:
// https://tailwindcss.com/docs/customizing-colors
// where there are a bunch of different broad colors (e.g., "sky" & "blue"),
// with numbers ranging from 50 to 950; the higher the number, the darker the hue 

Instead of using CSS modules, we can style this component using Tailwind;
// instead of using <div className={styles.card}>, we could instead use:

<div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">

TIP: After typing "p-" you can hit Ctrl + Space to see all padding classes!
// This is from the Intellisense extension 

There are also "psuedo-selectors" like "hover:" to change styles upon hovering

So the main selling point of Tailwind is that we can style our components right
// here within the component itself, without juggling additional CSS modules

Another big selling point is that, when we build our application, the final
// CSS bundle will only include the utility classes that have actually been 
// used in our markup -- meaning we don't have to remember to delete "dead styles"
// as we change or delete our components; it keeps our code cleaner for us!

// 
// DAISY UI:
// https://youtu.be/ZVnjOPwW4ZA?t=3300
// 

DaisyUI is a very popular and easy-to-use component library for Tailwind -- kinda  
// like Bootstrap but for Tailwind -- including accordions, carousels, breadcrumbs,
// button groups, cards, chat bubbles, etc.
// See: https://daisyui.com/

We first need to install it as a "development dependency," which is signified by the
// "-D" in the npm command: "npm i -D daisyui@latest"
// See: https://daisyui.com/docs/install/

Next, we install Daisy as one of the plugins of Tailwind by adding the follwing as
// Line 18 of "tailwind.config.ts":

plugins: [require("daisyui")],

Under the hood, all of the DaisyUI classes utilize Tailwind for styling,
// so instead of using a bunch of Tailwind classes to create a button,
// we can just use one of the button styles that comes with Daisy --
// plus they can always be further customized

Hop to "/components/AddToCart.tsx"

*/

import React from "react";
import AddToCart from "./AddToCart";
// import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
