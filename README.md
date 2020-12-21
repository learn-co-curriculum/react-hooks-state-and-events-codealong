# React State and Events Code-along

## Overview

In this code-along, we'll get some hands-on practice writing components with state
and setting state based on different kinds of events.

## Objectives

1. Set up a component with one state variable
2. Work with arrays in state
3. Set up a component with multiple state variables

## Adding State to a Component

To get some practice adding state to a component, code along with this readme.
There's some starter code in the `src/components` folder. We'll be adding state
to some existing components and building out some functionality that depends on
state.

As a quick recap:

> State is data that is changes over time in your component. State must be
> initialized in a component by calling `useState`. Updating state by calling
> `setState` will cause our components to re-render automatically.

To code along, run `npm install && npm start` to install the dependencies and
get the demo app running.

## Determining When To Add State

For our first component, let's work on a toggle button. It should do the following:

- The button should say "OFF" when it is first displayed
- When the button is clicked, it should say "ON"
- When the button is clicked again, it should say "OFF"
- etc

Let's talk through the steps and how we might think about building a feature
like this as a React developer.

First, let's decide: do we actually need state for this feature? We need to
determine if the data for this feature is _static_ (doesn't change) or _dynamic_
(does change). If it's dynamic, we'll definitely need state! We should also ask
if this feature could be made using **props** instead of **state**.

Here are some questions from
[Thinking in React](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)
that will help us decide if we need state:

> - Is it passed in from a parent via props? If so, it probably isn’t state.
> - Can you compute it based on any other state or props in your component? If so, it isn’t state.
> - Does it remain unchanged over time? If so, it probably isn’t state.

Since this component isn't being passed any props that will let us display some
new button text, and the button's text is _dynamic_ (it changes), we definitely
need to add state!

Our full checklist looks like this:

- 🚫 Is it passed as a prop?
- 🚫 Can you compute it based on any other state or props in your component?
- ✅ Does it change over time?

So it's time to add state! There's some starter code in the `Toggle.js` file. If
you're feeling good about what you learned in the last lesson, give it a shot
now! We'll walk through the steps below.

...

...

...

...

Ok, hope you were able to get that going! Here's our process for adding state
to build out this feature.

1. Import the `useState` hook

   Any time we need state in a component, we need to use the `useState` hook from
   React. We can import it like so:

   ```js
   import React, { useState } from "react";
   ```

2. Set up the initial state

   To create a state variable in our component, we need to call `useState` and
   provide an initial value:

   ```js
   function Toggle {
     const [isOn, setIsOn] = useState(false);
     // ... the rest of Toggle component
   }
   ```

   Whenever you're using a React hook, it **must** be within a React component.
   We're setting the initial state here as `false`, because the button should be
   "OFF" when the component first renders.

3. Use the state variable in the component

   Now that we have this new variable, it's time to use it! We can use the `isOn`
   variable to determine what text to display in the button:

   ```js
   <button>{isOn ? "ON" : "OFF"}</button>
   ```

   Here, we're doing some
   [conditional rendering](https://reactjs.org/docs/conditional-rendering.html)
   to dynamically determine the button's text _based on our state variable_.

   You should now be able to change the initial state in the `useState` function
   and see if your button's text displays what you expect. Setting an initial state
   of `true` should display "ON", and `false` should display "OFF".

4. Call the setter function to update state

   Any time we want to _update_ state, we need to use the _setter function_ returned by calling `useState`.
   We also need to determine what triggers that update. In our case it's the button being clicked.

   Let's start by adding an `onClick` handler to the button:

   ```js
   <button onClick={handleClick}>{isOn ? "ON" : "OFF"}</button>
   ```

   Next, let's set up the `handleClick` callback function, and update state. Here,
   we must call the _setter function_ to update our state variable. Trying to
   update the variable won't have any effect (even if we changed our variable
   declaration to `let` instead of `const`):

   ```js
   let [isOn, setIsOn] = useState(false);
   function handleClick() {
     // updating state directly is a no-no!
     isOn = !isOn;
   }
   ```

   So the way we should update state looks like this:

   ```js
   function handleClick() {
     setIsOn((isOn) => !isOn);
   }
   ```

All together, here's our updated component:

```js
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    setIsOn((isOn) => !isOn);
  }

  return <button onClick={handleClick}>{isOn ? "ON" : "OFF"}</button>;
}
```

With this state variable in place, let's add another feature to our button. When
the button is ON, let's make the background red, like this:

```js
<button style={{ background: "red" }}>
```

When it's OFF, it should have a white background.

Let's go through those same questions to determine if we need to add state for this feature.

> - Is it passed in from a parent via props? If so, it probably isn’t state.
> - Can you compute it based on any other state or props in your component? If so, it isn’t state.
> - Does it remain unchanged over time? If so, it probably isn’t state.

In this case, we **can** compute it based on other state in our component, so we
don't need to add any _new_ state for this feature.

We can use that same `isOn` state variable, along with some conditional
rendering, to get the button to display the correct border color:

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    setIsOn((isOn) => !isOn);
  }

  const color = isOn ? "red" : "white";

  return (
    <button style={{ background: color }} onClick={handleClick}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
```

## Working With Arrays

### Adding Elements To Arrays In State

When we need to represent a list of data in our UI, it's often a good idea to
have the data for that list stored in an array! To give an example, let's build
out a component that does the following:

- Shows a button to generate a new random number
- When the button is clicked, adds the newly generated number to a list

The starter code for this component is in `NumberList.js`. Before we walk through
the solution, see if you can get this working by:

- adding a state variable to hold an array of numbers;
- using that array to display each number as a `<li>`; and
- adding a new number to the array when the button is clicked.

Keep in mind, when you're updating state, you should never _mutate_ the array &mdash;
instead, find a way to make a _copy_ of the array with the new number in it
(**hint**: the spread operator is your friend here).

...

...

...

...

Our first steps, as usual, are to import the `useState` hook, and create some
initial state:

```js
import React, { useState } from "react";
import { randomNumber } from "../utils";

function NumberList() {
  // add initial values to the array to test if they display
  const [numbers, setNumbers] = useState([1, 2, 3]);

  // rest of component
}
```

Next, let's update our component to return some JSX elements based on this array
in state. We can use `.map` on our array to generate an array of `<li>` elements
from our array of numbers, and display them in the `<ul>`:

```js
const numberList = numbers.map((num) => <li key={num}>{num}</li>);

return (
  <div>
    <button onClick={handleAddNumber}>Add Number</button>
    <ul>{numberList}</ul>
  </div>
);
```

Now that our numbers are displaying, time for the moment of truth: can we update
state and get new numbers to display dynamically?

```js
function handleAddNumber() {
  const newNumber = randomNumber();
  const newNumberArray = [...numbers, newNumber];
  setNumbers(newNumberArray);
}
```

This step is crucial, so let's break it down!

```js
const newNumberArray = [...numbers, newNumber];
```

Here, we're using the spread operator (`...`) to make a _copy_ of our `numbers`
state, and insert it into a _new_ array. We're also adding the newly generated
number returned by the `randomNumber` function at the end of the array.

Whenever we are updating state, it's important **not to mutate objects and
arrays**, and instead, to create **copies** of them. **If we mutate state, it
can cause some unexpected behavior in our apps due to the way React manages
state internally**.

Make sure to never mutate state!

After setting state, our component should automatically re-render with the new
list of numbers.

### Removing Elements From Arrays In State

Let's add another feature. When a user clicks on a number, that number should be _removed_
from the list.

First, we'll need to add a click handler to the `<li>` elements, and pass in the
number we're trying to remove:

```js
const numberList = numbers.map((num) => (
  <li key={num} onClick={() => handleLiClick(num)}>
    {num}
  </li>
));
```

Next, in the `handleLiClick` function, we need to figure out a way to update our
array in state so it no longer includes the number.

There are a few approaches you could take here, so try to find a solution on your
own before peeking at the answer! Remember, we want to find a way to remove the
number _without mutating state_.

...

...

...

...

One common approach to this problem of creating a new array that doesn't include
a specific element is using the `.filter` method. Here's how we can do it:

```js
function handleLiClick(numberToRemove) {
  const newNumberArray = numbers.filter((number) => number !== numberToRemove);
  setNumbers(newNumberArray);
}
```

Calling `.filter` will return a _new array_ based on which elements match our
criteria in the callback function. So if we write our callback function in `.filter`
to look for all numbers _except_ the number we're trying to remove, we'll get
back a new, shortened list of numbers:

```js
[1, 2, 3].filter((number) => number !== 3);
// => [1,2]
```

Setting state with this updated list of numbers will re-render our component,
causing the number to be removed from the list.

### Updating Elements in Arrays in State

Here's a tough one! We've seen how to add and remove elements from arrays, but
what about updating them?

Let's update our click feature so that when a user clicks on a number, that
number is incremented by 100.

In the `handleLiClick` function, we need to figure out a way to
update our array in state and increment the number that was clicked.

Once again, there are a few approaches you could take here, so try to find a
solution on your own before peeking at the answer! Remember, we want to find a
way to remove the number _without mutating state_.

...

...

...

...

One approach we can take to _updating_ items in arrays without mutating state
involves using the `.map` method. Calling `.map` will return a new array with the
same length as our original array (which is what we want), with some transformations
applied to the elements in the array.

Here's an example of using `.map` to update _one element_ of an array:

```js
[1, 2, 3].map((number) => {
  if (number === 3) {
    // if the number is the one we're looking for, increment it
    return number + 100;
  } else {
    // otherwise, return the original number
    return number;
  }
});
// => [1,2,103]
```

So to use that technique to solve our problem, here's how our click event
handler would look:

```js
function handleLiClick(numberToUpdate) {
  const newNumberArray = numbers.map((number) => {
    if (number === numberToUpdate) {
      return numberToUpdate + 100;
    } else {
      return number;
    }
  });
  setNumbers(newNumberArray);
}
```

We can shorten this up a bit by using the ternary operator, and implicit return:

```js
function handleLiClick(numberToUpdate) {
  const newNumberArray = numbers.map((number) =>
    number === numberToUpdate ? numberToUpdate + 100 : number
  );
  setNumbers(newNumberArray);
}
```

(It's up to you which version of this syntax you find more legible!)

### Array Cheat Sheet

Here's a quick reference of some common techniques for manipulating arrays in
state. Keep this in mind, because working with arrays will be important as a
React developer!

- **Add**: use the spread operator (`[...]`)
- **Remove**: use `.filter`
- **Update**: use `.map`

## Working With Multiple State Variables

Sometimes, a component needs multiple state variables to represent multiple UI
states. To give an example, let's add a feature to our `NumberList` component
that lets the user display only _even_ or _odd_ numbers by selecting a filter
option from a dropdown.

Here's the JSX you'll need for this feature:

```jsx
<select name="filter">
  <option value="All">All</option>
  <option value="Even">Even</option>
  <option value="Odd">Odd</option>
</select>
```

Try building out this feature on your own, then we'll go through the solution.
Think about what new _state variable_ you'll need to add, and how to use that
variable to determine which numbers are being displayed!

...

...

...

...

Let's start by talking through what new state we'll need to add. We need some
way of keeping track of which option the user selected from the `<select>` tag.
We'll also need to use that data to _filter_ the list of numbers and determine
which numbers to display.

Since the `<select>` values are "All", "Even" and "Odd", let's set up our initial
state to be a string of "All":

```js
const [filterBy, setFilterBy] = useState("All");
```

Next, let's figure out how this filter value can be used to update what numbers
are displayed. We will need to use _both_ of our state variables together to solve
this problem! Here's how we can use the filter value to update which items are displayed:

```js
const [numbers, setNumbers] = useState([1, 2, 3]);
const [filterBy, setFilterBy] = useState("All");

let numbersToDisplay = numbers;
if (filterBy === "Even") {
  numbersToDisplay = numbers.filter((num) => num % 2 === 0);
} else if (filterBy === "Odd") {
  numbersToDisplay = numbers.filter((num) => num % 2 !== 0);
}
```

This will give us a new variable, `numbersToDisplay`, that will be an array of:

- All numbers from `numbers` if `filterBy` is set to "All"
- The even numbers if `filterBy` is set to "Even"
- The odd numbers if `filterBy` is set to "Odd"

Now, we just need to use `numbersToDisplay` instead of `numbers` when we're
generating the `<li>` elements:

```js
const numberList = numbersToDisplay.map((num) => <li key={num}>{num}</li>);
```

Having both of these variables in state and knowing how to use them in
conjunction with each other give us a lot of power in React! All we need to
worry about is using our programming tools &mdash; working with _data_;
manipulating _arrays_ &mdash; and React can take care of all the hard work of
updating the DOM correctly.

## Conclusion

Thinking like a React developer involves making a lot of decisions about how to
structure your components, particularly when it comes to **props** and **state**.
Now that you've seen the process and some common patterns for working with
state, it's up to you to apply these decisions to your own components moving
forward.

In particular, keep in mind that **state should be used for dynamic variables**,
and that when you're updating state, you should **never mutate objects or
arrays**.

## Resources

- [The useState hook](https://reactjs.org/docs/hooks-state.html)
- [Props vs. State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)

<p class='util&mdash;hide'>View <a href='https://learn.co/lessons/react-initial-state'>Initial State</a> on Learn.co and start learning to code for free.</p>
