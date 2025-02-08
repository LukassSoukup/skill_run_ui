## Get inspired here
https://benscott.dev

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Study notes

- Routing in Next.js is done via file system.
    - these files are hidden to a user unless page.tsx file is created inside of the folder
```bash
npm run dev     # Build for development
npm run build   # Build for production
npm start       # Start the production server
```

## Performance optimization techniques

- __Server Sider Rendering - SSR__
    -
    - These components cannot handle browser interactions like click, hover, etc...
    - Faster render time
    - Small client bundle, doesn't put presure on the client machine
    - Next.js comes with caching on the serverside automatically
    - __Working with cache__
    ```js
    fetch('URL', /* to disable caching: */ { cache: 'no-store'});

    fetch('URL', /* get data from server every 10 seconds: */ { next: { revalidate: 10 }});

    // for other cache configurations see next.js documentations
    ```

- __Client side Rendering - CSR__
    -
    - Large bundle and everything is exposed to the client (all code, API keys, etc...)
    - Can handle interactivity
    - By default Next.js uses SSR, to make component CSR simply place `use client;` at the begining of the file.
    - For optimal programming use CSR only if absolutly necessary

- __Static server Rendering__
    -   
    - render at build time
    - Static data will be build once and will not change during the runtime
    - By default Next.js is rendering all components as static even if you add changing variables liek `new Date().toLocaleTimeString()`

- __Dynamic server Rendering__
    -
    - Rendering at request time
    - If fetching data, you have to disable caching using the option above.

## Styling
```css
:root {
    /* This contains custom constants that can be referenced */
    --foreground-rgb: 0, 0, 0
}

@media (prefers-color-scheme: dark) {
    :root {
        /* The root variables gets here overwriten when the user uses dark mode */
    }
}

body {
    /* example of using defined constants from :root */
    color: rgb(var(--foreground-rgb));
}
```