# pokemon-vue

Pokemon vue project created with Vue 3, Vite Pinia, Vue Router, Typescript, ESLint, Prettier, Cypress, and Vitest.

## Project setup

```bash
yarn global add yarn
yarn install
yarn dev

## To run the tests
yarn test:unit
```

## Project structure

- **assets**: contains all the images used in the project
- **components**: contains all the components used in the project
- **composables**: contains all the composables used in the project (usePokeAPI, useLocalStorage)
- **interfaces**: contains all the interfaces used in the project
- **stores**: contains all the stores used in the project (useAllPokemonsStore)
- **utils**: contains all the utils used in the project
- **views**: contains all the views used in the project (screens of the app)
- **App.vue**: the main component of the project
- **router**: the router of the project
- **main.ts**: the main file of the project
- **index.html**: the html file of the project

## Tecnical decisions used in the project

- Used composables to handle the API calls
- Used the storage to share the favorites between sessions
- Used localStorage to store the favorites
- Created just the three views of the app (Dashboard, Favorites, and Home) and leave the components to be reused
- Used plain HTML and CSS to style the app
- Used the Vitest as test runner , i also didnt coverage the whole project just a few componets to demostrate that i know how to use it
- Used the Prettier formatter to format the code
- Used Typescript to statically type the project and avoid runtime errors
