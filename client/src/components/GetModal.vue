<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-wrapper">
          <div class="center-div">
                <img id="imgvue" src="../assets/logo.png" width="50" height="50">
              </div>
          <header class="modal-header">
            <slot name="header">
              Get information for a specific email
              <button id="close-btn"
                type="button"
                class="btn-close"
                @click="close"
              >x</button>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body">
              <b-row>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div center-div">
                  <b-form-group
                      id="email"
                      description="We'll never share your email with anyone else."
                  >
                  <b-form-input
                      id="input-mail-modal"
                      v-model="input_email"
                      type="email"
                      required
                      placeholder="Enter email"
                  ></b-form-input>
                  </b-form-group>
                </div>
              </b-row>
              <b-row>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div center-div">
                  <div class="panel panel-default center-div" v-if="data_recieved">
                      <div class="panel-body">
                        <p>First name: {{ user_data.first_name }}</p>
                        <p>Last name: {{ user_data.last_name }}</p>
                        <p>Mail: {{ user_data.mail }}</p>
                        <p>Gender:{{ user_data.gender }}</p>
                        <p>
                          Preffered hobbies:
                        </p>
                        <ul>
                          <li v-for="user_hobby in user_data.user_hobbies" :key="user_hobby">{{user_hobby}}</li>
                        </ul>
                      </div>
                    </div>
                    <div v-else>
                          <p style="color:red;text-align: center;">{{err}}</p>
                    </div>
                </div>
              </b-row>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn-green" @click="getInfo">Request</button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  data() {
    return {
      input_email: "",
      err: "",
      data_recieved: false,
      user_data: {
        mail: "",
        first_name: "",
        last_name: "",
        user_hobbies: [],
        gender: "",
        accept_terms: false
      },
    }
  },
  methods: {
    getInputMail() {
      return this.input_email;
    },
    close() {
      this.$emit("close");
    },
    getInfo() {
      this.$http.get('find/' + this.input_email)
      .then(response => {
        if(response.ok && response.body.length > 0) {
          this.data_recieved = true;
          this.user_data = response.body[0];
        } else {
          this.data_recieved = false;
          this.err = "Nothing found :( ";
        }
        console.log(response.json());
      }, error => {
        this.err = error.body.message;
        return error;
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