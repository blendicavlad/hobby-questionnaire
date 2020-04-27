<template>
<div id="main_form" >
        <modal
        id ="mdl" v-if="check_results"
        v-show="check_results"
        @close="closeModal"
        />
        <div class="center-div" v-if="!is_submitted">
            <b-form>
                <b-row>
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <img id="imgvue" src="../assets/logo.png" width="100" height="100" style="padding-top:5px">
                        <hr>
                        <b-form-group
                            id="group-mail"
                            label="Email address:"
                            description="We'll never share your email with anyone else."
                        >
                        <b-form-input
                            id="input-mail"
                            v-model="user_data.mail"
                            type="email"
                            required
                            placeholder="Enter email"
                        ></b-form-input>
                        </b-form-group>
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
                                    <input type="checkbox" v-bind:unchecked="user_data.user_hobbies" v-on:change="push_hobby(hobby)">
                                    <span>
                                        {{hobby.name}}
                                    </span>
                                </label>
                            </li>
                        </ol>
                    </div>
                </b-row>
                <b-row>
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <label for="male">
                        <input
                                type="radio"
                                id="male"
                                value="Male"
                                v-model="user_data.gender"> Male
                        </label>
                        <label for="female">
                        <input
                                type="radio"
                                id="female"
                                value="Female"
                                v-model="user_data.gender"> Female
                        </label>
                    </div>
                </b-row>
                <b-row>
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <p>
                            Do you accept terms and conditions?
                        </p>
                        <div class="form-group">
                        <label for="accept_terms">
                            <input
                                    type="radio"
                                    id="accept_terms"
                                    v-model="user_data.accept_terms"
                                    v-bind:value="true"> I Accept
                        </label>
                        <label for="dont_accept_terms">
                            <input
                                    type="radio"
                                    id="dont_accept_terms"
                                    v-model="user_data.accept_terms"
                                    v-bind:value="false"> I don't accept
                        </label>
                    </div>
                    </div>
                </b-row>
                <b-row id="btns">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <div class="center-div">
                        <button id="submit_btn"
                            class="btn btn-primary" @click.prevent="submit">Submit!
                        </button>
                        <button id="show_modal"
                            class="btn btn-primary" @click.prevent="showModal">Check results
                        </button>
                        </div>
                    </div>
                </b-row>
            </b-form>
        </div>
        <div v-else id="submitted_form" class="center-div">
        <h1>Submitted!</h1>
        <b-row>
            <div class="col-xs-12 col-sm-12 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                <div class="panel panel-default center-div">
                    <div class="panel-heading" style="text-align:center">
                        <h4>Your Data</h4>
                    </div>
                    <hr>
                    <div class="panel-body center-div" style="text-align:center!important">
                        <p>First name: {{ user_data.first_name }} </p>
                        <p>Last name: {{ user_data.last_name }} </p>
                        <p>Mail: {{ user_data.mail }} </p>
                        <p>Gender:{{ user_data.gender }} </p>
                        <p><strong>Preffered hobbies:</strong></p>
                        <ul style="list-style-type:none;padding-left:1px">
                            <li v-for="user_hobby in user_data.user_hobbies" :key="user_hobby">{{user_hobby}}</li>
                        </ul>
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center-div">
                        <button id="back_btn"
                            class="btn btn-primary center-div" @click.prevent="back">Back
                        </button>
                </div>
                    </div>
                </div>
            </div>
        </b-row>
    </div> 
        <hr>
    </div>
</template>

<script>
    import modal from './GetModal.vue'
    export default {
        components: {
            modal,
        },
        data() {
            return {
                user_data : {
                    mail: '',
                    first_name: '',
                    last_name: '',
                    user_hobbies: [],
                    gender: 'Male',
                    accept_terms: false
                },
                hobbies: [
                        {name: "Reading", checked: false},
                        {name: "Gaming", checked: false},
                        {name: "Sport", checked: false},
                        {name: "Coding", checked: false},
                        {name: "Painting", checked: false}
                    ],
                is_submitted: false,
                check_results: false
            } 
        },
        methods: {
            async push_hobby(hobby) {
                const index = this.user_data.user_hobbies.indexOf(hobby.name)
                if(index !== -1) {
                    this.user_data.user_hobbies.splice(index,1)
                } else {
                    this.user_data.user_hobbies.push(hobby.name)
                }
            },
            async submit() {
                console.log(this.user_data)
                this.$http.post('create', this.user_data)
                .then(response => {
                    this.is_submitted = true
                    console.log(response.body);
                }, error => {
                    alert(error.body.message);
                    console.log(error);
                });
            },
            async showModal() {
                this.check_results = true;
                console.log(this.check_results);
            },
            async closeModal() {
                this.check_results = false;
            },
            async back() {
                this.is_submitted = false;
            }
        }
    }
</script>

<style>
</style>
