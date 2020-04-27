<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-wrapper">
          <div class="center-div">
            <b-form>
                <b-row>
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <b>Edit for email: {{this.user_data.mail}}</b>
                        <hr>
                        <b-form-group
                            id="group-first-name"
                            label="First name:"
                        >
                        <b-form-input
                            id="input-first-name"
                            v-model="user_data.first_name"
                            required
                            placeholder="Enter first name"
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="group-last-name"
                            label="Last name:"
                        >
                        <b-form-input
                            id="input-last-name"
                            v-model="user_data.last_name"
                            required
                            placeholder="Enter last name"
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <p>
                        What are your preffered hobbies?
                        </p>
                        <ol>
                            <li v-for="hobby in hobbies" :key="hobby.name">
                                <label>
                                    <input type="checkbox" v-bind:unchecked="new_hobbies" v-on:change="push_hobby(hobby)">
                                    <span>
                                        {{hobby.name}}
                                    </span>
                                </label>
                            </li>
                        </ol>
                    </div>
                </b-row>
                <b-row>
                </b-row>
                <b-row id="btns">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <div class="center-div">
                        <button id="submit"
                            class="btn btn-primary" @click.prevent="submit">Update
                        </button>
                        </div>
                    </div>
                </b-row>
            </b-form>
        </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
      user_data : {
        mail: '',
        first_name: '',
        last_name: '',
        user_hobbies: [],
        gender: '',
        accept_terms: true
    }
  },
  data() {
    return {
      new_hobbies: [],
      hobbies: [
        {name: "Reading", checked: false},
        {name: "Gaming", checked: false},
        {name: "Sport", checked: false},
        {name: "Coding", checked: false},
        {name: "Painting", checked: false}
    ],
    }
  },
  methods: {
      push_hobby(hobby) {
         const index = this.new_hobbies.indexOf(hobby.name)
         if(index !== -1) {
             this.new_hobbies.splice(index,1)
         } else {
             this.new_hobbies.push(hobby.name)
         }
      },
      async submit() {
          this.$emit("close");
          this.user_data.user_hobbies = this.new_hobbies;
          await this.$http.put('update/' + this.user_data.mail, this.user_data)
          .then(req => {
            return req.data
          }, err => {
                alert(err.body.message);
          });
      }
  }
};
</script>

<style>
.modal-backdrop {
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  justify-content: center;
  align-items: center;
}

.modal {
  display: table-cell;
  vertical-align: middle;
}

.modal-wrapper {
  width: 600px;
  height: 0px auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: black;
  justify-content: center;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 0px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
  display: flex;
  position: absolute;
  right: 440px;
  top: 5px;
}

.btn-green {
    color: white;
    background: #4aae9b;
    border: 1px solid #20262E;
    border-radius: 18px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>