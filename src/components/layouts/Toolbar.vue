<template>
  <nav>
    <v-app-bar app clipped-left  style="background-color: #f2e7d0; border-radius: 10px;">
      <!-- <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon> -->
      <v-btn icon @click.stop="drawer">
        <v-icon>{{ toggleDrawer ? "mdi-menu" : "mdi-menu-open" }}</v-icon>
      </v-btn>
      <v-img
        src="/addessa_logo.png"
        max-width="40"
        max-height="40"
        style="margin: 5px"
      ></v-img>
      <v-toolbar-title> <strong>Addessa Portal  {{connections.connection}}</strong></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    
 
                  <v-select
                      style="margin-top: 15px; margin-right: 15px; width: 10px"
                      :items="connections.databases"
                      label="Select Database"
                      v-model="connections.connection"
                      item-value="id"
                      item-text="dbname"
                      dense
                      :loading="loadingStatus"
                      @change ="change()"
                       
                 ></v-select>

      
    
      <v-tooltip-title >
        <strong style="text-align: center">Addessa {{currentUser.branch == null? '': currentUser.branch.name}}</strong>
      </v-tooltip-title>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="goDark">
            <v-icon>
              {{ isDark ? "mdi-brightness-4" : "mdi-brightness-7" }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ isDark ? "Go Dark" : "Go Light" }}</span>
      </v-tooltip>
     
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="logout">
            <v-icon>logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
 
export default {
 
  methods: {
    change(){
      const data = {'id': this.connections.connection}
      this.$store.dispatch("updateDB", data);
    },
    drawer() {
      this.$store.state.drawer = !this.$store.state.drawer;

    },

    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },

    goDark() {
 
      this.$store.state.goDark = !this.$store.state.goDark;
    },
  },

 created() {
    console.log(this.$store.getters.currentUser);
    this.$store.dispatch("fetchDatabase");
   
  },

  computed: {
    connections(){
     return  this.$store.state.connections;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    
    loadingStatus() {
      return this.$store.state.loading;
    },

    isDark() {
      return this.$store.state.goDark;
    },

    toggleDrawer() {
      return this.$store.state.drawer;
    },
  },
};
</script>
