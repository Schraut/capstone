var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};


var RestaurantPage = {
  template: "#restaurant-page",
  data: function() {
    return {
      message: "Welcome to the restaurant page!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

// var RecipePage = {
//   template: "#recipe-page",
//   data: function() {
//     return {
//       message: "Welcome to the recipe page!"
//     };
//   },
//   created: function() {},
//   methods: {},
//   computed: {}
// };


var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {      
    };
  },
  
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};


var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};





var AllRestaurants = {
  template: "#all-restaurants",
  data: function() {
    return {
      restaurants: {}
    };
  },
  created: function() {
    console.log('restaurants is working');
    axios.get('/restaurants').then(function(response) {
      this.restaurants = response.data;
      console.log('this is all restaurants')
    }.bind(this));
  },
  methods: {
    deleteRestaurant: function(restaurant_id) {
      axios.delete('/restaurants/' + restaurant_id).then(function(response) {
        this.restaurants.splice(this.restaurants.indexOf(restaurant_id), 1);
        router.push('/restaurants');
      }.bind(this));

      // console.log(restaurant_id);

    }
  },
  
  computed: {}
};


var AllRecipes = {
  template: "#all-recipes",
  data: function() {
    return {
      recipes: {}
    };
  },
  created: function() {
    console.log('recipes is working');
    axios.get('/recipes').then(function(response) {
      this.recipes = response.data;
      console.log('this is all recipes')
    }.bind(this));
  },
  methods: {
    deleteRecipe: function(recipe_id) {
      axios.delete('/recipes/' + recipe_id).then(function(response) {
        this.recipes.splice(this.recipes.indexOf(recipe_id), 1);
        router.push('/recipes');
      }.bind(this));


    }
  },
  
  computed: {}
};


var EditRestaurantPage = {
  template: "#edit-restaurant-page",
  data: function() {
    return {
      restaurant: {},
      errors: []
    };
  },
  methods: {
    editRestaurant: function() {
      var params = {
        name: this.restaurant.name,
        location: this.restaurant.location,
        image: this.restaurant.image
      };
      console.log(params);
      axios
        .patch("/restaurants/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  created: function() {
    console.log('this is the edit page');
    axios.get('/rest/' + this.$route.params.id).then(function(response) {
      this.restaurant = response.data;
    }.bind(this));
  }
};


var NewRestaurantPage = {
  template: "#new-restaurant-page",
  data: function() {
    return {
      name: "",
      location: "",
      image: "",
      errors: []
    };
  },
  created: function() {
    console.log('New restaurant page');
  },
  methods: {
    addRestaurant: function() {
      var params = {
        name: this.name,
        location: this.location,
        image: this.image
      };
      axios
        .post("restaurants", params)
        .then(function(response) {
          router.push("/restaurants");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var RecipePage = {
  template: "#recipe-page",
  data: function() {
    return {
      title: "",
      ingredients: "",
      directions: "",
      source: "",
      errors: []
    };
  },
  created: function() {
    console.log('Recipe page');
  },
  methods: {
    addRecipe: function() {
      var params = {
        title: this.title,
        ingredients: this.ingredients,
        directions: this.directions,
        source: this.source
      };
      axios
        .post("recipes", params)
        .then(function(response) {
          router.push("/recipes");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignupPage},
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/restaurants/:id/edit", component: EditRestaurantPage },
  { path: "/restaurants/new", component: NewRestaurantPage },
  { path: "/restaurants/:id", component: RestaurantPage},
  { path: "/recipes", component: AllRecipes},
  { path: "/restaurants", component: AllRestaurants}
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
