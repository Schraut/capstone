/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Home Page",
      restaurants: []
    };
  },
  created: function() {
    axios.get('/restaurants').then(function(response) {
      this.restaurants = response.data;
      console.log(this.restaurants)
    }.bind(this));
  },
  methods: {},
  computed: {}
};

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


var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};


var ShowRestaurant = {
  template: "#show-restaurant",
  data: function() {
    return {
      restaurant: {}
    };
  },
  created: function() {
    console.log('show restaurants is working');
    axios.get('/restaurants/' + this.$route.params.id).then(function(response) {
      this.restaurant = response.data;
    }.bind(this));
  },
  methods: {},
  computed: {}
};


var NewRestaurant = {
  template: "#new-restaurant",
  data: function() {
    return {
      name: "",
      location: "",
      errors: []
    };
  },
  created: function() {
    console.log('working on new restaurant page');
  },
  methods: {
    addRestaurant: function() {
      var params = {
        name: this.name,
        location: this.location,
        
      };
      axios
        .post("/restaurants", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};



var EditRestaurant = {
  template: "#edit-restaurant",
  data: function() {
    return {
      restaurant: {
        name: name,
        location: "location"
      },
      errors: []
    };
  },
  methods: {
    editRestaurant: function() {
      var params = {
        name: this.restaurant.name,
        location: this.restaurant.location
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
    console.log('running created');
    axios.get('/restaurants/' + this.$route.params.id).then(function(response) {
      this.restaurant = response.data;
    }.bind(this));
  }
};

var router = new VueRouter({
  routes: 
  [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/restaurants/new", component: NewRestaurant },
    { path: "/restaurants/:id/edit", component: EditRestaurant },
    { path: "/restaurants/:id", component: ShowRestaurant },

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