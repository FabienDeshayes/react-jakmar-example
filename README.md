# Jakmar with React - example

This project is just an example of using [Jakmar](https://github.com/FabienDeshayes/jakmar) with [React](http://facebook.github.io/react/), following the [Flux Application Architecture](http://facebook.github.io/react/docs/flux-overview.html)

This simple example is just a free implementation of [Conway's game of life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) with a bit of color:
- blue indicates living cells
- red indicates cells that just died
- green indicates cells that just appeared

## Running the example

To run the example, you need NodeJS and Bower installed. Then install [Gulp](https://github.com/gulpjs/gulp/) for the build:
```
npm install -g gulp
```

Run the following next:
```
npm install
bower install
```

Then you are ready to go! Just run ```gulp``` and that should open a browser with the example running.

## Jakmar

To illustrate the use of Jakmar, please look at ```src/stores/LifeStore.js```

## React

This is my first try with React. I really wanted to get an idea of what is it that makes React so attractive. I'm probably only using a tenth of all React's features, but I really enjoy what I see so far, looking at components and the way it uses states. I also think the fact that I use it with the Flux architecture makes it nice to use.

On the downside I would say that some aspects likes actions are quite verbose, but I think once you reach a certain size you might want to tweak that aspect to make it easier using / registering events and actions for your flow.

Last, I didn't use the JSXTransformer because I wanted to have a feel of what it is that this JSXTransformer actually compiles too. I think the result is less readable and will definitely look at the transformer soon.

# TODO

* Parameterize the world size
* Refactor store to separate cell logic