# Interactive Data Grid Component

Hi there 👋!

## Architecture

- Simple Monorepo with [Next.js](https://nextjs.org/) App([`@monorepo/frontend`](apps/frontend)) for [React.js](https://react.dev/) frontend and [Node.js](https://nodejs.org/en) backend;
- Package([`@monorepo/data-grid`](packages/shared/data-grid)) for React Data Grid Component(the component can be installed in any React app on this repository);
- Data structure based on `Columns`. Each column have a type and an array of entries representing the data grid rows;
- [radix-ui](https://www.radix-ui.com/primitives) library for primitive components. radix-ui provides unstyled, accessible, open source React primitive components;
- Table virtualization using [@tanstack/react-virtual](https://tanstack.com/virtual/latest) to allow using Large Datasets limiting the number of elements rendered on DOM. The performance for virtualization is better running the Production build.
- [Zustand](https://zustand-demo.pmnd.rs/) for a small, fast and scalable state management;
- [Tailwindcss](https://tailwindcss.com/) for styling with a global `.css` file on root allowing styles share;
- Color theme based on OS theme(light or dark).

The server has two very simple routes: one for the `table` data and another for `users`. <strong>All edits are being persisted in the backend in a simple in-memory variable</strong>.

The table data route is `/api/data` and has:

- A `GET` request to retrieve the data;
- A `PUT` request to replace the value in memory;
- A `POST` request to reset the data to the default value or to a large dataset based on a `size` parameter.

The users route is `/api/users` and has a simple `GET` to retrieve the users.

## Running

After cloning the repository, execute the following commands in the root folder using Node.js 20+

```
npm install
```

### Locally

To run Development mode execute the following command

```
npm run dev --workspace=@monorepo/frontend
```

### Production build (recommended for large datasets)

To run Production build it is necessary to build Next.js app by executing

```
npm run build --workspace=@monorepo/frontend
```

And then execute the build with the following command

```
npm run start --workspace=@monorepo/frontend
```

## Known limitations or trade-offs

- The API was built in a very simple way, just to return and store data, sending the entire content of the DataGrid at once to the server. It would be interesting to have an editing approach based on column and cell IDs on the server.

## Future improvement suggestions

- I believe performance is very important when dealing with Data Grids, as they can contain large datasets. I implemented `virtualization`, but it is currently applied only to rows and not columns. This is something that would need further improvement;
- Keyboard `arrow navigation` is also an important feature that needs to be added in the future;
- Improve error display for users by using toasts and custom messages when necessary;
- Add loading components using skeletons to enhance the user experience.

## Deploy

The deployment is being done on [Vercel](https://vercel.com/). This is the link of the working demo deployment: https://leandroppf-interactive-data-grid.vercel.app/
