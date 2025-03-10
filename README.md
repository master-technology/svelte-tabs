# svelte-tabs

A more up to date and performant tabs component for Svelte, forked from: https://github.com/nickyhajal/svelte-tabs

New Features/Fixes:
- Performance: Supports Delayed Rendering of Tab content (`delay` on tabPanel defaults to `true`), this basically means anything inside a unshown tab is not mounted/rendered until it is shown.
- Feature: `selectedTabIndex` is now two way bound allowing you to change the tab by setting this value at any time.
- The full `TabPanel` component is hidden if it isn't active, so that it has no effect on the DOM when you switch tabs.


## Installation

    npm install --save @master.technology/svelte-tabs

## Basic usage

```html
<script>
  import { Tabs, Tab, TabList, TabPanel } from '@master.technology/svelte-tabs';
</script>

<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanel>
    <h2>Panel One</h2>
  </TabPanel>

  <TabPanel delay=false>
    <h2>Panel Two</h2>
  </TabPanel>

  <TabPanel delay=true>
    <h2>Panel Three</h2>
  </TabPanel>
</Tabs>
```

## Props

- `selectedTabIndex` (number): The index of the tab to initially select, when the Tabs component is mounted.

## Overriding styling

svelte-tabs comes with a basic default style, but it can be overridden. To override the styles to use your own, you will need to use global styles that have a higher specificity than the built-in styles.

To make sure your overridden styles have the most specificity, include the parent class `.svelte-tabs` in your selector, and include the element type (see below). An example selector would be `:global(.svelte-tabs li.svelte-tabs__selected)`.

Below are CSS selectors that can be used for the different components in this library:

- Tabs: `:global(.svelte-tabs)`
- Tab: `:global(.svelte-tabs li.svelte-tabs__tab)`
- Selected Tab: `:global(.svelte-tabs li.svelte-tabs__selected)`
- TabPanel: `:global(.svelte-tabs div.svelte-tabs__tab-panel)`

As a last resort, if you can't get the right specificity, you can always use `!important`.

## Development

- Fork and clone the repository, then run `npm install`.
- From the repository root, run `npm link`.
- From the repository root, run `npm run build:watch`.
- From the `examples` directory, run `npm link svelte-tabs`.
- From the `examples` directory, run `npm run dev`.
- Go to [http://localhost:5000](http://localhost:5000).
- You now have a running development environment. Changes you make to the component will be reflected in the app.

## Running tests

To do a single run of the tests, run `npm test`. To run the tests in watch mode, run `npm run dev:watch`.

## Credits

Derived from the code at [https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0](https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0) by Rich Harris

## Limitations

- Nested tab panels are not yet supported.
