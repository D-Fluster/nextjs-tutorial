/* NOTES:

// 
// CLIENT VS. SERVER COMPONENTS
// https://youtu.be/ZVnjOPwW4ZA?t=1105
//

// // // // //

// 
// DAISY UI:
// https://youtu.be/ZVnjOPwW4ZA?t=3300
// 

Without having to import anything in this file, we can use DaisyUI 
// to style our button component in this component -- e.g., with:

<button className="btn btn-primary">

Daisy incorporates the concept of themes (here we'll use "winter"),
// which require two steps to "install"/use
// See: https://daisyui.com/docs/themes/

First, add the following to Lines 19-20 of "tailwind.config.ts":

  daisyui: {
    themes: ["winter"],
  },

Then, we also have to apply this them to our HTML element as the
// "data-theme" information in Line 18 of our "/app/layout.tsx":

<html data-theme="winter">

Hop to "app/users/pages.tsx" to transform our Users <UL> into a <table>

*/

"use client";
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => console.log("Clicked!")}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
